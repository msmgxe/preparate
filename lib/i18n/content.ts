import type { Locale } from './config';

/**
 * Resolución de contenido traducido.
 *
 * El español vive en las columnas normales y hace de respaldo: si falta una
 * traducción se devuelve el original, nunca un hueco ni una clave cruda.
 *
 * ⚠️ El blob `i18n` de `questions` contiene también las traducciones de
 * `steps`, `concept` y `trick`. Se resuelve **en el servidor** y jamás se
 * selecciona entero hacia un componente cliente: mandaría la resolución antes
 * de responder, que es justo lo que la regla de oro prohíbe.
 */
type WithI18n = { i18n?: Record<string, Record<string, unknown>> | null };

/** Un campo traducido, con respaldo al valor original de la fila. */
export function tr<T extends WithI18n, K extends keyof T>(
  row: T,
  field: K,
  locale: Locale,
): T[K] {
  if (locale === 'es') return row[field];
  const value = row.i18n?.[locale]?.[field as string];
  return value === undefined || value === null || value === '' ? row[field] : (value as T[K]);
}

/** Varios campos de golpe, devueltos ya mezclados sobre la fila. */
export function trRow<T extends WithI18n>(row: T, fields: (keyof T)[], locale: Locale): T {
  if (locale === 'es') return row;
  const out = { ...row };
  for (const field of fields) out[field] = tr(row, field, locale);
  return out;
}

/**
 * Mezcla las traducciones dentro del `payload` de un bloque de clase.
 * El payload cambia de forma según el tipo, así que se sustituye entero.
 */
export function trPayload(
  payload: unknown,
  i18n: Record<string, Record<string, unknown>> | null | undefined,
  locale: Locale,
): unknown {
  if (locale === 'es') return payload;
  const translated = i18n?.[locale]?.payload;
  return translated ?? payload;
}
