import Link from 'next/link';
import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { examProfiles, vStudentStats } from '@/db/schema';
import { requireUser } from '@/lib/auth';
import { daysUntil, getDueReviews, getItinerary, getStamps } from '@/lib/queries';
import { Itinerary } from '@/components/Itinerary';
import { startErrors, startQuick } from '@/app/(student)/actions';

export const metadata: Metadata = { title: 'Itinerario · RUMBO' };

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ vacio?: string }>;
}) {
  const profile = await requireUser();
  const { vacio } = await searchParams;
  const db = getDb();

  const [areas, stamps, due, [stats], [exam]] = await Promise.all([
    getItinerary(profile.id),
    getStamps(profile.id),
    getDueReviews(profile.id),
    db.select().from(vStudentStats).where(eq(vStudentStats.userId, profile.id)).limit(1),
    db.select({ id: examProfiles.id }).from(examProfiles).orderBy(examProfiles.ord).limit(1),
  ]);

  const left = daysUntil(profile.targetDate);
  const keyAreas = areas
    .filter((a) => a.published > 0)
    .slice(0, 2)
    .map((a) => a.short)
    .join(' · ');

  const today = new Date().toLocaleDateString('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <>
      <section style={{ marginTop: 34 }}>
        <span className="eyebrow">Check-in del día · {today}</span>
        <h1 style={{ marginTop: 12 }}>
          {left === null ? (
            <>
              Aún no fijas la fecha. <em>Ponle una y empieza a contar.</em>
            </>
          ) : left > 0 ? (
            <>
              Tu vuelo despega en <em>{left} días</em>. Vamos preparando el equipaje.
            </>
          ) : (
            <>
              <em>Es hoy.</em> Respira y confía en lo practicado.
            </>
          )}
        </h1>
      </section>

      {vacio && (
        <p className="notice bad" style={{ marginTop: 20 }}>
          Ese capítulo todavía no tiene preguntas publicadas. Prueba con otro o pídele al
          administrador que publique el balotario.
        </p>
      )}

      <div className="pass">
        <div className="pass-main">
          <div className="pf">
            <div className="l">Pasajero</div>
            <div className="v">{profile.displayName}</div>
          </div>
          <div className="route">
            <div className="pf">
              <div className="l">Desde</div>
              <div className="v">{profile.school ?? '—'}</div>
            </div>
            <div className="arrow" />
            <div className="pf" style={{ textAlign: 'right' }}>
              <div className="l">Destino</div>
              <div className="v">{profile.targetOrg ?? 'Por decidir'}</div>
            </div>
          </div>
          <div className="pass-row">
            <div className="pf">
              <div className="l">Sesiones</div>
              <div className="v sm">{Number(stats?.sessions ?? 0)}</div>
            </div>
            <div className="pf">
              <div className="l">Áreas clave</div>
              <div className="v sm">{keyAreas || '—'}</div>
            </div>
            <div className="pf">
              <div className="l">Simulacros</div>
              <div className="v sm">{Number(stats?.exams ?? 0)} rendidos</div>
            </div>
            <div className="pf">
              <div className="l">Precisión</div>
              <div className="v sm" style={{ color: '#1E7A55' }}>
                {stats?.accuracy == null ? '—' : `${Number(stats.accuracy)} %`}
              </div>
            </div>
          </div>
        </div>
        <div className="pass-stub">
          <div>
            <div className="stub-l">Racha</div>
            <div className="stub-v">{profile.streak}</div>
            <div className="stub-n">
              {profile.miles.toLocaleString('es-PE')} millas
              <br />
              Mejor racha: {profile.bestStreak} días
            </div>
          </div>
          <div className="barcode" />
        </div>
      </div>

      <section>
        <div className="shead">
          <h2>Escalas del itinerario</h2>
          <div className="rule" />
          <span className="eyebrow">Toca un área</span>
        </div>
        <Itinerary areas={areas} />
      </section>

      <section>
        <div className="shead">
          <h2>Despegue rápido</h2>
          <div className="rule" />
        </div>
        <div className="quick">
          <div className="qcard">
            <span className="eyebrow" style={{ color: 'var(--amber)' }}>
              Modo simulacro
            </span>
            <b>Examen completo</b>
            <p>
              Preguntas cronometradas con la mezcla real de la institución. Sin pistas hasta el
              final.
            </p>
            <Link className="btn solid" href={`/app/simulacro/${exam?.id ?? 'isil'}`}>
              Rendir simulacro →
            </Link>
          </div>

          <div className="qcard">
            <span className="eyebrow" style={{ color: 'var(--mint)' }}>
              Modo práctica
            </span>
            <b>Sesión relámpago</b>
            <p>
              Preguntas mixtas con corrección inmediata, clase visual y resolución paso a paso
              apenas respondes.
            </p>
            <form action={startQuick}>
              <button className="btn mint">Empezar ahora →</button>
            </form>
          </div>

          <div className="qcard">
            <span className="eyebrow" style={{ color: 'var(--coral)' }}>
              Bitácora de errores
            </span>
            <b>Repaso inteligente</b>
            <p>Lo que fallaste vuelve programado al día 1, 3, 7 y 21. Nada se queda sin cerrar.</p>
            <form action={startErrors}>
              <button className="btn" disabled={due.length === 0}>
                {due.length === 0 ? 'Nada pendiente hoy' : `Ver ${due.length} pendientes →`}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section>
        <div className="shead">
          <h2>Sellos del pasaporte</h2>
          <div className="rule" />
          <span className="eyebrow">
            {stamps.filter((b) => b.earned).length} de {stamps.length}
          </span>
        </div>
        <div className="stamps">
          {stamps.map((badge, i) => (
            <div
              key={badge.id}
              className={`stamp${badge.earned ? '' : ' locked'}`}
              title={badge.label}
              style={
                {
                  '--accent': badge.accent,
                  '--rot': `${[-7, 5, -3, 8, -5, 4][i % 6]}deg`,
                } as React.CSSProperties
              }
            >
              <b>{badge.big}</b>
              {badge.small.split('\n').map((line, k) => (
                <span key={k}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <footer>
        <span>RUMBO v0.2</span>
        <span>·</span>
        <span>Next.js + Neon + Vercel</span>
        <Link href="/app/perfil" style={{ marginLeft: 'auto' }}>
          Editar mi ficha
        </Link>
      </footer>
    </>
  );
}
