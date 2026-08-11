import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, attemptItems, attempts, chapters, questions } from '@/db/schema';
import { getI18n, fill } from '@/lib/i18n';
import { tr } from '@/lib/i18n/content';
import { requireUser } from '@/lib/auth';
import { SafeHtml } from '@/components/SafeHtml';
import { retryWrong } from '@/app/(student)/actions';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: `${t.titles.results} · RUMBO` };
}

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
  const { locale, t } = await getI18n();
  const a = t.app;
  const db = getDb();

  const [attempt] = await db.select().from(attempts).where(eq(attempts.id, attemptId)).limit(1);

  if (!attempt || attempt.userId !== profile.id) redirect('/app');
  if (!attempt.finishedAt) redirect(`/app/sesion/${attemptId}`);

  // La sesión está cerrada: aquí sí se revela todo.
  const rawRows = await db
    .select({
      itemId: attemptItems.id,
      ord: attemptItems.ord,
      chosenIndex: attemptItems.chosenIndex,
      isCorrect: attemptItems.isCorrect,
      seconds: attemptItems.seconds,
      viewedSolution: attemptItems.viewedSolution,
      questionId: questions.id,
      stem: questions.stem,
      passage: questions.passage,
      options: questions.options,
      answerIndex: questions.answerIndex,
      steps: questions.steps,
      concept: questions.concept,
      trick: questions.trick,
      lessonId: questions.lessonId,
      chapterId: chapters.id,
      chapterTitle: chapters.title,
      chapterI18n: chapters.i18n,
      areaId: areas.id,
      areaName: areas.name,
      areaShort: areas.short,
      areaAccent: areas.accent,
      i18n: questions.i18n,
      areaI18n: areas.i18n,
    })
    .from(attemptItems)
    .innerJoin(questions, eq(questions.id, attemptItems.questionId))
    .innerJoin(chapters, eq(chapters.id, questions.chapterId))
    .innerJoin(areas, eq(areas.id, chapters.areaId))
    .where(eq(attemptItems.attemptId, attemptId))
    .orderBy(attemptItems.ord);

  // el idioma se resuelve una vez por fila y ya nadie vuelve a mirar `i18n`
  const rows = rawRows.map((r) => ({
    ...r,
    stem: tr(r, 'stem', locale),
    passage: tr(r, 'passage', locale),
    options: tr(r, 'options', locale),
    steps: tr(r, 'steps', locale),
    concept: tr(r, 'concept', locale),
    trick: tr(r, 'trick', locale),
    chapterTitle: tr({ i18n: r.chapterI18n, title: r.chapterTitle }, 'title', locale),
    areaName: tr({ i18n: r.areaI18n, name: r.areaName }, 'name', locale),
    areaShort: tr({ i18n: r.areaI18n, short: r.areaShort }, 'short', locale),
  }));

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

  /**
   * El diagnóstico se lee por capítulo, no por área.
   *
   * Un porcentaje por área no sirve para decidir por dónde empezar: dice que
   * Verbal va al 60 % pero no cuál de los siete capítulos lo hundió. Como el
   * diagnóstico toma dos preguntas de cada capítulo justamente para eso, aquí
   * se rehace la cuenta al nivel donde el alumno puede actuar.
   */
  const isDiagnostic = attempt.mode === 'diagnostic';
  const byChapter = new Map<string, { total: number; ok: number; title: string; area: string; accent: string }>();
  if (isDiagnostic) {
    for (const row of rows) {
      if (!row.chapterId) continue;
      const b = byChapter.get(row.chapterId) ?? {
        total: 0,
        ok: 0,
        title: row.chapterTitle ?? '',
        area: row.areaShort,
        accent: row.areaAccent,
      };
      b.total += 1;
      if (row.isCorrect) b.ok += 1;
      byChapter.set(row.chapterId, b);
    }
  }
  const ranked = [...byChapter.entries()]
    .map(([id, b]) => ({ id, ...b, pct: Math.round((b.ok / b.total) * 100) }))
    .sort((x, y) => x.pct - y.pct || x.title.localeCompare(y.title));

  const elapsed = Math.round(
    (attempt.finishedAt.getTime() - attempt.startedAt.getTime()) / 1000,
  );

  return (
    <>
      <section style={{ marginTop: 26 }}>
        <span className="eyebrow">
          {a.resultsDone} · {attempt.title} · {Math.floor(elapsed / 60)} {t.common.minutes}
        </span>
        <h1 style={{ marginTop: 10, fontSize: 'clamp(28px,4.8vw,44px)' }}>
          {pct >= 80 ? (
            <>
              {a.resultsPerfect} <em style={{ color: 'var(--mint)' }}>{a.resultsPerfectEm}</em>
            </>
          ) : pct >= 60 ? (
            <>
              {a.resultsMid}{' '}
              <em style={{ color: 'var(--amber)' }}>{a.resultsMidEm}</em>
            </>
          ) : (
            <>
              {a.resultsLow} <em style={{ color: 'var(--coral)' }}>{a.resultsLowEm}</em>
            </>
          )}
        </h1>
      </section>

      <div className="score">
        <div className="ring">
          <svg width="180" height="180">
            <circle cx="90" cy="90" r={R} fill="none" stroke="rgba(var(--fg-rgb),.1)" strokeWidth="11" />
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
            {fill(a.resultsMiles, { n: correct * 40, streak: profile.streak })}
          </div>
        </div>
      </div>

      {isDiagnostic && ranked.length > 0 && (
        <section className="diagrank">
          <span className="eyebrow" style={{ color: 'var(--sky)' }}>
            {t.diag.eyebrow}
          </span>
          <h2 style={{ marginTop: 8 }}>{t.diag.resultTitle}</h2>
          <p style={{ color: 'var(--paper-dim)', marginTop: 8, maxWidth: '62ch' }}>
            {ranked.length < 3 ? t.diag.resultNone : t.diag.resultLead}
          </p>

          <ol className="diaglist">
            {ranked.map((c, i) => (
              <li key={c.id} className={i < 3 ? 'weak' : ''}>
                <span className="diaglist-pos">{i + 1}</span>
                <span className="diaglist-name">
                  <b>{c.title}</b>
                  <span className="ar">{c.area}</span>
                </span>
                <span className="diaglist-bar">
                  <i style={{ width: `${c.pct}%`, background: c.accent }} />
                </span>
                <span className="diaglist-pct">{c.pct}%</span>
                <Link className="diaglist-go" href={`/app/practica/${c.id}`}>
                  {t.diag.goChapter} →
                </Link>
              </li>
            ))}
          </ol>

          <p className="mono" style={{ fontSize: 12.5, color: 'var(--paper-dim)', marginTop: 16 }}>
            {t.diag.resultWeak} · {t.diag.redoHint}
          </p>
        </section>
      )}

      <section>
        <div className="shead">
          <h2>{a.resultsDetail}</h2>
          <div className="rule" />
          <span className="eyebrow">{a.resultsDetailHint}</span>
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
                      {row.viewedSolution ? a.resultsAsked : a.resultsUnanswered}
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
                      <div className="eyebrow">{a.keyConcept}</div>
                      <p>{row.concept}</p>
                    </div>
                  )}
                  {row.trick && (
                    <div className="trick">
                      <div className="eyebrow">{a.examTrick}</div>
                      <p>{row.trick}</p>
                    </div>
                  )}
                  {row.lessonId && (
                    <div className="qnav">
                      <Link className="btn sm" href={`/app/clase/${row.lessonId}`}>
                        {a.seeLesson}
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
        <Link className="btn solid" href="/app">
          {a.resultsBack}
        </Link>
        {wrong > 0 && (
          <form action={retryWrong}>
            <input type="hidden" name="attempt_id" value={attemptId} />
            <button className="btn">
              {wrong === 1 ? a.resultsRetryOne : fill(a.resultsRetry, { n: wrong })}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
