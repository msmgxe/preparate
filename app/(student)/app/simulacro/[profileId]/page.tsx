import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, examProfiles } from '@/db/schema';
import { getI18n, fill } from '@/lib/i18n';
import { tr } from '@/lib/i18n/content';
import { requireUser } from '@/lib/auth';
import { startExam } from '@/app/(student)/actions';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: `${t.titles.exam} · RUMBO` };
}

export default async function SimulacroPage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;
  await requireUser();
  const { locale, t } = await getI18n();
  const a = t.app;
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
      <Link className="back" href="/app">
        {t.common.backToItinerary}
      </Link>

      <section style={{ marginTop: 8 }}>
        <span className="eyebrow">{a.examLounge}</span>
        <h1 style={{ marginTop: 10 }}>{exam.name}</h1>
        {exam.description && (
          <p style={{ marginTop: 14, color: 'var(--paper-dim)', fontSize: 18, maxWidth: '60ch' }}>
            {exam.description}
          </p>
        )}
      </section>

      <section style={{ marginTop: 26 }}>
        <div className="grid4">
          <div className="kpi">
            <div className="l">{a.examQuestions}</div>
            <div className="v">{exam.nQuestions}</div>
            <div className="d flat">{a.examInOrder}</div>
          </div>
          <div className="kpi">
            <div className="l">{a.examTime}</div>
            <div className="v">
              {Math.round(exam.seconds / 60)}
              <span style={{ fontSize: 19, color: 'var(--paper-dim)' }}> {t.common.minutes}</span>
            </div>
            <div className="d flat">
              {fill(a.examPerQuestion, { n: Math.round(exam.seconds / exam.nQuestions) })}
            </div>
          </div>
          <div className="kpi">
            <div className="l">{a.examHints}</div>
            <div className="v" style={{ fontSize: 26, color: 'var(--coral)' }}>
              {a.examNone}
            </div>
            <div className="d flat">{a.examOnSubmit}</div>
          </div>
          <div className="kpi">
            <div className="l">{a.examAfter}</div>
            <div className="v" style={{ fontSize: 26 }}>
              {a.examEverything}
            </div>
            <div className="d flat">{a.examAllSolutions}</div>
          </div>
        </div>
      </section>

      <section>
        <div className="shead">
          <h2>{a.examMix}</h2>
          <div className="rule" />
          <span className="eyebrow">{a.examMixHint}</span>
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
                    <span style={{ color: area?.accent }}>{area ? tr(area, 'name', locale) : areaId}</span>
                    <span>
                      {share} % · ≈ {Math.round((weight / totalWeight) * exam.nQuestions)}{' '}
                      {t.common.questions}
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
          <button className="btn solid">{a.examStart}</button>
        </form>
        {others
          .filter((o) => o.id !== exam.id)
          .map((o) => (
            <Link key={o.id} className="btn sm" href={`/app/simulacro/${o.id}`}>
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
