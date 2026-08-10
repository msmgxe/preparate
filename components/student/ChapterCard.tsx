'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BookOpen, ChevronDown, Lock, Target } from 'lucide-react';
import { startChapter } from '@/app/(student)/actions';
import type { ChapterCard as Chapter } from '@/lib/queries';
import type { Dict } from '@/lib/i18n/dictionaries/es';

/**
 * Un capítulo del itinerario.
 *
 * Antes era una fila con un botón. El problema es que el alumno tenía que
 * entrar para saber de qué iba, y una vez dentro ya no era fácil comparar con
 * los demás. Ahora la fila se abre y cuenta tres cosas sin salir de la página:
 * qué se practica ahí, cómo va, y cuál es el recorrido — clase primero,
 * práctica después.
 *
 * Ese recorrido se dibuja como dos escalas de la misma ruta, con la misma
 * metáfora que la guía de a bordo. No es decoración: la mitad de los alumnos
 * entra a practicar sin leer la clase, y verlo dibujado lo corrige mejor que
 * un aviso escrito.
 */
export function ChapterRow({
  chapter,
  index,
  accent,
  areaName,
  areaLocked,
  freeLessonId,
  t,
}: {
  chapter: Chapter;
  index: number;
  accent: string;
  areaName: string;
  areaLocked: boolean;
  freeLessonId: string | null;
  t: Dict;
}) {
  const a = t.app;
  const [open, setOpen] = useState(false);

  const canRead = !areaLocked || freeLessonId === chapter.lesson?.id;
  const empty = chapter.published === 0;
  const done = chapter.answered > 0;
  const stars = chapter.mastery === null ? 0 : chapter.mastery >= 85 ? 3 : chapter.mastery >= 65 ? 2 : chapter.mastery >= 40 ? 1 : 0;

  return (
    <div className={`chap2${chapter.waiting ? ' waiting' : ''}`} style={{ '--accent': accent } as React.CSSProperties}>
      <button className="chap2-head" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="chap2-num">{String(index + 1).padStart(2, '0')}</span>

        <span className="chap2-title">
          <b>{chapter.title}</b>
          <span className="chap2-meta">
            {chapter.published} {chapter.published === 1 ? t.common.question : t.common.questions}
            {chapter.lesson ? ` · ${a.lessonAvailable}` : ''}
            {done ? ` · ${chapter.answered} ${a.solved}` : ` · ${a.notStarted}`}
          </span>
        </span>

        {chapter.waiting && <Lock size={15} className="chap2-lock" />}
        <span className="chap2-stars" aria-hidden>
          {'★'.repeat(stars)}
          {'☆'.repeat(3 - stars)}
        </span>
        <ChevronDown size={17} className="chap2-caret" style={{ transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>

      {open && (
        <div className="chap2-body">
          {chapter.blurb && <p className="chap2-blurb">{chapter.blurb}</p>}

          {chapter.waiting ? (
            <p className="chap2-wait">{a.chapterWaiting}</p>
          ) : (
            /* ── el recorrido: clase y después práctica ─────────────── */
            <div className="route2">
              <div className={`route2-step${chapter.lesson ? '' : ' off'}`}>
                <span className="route2-dot">
                  <BookOpen size={15} />
                </span>
                <div className="route2-text">
                  <span className="eyebrow">{a.stepLesson}</span>
                  {chapter.lesson ? (
                    <>
                      <b>{chapter.lesson.title}</b>
                      <span className="route2-time">
                        {chapter.lesson.minutes} {t.common.minutes}
                        {areaLocked && canRead ? ` · ${a.sample}` : ''}
                      </span>
                    </>
                  ) : (
                    <span className="route2-none">{a.stepNoLesson}</span>
                  )}
                </div>
                {chapter.lesson && canRead && (
                  <Link className="btn sm" href={`/app/clase/${chapter.lesson.id}`}>
                    {a.practiceReadLesson}
                  </Link>
                )}
              </div>

              <div className="route2-line" aria-hidden />

              <div className={`route2-step${empty ? ' off' : ''}`}>
                <span className="route2-dot">
                  <Target size={15} />
                </span>
                <div className="route2-text">
                  <span className="eyebrow">{a.stepPractice}</span>
                  <b>{empty ? a.noQuestions : a.stepPracticeTitle}</b>
                  {!empty && (
                    <span className="route2-time">
                      {chapter.published} {t.common.questions} · {a.practiceTakes}
                    </span>
                  )}
                </div>
                <form action={startChapter}>
                  <input type="hidden" name="chapter_id" value={chapter.id} />
                  <input type="hidden" name="title" value={`${areaName} · ${chapter.title}`} />
                  <button className="btn sm solid" disabled={empty}>
                    {a.practiceBtn}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
