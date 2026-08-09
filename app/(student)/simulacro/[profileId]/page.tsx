import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, examProfiles } from '@/db/schema';
import { requireUser } from '@/lib/auth';
import { startExam } from '../../actions';

export const metadata: Metadata = { title: 'Simulacro · RUMBO' };

export default async function SimulacroPage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;
  await requireUser();
  const db = getDb();

  const [[exam], allAreas, others] = await Promise.all([
    db.select().from(examProfiles).where(eq(examProfiles.id, profileId)).limit(1),
    db.select().from(areas).orderBy(areas.ord),
    db.select({ id: examProfiles.id, name: examProfiles.name }).from(examProfiles).orderBy(examProfiles.ord),
  ]);

  if (!exam) notFound();

  const areaById = new Map(allAreas.map((a) => [a.id, a]));
  const mix = Object.entries(exam.mix ?? {});
  const totalWeight = mix.reduce((a, [, w]) => a + w, 0) || 100;

  return (
    <>
      <Link className="back" href="/">
        ← Volver al itinerario
      </Link>

      <section style={{ marginTop: 8 }}>
        <span className="eyebrow">Sala de embarque</span>
        <h1 style={{ marginTop: 10 }}>{exam.name}</h1>
        {exam.description && (
          <p style={{ marginTop: 14, color: '#CFC6B4', fontSize: 18, maxWidth: '60ch' }}>
            {exam.description}
          </p>
        )}
      </section>

      <section style={{ marginTop: 26 }}>
        <div className="grid4">
          <div className="kpi">
            <div className="l">Preguntas</div>
            <div className="v">{exam.nQuestions}</div>
            <div className="d flat">en el orden del examen</div>
          </div>
          <div className="kpi">
            <div className="l">Tiempo</div>
            <div className="v">
              {Math.round(exam.seconds / 60)}
              <span style={{ fontSize: 19, color: 'var(--paper-dim)' }}> min</span>
            </div>
            <div className="d flat">
              ≈ {Math.round(exam.seconds / exam.nQuestions)} s por pregunta
            </div>
          </div>
          <div className="kpi">
            <div className="l">Pistas</div>
            <div className="v" style={{ fontSize: 26, color: 'var(--coral)' }}>
              Ninguna
            </div>
            <div className="d flat">la corrección llega al entregar</div>
          </div>
          <div className="kpi">
            <div className="l">Al terminar</div>
            <div className="v" style={{ fontSize: 26 }}>
              Todo
            </div>
            <div className="d flat">resolución de cada pregunta</div>
          </div>
        </div>
      </section>

      <section>
        <div className="shead">
          <h2>Mezcla del examen</h2>
          <div className="rule" />
          <span className="eyebrow">tal como lo toma la institución</span>
        </div>
        <div className="chartbox">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            {mix.map(([areaId, weight]) => {
              const area = areaById.get(areaId);
              const share = Math.round((weight / totalWeight) * 100);
              return (
                <div key={areaId}>
                  <div
                    className="mono"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 12,
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ color: area?.accent }}>{area?.name ?? areaId}</span>
                    <span>
                      {share} % · ≈ {Math.round((weight / totalWeight) * exam.nQuestions)} preguntas
                    </span>
                  </div>
                  <div className="bar" style={{ height: 9 }}>
                    <i style={{ width: `${share}%`, background: area?.accent }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="qnav" style={{ marginTop: 34 }}>
        <form action={startExam}>
          <input type="hidden" name="profile_id" value={exam.id} />
          <button className="btn solid">Rendir simulacro →</button>
        </form>
        {others
          .filter((o) => o.id !== exam.id)
          .map((o) => (
            <Link key={o.id} className="btn sm" href={`/simulacro/${o.id}`}>
              {o.name}
            </Link>
          ))}
      </div>

      <p className="hint" style={{ marginTop: 20, textAlign: 'left' }}>
        El reloj corre desde que empiezas y entrega solo al llegar a cero. Si sales a medio camino,
        la sesión queda abierta y puedes retomarla.
      </p>
    </>
  );
}
