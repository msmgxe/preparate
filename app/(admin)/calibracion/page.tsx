import Link from 'next/link';
import type { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth';
import { getCalibration } from '@/lib/admin-queries';

export const metadata: Metadata = { title: 'Calibración · RUMBO' };

export default async function CalibracionPage({
  searchParams,
}: {
  searchParams: Promise<{ min?: string }>;
}) {
  await requireAdmin();
  const { min } = await searchParams;
  const minSeen = Math.max(1, Number(min ?? 10));
  const rows = await getCalibration(minSeen);

  const needFix = rows.filter((r) => r.level === 'r').length;
  const tooEasy = rows.filter((r) => r.level === 'n').length;
  const slow = rows.filter((r) => r.level === 'y').length;

  return (
    <>
      <section style={{ marginTop: 32 }}>
        <span className="eyebrow">Calidad del contenido</span>
        <h1 style={{ marginTop: 10, fontSize: 'clamp(28px,4.6vw,42px)' }}>
          Calibración del balotario
        </h1>
        <p style={{ marginTop: 14, color: '#CFC6B4', fontSize: 17, maxWidth: '62ch' }}>
          Es lo que evita que el balotario se degrade. Menos de 45 % de acierto suele ser un
          problema de redacción, no de dificultad; más de 92 % es una pregunta que ya no enseña
          nada.
        </p>
      </section>

      <section style={{ marginTop: 26 }}>
        <div className="grid4">
          <div className="kpi">
            <div className="l">Con datos</div>
            <div className="v">{rows.length}</div>
            <div className="d flat">≥ {minSeen} respuestas</div>
          </div>
          <div className="kpi">
            <div className="l">Revisar redacción</div>
            <div className="v" style={{ color: 'var(--coral)' }}>
              {needFix}
            </div>
            <div className="d flat">acierto &lt; 45 %</div>
          </div>
          <div className="kpi">
            <div className="l">Tiempo alto</div>
            <div className="v" style={{ color: 'var(--amber)' }}>
              {slow}
            </div>
            <div className="d flat">más del doble del objetivo</div>
          </div>
          <div className="kpi">
            <div className="l">Demasiado fáciles</div>
            <div className="v" style={{ color: 'var(--paper-dim)' }}>
              {tooEasy}
            </div>
            <div className="d flat">acierto &gt; 92 %</div>
          </div>
        </div>
      </section>

      <section>
        <div className="tabs">
          <Link className={`tab${minSeen === 10 ? ' on' : ''}`} href="/calibracion">
            Desde 10 respuestas
          </Link>
          <Link className={`tab${minSeen === 3 ? ' on' : ''}`} href="/calibracion?min=3">
            Desde 3
          </Link>
          <Link className={`tab${minSeen === 1 ? ' on' : ''}`} href="/calibracion?min=1">
            Todas
          </Link>
        </div>

        {rows.length === 0 ? (
          <p className="empty">
            Todavía no hay preguntas con {minSeen} o más respuestas registradas.
          </p>
        ) : (
          <div className="tblwrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Pregunta</th>
                  <th>Área</th>
                  <th>Capítulo</th>
                  <th>Veces vista</th>
                  <th>% acierto</th>
                  <th>Tiempo medio</th>
                  <th>Objetivo</th>
                  <th>Diagnóstico</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id}>
                    <td style={{ maxWidth: 300 }}>
                      <Link href={`/balotario/${c.id}`}>
                        {c.stem.replace(/<[^>]+>/g, ' ').trim().slice(0, 80)}…
                      </Link>
                    </td>
                    <td>
                      <span className="tagl">{c.areaId.toUpperCase()}</span>
                    </td>
                    <td style={{ color: 'var(--paper-dim)', fontSize: 14 }}>{c.chapter}</td>
                    <td className="mono">{c.timesSeen}</td>
                    <td>
                      <b
                        style={{
                          fontFamily: 'var(--display)',
                          fontSize: 16,
                          color:
                            c.pctCorrect < 45
                              ? 'var(--coral)'
                              : c.pctCorrect > 92
                                ? 'var(--paper-dim)'
                                : 'var(--paper)',
                        }}
                      >
                        {c.pctCorrect}%
                      </b>
                    </td>
                    <td className="mono">
                      {Math.floor(c.avgSeconds / 60)}:{String(c.avgSeconds % 60).padStart(2, '0')}
                    </td>
                    <td className="mono" style={{ color: 'var(--paper-dim)' }}>
                      {c.timeTargetS}s
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
    </>
  );
}
