import { getI18n } from '@/lib/i18n';

/**
 * Todo lo que hay debajo depende de la sesión: nada se prerenderiza.
 * (Los Server Components que usan Neon Auth deben renderizarse dinámicamente.)
 */
export const dynamic = 'force-dynamic';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const { t } = await getI18n();

  return (
    <div className="authshell">
      <div className="authbox">
        <div className="authlogo">
          <b>RUMBO</b>
          <span>{t.auth.brandSub}</span>
        </div>
        {children}
      </div>
    </div>
  );
}
