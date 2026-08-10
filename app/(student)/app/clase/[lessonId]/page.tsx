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
import { startFromLesson } from '@/app/(student)/actions';
import { getAccess } from '@/lib/entitlements';
import { Paywall } from '@/components/Paywall';
import { getI18n } from '@/lib/i18n';
import { tr, trPayload } from '@/lib/i18n/content';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: `${t.titles.lesson} · RUMBO` };
}

export default async function ClasePage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const profile = await requireUser();
  const { locale, t } = await getI18n();
  const db = getDb();

  const [row] = await db
    .select({
      id: lessons.id,
      title: lessons.title,
      hook: lessons.hook,
      minutes: lessons.minutes,
      status: lessons.status,
      i18n: lessons.i18n,
      chapterId: chapters.id,
      chapterTitle: chapters.title,
      chapterI18n: chapters.i18n,
      areaId: areas.id,
      areaName: areas.name,
      areaAccent: areas.accent,
      areaI18n: areas.i18n,
    })
    .from(lessons)
    .innerJoin(chapters, eq(chapters.id, lessons.chapterId))
    .innerJoin(areas, eq(areas.id, chapters.areaId))
    .where(eq(lessons.id, lessonId))
    .limit(1);

  // los borradores solo los ve el admin
  if (!row || (row.status !== 'published' && profile.role !== 'admin')) notFound();

  // el idioma se resuelve aquí, una sola vez, con respaldo al español
  const lesson = {
    ...row,
    title: tr(row, 'title', locale),
    hook: tr(row, 'hook', locale),
    chapterTitle: tr({ i18n: row.chapterI18n, title: row.chapterTitle }, 'title', locale),
    areaName: tr({ i18n: row.areaI18n, name: row.areaName }, 'name', locale),
  };

  // muro de pago: módulo cerrado y esta no es la clase de muestra
  const access = await getAccess(profile.id);
  const areaId = lesson.areaId;
  if (profile.role !== 'admin' && !access.canReadLesson(areaId, lesson.id)) {
    return (
      <Paywall
        areaName={lesson.areaName}
        areaAccent={lesson.areaAccent}
        title={lesson.title}
        kind="lesson"
      />
    );
  }

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
    .map((b) =>
      toBlock({ id: b.id, ord: b.ord, kind: b.kind, payload: trPayload(b.payload, b.i18n, locale) }),
    )
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
      <Link className="back" href="/app">
        {t.common.backToItinerary}
      </Link>

      <div className="lesson">
        <div className="lhead">
          <span className="eyebrow" style={{ color: lesson.areaAccent }}>
            {t.app.tabLesson.replace('◐ ', '')} · {lesson.areaName} · {lesson.chapterTitle} ·{' '}
            {lesson.minutes} {t.app.lessonReading}
            {lesson.status !== 'published' ? ` · ${t.app.lessonDraft}` : ''}
          </span>
          <h3>{lesson.title}</h3>
          <p>{lesson.hook}</p>
        </div>

        {blocks.length === 0 ? (
          <p className="empty">{t.app.lessonNoBlocks}</p>
        ) : (
          <LessonRenderer
            lessonId={lesson.id}
            blocks={blocks}
            visuals={svgById}
            videos={videos}
            t={t}
          />
        )}

        <div className="qnav" style={{ marginTop: 40 }}>
          {practice > 0 && (
            <form action={startFromLesson}>
              <input type="hidden" name="lesson_id" value={lesson.id} />
              <input type="hidden" name="title" value={`${lesson.chapterTitle} · tras la clase`} />
              <button className="btn solid">{t.app.lessonPracticeCta}</button>
            </form>
          )}
          <Link className="btn sm" href={`/app/practica/${lesson.chapterId}`}>
            {t.app.lessonPracticeAll}
          </Link>
        </div>
      </div>
    </>
  );
}
