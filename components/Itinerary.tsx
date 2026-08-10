'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { AreaCard } from '@/lib/queries';
import { ChapterRow } from '@/components/student/ChapterCard';
import { Shuffle, ListOrdered } from 'lucide-react';
import type { Dict } from '@/lib/i18n/dictionaries/es';

export function Itinerary({ areas, t }: { areas: AreaCard[]; t: Dict }) {
  const a = t.app;
  /**
   * Se abre solo el primer módulo comprado.
   *
   * Antes había que pulsar para ver de qué iba un curso, y quien entraba por
   * primera vez encontraba cinco tarjetas mudas. Abriendo uno, la explicación
   * del curso y sus capítulos están a la vista desde el primer segundo.
   */
  const [open, setOpen] = useState<string | null>(
    () => (areas.find((x) => !x.locked) ?? areas[0])?.id ?? null,
  );
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
        <>
          {/* ── qué es este curso ─────────────────────────────────── */}
          <div className="areahead" style={{ '--accent': current.accent } as React.CSSProperties}>
            <div className="areahead-top">
              <span className="areahead-sym">{current.symbol}</span>
              <div>
                <h3>{current.name}</h3>
                <span className="areahead-counts">
                  {current.chapters.length} {t.common.chapters} · {current.published} {t.common.questions}
                  {current.lessons > 0 ? ` · ${current.lessons} ${t.common.lessons}` : ''}
                </span>
              </div>
            </div>

            {current.blurb && <p className="areahead-blurb">{current.blurb}</p>}

            <p className="areahead-order">
              {current.sequential ? <ListOrdered size={15} /> : <Shuffle size={15} />}
              <span>{current.sequential ? a.orderSequential : a.orderFree}</span>
            </p>
          </div>

          <div className="chapters2">
            {current.chapters.map((chapter, i) => (
              <ChapterRow
                key={chapter.id}
                chapter={chapter}
                index={i}
                accent={current.accent}
                areaName={current.name}
                areaLocked={current.locked}
                freeLessonId={current.freeLessonId}
                t={t}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
