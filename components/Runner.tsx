'use client';

import type { Dict } from '@/lib/i18n/dictionaries/es';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { finishAttempt, markSolutionViewed, toggleFlag } from '@/app/(student)/actions';
import { SafeHtml } from '@/components/SafeHtml';
import type { AnswerResult } from '@/app/api/answer/route';
import type { Step } from '@/db/schema';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export type RunnerItem = {
  id: string;
  ord: number;
  flagged: boolean;
  chosen_index: number | null;
  question: {
    id: string;
    stem: string;
    passage: string | null;
    options: string[];
    difficulty: number;
  };
  area: { name: string; short: string; accent: string };
  chapter: string;
  lesson: { id: string; title: string; minutes: number; hook: string } | null;
  /** Solo llega en práctica y solo para lo ya respondido. */
  solution: {
    answer_index: number;
    steps: Step[];
    concept: string | null;
    trick: string | null;
  } | null;
};

type Verdict = {
  is_correct: boolean;
  answer_index: number;
  steps: Step[];
  concept: string | null;
  trick: string | null;
  why_wrong?: string | null;
};

type Tab = 'c' | 'x' | 'r';

function mmss(total: number): string {
  const s = Math.max(0, total);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

export function Runner({
  t,
  attemptId,
  mode,
  title,
  limitSeconds,
  startedAt,
  items,
}: {
  t: Dict;
  attemptId: string;
  mode: string;
  title: string;
  limitSeconds: number;
  startedAt: string;
  items: RunnerItem[];
}) {
  const a = t.app;
  const isExam = mode === 'exam';

  const [idx, setIdx] = useState(0);
  const [tab, setTab] = useState<Tab>('x');
  const [chosen, setChosen] = useState<Record<string, number>>(() =>
    Object.fromEntries(
      items.filter((i) => i.chosen_index !== null).map((i) => [i.id, i.chosen_index as number]),
    ),
  );
  const [verdicts, setVerdicts] = useState<Record<string, Verdict>>(() =>
    Object.fromEntries(
      items
        .filter((i) => i.solution && i.chosen_index !== null)
        .map((i) => [
          i.id,
          {
            is_correct: i.chosen_index === i.solution!.answer_index,
            answer_index: i.solution!.answer_index,
            steps: i.solution!.steps,
            concept: i.solution!.concept,
            trick: i.solution!.trick,
          } satisfies Verdict,
        ]),
    ),
  );
  const [flags, setFlags] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.map((i) => [i.id, i.flagged])),
  );
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const startMs = useMemo(() => new Date(startedAt).getTime(), [startedAt]);
  const questionShownAt = useRef<number>(0);
  const finishRef = useRef<HTMLFormElement>(null);
  const autoSubmitted = useRef(false);

  const item = items[idx];
  const verdict = item ? verdicts[item.id] : undefined;
  const selected = item ? chosen[item.id] : undefined;
  const revealed = Boolean(verdict) && !isExam;

  // reloj: cuenta hacia arriba en práctica, hacia atrás en simulacro
  useEffect(() => {
    const tick = () => setElapsed(Math.floor((Date.now() - startMs) / 1000));
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [startMs]);

  const remaining = limitSeconds > 0 ? limitSeconds - elapsed : null;

  // se acabó el tiempo: entrega sola
  useEffect(() => {
    if (remaining !== null && remaining <= 0 && !autoSubmitted.current) {
      autoSubmitted.current = true;
      finishRef.current?.requestSubmit();
    }
  }, [remaining]);

  useEffect(() => {
    questionShownAt.current = Date.now();
  }, [idx]);

  const answer = useCallback(
    async (option: number) => {
      if (!item || sending) return;
      if (!isExam && chosen[item.id] !== undefined) return; // en práctica la primera cuenta

      setSending(true);
      setError(null);
      setChosen((prev) => ({ ...prev, [item.id]: option }));

      try {
        const response = await fetch('/api/answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            attempt_item_id: item.id,
            chosen_index: option,
            seconds: Math.round((Date.now() - questionShownAt.current) / 1000),
          }),
        });

        const data = (await response.json()) as AnswerResult & { error?: string };
        if (!response.ok) throw new Error(data.error ?? a.saveError);

        if (data.revealed) {
          setVerdicts((prev) => ({
            ...prev,
            [item.id]: {
              is_correct: Boolean(data.is_correct),
              answer_index: data.answer_index!,
              steps: data.steps ?? [],
              concept: data.concept ?? null,
              trick: data.trick ?? null,
              why_wrong: data.why_wrong ?? null,
            },
          }));
        }
      } catch (e) {
        setChosen((prev) => {
          const next = { ...prev };
          delete next[item.id];
          return next;
        });
        setError(e instanceof Error ? e.message : a.saveError);
      } finally {
        setSending(false);
      }
    },
    [chosen, isExam, item, sending, a.saveError],
  );

  const go = useCallback(
    (next: number) => {
      if (next < 0 || next >= items.length) return;
      setIdx(next);
      setTab('x');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [items.length],
  );

  // atajos: A–E responde, flechas navegan
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      const key = e.key.toUpperCase();
      const letter = LETTERS.indexOf(key);
      if (tab === 'x' && letter >= 0 && item && letter < item.question.options.length) {
        void answer(letter);
      }
      if (e.key === 'ArrowRight') go(idx + 1);
      if (e.key === 'ArrowLeft') go(idx - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answer, go, idx, item, tab]);

  if (!item) {
    return <p className="empty">{a.emptySession}</p>;
  }

  const isLast = idx === items.length - 1;
  const canSeeSolution = !isExam && Boolean(verdict);

  return (
    <>
      <div className="qtop">
        <div className="where">
          <span className="eyebrow">
            {isExam ? a.runnerExam : a.runnerPractice}
          </span>
          <b>{title}</b>
        </div>
        <div style={{ flex: 1 }} />
        <div className={`timer${remaining !== null && remaining < 60 ? ' warn' : ''}`}>
          {mmss(remaining ?? elapsed)}
        </div>
        <Link className="btn sm" href="/app">
          {a.exit}
        </Link>
      </div>

      <div className="dots">
        {items.map((it, i) => {
          const answered = chosen[it.id] !== undefined;
          const v = verdicts[it.id];
          let cls = 'dot-q';
          if (i === idx) cls += ' cur';
          else if (answered) cls += v ? (v.is_correct ? ' ok' : ' bad') : ' done';
          if (flags[it.id]) cls += ' flag';
          return (
            <button
              key={it.id}
              className={cls}
              onClick={() => go(i)}
              aria-label={`Pregunta ${i + 1}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="tabs">
        {item.lesson && (
          <button className={`tab${tab === 'c' ? ' on' : ''}`} onClick={() => setTab('c')}>
            {a.tabLesson} · {item.lesson.minutes} {t.common.minutes}
          </button>
        )}
        <button className={`tab${tab === 'x' ? ' on' : ''}`} onClick={() => setTab('x')}>
          {a.tabExam}
        </button>
        <button
          className={`tab${tab === 'r' ? ' on' : ''}`}
          disabled={!canSeeSolution}
          onClick={() => {
            setTab('r');
            void markSolutionViewed(item.id);
          }}
        >
          {canSeeSolution ? a.tabSolutionReady : isExam ? a.tabSolutionLater : a.tabSolution}
        </button>
      </div>

      {tab === 'c' && item.lesson && (
        <div className="panel">
          <div className="qcardbox">
            <span className="eyebrow" style={{ color: 'var(--sky)' }}>
              {a.tabLesson.replace('◐ ', '')} · {item.chapter}
            </span>
            <h3
              style={{
                fontFamily: 'var(--display)',
                fontWeight: 800,
                fontSize: 26,
                letterSpacing: '-.03em',
                marginTop: 10,
              }}
            >
              {item.lesson.title}
            </h3>
            <p style={{ color: 'var(--paper-dim)', marginTop: 12, fontSize: 17 }}>{item.lesson.hook}</p>
            <div className="qnav">
              <Link className="btn solid sm" href={`/app/clase/${item.lesson.id}`}>
                {a.openLesson.replace('◐ ', '')} →
              </Link>
              <button className="btn sm" onClick={() => setTab('x')}>
                Ir al examen →
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === 'x' && (
        <div className="panel">
          <div className="qcardbox">
            <div className="qtag">
              <span
                className="tagl"
                style={{ borderColor: item.area.accent, color: item.area.accent }}
              >
                {item.area.name}
              </span>
              <span className="tagl">{item.chapter}</span>
              <span className="tagl">
                {a.difficulty} {'●'.repeat(item.question.difficulty)}
                {'○'.repeat(3 - item.question.difficulty)}
              </span>
              <span className="tagl">
                {idx + 1} / {items.length}
              </span>
            </div>

            <div className="stem">
              {item.question.passage && (
                <SafeHtml as="span" className="lect" html={item.question.passage} />
              )}
              <SafeHtml as="span" html={item.question.stem} />
            </div>

            <div className="opts">
              {item.question.options.map((option, i) => {
                let cls = 'opt';
                if (revealed) {
                  cls += ' dis';
                  if (i === verdict!.answer_index) cls += ' right';
                  else if (selected === i) cls += ' wrong';
                } else if (selected === i) {
                  cls += ' sel';
                }
                return (
                  <button
                    key={i}
                    className={cls}
                    disabled={sending || revealed}
                    onClick={() => void answer(i)}
                  >
                    <span className="k">{LETTERS[i]}</span>
                    <SafeHtml as="span" html={option} />
                  </button>
                );
              })}
            </div>

            {error && <p className="notice bad">{error}</p>}

            {revealed && (
              <div className={`feedback ${verdict!.is_correct ? 'good' : 'bad'}`}>
                <span style={{ fontSize: 19 }}>{verdict!.is_correct ? '✓' : '✕'}</span>
                <div>
                  {verdict!.is_correct ? (
                    <>
                      <b>{a.correct}</b> {a.correctTail}
                    </>
                  ) : (
                    <>
                      <b>
                        {a.wrongWas} {LETTERS[verdict!.answer_index]}.
                      </b>{' '}
                      {verdict!.why_wrong ? `${verdict!.why_wrong} ` : ''}
                      {a.wrongTail}
                    </>
                  )}
                </div>
              </div>
            )}

            {isExam && selected !== undefined && (
              <div className="feedback good">
                <span style={{ fontSize: 19 }}>✓</span>
                <div>
                  {a.examSaved}
                </div>
              </div>
            )}
          </div>

          <div className="qnav">
            <button className="btn sm" onClick={() => go(idx - 1)} disabled={idx === 0}>
              {a.prev}
            </button>
            <button
              className="btn sm"
              onClick={() => {
                const next = !flags[item.id];
                setFlags((prev) => ({ ...prev, [item.id]: next }));
                void toggleFlag(item.id, next);
              }}
            >
              {flags[item.id] ? a.flagged : a.flag}
            </button>
            <div className="sp" />
            {!isLast && (
              <button className="btn sm" onClick={() => go(idx + 1)}>
                {a.next}
              </button>
            )}
            <form action={finishAttempt} ref={finishRef}>
              <input type="hidden" name="attempt_id" value={attemptId} />
              <button className={`btn sm${isLast ? ' solid' : ''}`}>
                {isLast ? a.finish : a.submitNow}
              </button>
            </form>
          </div>
        </div>
      )}

      {tab === 'r' && verdict && (
        <div className="panel">
          <div className="qcardbox">
            <span className="eyebrow" style={{ color: 'var(--amber)' }}>
              {a.solutionTitle}
            </span>
            <SafeHtml
              className="stem"
              html={item.question.stem}
              style={{ fontSize: 17, marginTop: 10, color: '#C4BBA9' }}
            />

            <div className="steps" style={{ marginTop: 20 }}>
              {verdict.steps.map((step, i) => (
                <div className="step" key={i} style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="n" />
                  <div className="c">
                    <b>{step.t}</b>
                    <p>{step.p}</p>
                    {step.m && <div className="math">{step.m}</div>}
                  </div>
                </div>
              ))}
            </div>

            {verdict.concept && (
              <div className="concept">
                <div className="eyebrow">{a.keyConcept}</div>
                <p>{verdict.concept}</p>
              </div>
            )}
            {verdict.trick && (
              <div className="trick">
                <div className="eyebrow">{a.examTrick}</div>
                <p>{verdict.trick}</p>
              </div>
            )}
          </div>

          <div className="qnav">
            {item.lesson && (
              <Link className="btn sm" href={`/app/clase/${item.lesson.id}`}>
                {a.openLesson}
              </Link>
            )}
            <div className="sp" />
            {!isLast ? (
              <button className="btn sm" onClick={() => go(idx + 1)}>
                {a.nextQuestion}
              </button>
            ) : (
              <form action={finishAttempt}>
                <input type="hidden" name="attempt_id" value={attemptId} />
                <button className="btn solid sm">{a.finish}</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
