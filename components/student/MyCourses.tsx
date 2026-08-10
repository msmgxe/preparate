import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import type { AreaCard, ChapterCard } from '@/lib/queries';
import type { Dict } from '@/lib/i18n/dictionaries/es';

/**
 * Acceso directo a lo comprado.
 *
 * El itinerario lista los cinco módulos y hay que abrir uno para ver su
 * temario. Eso está bien para explorar, pero no para volver cada día: quien ya
 * pagó necesita entrar y seguir donde lo dejó, sin buscar.
 *
 * Aquí solo aparece lo que tiene abierto, en orden, y cada tarjeta apunta a un
 * único sitio: el siguiente paso.
 */

type Next = { chapter: ChapterCard; kind: 'lesson' | 'start' | 'review' };

/**
 * El siguiente paso de un módulo, con la misma regla que enseña la guía:
 * clase antes que práctica, y lo flojo antes que lo nuevo.
 */
function nextStep(area: AreaCard): Next | null {
  const usable = area.chapters.filter((c) => c.published > 0);
  if (!usable.length) return null;

  // 1 · lo empezado y flojo manda: por debajo del 65 % conviene reforzar
  const weak = usable
    .filter((c) => c.answered > 0 && (c.mastery ?? 100) < 65)
    .sort((a, b) => (a.mastery ?? 0) - (b.mastery ?? 0))[0];
  if (weak) return { chapter: weak, kind: 'review' };

  // 2 · si no, el primer capítulo sin empezar; con su clase si la tiene
  const fresh = usable.find((c) => c.answered === 0);
  if (fresh) return { chapter: fresh, kind: fresh.lesson ? 'lesson' : 'start' };

  // 3 · todo empezado y sólido: se repasa el más débil de todos
  const lowest = [...usable].sort((a, b) => (a.mastery ?? 0) - (b.mastery ?? 0))[0];
  return { chapter: lowest, kind: 'review' };
}

export function MyCourses({ areas, t }: { areas: AreaCard[]; t: Dict }) {
  const c = t.courses;
  const mine = areas.filter((a) => !a.locked);

  if (!mine.length) {
    return (
      <section>
        <div className="shead">
          <h2>{c.title}</h2>
          <div className="rule" />
        </div>
        <div className="empty" style={{ textAlign: 'left', padding: 22 }}>
          <b style={{ display: 'block', marginBottom: 6, color: 'var(--paper)' }}>{c.noneTitle}</b>
          <p style={{ fontSize: 15 }}>{c.noneBody}</p>
          <Link className="btn sm" href="/#planes" style={{ marginTop: 14 }}>
            {c.noneCta}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="shead">
        <h2>{c.title}</h2>
        <div className="rule" />
        <span className="eyebrow">{c.hint}</span>
      </div>

      <div className="courses">
        {mine.map((area) => {
          const step = nextStep(area);
          const label = step
            ? { lesson: c.readFirst, start: c.start, review: c.review }[step.kind]
            : null;
          const href = step
            ? step.kind === 'lesson' && step.chapter.lesson
              ? `/app/clase/${step.chapter.lesson.id}`
              : `/app/practica/${step.chapter.id}`
            : null;

          return (
            <article className="course" key={area.id} style={{ '--accent': area.accent } as React.CSSProperties}>
              <div className="course-top">
                <span className="course-sym">{area.symbol}</span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h3>{area.name}</h3>
                  <span className="course-meta">
                    {area.chapters.length} {t.common.chapters} · {area.published} {t.common.questions}
                  </span>
                </div>
              </div>

              <div className="bar" style={{ marginTop: 14 }}>
                <i style={{ width: `${area.mastery ?? 0}%`, background: area.accent }} />
              </div>
              <div className="pct">
                <span>{c.progress}</span>
                <span>{area.mastery === null ? t.common.noData : `${area.mastery}%`}</span>
              </div>

              {step && href && (
                <Link className="course-next" href={href}>
                  <span className="course-next-label">
                    <span className="eyebrow">{c.nextUp}</span>
                    <b>{step.chapter.title}</b>
                    <span className="course-next-kind">
                      {step.kind === 'lesson' && <BookOpen size={13} />}
                      {label}
                    </span>
                  </span>
                  <ArrowRight size={18} style={{ flex: 'none' }} />
                </Link>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
