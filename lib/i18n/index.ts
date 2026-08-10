import 'server-only';

import { cookies, headers } from 'next/headers';
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, matchLocale, type Locale } from './config';
import { es, type Dict } from './dictionaries/es';
import { en } from './dictionaries/en';
import { pt } from './dictionaries/pt';
import { getProfile } from '@/lib/auth';

const DICTS: Record<Locale, Dict> = { es, en, pt };

/**
 * Idioma de la petición.
 *
 * Manda la cookie (que fija el usuario al elegir en el selector) y, si no hay,
 * lo que pida el navegador. Sin segmento en la URL: la app va detrás de login,
 * así que el SEO por idioma no aplica, y evitamos reescribir todo el árbol de
 * rutas. Para compartir un enlace en otro idioma está `?lang=`.
 */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const saved = store.get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;

  // sin cookie pero con sesión: manda lo que el alumno eligió alguna vez.
  // `getProfile` está memorizado por petición, así que no cuesta una consulta.
  const profile = await getProfile();
  if (profile && isLocale(profile.locale)) return profile.locale;

  const h = await headers();
  return matchLocale(h.get('accept-language'));
}

export async function getDict(): Promise<Dict> {
  return DICTS[await getLocale()];
}

/** Idioma y diccionario juntos, que es lo que suele hacer falta. */
export async function getI18n(): Promise<{ locale: Locale; t: Dict }> {
  const locale = await getLocale();
  return { locale, t: DICTS[locale] };
}

export { DEFAULT_LOCALE };
export { fill } from './fill';
export type { Dict, Locale };

