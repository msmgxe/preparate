import Link from 'next/link';
import { signOut } from '@/app/(auth)/actions';
import { initials } from '@/lib/auth';
import type { Profile } from '@/db/schema';

type NavItem = { href: string; label: string };

const STUDENT_NAV: NavItem[] = [
  { href: '/app', label: 'Itinerario' },
  { href: '/app/simulacro/isil', label: 'Simulacro' },
];

const ADMIN_NAV: NavItem[] = [
  { href: '/panel', label: 'Torre de control' },
  { href: '/alumnos', label: 'Alumnos' },
  { href: '/balotario', label: 'Balotario' },
  { href: '/clases', label: 'Clases' },
  { href: '/calibracion', label: 'Calibración' },
];

export function Header({
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
  const nav = variant === 'admin' ? ADMIN_NAV : STUDENT_NAV;

  return (
    <header>
      <div className="hbar">
        <Link className="brand" href={variant === 'admin' ? '/panel' : '/'}>
          <b>RUMBO</b>
          <span>{variant === 'admin' ? 'Administrador' : 'Alumno'}</span>
        </Link>

        <nav className="hnav">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={active === item.href ? 'on' : ''}>
              {item.label}
            </Link>
          ))}
          {profile.role === 'admin' && variant === 'student' && (
            <Link href="/panel">Volver al panel</Link>
          )}
          {profile.role === 'admin' && variant === 'admin' && <Link href="/app">Ver como alumno</Link>}
        </nav>

        <div className="hstats">
          {chips}
          <form action={signOut}>
            <button className="avatar" title={`${profile.displayName} · cerrar sesión`}>
              {initials(profile.displayName)}
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
