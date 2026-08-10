import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { chapters, lessonBlocks, lessons } from '@/db/schema';
import type { BlockKind } from '@/lib/blocks';
import { ENG_LESSONS } from '../docs/bank/eng-lessons';

/**
 * Siembra las clases escritas a mano.
 *
 * Una clase se reconoce por su `slug`. Si ya existe, se actualiza y sus
 * bloques se reescriben enteros: así, corregir un texto en el archivo de datos
 * y volver a correr esto basta, sin duplicar nada ni dejar restos.
 *
 * Los videos no se tocan: viven en su propia tabla y los pone el administrador.
 */
async function main() {
  const db = getDb();

  const allChapters = await db
    .select({ id: chapters.id, title: chapters.title })
    .from(chapters);
  const byTitle = new Map(allChapters.map((c) => [c.title, c.id]));

  let created = 0;
  let updated = 0;

  for (const seed of ENG_LESSONS) {
    const chapterId = byTitle.get(seed.chapter);
    if (!chapterId) {
      process.stdout.write(`⚠ capítulo no encontrado: ${seed.chapter}\n`);
      continue;
    }

    const [existing] = await db
      .select({ id: lessons.id })
      .from(lessons)
      .where(eq(lessons.slug, seed.slug))
      .limit(1);

    let lessonId: string;
    if (existing) {
      await db
        .update(lessons)
        .set({
          chapterId,
          title: seed.title,
          hook: seed.hook,
          minutes: seed.minutes,
          status: 'published',
        })
        .where(eq(lessons.id, existing.id));
      lessonId = existing.id;
      // los bloques se rehacen: es más simple y más fiable que reconciliarlos
      await db.delete(lessonBlocks).where(eq(lessonBlocks.lessonId, lessonId));
      updated += 1;
    } else {
      const [row] = await db
        .insert(lessons)
        .values({
          chapterId,
          slug: seed.slug,
          title: seed.title,
          hook: seed.hook,
          minutes: seed.minutes,
          status: 'published',
        })
        .returning({ id: lessons.id });
      lessonId = row.id;
      created += 1;
    }

    await db.insert(lessonBlocks).values(
      seed.blocks.map((block, ord) => ({
        lessonId,
        ord,
        kind: block.kind as BlockKind,
        payload: block.payload,
      })),
    );

    const audio = seed.blocks.filter((b) => ['listen', 'pair', 'say'].includes(b.kind)).length;
    process.stdout.write(
      `   ✓ ${seed.slug.padEnd(16)} ${String(seed.blocks.length).padStart(2)} bloques · ${audio} de audio\n`,
    );
  }

  process.stdout.write(`\n✓ ${created} clases nuevas · ${updated} actualizadas\n`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
