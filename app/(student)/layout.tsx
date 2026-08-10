import { getI18n } from '@/lib/i18n';
import { INTL_LOCALE } from '@/lib/i18n/config';
import { requireUser } from '@/lib/auth';
import { Header } from '@/components/Header';

/**
 * Todo lo que hay debajo depende de la sesión: nada se prerenderiza.
 * (Los Server Components que usan Neon Auth deben renderizarse dinámicamente.)
 */
export const dynamic = 'force-dynamic';

/**
 * Guard del área de alumno: hace falta sesión. Un admin también puede entrar,
 * para ver la app tal como la ve Rodrigo.
 */
export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireUser();
  const { locale, t } = await getI18n();

  return (
    <>
      <Header
        profile={profile}
        variant="student"
        chips={
          <>
            <div className="chip fire">
              <i>🔥</i>
              {profile.streak} {profile.streak === 1 ? t.common.day : t.common.days}
            </div>
            <div className="chip miles hide-sm">
              <i>✈</i>
              {profile.miles.toLocaleString(INTL_LOCALE[locale])} {t.app.miles}
            </div>
          </>
        }
      />
      <div className="wrap">{children}</div>
    </>
  );
}
