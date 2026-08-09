import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, attemptItems, attempts, chapters, questions } from '@/db/schema';
import { requireUser } from '@/lib/auth';
import { SafeHtml } from '@/components/SafeHtml';
import { retryWrong } from '../../actions';

export const metadata: Metadata = { title: 'Resultados · RUMBO' };

const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const R = 78;
const CIRC = 2 * Math.PI * R;

export default async function ResultadosPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const { attemptId } = await params;
  const profile = await requireUser();
  const db = getDb();

  const [attempt] = await db.select().from(attempts).where(eq(attempts.id, attemptId)).limit(1);

  if (!attempt || attempt.userId !== profile.id) redirect('/');
  if (!attempt.finishedAt) redirect(`/sesion/${attemptId}`);

  // La sesión está cerrada: aquí sí se revela todo.
  const rows = await db
    .select({
      itemId: attemptItems.id,
      ord: attemptItems.ord,
      chosenIndex: attemptItems.chosenIndex,
      isCorrect: attemptItems.isCorrect,
      seconds: attemptItems.seconds,
      questionId: questions.id,
      stem: questions.stem,
      passage: questions.passage,
      options: questions.options,
      answerIndex: questions.answerIndex,
      steps: questions.steps,
      concept: questions.concept,
      trick: questions.trick,
      lessonId: questions.lessonId,
      areaId: areas.id,
      areaName: areas.name,
      areaShort: areas.short,
      areaAccent: areas.accent,
    })
    .from(attemptItems)
    .innerJoin(questions, eq(questions.id, attemptItems.questionId))
    .innerJoin(chapters, eq(chapters.id, questions.chapterId))
    .innerJoin(areas, eq(areas.id, chapters.areaId))
    .where(eq(attemptItems.attemptId, attemptId))
    .orderBy(attemptItems.ord);

  const total = rows.length;
  const correct = rows.filter((r) => r.isCorrect).length;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const wrong = rows.filter((r) => r.isCorrect === false).length;
  const ringColor = pct >= 80 ? 'var(--mint)' : pct >= 60 ? 'var(--amber)' : 'var(--coral)';

  const byArea = new Map<
    string,
    { total: number; ok: number; name: string; accent: string }
  >();
  for (const row of rows) {
    const bucket =
      byArea.get(row.areaId) ?? { total: 0, ok: 0, name: row.areaName, accent: row.areaAccent };
    bucket.total += 1;
    if (row.isCorrect) bucket.ok += 1;
    byArea.set(row.areaId, bucket);
  }

  const elapsed = Math.round(
    (attempt.finishedAt.getTime() - attempt.startedAt.getTime()) / 1000,
  );

  return (
    <>
      <section style={{ marginTop: 26 }}>
        <span className="eyebrow">
          Sesión completada · {attempt.title} · {Math.floor(elapsed / 60)} min
        </span>
        <h1 style={{ marginTop: 10, fontSize: 'clamp(28px,4.8vw,44px)' }}>
          {pct >= 80 ? (
            <>
              Aterrizaje perfecto. <em style={{ color: 'var(--mint)' }}>Sigue así.</em>
            </>
          ) : pct >= 60 ? (
            <>
              Buen vuelo, con turbulencia.{' '}
              <em style={{ color: 'var(--amber)' }}>Revisa los fallos.</em>
            </>
          ) : (
            <>
              Toca reprogramar. <em style={{ color: 'var(--coral)' }}>Nada grave.</em>
            </>
          )}
        </h1>
      </section>

      <div className="score">
        <div className="ring">
          <svg width="180" height="180">
            <circle cx="90" cy="90" r={R} fill="none" stroke="rgba(247,241,229,.1)" strokeWidth="11" />
            <circle
              cx="90"
              cy="90"
              r={R}
              fill="none"
              stroke={ringColor}
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC - (CIRC * pct) / 100}
            />
          </svg>
          <div className="val">
            <b>{pct}%</b>
            <span>
              {correct} / {total} correctas
            </span>
          </div>
        </div>

        <div className="brk">
          {[...byArea.entries()].map(([areaId, bucket]) => {
            const areaPct = Math.round((bucket.ok / bucket.total) * 100);
            return (
              <div className="brkrow" key={areaId}>
                <div className="top">
                  <span style={{ color: bucket.accent }}>{bucket.name}</span>
                  <span>
                    {bucket.ok}/{bucket.total} · {areaPct}%
                  </span>
                </div>
                <div className="bar">
                  <i style={{ width: `${areaPct}%`, background: bucket.accent }} />
                </div>
              </div>
            );
          })}
          <div className="mono" style={{ fontSize: 12, color: 'var(--paper-dim)', marginTop: 4 }}>
            + {correct * 40} millas · racha de {profile.streak}{' '}
            {profile.streak === 1 ? 'día' : 'días'}
          </div>
        </div>
      </div>

      <section>
        <div className="shead">
          <h2>Detalle pregunta por pregunta</h2>
          <div className="rule" />
          <span className="eyebrow">Abre cada una para ver la resolución</span>
        </div>

        <div className="review-list">
          {rows.map((row, i) => {
            const ok = Boolean(row.isCorrect);
            return (
              <details key={row.itemId} className="qcardbox" style={{ padding: 0 }}>
                <summary className="rl" style={{ cursor: 'pointer', listStyle: 'none' }}>
                  <span className={`st ${ok ? 'ok' : 'bad'}`}>{ok ? '✓' : '✕'}</span>
                  <span className="tx">
                    {i + 1}. {row.stem.replace(/<[^>]+>/g, ' ').trim().slice(0, 78)}…
                  </span>
                  <span className="ar">{row.areaShort}</span>
                </summary>

                <div style={{ padding: '4px 20px 22px' }}>
                  {row.passage && <SafeHtml className="lect" html={row.passage} />}
                  <SafeHtml className="stem" html={row.stem} style={{ fontSize: 17 }} />

                  <div className="opts">
                    {row.options.map((option, k) => {
                      let cls = 'opt dis';
                      if (k === row.answerIndex) cls += ' right';
                      else if (row.chosenIndex === k) cls += ' wrong';
                      return (
                        <div className={cls} key={k}>
                          <span className="k">{LETTERS[k]}</span>
                          <SafeHtml as="span" html={option} />
                        </div>
                      );
                    })}
                  </div>

                  {row.chosenIndex === null && (
                    <p className="notice bad" style={{ marginTop: 14 }}>
                      No la respondiste. En el examen real eso cuesta lo mismo que fallarla.
                    </p>
                  )}

                  <div className="steps" style={{ marginTop: 20 }}>
                    {(row.steps ?? []).map((step, k) => (
                      <div className="step" key={k}>
                        <div className="n" />
                        <div className="c">
                          <b>{step.t}</b>
                          <p>{step.p}</p>
                          {step.m && <div className="math">{step.m}</div>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {row.concept && (
                    <div className="concept">
                      <div className="eyebrow">Concepto clave</div>
                      <p>{row.concept}</p>
                    </div>
                  )}
                  {row.trick && (
                    <div className="trick">
                      <div className="eyebrow">Truco de examen</div>
                      <p>{row.trick}</p>
                    </div>
                  )}
                  {row.lessonId && (
                    <div className="qnav">
                      <Link className="btn sm" href={`/clase/${row.lessonId}`}>
                        ◐ Ver la clase visual
                      </Link>
                    </div>
                  )}
                </div>
              </details>
            );
          })}
        </div>
      </section>

      <div className="qnav" style={{ marginTop: 30 }}>
        <Link className="btn solid" href="/">
          Volver al itinerario
        </Link>
        {wrong > 0 && (
          <form action={retryWrong}>
            <input type="hidden" name="attempt_id" value={attemptId} />
            <button className="btn">
              Repasar los {wrong} {wrong === 1 ? 'error' : 'errores'}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
