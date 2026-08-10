import { eq, inArray, sql } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, chapters, questions } from '@/db/schema';
import { BANK } from '../docs/bank';
import { NOTES } from '../docs/bank/notes';

/**
 * Siembra el balotario escrito a mano.
 *
 * Idempotente: una pregunta se reconoce por su enunciado dentro del capítulo,
 * así que volver a correrlo no duplica nada y sí publica lo que se haya
 * añadido desde la última vez.
 *
 *   npm run db:seed-bank            → todo
 *   npm run db:seed-bank -- mat     → solo un área
 */
async function main() {
  const db = getDb();
  const onlyArea = process.argv.slice(2).find((a) => !a.startsWith('-')) ?? null;

  const all = await db
    .select({ id: chapters.id, title: chapters.title, areaId: chapters.areaId, ord: chapters.ord })
    .from(chapters)
    .orderBy(chapters.areaId, chapters.ord);

  const byTitle = new Map(all.map((c) => [c.title, c]));

  const existing = new Set(
    (
      await db
        .select({ chapterId: questions.chapterId, stem: questions.stem })
        .from(questions)
        .where(
          inArray(
            questions.chapterId,
            all.map((c) => c.id),
          ),
        )
    ).map((q) => `${q.chapterId}·${q.stem}`),
  );

  /**
   * Lo que no puede pasar de aquí.
   *
   * Una pregunta con la respuesta fuera de rango o con dos alternativas
   * iguales no se nota al escribirla y sí al corregir a un alumno.
   */
  const problems: string[] = [];
  for (const q of BANK) {
    const where = `«${q.stem.replace(/<[^>]+>/g, ' ').trim().slice(0, 44)}…»`;
    if (q.options.length < 3 || q.options.length > 5) problems.push(`${where}: ${q.options.length} alternativas`);
    if (new Set(q.options.map((o) => o.trim().toLowerCase())).size !== q.options.length)
      problems.push(`${where}: alternativas repetidas`);
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length)
      problems.push(`${where}: la respuesta no apunta a ninguna alternativa`);
    if (q.steps.length < 2) problems.push(`${where}: menos de 2 pasos`);
    if (!q.concept.trim() || !q.trick.trim()) problems.push(`${where}: sin concepto o sin truco`);
    for (const k of Object.keys(q.distractors ?? {})) {
      const i = Number(k);
      if (!Number.isInteger(i) || i < 0 || i >= q.options.length)
        problems.push(`${where}: explicación para una alternativa que no existe (${k})`);
      if (i === q.answer) problems.push(`${where}: hay explicación de error en la alternativa correcta`);
    }
  }
  if (problems.length) {
    process.stdout.write(`✕ ${problems.length} problemas, no se sembró nada:\n`);
    for (const p of problems) process.stdout.write(`   ${p}\n`);
    process.exit(1);
  }

  let written = 0;
  let skipped = 0;
  const missing = new Set<string>();

  for (const q of BANK) {
    const chapter = byTitle.get(q.chapter);
    if (!chapter) {
      missing.add(q.chapter);
      continue;
    }
    if (onlyArea && chapter.areaId !== onlyArea) continue;
    if (existing.has(`${chapter.id}·${q.stem}`)) {
      skipped += 1;
      continue;
    }

    await db.insert(questions).values({
      chapterId: chapter.id,
      kind: q.passage ? 'reading_set' : 'single_choice',
      stem: q.stem,
      passage: q.passage ?? null,
      options: q.options,
      answerIndex: q.answer,
      difficulty: q.difficulty,
      steps: q.steps,
      concept: q.concept,
      trick: q.trick,
      distractors: q.distractors ?? {},
      status: 'published',
    });
    written += 1;
  }

  // ── qué se practica en cada capítulo ─────────────────────────────────────
  let noted = 0;
  for (const note of NOTES) {
    const chapter = byTitle.get(note.chapter);
    if (!chapter) {
      missing.add(note.chapter);
      continue;
    }
    if (onlyArea && chapter.areaId !== onlyArea) continue;

    await db
      .update(chapters)
      .set({
        blurb: note.es,
        // se fusiona con lo que ya haya traducido, sin pisar el resto de campos
        i18n: sql`jsonb_set(
          jsonb_set(coalesce(${chapters.i18n}, '{}'::jsonb), '{en}',
            coalesce(${chapters.i18n} -> 'en', '{}'::jsonb) || ${JSON.stringify({ blurb: note.en })}::jsonb, true),
          '{pt}',
          coalesce(${chapters.i18n} -> 'pt', '{}'::jsonb) || ${JSON.stringify({ blurb: note.pt })}::jsonb, true)`,
      })
      .where(eq(chapters.id, chapter.id));
    noted += 1;
  }
  process.stdout.write(`✓ ${noted} capítulos con su explicación\n`);

  if (missing.size) {
    process.stdout.write(`⚠ capítulos no encontrados: ${[...missing].join(', ')}\n`);
  }
  process.stdout.write(`\n✓ ${written} publicadas · ${skipped} ya estaban\n\n`);

  // resumen por capítulo, para ver de un vistazo qué falta
  const published = await db
    .select({ chapterId: questions.chapterId })
    .from(questions)
    .where(eq(questions.status, 'published'));
  const per = new Map<string, number>();
  for (const c of published) per.set(c.chapterId, (per.get(c.chapterId) ?? 0) + 1);

  const names = new Map((await db.select({ id: areas.id, name: areas.name }).from(areas)).map((a) => [a.id, a.name]));
  let area = '';
  for (const c of all) {
    if (onlyArea && c.areaId !== onlyArea) continue;
    if (c.areaId !== area) {
      area = c.areaId;
      process.stdout.write(`\n  ${names.get(area) ?? area}\n`);
    }
    const n = per.get(c.id) ?? 0;
    process.stdout.write(`   ${n === 0 ? ' ·' : String(n).padStart(2)}  ${c.title}\n`);
  }
  process.stdout.write('\n');
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
