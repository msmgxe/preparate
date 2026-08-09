import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { and, count, eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, chapters, lessons, questions, vChapterMastery } from '@/db/schema';
import { requireUser } from '@/lib/auth';
import { startChapter } from '../../actions';

export const metadata: Metadata = { title: 'Práctica · RUMBO' };

/**
 * Briefing antes de despegar. La sesión se crea con un POST, nunca al abrir la
 * página: un prefetch del navegador crearía intentos fantasma.
 */
export default async function PracticaPage({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) {
  const { chapterId } = await params;
  const profile = await requireUser();
  const db = getDb();

  const [chapter] = await db
    .select({
      id: chapters.id,
      title: chapters.title,
      areaName: areas.name,
      areaAccent: areas.accent,
    })
    .from(chapters)
    .innerJoin(areas, eq(areas.id, chapters.areaId))
    .where(eq(chapters.id, chapterId))
    .limit(1);

  if (!chapter) notFound();

  const [[available], [lesson], [mastery]] = await Promise.all([
    db
      .select({ n: count() })
      .from(questions)
      .where(and(eq(questions.chapterId, chapterId), eq(questions.status, 'published'))),
    db
      .select({ id: lessons.id, title: lessons.title, minutes: lessons.minutes, hook: lessons.hook })
      .from(lessons)
      .where(and(eq(lessons.chapterId, chapterId), eq(lessons.status, 'published')))
      .limit(1),
    db
      .select()
      .from(vChapterMastery)
      .where(and(eq(vChapterMastery.chapterId, chapterId), eq(vChapterMastery.userId, profile.id)))
      .limit(1),
  ]);

  const total = Number(available?.n ?? 0);

  return (
    <>
      <Link className="back" href="/">
        ← Volver al itinerario
      </Link>

      <section style={{ marginTop: 8 }}>
        <span className="eyebrow" style={{ color: chapter.areaAccent }}>
          {chapter.areaName} · capítulo
        </span>
        <h1 style={{ marginTop: 10 }}>{chapter.title}</h1>
      </section>

      <section style={{ marginTop: 26 }}>
        <div className="grid4">
          <div className="kpi">
            <div className="l">Preguntas publicadas</div>
            <div className="v">{total}</div>
            <div className="d flat">la sesión toma hasta 10</div>
          </div>
          <div className="kpi">
            <div className="l">Tu dominio</div>
            <div className="v" style={{ color: chapter.areaAccent }}>
              {mastery ? `${Number(mastery.pct)}%` : '—'}
            </div>
            <div className="d flat">
              {mastery ? `${Number(mastery.n)} respondidas` : 'sin datos todavía'}
            </div>
          </div>
          <div className="kpi">
            <div className="l">Corrección</div>
            <div className="v" style={{ fontSize: 26 }}>
              Inmediata
            </div>
            <div className="d flat">con resolución paso a paso</div>
          </div>
          <div className="kpi">
            <div className="l">Reloj</div>
            <div className="v" style={{ fontSize: 26 }}>
              Libre
            </div>
            <div className="d flat">se mide, no se castiga</div>
          </div>
        </div>
      </section>

      {lesson && (
        <section>
          <div className="shead">
            <h2>Antes de practicar</h2>
            <div className="rule" />
            <span className="eyebrow">recomendado</span>
          </div>
          <div className="qcard">
            <span className="eyebrow" style={{ color: 'var(--sky)' }}>
              Clase visual · {lesson.minutes} min
            </span>
            <b>{lesson.title}</b>
            <p>{lesson.hook}</p>
            <Link className="btn" href={`/clase/${lesson.id}`}>
              Leer la clase →
            </Link>
          </div>
        </section>
      )}

      <div className="qnav" style={{ marginTop: 34 }}>
        <form action={startChapter}>
          <input type="hidden" name="chapter_id" value={chapter.id} />
          <input type="hidden" name="title" value={`${chapter.areaName} · ${chapter.title}`} />
          <button className="btn solid" disabled={total === 0}>
            {total === 0 ? 'Sin preguntas publicadas' : 'Empezar la sesión →'}
          </button>
        </form>
      </div>
    </>
  );
}
