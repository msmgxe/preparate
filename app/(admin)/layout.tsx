import { requireAdmin } from '@/lib/auth';
import { Header } from '@/components/Header';
import { getContentCounters } from '@/lib/admin-queries';

/**
 * Todo lo que hay debajo depende de la sesión: nada se prerenderiza.
 * (Los Server Components que usan Neon Auth deben renderizarse dinámicamente.)
 */
export const dynamic = 'force-dynamic';

/** Guard del área de administrador. Un alumno que entre aquí vuelve a `/`. */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireAdmin();
  const counters = await getContentCounters();

  return (
    <>
      <Header
        profile={profile}
        variant="admin"
        chips={
          <>
            <div className="chip">
              <i>📚</i>
              {counters.published} publicadas
            </div>
            {counters.draft + counters.reviewed > 0 && (
              <div className="chip hide-sm">
                <i>⚑</i>
                {counters.draft + counters.reviewed} por revisar
              </div>
            )}
          </>
        }
      />
      <div className="wrap wide">{children}</div>
    </>
  );
}
