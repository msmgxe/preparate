import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { and, count, eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, chapters, lessons, questions, vChapterMastery } from '@/db/schema';
import { requireUser } from '@/lib/auth';
import { startChapter } from '@/app/(student)/actions';
import { getI18n, fill } from '@/lib/i18n';
import { tr } from '@/lib/i18n/content';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: `${t.titles.practice} · RUMBO` };
}

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
  const { locale, t } = await getI18n();
  const db = getDb();

  const [row] = await db
    .select({
      id: chapters.id,
      title: chapters.title,
      blurb: chapters.blurb,
      i18n: chapters.i18n,
      areaName: areas.name,
      areaAccent: areas.accent,
      areaI18n: areas.i18n,
    })
    .from(chapters)
    .innerJoin(areas, eq(areas.id, chapters.areaId))
    .where(eq(chapters.id, chapterId))
    .limit(1);

  if (!row) notFound();

  const chapter = {
    ...row,
    title: tr(row, 'title', locale),
    blurb: tr(row, 'blurb', locale),
    areaName: tr({ i18n: row.areaI18n, name: row.areaName }, 'name', locale),
  };

  const [[available], [lesson], [mastery]] = await Promise.all([
    db
      .select({ n: count() })
      .from(questions)
      .where(and(eq(questions.chapterId, chapterId), eq(questions.status, 'published'))),
    db
      .select({
        id: lessons.id,
        title: lessons.title,
        minutes: lessons.minutes,
        hook: lessons.hook,
        i18n: lessons.i18n,
      })
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
      <Link className="back" href="/app">
        {t.common.backToItinerary}
      </Link>

      <section style={{ marginTop: 8 }}>
        <span className="eyebrow" style={{ color: chapter.areaAccent }}>
          {chapter.areaName} · {t.app.practiceChapter}
        </span>
        <h1 style={{ marginTop: 10 }}>{chapter.title}</h1>
        {chapter.blurb && (
          <div className="chapnote">
            <span className="eyebrow" style={{ color: chapter.areaAccent }}>
              {t.app.whatYouPractise}
            </span>
            <p>{chapter.blurb}</p>
          </div>
        )}
      </section>

      <section style={{ marginTop: 26 }}>
        <div className="grid4">
          <div className="kpi">
            <div className="l">{t.app.practicePublished}</div>
            <div className="v">{total}</div>
            <div className="d flat">{t.app.practiceTakes}</div>
          </div>
          <div className="kpi">
            <div className="l">{t.app.practiceYourMastery}</div>
            <div className="v" style={{ color: chapter.areaAccent }}>
              {mastery ? `${Number(mastery.pct)}%` : '—'}
            </div>
            <div className="d flat">
              {mastery ? fill(t.app.practiceAnswered, { n: Number(mastery.n) }) : t.app.practiceNoData}
            </div>
          </div>
          <div className="kpi">
            <div className="l">{t.app.practiceFeedback}</div>
            <div className="v" style={{ fontSize: 26 }}>
              {t.app.practiceImmediate}
            </div>
            <div className="d flat">{t.app.practiceWithSteps}</div>
          </div>
          <div className="kpi">
            <div className="l">{t.app.practiceClock}</div>
            <div className="v" style={{ fontSize: 26 }}>
              {t.app.practiceFree}
            </div>
            <div className="d flat">{t.app.practiceMeasured}</div>
          </div>
        </div>
      </section>

      {lesson && (
        <section>
          <div className="shead">
            <h2>{t.app.practiceBefore}</h2>
            <div className="rule" />
            <span className="eyebrow">{t.app.practiceRecommended}</span>
          </div>
          <div className="qcard">
            <span className="eyebrow" style={{ color: 'var(--sky)' }}>
              {t.app.lessonBtn.replace('◐ ', '')} · {lesson.minutes} {t.common.minutes}
            </span>
            <b>{tr(lesson, 'title', locale)}</b>
            <p>{tr(lesson, 'hook', locale)}</p>
            <Link className="btn" href={`/app/clase/${lesson.id}`}>
              {t.app.practiceReadLesson}
            </Link>
          </div>
        </section>
      )}

      <div className="qnav" style={{ marginTop: 34 }}>
        <form action={startChapter}>
          <input type="hidden" name="chapter_id" value={chapter.id} />
          <input type="hidden" name="title" value={`${chapter.areaName} · ${chapter.title}`} />
          <button className="btn solid" disabled={total === 0}>
            {total === 0 ? t.app.practiceNone : t.app.practiceStart}
          </button>
        </form>
      </div>
    </>
  );
}
