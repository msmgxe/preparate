import { and, eq, sql } from 'drizzle-orm';
import { getDb } from '@/db';
import { lessonBlocks, lessons } from '@/db/schema';

/**
 * Añade el oído y la boca a las clases de inglés.
 *
 * Los bloques de audio no llevan archivos: el navegador pone la voz. Por eso
 * se pueden corregir escribiendo, sin volver a grabar nada.
 *
 * Es idempotente: cada bloque se reconoce por su encabezado dentro de la
 * clase, así que volver a correrlo no duplica nada.
 */
type AudioBlock = { kind: 'listen' | 'pair' | 'say'; payload: Record<string, unknown> };

const BY_LESSON: Record<string, AudioBlock[]> = {
  'eng-sonidos': [
    {
      kind: 'pair',
      payload: {
        h: 'Escúchalos hasta que suenen distintos',
        note: 'Pulsa cada palabra las veces que haga falta. No busques «decirlo bien»: busca oír la diferencia. Hasta que no la oigas, no vas a poder producirla.',
        items: [
          { a: 'ship', ipaA: '/ɪ/', esA: 'barco', b: 'sheep', ipaB: '/iː/', esB: 'oveja' },
          { a: 'bad', ipaA: '/æ/', esA: 'malo', b: 'bed', ipaB: '/e/', esB: 'cama' },
          { a: 'think', ipaA: '/θ/', esA: 'pensar', b: 'sink', ipaB: '/s/', esB: 'hundirse' },
          { a: 'live', ipaA: '/ɪ/', esA: 'vivir', b: 'leave', ipaB: '/iː/', esB: 'irse' },
        ],
      },
    },
    {
      kind: 'say',
      payload: {
        h: 'Ahora dilo tú',
        note: 'El navegador escucha y escribe lo que entendió. Si dices «sheep» y entiende «ship», acabas de recibir la corrección más honesta que existe: es lo mismo que le pasaría a un angloparlante escuchándote. No mide tu acento, mide si se te entiende.',
        items: [
          { text: 'sheep', vs: 'ship' },
          { text: 'bed', vs: 'bad' },
          { text: 'think', vs: 'sink' },
          { text: 'leave', vs: 'live' },
        ],
      },
    },
    {
      kind: 'listen',
      payload: {
        h: 'Las frases que te salvan el primer día',
        items: [
          { en: 'Sorry, could you repeat that, please?', es: 'Perdón, ¿podría repetirlo, por favor?' },
          { en: "I don't understand.", es: 'No entiendo.' },
          { en: 'How do you say this in English?', es: '¿Cómo se dice esto en inglés?' },
          { en: 'Could you speak more slowly, please?', es: '¿Podría hablar más despacio, por favor?' },
          { en: 'Where is the gate for this flight?', es: '¿Dónde está la puerta de este vuelo?' },
        ],
      },
    },
  ],
};

async function main() {
  const db = getDb();
  let written = 0;
  let skipped = 0;

  for (const [slug, blocks] of Object.entries(BY_LESSON)) {
    const [lesson] = await db.select({ id: lessons.id }).from(lessons).where(eq(lessons.slug, slug)).limit(1);
    if (!lesson) {
      process.stdout.write(`⚠ clase no encontrada: ${slug}\n`);
      continue;
    }

    const existing = await db
      .select({ ord: lessonBlocks.ord, payload: lessonBlocks.payload })
      .from(lessonBlocks)
      .where(eq(lessonBlocks.lessonId, lesson.id));

    const heads = new Set(
      existing.map((b) => (b.payload as { h?: string })?.h).filter(Boolean) as string[],
    );
    // los nuevos se insertan antes del bloque de videos, que cierra la clase
    let ord = Math.max(0, ...existing.map((b) => b.ord)) + 1;

    for (const block of blocks) {
      const head = block.payload.h as string;
      if (heads.has(head)) {
        skipped += 1;
        continue;
      }
      await db.insert(lessonBlocks).values({
        lessonId: lesson.id,
        ord,
        kind: block.kind,
        payload: block.payload,
      });
      ord += 1;
      written += 1;
      process.stdout.write(`   ✓ ${slug} · ${block.kind} · ${head}\n`);
    }

    // el bloque de videos vuelve al final
    await db
      .update(lessonBlocks)
      .set({ ord: sql`${ord}` })
      .where(and(eq(lessonBlocks.lessonId, lesson.id), eq(lessonBlocks.kind, 'video')));
  }

  process.stdout.write(`\n✓ ${written} bloques de audio · ${skipped} ya estaban\n`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
