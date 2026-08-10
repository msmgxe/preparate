import Link from 'next/link';
import { signOut } from '@/app/(auth)/actions';
import { initials } from '@/lib/auth';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { getI18n } from '@/lib/i18n';
import type { Profile } from '@/db/schema';

/**
 * El panel no se traduce: lo usa el administrador, y sus rótulos coinciden con
 * los de la base y la documentación. Lo del alumno sí.
 */
const ADMIN_NAV = [
  { href: '/panel', label: 'Torre de control' },
  { href: '/alumnos', label: 'Alumnos' },
  { href: '/balotario', label: 'Balotario' },
  { href: '/clases', label: 'Clases' },
  { href: '/calibracion', label: 'Calibración' },
  { href: '/traducciones', label: 'Idiomas' },
  { href: '/ayuda', label: 'Ayuda' },
];

export async function Header({
  profile,
  variant,
  active,
  chips,
}: {
  profile: Profile;
  variant: 'student' | 'admin';
  active?: string;
  chips?: React.ReactNode;
}) {
  const { locale, t } = await getI18n();
  const nav =
    variant === 'admin'
      ? ADMIN_NAV
      : [
          { href: '/app', label: t.nav.itinerary },
          { href: '/app/simulacro/isil', label: t.nav.exam },
        ];

  return (
    <header>
      <div className={`hbar${variant === 'admin' ? ' wide' : ''}`}>
        <Link className="brand" href={variant === 'admin' ? '/panel' : '/'}>
          <b>RUMBO</b>
          <span>{variant === 'admin' ? t.nav.admin : t.nav.student}</span>
        </Link>

        <nav className="hnav">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={active === item.href ? 'on' : ''}>
              {item.label}
            </Link>
          ))}
          {profile.role === 'admin' && variant === 'student' && (
            <Link href="/panel">{t.nav.backToPanel}</Link>
          )}
          {profile.role === 'admin' && variant === 'admin' && <Link href="/app">{t.nav.viewAsStudent}</Link>}
        </nav>

        <div className="hstats">
          {chips}
          <LocaleSwitcher current={locale} label={t.common.language} />
          <ThemeToggle defaultDark />
          <form action={signOut}>
            <button className="avatar" title={`${profile.displayName} · ${t.nav.signOut}`}>
              {initials(profile.displayName)}
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
