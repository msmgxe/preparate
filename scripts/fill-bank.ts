import Anthropic from '@anthropic-ai/sdk';
import { eq, ne, sql } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, chapters, questions } from '@/db/schema';
import { SCHEMA, SYSTEM, buildPrompt } from '@/lib/question-gen';

/**
 * Llena el balotario: deja cada capítulo con un mínimo de preguntas
 * publicadas, con dificultad variada.
 *
 * Se salta los capítulos que ya llegan al mínimo, así que se puede repetir sin
 * duplicar nada. El módulo de Inglés queda fuera: su balotario se construye
 * distinto, por nivel del MCER.
 *
 *   npm run db:bank            → 5 por capítulo
 *   npm run db:bank -- 8       → 8 por capítulo
 *   npm run db:bank -- 5 rm    → solo el área indicada
 *
 * ⚠️ Lo que sale de aquí entra publicado, para que la práctica funcione desde
 * el primer día. Reviéwalo en /calibracion: las preguntas que casi nadie
 * acierta suelen ser las que están mal redactadas, no las difíciles.
 */

type Generated = {
  stem: string;
  passage?: string;
  options: string[];
  answer_index: number;
  difficulty: number;
  steps: { t: string; p: string; m: string }[];
  concept: string;
  trick: string;
};

/** Comprobaciones que evitan meter basura en la base. */
function isSane(q: Generated): string | null {
  if (!q.stem?.trim()) return 'sin enunciado';
  if (!Array.isArray(q.options) || q.options.length < 3) return 'menos de 3 alternativas';
  if (q.options.length > 5) return 'más de 5 alternativas';
  if (new Set(q.options.map((o) => o.trim().toLowerCase())).size !== q.options.length)
    return 'alternativas repetidas';
  if (!Number.isInteger(q.answer_index) || q.answer_index < 0 || q.answer_index >= q.options.length)
    return 'la respuesta no apunta a ninguna alternativa';
  if (!Array.isArray(q.steps) || q.steps.length < 2) return 'resolución de menos de 2 pasos';
  if (!q.concept?.trim() || !q.trick?.trim()) return 'sin concepto o sin truco';
  return null;
}

async function main() {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('Falta ANTHROPIC_API_KEY en .env.local');

  const args = process.argv.slice(2).filter((a) => !a.startsWith('-'));
  const target = Math.max(1, Math.min(8, Number(args[0]) || 5));
  const onlyArea = args[1] ?? null;

  const db = getDb();
  const client = new Anthropic({ apiKey: key });

  const rows = await db
    .select({
      id: chapters.id,
      title: chapters.title,
      areaId: areas.id,
      areaName: areas.name,
      n: sql<number>`count(${questions.id}) filter (where ${questions.status} = 'published')`,
    })
    .from(chapters)
    .innerJoin(areas, eq(areas.id, chapters.areaId))
    .leftJoin(questions, eq(questions.chapterId, chapters.id))
    .where(onlyArea ? eq(areas.id, onlyArea) : ne(areas.id, 'eng'))
    .groupBy(chapters.id, chapters.title, areas.id, areas.name, areas.ord, chapters.ord)
    .orderBy(areas.ord, chapters.ord);

  const pending = rows.filter((r) => Number(r.n) < target);
  process.stdout.write(
    `${rows.length} capítulos · ${pending.length} por debajo de ${target} preguntas\n\n`,
  );

  let written = 0;
  let rejected = 0;

  for (const [i, chapter] of pending.entries()) {
    const need = target - Number(chapter.n);
    const label = `[${i + 1}/${pending.length}] ${chapter.areaId} · ${chapter.title}`;
    process.stdout.write(`${label} → faltan ${need}\n`);

    let parsed: { questions?: Generated[] };
    try {
      const response = await client.messages.create({
        model: 'claude-opus-5',
        max_tokens: 16000,
        system: SYSTEM,
        output_config: { format: { type: 'json_schema', schema: SCHEMA } },
        messages: [
          {
            role: 'user',
            content: buildPrompt({
              areaName: chapter.areaName,
              chapterTitle: chapter.title,
              count: need,
              notes:
                'Cubre distintos tipos de pregunta dentro del capítulo, no variantes del mismo ' +
                'ejercicio. Reparte la dificultad: alguna de calentamiento, la mayoría de nivel ' +
                'de examen y al menos una exigente.',
            }),
          },
        ],
      });

      if (response.stop_reason === 'refusal') {
        process.stdout.write('   ✕ el modelo declinó\n');
        continue;
      }

      const text = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map((b) => b.text)
        .join('');
      parsed = JSON.parse(text);
    } catch (error) {
      process.stdout.write(`   ✕ ${error instanceof Error ? error.message : 'fallo'}\n`);
      continue;
    }

    const batch = (parsed.questions ?? []).slice(0, need);
    const good = [];
    for (const q of batch) {
      const problem = isSane(q);
      if (problem) {
        process.stdout.write(`   ✕ descartada: ${problem}\n`);
        rejected += 1;
        continue;
      }
      good.push({
        chapterId: chapter.id,
        kind: (q.passage ? 'reading_set' : 'single_choice') as 'reading_set' | 'single_choice',
        stem: q.stem,
        passage: q.passage ?? null,
        options: q.options,
        answerIndex: q.answer_index,
        difficulty: Math.min(3, Math.max(1, q.difficulty)),
        steps: q.steps,
        concept: q.concept,
        trick: q.trick,
        status: 'published' as const,
      });
    }

    if (good.length) {
      await db.insert(questions).values(good);
      written += good.length;
      process.stdout.write(`   ✓ ${good.length} publicadas\n`);
    }
  }

  const [{ total }] = await db
    .select({ total: sql<number>`count(*)` })
    .from(questions)
    .where(eq(questions.status, 'published'));

  process.stdout.write(
    `\n✓ ${written} preguntas nuevas · ${rejected} descartadas · ${total} publicadas en total\n`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
