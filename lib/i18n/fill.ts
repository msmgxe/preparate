/**
 * Sustituye `{clave}` por su valor: `fill(t.x, { n: 3 })`.
 *
 * Vive aparte de `index.ts` porque lo usan también componentes cliente, y ese
 * módulo importa `next/headers`, que solo existe en el servidor.
 */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match,
  );
}
