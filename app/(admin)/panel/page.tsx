import Link from 'next/link';
import type { Metadata } from 'next';
import { Heatmap, TrendChart } from '@/components/admin/Charts';
import { StudentsTable } from '@/components/admin/StudentsTable';
import {
  getAreaMastery,
  getAreas,
  getCalibration,
  getContentCounters,
  getStudents,
  getWeakGroupChapters,
  getWeeklySeries,
} from '@/lib/admin-queries';

export const metadata: Metadata = { title: 'Torre de control · RUMBO' };

export default async function PanelPage() {
  const [students, areas, masteryOf, weekly, weak, calibration, content] = await Promise.all([
    getStudents(),
    getAreas(),
    getAreaMastery(),
    getWeeklySeries(),
    getWeakGroupChapters(),
    getCalibration(),
    getContentCounters(),
  ]);

  const active = students.filter((s) => (s.daysIdle ?? 99) <= 1).length;
  const withAccuracy = students.filter((s) => s.accuracy !== null);
  const avgAccuracy = withAccuracy.length
    ? Math.round(withAccuracy.reduce((a, s) => a + (s.accuracy ?? 0), 0) / withAccuracy.length)
    : null;
  const minutesWeek = students.reduce((a, s) => a + s.minutesWeek, 0);
  const exams = students.reduce((a, s) => a + s.exams, 0);
  const atRisk = students.filter((s) => s.status === 'r');

  const areaLabels = areas.map((a) => ({ id: a.id, label: a.short }));
  const now = new Date();
  const week = now.toLocaleDateString('es-PE', { day: 'numeric', month: 'long' });

  return (
    <>
      <section style={{ marginTop: 32 }}>
        <span className="eyebrow">Torre de control · semana del {week}</span>
        <h1 style={{ marginTop: 10, fontSize: 'clamp(28px,4.6vw,42px)' }}>
          {students.length === 0 ? (
            <>
              Todavía no hay alumnos. <em>Comparte el enlace de registro.</em>
            </>
          ) : atRisk.length === 0 ? (
            <>
              {students.length} {students.length === 1 ? 'alumno' : 'alumnos'} en vuelo.{' '}
              <em style={{ color: 'var(--mint)' }}>Todos en ruta.</em>
            </>
          ) : (
            <>
              {students.length} {students.length === 1 ? 'alumno' : 'alumnos'} en vuelo.{' '}
              <em>
                {atRisk.length === 1 ? 'Uno perdió' : `${atRisk.length} perdieron`} altura.
              </em>
            </>
          )}
        </h1>
      </section>

      <section style={{ marginTop: 26 }}>
        <div className="grid4">
          <div className="kpi">
            <div className="l">Alumnos activos</div>
            <div className="v">
              {active}
              <span style={{ fontSize: 19, color: 'var(--paper-dim)' }}> / {students.length}</span>
            </div>
            <div className={`d ${atRisk.length ? 'down' : 'flat'}`}>
              {atRisk.length ? `${atRisk.length} necesitan atención` : 'sin alertas'}
            </div>
          </div>
          <div className="kpi">
            <div className="l">Precisión promedio</div>
            <div className="v">{avgAccuracy === null ? '—' : `${avgAccuracy}%`}</div>
            <div className="d flat">del grupo, sobre todo lo respondido</div>
          </div>
          <div className="kpi">
            <div className="l">Minutos esta semana</div>
            <div className="v">{minutesWeek}</div>
            <div className="d flat">sumando a todo el grupo</div>
          </div>
          <div className="kpi">
            <div className="l">Simulacros rendidos</div>
            <div className="v">{exams}</div>
            <div className="d flat">desde el inicio</div>
          </div>
        </div>
      </section>

      {/* Alertas primero: el panel abre con lo que necesita acción. */}
      <section>
        <div className="shead">
          <h2>Necesitan tu atención</h2>
          <div className="rule" />
        </div>

        {students.length === 0 && (
          <div className="alert y">
            <span className="ic">◈</span>
            <div>
              <b>Sin alumnos registrados</b>
              <p>
                Cuando alguien cree su cuenta aparecerá aquí. Tú entras como admin porque tu correo
                está en <span className="mono">ADMIN_EMAILS</span>.
              </p>
            </div>
          </div>
        )}

        {students
          .filter((s) => (s.daysIdle ?? 0) >= 4)
          .map((s) => (
            <div className="alert r" key={`idle-${s.userId}`}>
              <span className="ic">⚠</span>
              <div>
                <b>
                  {s.name} no practica hace {s.daysIdle} días
                </b>
                <p>
                  Perdió la racha{s.trend !== null && s.trend < 0 ? ` y su tendencia cayó ${Math.abs(s.trend)} puntos` : ''}.
                  {s.targetOrg ? ` Postula a ${s.targetOrg}.` : ''}
                </p>
              </div>
            </div>
          ))}

        {students
          .filter((s) => (s.daysIdle ?? 99) < 4 && (s.trend ?? 0) <= -8)
          .map((s) => (
            <div className="alert r" key={`trend-${s.userId}`}>
              <span className="ic">▼</span>
              <div>
                <b>
                  {s.name} cayó {Math.abs(s.trend ?? 0)} puntos
                </b>
                <p>
                  Sigue practicando, pero acierta menos que hace un mes. Conviene revisar qué
                  capítulo cambió.
                </p>
              </div>
            </div>
          ))}

        {weak
          .filter((w) => w.pct < 45)
          .map((w) => (
            <div className="alert y" key={`weak-${w.title}`}>
              <span className="ic">◈</span>
              <div>
                <b>
                  {w.title}: {w.pct} % de acierto en todo el grupo
                </b>
                <p>
                  Es de los capítulos más débiles, con {w.n} respuestas registradas. Buen candidato
                  para una clase visual.
                </p>
              </div>
            </div>
          ))}

        {students
          .filter((s) => s.streak >= 7)
          .map((s) => (
            <div className="alert g" key={`streak-${s.userId}`}>
              <span className="ic">✓</span>
              <div>
                <b>
                  {s.name} lleva {s.streak} días de racha
                </b>
                <p>Va camino al sello de 30 días.</p>
              </div>
            </div>
          ))}
      </section>

      <section>
        <div className="shead">
          <h2>Precisión del grupo</h2>
          <div className="rule" />
          <span className="eyebrow">Últimas 8 semanas</span>
        </div>
        <div className="chartbox">
          <TrendChart
            labels={weekly.weeks.map((w) => w.label)}
            series={students.map((s) => ({
              name: s.name,
              color: s.color,
              points: weekly.pointsFor(s.userId),
            }))}
          />
        </div>
      </section>

      <section>
        <div className="shead">
          <h2>Dominio por alumno y área</h2>
          <div className="rule" />
          <span className="eyebrow">% de acierto</span>
        </div>
        <div className="chartbox">
          {students.length === 0 ? (
            <p className="empty">Sin alumnos todavía.</p>
          ) : (
            <>
              <Heatmap
                rows={students.map((s) => ({ id: s.userId, label: s.name }))}
                cols={areaLabels}
                value={masteryOf}
              />
              <div className="legend">
                <span>
                  <i style={{ background: 'rgba(255,95,87,.75)' }} />
                  &lt; 50 %
                </span>
                <span>
                  <i style={{ background: 'rgba(239,164,81,.75)' }} />
                  50 – 69 %
                </span>
                <span>
                  <i style={{ background: 'rgba(79,214,156,.55)' }} />
                  70 – 84 %
                </span>
                <span>
                  <i style={{ background: 'rgba(79,214,156,.95)' }} />≥ 85 %
                </span>
              </div>
            </>
          )}
        </div>
      </section>

      <section>
        <div className="shead">
          <h2>Alumnos</h2>
          <div className="rule" />
          <span className="eyebrow">Toca una fila para el detalle</span>
        </div>
        <StudentsTable students={students} />
      </section>

      <section>
        <div className="shead">
          <h2>Calibración del balotario</h2>
          <div className="rule" />
          <Link className="eyebrow" href="/calibracion">
            Ver todo →
          </Link>
        </div>
        {calibration.length === 0 ? (
          <p className="empty">
            Hacen falta al menos 10 respuestas por pregunta para poder calibrarla.
          </p>
        ) : (
          <div className="tblwrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Pregunta</th>
                  <th>Área</th>
                  <th>Veces vista</th>
                  <th>% acierto</th>
                  <th>Tiempo medio</th>
                  <th>Diagnóstico</th>
                </tr>
              </thead>
              <tbody>
                {calibration.slice(0, 6).map((c) => (
                  <tr key={c.id}>
                    <td style={{ maxWidth: 280 }}>
                      {c.stem.replace(/<[^>]+>/g, ' ').trim().slice(0, 64)}…
                    </td>
                    <td>
                      <span className="tagl">{c.areaId.toUpperCase()}</span>
                    </td>
                    <td className="mono">{c.timesSeen}</td>
                    <td>
                      <b style={{ fontFamily: 'var(--display)', fontSize: 16 }}>{c.pctCorrect}%</b>
                    </td>
                    <td className="mono">
                      {Math.floor(c.avgSeconds / 60)}:{String(c.avgSeconds % 60).padStart(2, '0')}
                    </td>
                    <td>
                      <span className={`pill ${c.level}`}>{c.diagnosis}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <div className="shead">
          <h2>Contenido</h2>
          <div className="rule" />
        </div>
        <div className="grid4">
          <div className="kpi">
            <div className="l">Publicadas</div>
            <div className="v">{content.published}</div>
            <div className="d flat">de 400 objetivo</div>
            <div className="bar" style={{ marginTop: 12 }}>
              <i
                style={{
                  width: `${Math.min(100, (content.published / 400) * 100)}%`,
                  background: 'var(--mint)',
                }}
              />
            </div>
          </div>
          <div className="kpi">
            <div className="l">En revisión</div>
            <div className="v" style={{ color: 'var(--amber)' }}>
              {content.draft + content.reviewed}
            </div>
            <div className="d flat">esperan tu visto bueno</div>
            <Link className="btn sm" style={{ marginTop: 12 }} href="/balotario?estado=draft">
              Revisar ahora
            </Link>
          </div>
          <div className="kpi">
            <div className="l">Clases visuales</div>
            <div className="v">{content.lessonsPublished}</div>
            <div className="d flat">de {content.chapters} capítulos</div>
            <div className="bar" style={{ marginTop: 12 }}>
              <i
                style={{
                  width: `${content.chapters ? Math.min(100, (content.lessonsPublished / content.chapters) * 100) : 0}%`,
                  background: 'var(--sky)',
                }}
              />
            </div>
          </div>
          <div className="kpi">
            <div className="l">Videos vinculados</div>
            <div className="v">{content.videos}</div>
            <div className="d flat">uno por clase, después del checkpoint</div>
            <Link className="btn sm" style={{ marginTop: 12 }} href="/clases">
              Gestionar
            </Link>
          </div>
        </div>
      </section>

      <footer>
        <span>RUMBO v0.2</span>
        <span>·</span>
        <span>Vista de administrador</span>
      </footer>
    </>
  );
}
