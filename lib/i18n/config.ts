/**
 * Idiomas del producto.
 *
 * El español manda: es la lengua en la que se escribe el contenido y la que
 * queda como respaldo cuando falta una traducción. Nunca se muestra una clave
 * cruda ni un hueco en blanco.
 */
export const LOCALES = ['es', 'en', 'pt'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';
export const LOCALE_COOKIE = 'rumbo-locale';

export const LOCALE_NAMES: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
};

/** Etiqueta corta para el selector del chrome. */
export const LOCALE_SHORT: Record<Locale, string> = {
  es: 'ES',
  en: 'EN',
  pt: 'PT',
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/**
 * El primer idioma del navegador que sepamos hablar.
 * `pt-BR` cuenta como `pt`, `en-US` como `en`.
 */
export function matchLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const wanted = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of wanted) {
    const base = tag.split('-')[0];
    if (isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

/** Etiqueta BCP-47 para fechas y números. Perú y Brasil, no España ni Portugal. */
export const INTL_LOCALE: Record<Locale, string> = {
  es: 'es-PE',
  en: 'en-US',
  pt: 'pt-BR',
};
