'use client';

import Link from 'next/link';
import { useState } from 'react';
import { startChapter } from '@/app/(student)/actions';
import type { AreaCard } from '@/lib/queries';
import type { Dict } from '@/lib/i18n/dictionaries/es';

function stars(mastery: number | null): string {
  if (mastery === null) return '☆☆☆';
  const filled = mastery >= 85 ? 3 : mastery >= 65 ? 2 : mastery >= 40 ? 1 : 0;
  return '★'.repeat(filled) + '☆'.repeat(3 - filled);
}

export function Itinerary({ areas, t }: { areas: AreaCard[]; t: Dict }) {
  const a = t.app;
  const [open, setOpen] = useState<string | null>(null);
  const current = areas.find((a) => a.id === open) ?? null;

  /**
   * Lo comprado va arriba y aparte de lo que es solo muestra.
   *
   * Antes se mezclaban en una sola rejilla y un padre que había pagado un
   * módulo veía cinco tarjetas iguales: parecía que tenía acceso a todo. La
   * etiqueta pequeña de «muestra» no bastaba.
   */
  const mine = areas.filter((x) => !x.locked);
  const sample = areas.filter((x) => x.locked);

  const grid = (list: AreaCard[]) => (
      <div className="areas">
        {list.map((area) => (
          <button
            key={area.id}
            type="button"
            className={`area${open === area.id ? ' on' : ''}${area.locked ? ' locked' : ''}`}
            style={{ '--accent': area.accent, '--glow': area.glow } as React.CSSProperties}
            aria-expanded={open === area.id}
            onClick={() => setOpen((prev) => (prev === area.id ? null : area.id))}
          >
            <div className="sym">{area.symbol}</div>
            <h3>{area.name}</h3>
            <div className="meta">
              {area.chapters.length} {t.common.chapters} · {area.published} {t.common.questions}
              {area.locked && ` · 🔒 ${a.sample}`}
            </div>
            <div className="bar" style={{ marginTop: 14 }}>
              <i style={{ width: `${area.mastery ?? 0}%`, background: area.accent }} />
            </div>
            <div className="pct">
              <span>{a.mastery}</span>
              <span>{area.mastery === null ? t.common.noData : `${area.mastery}%`}</span>
            </div>
          </button>
        ))}
      </div>
  );

  return (
    <>
      {mine.length > 0 && (
        <>
          <div className="grouphead">
            <span className="eyebrow">{a.groupMine}</span>
          </div>
          {grid(mine)}
        </>
      )}

      {sample.length > 0 && (
        <>
          <div className="grouphead" style={{ marginTop: mine.length ? 26 : 0 }}>
            <span className="eyebrow">{a.groupSample}</span>
            <span className="grouphint">{a.groupSampleHint}</span>
          </div>
          {grid(sample)}
        </>
      )}

      {current?.locked && (
        <div
          className="notice bad"
          style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}
        >
          <span style={{ flex: 1, minWidth: 220 }}>
            <b>{current.name}</b> {a.lockedNotice}
          </span>
          <Link className="btn sm" href="/#planes">
            {t.common.seePlans}
          </Link>
        </div>
      )}

      {current && (
        <div className="chapters">
          {current.chapters.map((chapter, i) => (
            <div className="chap" key={chapter.id}>
              <div className="num">{String(i + 1).padStart(2, '0')}</div>
              <div className="t">
                <b>{chapter.title}</b>
                <span>
                  {chapter.published}{' '}
                  {chapter.published === 1 ? t.common.question : t.common.questions}
                  {chapter.answered > 0
                    ? ` · ${chapter.answered} ${a.solved} · ${chapter.mastery}% ${a.accuracyShort}`
                    : ` · ${a.notStarted}`}
                  {chapter.lesson ? ` · ${a.lessonAvailable}` : ''}
                </span>
              </div>
              <div className="stars">{stars(chapter.mastery)}</div>
              {chapter.lesson &&
                (!current.locked || current.freeLessonId === chapter.lesson.id ? (
                  <Link className="btn sm" href={`/app/clase/${chapter.lesson.id}`}>
                    {a.lessonBtn} · {chapter.lesson.minutes} {t.common.minutes}
                    {current.locked ? ` · ${a.sample}` : ''}
                  </Link>
                ) : (
                  <span className="btn sm" style={{ opacity: 0.45, cursor: 'not-allowed' }}>
                    🔒 {a.lessonBtn.replace('◐ ', '')}
                  </span>
                ))}
              <form action={startChapter}>
                <input type="hidden" name="chapter_id" value={chapter.id} />
                <input type="hidden" name="title" value={`${current.name} · ${chapter.title}`} />
                <button className="btn sm" disabled={chapter.published === 0}>
                  {chapter.published === 0 ? a.noQuestions : a.practiceBtn}
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
