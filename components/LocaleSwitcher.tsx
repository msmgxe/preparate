import { setLocale } from '@/app/actions/locale';
import { LOCALES, LOCALE_NAMES, LOCALE_SHORT, type Locale } from '@/lib/i18n/config';

/**
 * Selector de idioma.
 *
 * Es un formulario, no un `<select>` con JavaScript: funciona sin hidratar y
 * la elección se guarda en cookie y, si hay sesión, también en el perfil.
 */
export function LocaleSwitcher({
  current,
  variant = 'app',
  label,
}: {
  current: Locale;
  variant?: 'app' | 'landing';
  label: string;
}) {
  return (
    <form
      action={setLocale}
      aria-label={label}
      className={variant === 'landing' ? 'lp-langs' : 'langs'}
    >
      {LOCALES.map((locale) => (
        <button
          key={locale}
          name="locale"
          value={locale}
          className={locale === current ? 'on' : ''}
          aria-current={locale === current}
          title={LOCALE_NAMES[locale]}
          type="submit"
        >
          {LOCALE_SHORT[locale]}
        </button>
      ))}
    </form>
  );
}
