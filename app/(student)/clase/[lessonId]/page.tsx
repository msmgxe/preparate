import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { and, count, eq, inArray } from 'drizzle-orm';
import { getDb } from '@/db';
import {
  areas,
  chapters,
  lessonBlocks,
  lessonVideos,
  lessons,
  questions,
  visuals,
} from '@/db/schema';
import { requireUser } from '@/lib/auth';
import { toBlock, type Block } from '@/lib/blocks';
import { sanitizeSvg } from '@/components/SafeHtml';
import { LessonRenderer } from '@/components/lesson/LessonRenderer';
import { startFromLesson } from '../../actions';

export const metadata: Metadata = { title: 'Clase visual · RUMBO' };

export default async function ClasePage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const profile = await requireUser();
  const db = getDb();

  const [lesson] = await db
    .select({
      id: lessons.id,
      title: lessons.title,
      hook: lessons.hook,
      minutes: lessons.minutes,
      status: lessons.status,
      chapterId: chapters.id,
      chapterTitle: chapters.title,
      areaName: areas.name,
      areaAccent: areas.accent,
    })
    .from(lessons)
    .innerJoin(chapters, eq(chapters.id, lessons.chapterId))
    .innerJoin(areas, eq(areas.id, chapters.areaId))
    .where(eq(lessons.id, lessonId))
    .limit(1);

  // los borradores solo los ve el admin
  if (!lesson || (lesson.status !== 'published' && profile.role !== 'admin')) notFound();

  const [rawBlocks, videos, [practiceCount]] = await Promise.all([
    db.select().from(lessonBlocks).where(eq(lessonBlocks.lessonId, lessonId)).orderBy(lessonBlocks.ord),
    db
      .select({
        id: lessonVideos.id,
        title: lessonVideos.title,
        source: lessonVideos.source,
        url: lessonVideos.url,
      })
      .from(lessonVideos)
      .where(eq(lessonVideos.lessonId, lessonId))
      .orderBy(lessonVideos.ord),
    db
      .select({ n: count() })
      .from(questions)
      .where(and(eq(questions.lessonId, lessonId), eq(questions.status, 'published'))),
  ]);

  const blocks = rawBlocks
    .map((row) => toBlock({ id: row.id, ord: row.ord, kind: row.kind, payload: row.payload }))
    .filter((b): b is Block => b !== null);

  // los SVG se sanitizan en el servidor, antes de cruzar al cliente
  const vizIds = blocks.flatMap((b) => (b.kind === 'viz' ? [b.payload.viz_id] : []));
  const svgRows = vizIds.length
    ? await db.select({ id: visuals.id, svg: visuals.svg }).from(visuals).where(inArray(visuals.id, vizIds))
    : [];
  const svgById = Object.fromEntries(svgRows.map((v) => [v.id, sanitizeSvg(v.svg)]));

  const practice = Number(practiceCount?.n ?? 0);

  return (
    <>
      <Link className="back" href="/">
        ← Volver al itinerario
      </Link>

      <div className="lesson">
        <div className="lhead">
          <span className="eyebrow" style={{ color: lesson.areaAccent }}>
            Clase · {lesson.areaName} · {lesson.chapterTitle} · {lesson.minutes} min de lectura
            {lesson.status !== 'published' ? ' · BORRADOR' : ''}
          </span>
          <h3>{lesson.title}</h3>
          <p>{lesson.hook}</p>
        </div>

        {blocks.length === 0 ? (
          <p className="empty">Esta clase todavía no tiene bloques.</p>
        ) : (
          <LessonRenderer
            lessonId={lesson.id}
            blocks={blocks}
            visuals={svgById}
            videos={videos}
          />
        )}

        <div className="qnav" style={{ marginTop: 40 }}>
          {practice > 0 && (
            <form action={startFromLesson}>
              <input type="hidden" name="lesson_id" value={lesson.id} />
              <input type="hidden" name="title" value={`${lesson.chapterTitle} · tras la clase`} />
              <button className="btn solid">Practicar lo que acabas de leer →</button>
            </form>
          )}
          <Link className="btn sm" href={`/practica/${lesson.chapterId}`}>
            Practicar todo el capítulo
          </Link>
        </div>
      </div>
    </>
  );
}
