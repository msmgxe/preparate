import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { neon } from '@neondatabase/serverless';
import { eq, like, sql } from 'drizzle-orm';
import { getDb } from '@/db';
import { lessonBlocks, lessons, questions } from '@/db/schema';
import { splitSql } from './split-sql';
import { LESSONS, QUESTIONS } from '../docs/i18n-content';

/**
 * Aplica las traducciones del contenido.
 *
 * Dos fuentes: `docs/i18n.sql` para lo plano (áreas, capítulos, planes) y
 * `docs/i18n-content.ts` para lo anidado (clases, bloques, preguntas). Es
 * idempotente: escribe siempre el mismo objeto, así que se puede repetir.
 */
async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('Falta DATABASE_URL.');

  // ── 1 · áreas, capítulos y planes ────────────────────────────────────────
  const raw = readFileSync(join(process.cwd(), 'docs', 'i18n.sql'), 'utf8');
  const statements = splitSql(raw);
  const run = neon(url);
  for (const statement of statements) await run.query(statement);
  process.stdout.write(`  ✓ ${statements.length} sentencias planas\n`);

  const db = getDb();

  // ── 2 · clases y sus bloques ─────────────────────────────────────────────
  let lessonCount = 0;
  let blockCount = 0;
  for (const entry of LESSONS) {
    const [row] = await db
      .select({ id: lessons.id })
      .from(lessons)
      .where(eq(lessons.title, entry.es))
      .limit(1);

    if (!row) {
      process.stdout.write(`  ⚠ clase no encontrada: ${entry.es}\n`);
      continue;
    }

    await db
      .update(lessons)
      .set({ i18n: { en: entry.en, pt: entry.pt } })
      .where(eq(lessons.id, row.id));
    lessonCount += 1;

    const blocks = await db
      .select({ id: lessonBlocks.id, ord: lessonBlocks.ord })
      .from(lessonBlocks)
      .where(eq(lessonBlocks.lessonId, row.id));

    for (const block of blocks) {
      const translation = entry.blocks[block.ord];
      // los bloques de video no llevan texto propio: se saltan sin ruido
      if (!translation) continue;
      await db
        .update(lessonBlocks)
        .set({ i18n: { en: { payload: translation.en }, pt: { payload: translation.pt } } })
        .where(eq(lessonBlocks.id, block.id));
      blockCount += 1;
    }
  }
  process.stdout.write(`  ✓ ${lessonCount} clases · ${blockCount} bloques\n`);

  // ── 3 · preguntas ────────────────────────────────────────────────────────
  let questionCount = 0;
  for (const entry of QUESTIONS) {
    const [row] = await db
      .select({ id: questions.id })
      .from(questions)
      .where(like(questions.stem, `${entry.starts}%`))
      .limit(1);

    if (!row) {
      process.stdout.write(`  ⚠ pregunta no encontrada: ${entry.starts}\n`);
      continue;
    }

    await db
      .update(questions)
      .set({ i18n: { en: entry.en, pt: entry.pt } })
      .where(eq(questions.id, row.id));
    questionCount += 1;
  }
  process.stdout.write(`  ✓ ${questionCount} preguntas\n`);

  // ── 4 · el módulo de Inglés solo se ofrece en español ─────────────────────
  await db.execute(sql`update areas set locales = array['es'] where id = 'eng'`);

  process.stdout.write('\n✓ Traducciones aplicadas.\n');
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
