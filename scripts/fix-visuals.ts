import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { visuals } from '@/db/schema';

/**
 * Vuelve las infografías independientes del tema.
 *
 * Los SVG vinieron del prototipo con los colores del tema oscuro escritos a
 * fuego: `#F7F1E5` para el texto principal y `#B9AE99` para el de apoyo. Sobre
 * el fondo blanco del modo claro esos dos son casi invisibles — es lo que
 * pasaba con las palabras de la clase de sonidos del inglés.
 *
 * La corrección es `currentColor`, que sí se resuelve dentro de un atributo
 * SVG (a diferencia de `var()`) y hereda el color del contenedor. Los acentos
 * —ámbar, menta, coral, celeste, violeta, turquesa— se quedan como están:
 * funcionan en los dos temas y son los que dan significado al dibujo.
 *
 * Es idempotente: si ya no queda ningún color fijo, no escribe nada.
 */
const REPLACEMENTS: [RegExp, string][] = [
  // texto principal
  [/fill="#F7F1E5"/g, 'fill="currentColor"'],
  [/stroke="#F7F1E5"/g, 'stroke="currentColor"'],
  // texto de apoyo: mismo color, con menos presencia
  [/fill="#B9AE99"/g, 'fill="currentColor" fill-opacity=".64"'],
  [/stroke="#B9AE99"/g, 'stroke="currentColor" stroke-opacity=".64"'],
  // líneas tenues que colgaban del papel del tema oscuro
  [/stroke="rgba\(247,241,229,\.(\d+)\)"/g, 'stroke="currentColor" stroke-opacity=".$1"'],
  [/fill="rgba\(247,241,229,\.(\d+)\)"/g, 'fill="currentColor" fill-opacity=".$1"'],
];

async function main() {
  const db = getDb();
  const rows = await db.select({ id: visuals.id, svg: visuals.svg }).from(visuals);

  let touched = 0;
  for (const row of rows) {
    let svg = row.svg;
    for (const [pattern, replacement] of REPLACEMENTS) svg = svg.replace(pattern, replacement);

    if (svg === row.svg) {
      process.stdout.write(`   ·  ${row.id} ya estaba bien\n`);
      continue;
    }

    await db.update(visuals).set({ svg }).where(eq(visuals.id, row.id));
    touched += 1;
    process.stdout.write(`   ✓  ${row.id}\n`);
  }

  // comprobación final: no debe quedar ningún color de tema dentro de un SVG
  const after = await db.select({ id: visuals.id, svg: visuals.svg }).from(visuals);
  const leftovers = after.filter((v) => /#F7F1E5|#B9AE99|rgba\(247,241,229/i.test(v.svg));
  process.stdout.write(
    leftovers.length
      ? `\n✕ quedan colores fijos en: ${leftovers.map((v) => v.id).join(', ')}\n`
      : `\n✓ ${touched} infografías corregidas · ninguna depende ya del tema\n`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
