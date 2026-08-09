import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, lessons, plans, vAreaMastery } from '@/db/schema';
import { requireAdmin, initials } from '@/lib/auth';
import { AreaCurve } from '@/components/admin/Charts';
import {
  getSessionsFor,
  getStudents,
  getWeakChaptersFor,
  getWeeklySeries,
} from '@/lib/admin-queries';
import { getEntitlementsFor } from '@/lib/entitlements';
import { Accesses } from './Accesses';

export const metadata: Metadata = { title: 'Ficha del alumno · RUMBO' };

const MODE_LABEL: Record<string, { label: string; pill: string }> = {
  practice: { label: 'Práctica', pill: 'n' },
  chapter: { label: 'Capítulo', pill: 'n' },
  exam: { label: 'Simulacro', pill: 'y' },
  errors: { label: 'Bitácora', pill: 'n' },
  lesson: { label: 'Tras la clase', pill: 'n' },
};

export default async function AlumnoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireAdmin();
  const db = getDb();

  const students = await getStudents();
  const student = students.find((s) => s.userId === id);
  if (!student) notFound();

  const [weekly, mastery, allAreas, weak, sessions, accesses, allPlans] = await Promise.all([
    getWeeklySeries(),
    db.select().from(vAreaMastery).where(eq(vAreaMastery.userId, id)),
    db.select().from(areas).orderBy(areas.ord),
    getWeakChaptersFor(id),
    getSessionsFor(id),
    getEntitlementsFor(id),
    db.select({ id: plans.id, name: plans.name }).from(plans).orderBy(plans.ord),
  ]);

  const points = weekly.pointsFor(id);
  const known = points.filter((p): p is number => p !== null);
  const masteryById = new Map(mastery.map((m) => [m.areaId!, Number(m.pct)]));

  // sugerencia automática de intervención
  const weakest = weak[0];
  const [suggestedLesson] = weakest?.chapterId
    ? await db
        .select({ id: lessons.id, title: lessons.title })
        .from(lessons)
        .where(eq(lessons.chapterId, weakest.chapterId))
        .limit(1)
    : [];

  return (
    <>
      <Link className="back" href="/panel">
        ← Volver a la torre de control
      </Link>

      <section style={{ marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div
            style={{
              width: 54,
              height: 54,
              fontSize: 20,
              background: student.color,
              borderRadius: '50%',
              display: 'grid',
              placeContent: 'center',
              fontFamily: 'var(--display)',
              fontWeight: 800,
              color: 'var(--ink)',
            }}
          >
            {initials(student.name)}
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(26px,4vw,38px)', margin: 0 }}>{student.name}</h1>
            <span className="eyebrow">
              {student.email ?? 'sin correo'} · objetivo {student.targetOrg ?? '—'} ·{' '}
              {student.sessions} sesiones
            </span>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 26 }}>
        <div className="grid4">
          <div className="kpi">
            <div className="l">Precisión global</div>
            <div className="v" style={{ color: student.color }}>
              {student.accuracy === null ? '—' : `${student.accuracy}%`}
            </div>
            <div className={`d ${(student.trend ?? 0) >= 0 ? 'up' : 'down'}`}>
              {student.trend === null
                ? 'sin histórico suficiente'
                : `${student.trend > 0 ? '▲ +' : '▼ '}${Math.abs(student.trend)} pts vs. hace 4 sem.`}
            </div>
          </div>
          <div className="kpi">
            <div className="l">Racha</div>
            <div className="v">
              {student.streak}
              <span style={{ fontSize: 18, color: 'var(--paper-dim)' }}> días</span>
            </div>
            <div className="d flat">
              {student.daysIdle === null
                ? 'nunca practicó'
                : student.daysIdle === 0
                  ? 'activo hoy'
                  : `hace ${student.daysIdle} días`}
            </div>
          </div>
          <div className="kpi">
            <div className="l">Minutos / semana</div>
            <div className="v">{student.minutesWeek}</div>
            <div className="d flat">meta: 180</div>
          </div>
          <div className="kpi">
            <div className="l">Estado</div>
            <div
              className="v"
              style={{
                fontSize: 26,
                color:
                  student.status === 'g'
                    ? 'var(--mint)'
                    : student.status === 'y'
                      ? 'var(--amber)'
                      : 'var(--coral)',
              }}
            >
              {student.status === 'g' ? 'En ruta' : student.status === 'y' ? 'Atención' : 'Riesgo'}
            </div>
            <div className="d flat">según ritmo y tendencia</div>
          </div>
        </div>
      </section>

      <section>
        <div className="shead">
          <h2>Evolución de la precisión</h2>
          <div className="rule" />
          <span className="eyebrow">8 semanas</span>
        </div>
        <div className="chartbox">
          <AreaCurve
            points={points}
            color={student.color}
            labels={weekly.weeks.map((w) => w.label)}
          />
        </div>
      </section>

      <section>
        <div className="shead">
          <h2>Dominio por área</h2>
          <div className="rule" />
        </div>
        <div className="chartbox">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            {allAreas.map((area) => {
              const pct = masteryById.get(area.id);
              return (
                <div key={area.id}>
                  <div
                    className="mono"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 12,
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ color: area.accent }}>{area.name}</span>
                    <span>{pct === undefined ? 'sin datos' : `${pct} %`}</span>
                  </div>
                  <div className="bar" style={{ height: 9 }}>
                    <i style={{ width: `${pct ?? 0}%`, background: area.accent }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="shead">
          <h2>Capítulos que necesitan trabajo</h2>
          <div className="rule" />
        </div>
        {weak.length === 0 ? (
          <p className="empty">Todavía no hay respuestas suficientes para detectar huecos.</p>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
              {weak.map((w) => (
                <span
                  className="tagl"
                  key={w.chapterId}
                  style={{
                    borderColor: 'var(--coral)',
                    color: 'var(--coral)',
                    fontSize: 11.5,
                    padding: '7px 14px',
                  }}
                >
                  {w.title} · {Number(w.pct)}%
                </span>
              ))}
            </div>
            <p style={{ marginTop: 14, color: '#C3BAA8', fontSize: 16 }}>
              Sugerencia automática:{' '}
              {suggestedLesson ? (
                <>
                  asignar la clase visual{' '}
                  <Link href={`/clases/${suggestedLesson.id}`}>
                    <b>{suggestedLesson.title}</b>
                  </Link>{' '}
                  seguida de una sesión de 10 preguntas de <b>{weakest?.title}</b>.
                </>
              ) : (
                <>
                  crear una clase visual para <b>{weakest?.title}</b> y luego asignar 10 preguntas
                  del capítulo.
                </>
              )}
            </p>
          </>
        )}
      </section>

      <section>
        <div className="shead">
          <h2>Módulos y accesos</h2>
          <div className="rule" />
          <span className="eyebrow">cobro manual</span>
        </div>
        <Accesses
          userId={id}
          areas={allAreas.map((a) => ({ id: a.id, name: a.name, accent: a.accent }))}
          plans={allPlans}
          rows={accesses}
        />
      </section>

      <section>
        <div className="shead">
          <h2>Últimas sesiones</h2>
          <div className="rule" />
        </div>
        {sessions.length === 0 ? (
          <p className="empty">Sin sesiones registradas.</p>
        ) : (
          <div className="tblwrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Sesión</th>
                  <th>Acierto</th>
                  <th>Duración</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => {
                  const mode = MODE_LABEL[s.mode] ?? { label: s.mode, pill: 'n' };
                  const mins = s.finishedAt
                    ? Math.round((s.finishedAt.getTime() - s.startedAt.getTime()) / 60000)
                    : null;
                  return (
                    <tr key={s.id}>
                      <td className="mono">
                        {s.startedAt.toLocaleDateString('es-PE', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </td>
                      <td>
                        <span className={`pill ${mode.pill}`}>{mode.label}</span>
                      </td>
                      <td>{s.title}</td>
                      <td>
                        <b>{s.scorePct === null ? 'en curso' : `${s.scorePct} %`}</b>
                      </td>
                      <td className="mono">{mins === null ? '—' : `${mins} min`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer>
        <span>Vista de administrador</span>
        <span>·</span>
        <span>{known.length} semanas con actividad</span>
      </footer>
    </>
  );
}
