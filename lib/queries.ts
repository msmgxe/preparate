import 'server-only';

import { and, count, desc, eq, inArray, isNotNull, lte, sql } from 'drizzle-orm';
import { getDb } from '@/db';
import { getAccess } from '@/lib/entitlements';
import {
  areas,
  attempts,
  badges,
  chapters,
  lessons,
  questions,
  reviewQueue,
  userBadges,
  vAreaMastery,
  vChapterMastery,
  type Area,
  type Chapter,
  type PublicQuestion,
} from '@/db/schema';

/**
 * Columnas que el navegador puede ver de una pregunta.
 *
 * Con Neon no hay PostgREST: la base nunca se expone. Aun así, todo lo que
 * alimenta a un componente cliente se selecciona con esta lista, para que
 * `answerIndex`, `steps`, `distractors`, `concept` y `trick` no se cuelen por
 * descuido en un payload de RSC.
 */
export const publicQuestionColumns = {
  id: questions.id,
  chapterId: questions.chapterId,
  lessonId: questions.lessonId,
  kind: questions.kind,
  passage: questions.passage,
  stem: questions.stem,
  options: questions.options,
  difficulty: questions.difficulty,
  timeTargetS: questions.timeTargetS,
  source: questions.source,
  status: questions.status,
  createdAt: questions.createdAt,
  updatedAt: questions.updatedAt,
} as const;

export type ChapterCard = Chapter & {
  published: number;
  lesson: { id: string; slug: string | null; title: string; minutes: number } | null;
  mastery: number | null;
  answered: number;
};

export type AreaCard = Area & {
  chapters: ChapterCard[];
  published: number;
  mastery: number | null;
  /** Cerrado = solo muestra gratuita. */
  locked: boolean;
  freeLessonId: string | null;
};

const num = (v: unknown): number | null => (v === null || v === undefined ? null : Number(v));

/** Catálogo completo (áreas → capítulos) con el dominio del alumno encima. */
export async function getItinerary(userId: string): Promise<AreaCard[]> {
  const db = getDb();
  const access = await getAccess(userId);

  const [allAreas, allChapters, counts, allLessons, areaMastery, chapterMastery] =
    await Promise.all([
      db.select().from(areas).orderBy(areas.ord),
      db.select().from(chapters).orderBy(chapters.ord),
      db
        .select({ chapterId: questions.chapterId, n: count() })
        .from(questions)
        .where(eq(questions.status, 'published'))
        .groupBy(questions.chapterId),
      db
        .select({
          id: lessons.id,
          slug: lessons.slug,
          title: lessons.title,
          minutes: lessons.minutes,
          chapterId: lessons.chapterId,
        })
        .from(lessons)
        .where(eq(lessons.status, 'published')),
      db.select().from(vAreaMastery).where(eq(vAreaMastery.userId, userId)),
      db.select().from(vChapterMastery).where(eq(vChapterMastery.userId, userId)),
    ]);

  const countByChapter = new Map(counts.map((c) => [c.chapterId, Number(c.n)]));
  const lessonByChapter = new Map(allLessons.map((l) => [l.chapterId, l]));
  const masteryByChapter = new Map(chapterMastery.map((m) => [m.chapterId!, m]));
  const masteryByArea = new Map(areaMastery.map((m) => [m.areaId!, m]));

  return allAreas.map((area) => {
    const own = allChapters
      .filter((c) => c.areaId === area.id)
      .map<ChapterCard>((c) => {
        const m = masteryByChapter.get(c.id);
        return {
          ...c,
          published: countByChapter.get(c.id) ?? 0,
          lesson: lessonByChapter.get(c.id) ?? null,
          mastery: m ? num(m.pct) : null,
          answered: m ? Number(m.n ?? 0) : 0,
        };
      });

    const am = masteryByArea.get(area.id);
    return {
      ...area,
      chapters: own,
      published: own.reduce((a, c) => a + c.published, 0),
      mastery: am ? num(am.pct) : null,
      locked: !access.isOpen(area.id),
      freeLessonId: access.freeLesson.get(area.id) ?? null,
    };
  });
}

/** Preguntas que tocan hoy en la bitácora de errores. */
export async function getDueReviews(userId: string): Promise<string[]> {
  const db = getDb();
  const today = new Date().toISOString().slice(0, 10);
  const rows = await db
    .select({ questionId: reviewQueue.questionId })
    .from(reviewQueue)
    .where(and(eq(reviewQueue.userId, userId), lte(reviewQueue.dueAt, today)))
    .orderBy(reviewQueue.dueAt);
  return rows.map((r) => r.questionId);
}

/** Insignias del alumno: todas las del catálogo, marcando las ganadas. */
export async function getStamps(userId: string) {
  const db = getDb();
  const [catalog, earned] = await Promise.all([
    db.select().from(badges).orderBy(badges.ord),
    db.select({ badgeId: userBadges.badgeId }).from(userBadges).where(eq(userBadges.userId, userId)),
  ]);
  const has = new Set(earned.map((b) => b.badgeId));
  return catalog.map((b) => ({ ...b, earned: has.has(b.id) }));
}

/** Las últimas sesiones cerradas del alumno. */
export async function getRecentAttempts(userId: string, limit = 6) {
  const db = getDb();
  return db
    .select({
      id: attempts.id,
      mode: attempts.mode,
      title: attempts.title,
      startedAt: attempts.startedAt,
      finishedAt: attempts.finishedAt,
      scorePct: attempts.scorePct,
    })
    .from(attempts)
    .where(and(eq(attempts.userId, userId), isNotNull(attempts.finishedAt)))
    .orderBy(desc(attempts.startedAt))
    .limit(limit);
}

export async function getPublicQuestions(ids: string[]): Promise<PublicQuestion[]> {
  if (!ids.length) return [];
  const db = getDb();
  return db.select(publicQuestionColumns).from(questions).where(inArray(questions.id, ids));
}

/** Ids publicados de un área, para armar la mezcla del simulacro. */
export async function publishedInArea(areaId: string): Promise<string[]> {
  const db = getDb();
  const rows = await db
    .select({ id: questions.id })
    .from(questions)
    .innerJoin(chapters, eq(chapters.id, questions.chapterId))
    .where(and(eq(questions.status, 'published'), eq(chapters.areaId, areaId)));
  return rows.map((r) => r.id);
}

/** Cuántas preguntas publicadas hay por estado, para el panel de contenido. */
export async function countQuestionsByStatus() {
  const db = getDb();
  const rows = await db
    .select({ status: questions.status, n: count() })
    .from(questions)
    .groupBy(questions.status);
  return Object.fromEntries(rows.map((r) => [r.status, Number(r.n)])) as Record<string, number>;
}

export const sqlNow = sql`now()`;

export function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function daysUntil(date: string | null): number | null {
  if (!date) return null;
  const target = new Date(`${date}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}
