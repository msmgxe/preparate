import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { chapters, lessonBlocks, lessons, visuals } from '@/db/schema';
import type { BlockKind } from '@/lib/blocks';
import { CG_LESSONS } from '../docs/bank/cg-lessons';
import { CG_VISUALS } from '../docs/bank/cg-visuals';
import { ENG_LESSONS } from '../docs/bank/eng-lessons';
import { ENG_VISUALS } from '../docs/bank/eng-visuals';
import { MAT_LESSONS } from '../docs/bank/mat-lessons';
import { MAT_VISUALS } from '../docs/bank/mat-visuals';
import { RM_LESSONS } from '../docs/bank/rm-lessons';
import { RM_VISUALS } from '../docs/bank/rm-visuals';
import { RV_LESSONS } from '../docs/bank/rv-lessons';
import { RV_VISUALS } from '../docs/bank/rv-visuals';

/**
 * Todo lo escrito a mano, junto. Cada área añade aquí su par de archivos y el
 * resto del script no cambia.
 */
const ALL_LESSONS = [...ENG_LESSONS, ...RM_LESSONS, ...MAT_LESSONS, ...RV_LESSONS, ...CG_LESSONS];
const ALL_VISUALS = [...ENG_VISUALS, ...RM_VISUALS, ...MAT_VISUALS, ...RV_VISUALS, ...CG_VISUALS];

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

  // ── las infografías, antes que las clases que las usan ───────────────────
  for (const visual of ALL_VISUALS) {
    await db
      .insert(visuals)
      .values({ id: visual.id, svg: visual.svg })
      .onConflictDoUpdate({ target: visuals.id, set: { svg: visual.svg } });
  }
  process.stdout.write(`   ✓ ${ALL_VISUALS.length} infografías\n\n`);

  let created = 0;
  let updated = 0;

  for (const seed of ALL_LESSONS) {
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
