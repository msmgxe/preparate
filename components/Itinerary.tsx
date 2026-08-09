'use client';

import Link from 'next/link';
import { useState } from 'react';
import { startChapter } from '@/app/(student)/actions';
import type { AreaCard } from '@/lib/queries';

function stars(mastery: number | null): string {
  if (mastery === null) return '☆☆☆';
  const filled = mastery >= 85 ? 3 : mastery >= 65 ? 2 : mastery >= 40 ? 1 : 0;
  return '★'.repeat(filled) + '☆'.repeat(3 - filled);
}

export function Itinerary({ areas }: { areas: AreaCard[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const current = areas.find((a) => a.id === open) ?? null;

  return (
    <>
      <div className="areas">
        {areas.map((area) => (
          <button
            key={area.id}
            type="button"
            className={`area${open === area.id ? ' on' : ''}`}
            style={{ '--accent': area.accent, '--glow': area.glow } as React.CSSProperties}
            aria-expanded={open === area.id}
            onClick={() => setOpen((prev) => (prev === area.id ? null : area.id))}
          >
            <div className="sym">{area.symbol}</div>
            <h3>{area.name}</h3>
            <div className="meta">
              {area.chapters.length} capítulos · {area.published} preguntas
              {area.locked && ' · 🔒 muestra'}
            </div>
            <div className="bar" style={{ marginTop: 14 }}>
              <i style={{ width: `${area.mastery ?? 0}%`, background: area.accent }} />
            </div>
            <div className="pct">
              <span>Dominio</span>
              <span>{area.mastery === null ? 'sin datos' : `${area.mastery}%`}</span>
            </div>
          </button>
        ))}
      </div>

      {current?.locked && (
        <div
          className="notice bad"
          style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}
        >
          <span style={{ flex: 1, minWidth: 220 }}>
            <b>{current.name}</b> está en modo muestra: puedes practicar unas pocas preguntas y leer
            la primera clase. El resto se abre al activar el módulo.
          </span>
          <Link className="btn sm" href="/#planes">
            Ver planes
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
                  {chapter.published} {chapter.published === 1 ? 'pregunta' : 'preguntas'}
                  {chapter.answered > 0
                    ? ` · ${chapter.answered} resueltas · ${chapter.mastery}% de acierto`
                    : ' · sin empezar'}
                  {chapter.lesson ? ' · clase visual disponible' : ''}
                </span>
              </div>
              <div className="stars">{stars(chapter.mastery)}</div>
              {chapter.lesson &&
                (!current.locked || current.freeLessonId === chapter.lesson.id ? (
                  <Link className="btn sm" href={`/app/clase/${chapter.lesson.id}`}>
                    ◐ Clase · {chapter.lesson.minutes} min
                    {current.locked ? ' · muestra' : ''}
                  </Link>
                ) : (
                  <span className="btn sm" style={{ opacity: 0.45, cursor: 'not-allowed' }}>
                    🔒 Clase
                  </span>
                ))}
              <form action={startChapter}>
                <input type="hidden" name="chapter_id" value={chapter.id} />
                <input type="hidden" name="title" value={`${current.name} · ${chapter.title}`} />
                <button className="btn sm" disabled={chapter.published === 0}>
                  {chapter.published === 0 ? 'Sin preguntas' : 'Practicar'}
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
