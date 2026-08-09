'use server';

import { redirect } from 'next/navigation';
import { and, eq } from 'drizzle-orm';
import { getDb } from '@/db';
import {
  attemptItems,
  attempts,
  examProfiles,
  questions,
  type AttemptMode,
} from '@/db/schema';
import { requireUser } from '@/lib/auth';
import { getDueReviews, publishedInArea, shuffle } from '@/lib/queries';

const QUICK_SIZE = 10;
const CHAPTER_SIZE = 10;

/** Crea el intento con sus items y manda al runner. */
async function launch(opts: {
  userId: string;
  mode: AttemptMode;
  title: string;
  questionIds: string[];
  limitSeconds?: number;
  chapterId?: string | null;
  profileId?: string | null;
}): Promise<never> {
  if (!opts.questionIds.length) redirect('/?vacio=1');

  const db = getDb();
  const [attempt] = await db
    .insert(attempts)
    .values({
      userId: opts.userId,
      mode: opts.mode,
      title: opts.title,
      limitSeconds: opts.limitSeconds ?? 0,
      chapterId: opts.chapterId ?? null,
      profileId: opts.profileId ?? null,
    })
    .returning({ id: attempts.id });

  await db.insert(attemptItems).values(
    opts.questionIds.map((questionId, ord) => ({
      attemptId: attempt.id,
      questionId,
      ord,
    })),
  );

  redirect(`/sesion/${attempt.id}`);
}

export async function startChapter(formData: FormData) {
  const profile = await requireUser();
  const chapterId = String(formData.get('chapter_id') ?? '');
  const title = String(formData.get('title') ?? 'Práctica');

  const db = getDb();
  const rows = await db
    .select({ id: questions.id })
    .from(questions)
    .where(and(eq(questions.status, 'published'), eq(questions.chapterId, chapterId)));

  await launch({
    userId: profile.id,
    mode: 'chapter',
    title,
    chapterId,
    questionIds: shuffle(rows.map((q) => q.id)).slice(0, CHAPTER_SIZE),
  });
}

export async function startQuick() {
  const profile = await requireUser();
  const db = getDb();
  const rows = await db
    .select({ id: questions.id })
    .from(questions)
    .where(eq(questions.status, 'published'));

  await launch({
    userId: profile.id,
    mode: 'practice',
    title: 'Sesión relámpago',
    questionIds: shuffle(rows.map((q) => q.id)).slice(0, QUICK_SIZE),
  });
}

export async function startErrors() {
  const profile = await requireUser();
  const due = await getDueReviews(profile.id);

  await launch({
    userId: profile.id,
    mode: 'errors',
    title: 'Bitácora de errores',
    questionIds: due.slice(0, QUICK_SIZE),
  });
}

export async function startExam(formData: FormData) {
  const profile = await requireUser();
  const profileId = String(formData.get('profile_id') ?? '');

  const db = getDb();
  const [exam] = await db
    .select()
    .from(examProfiles)
    .where(eq(examProfiles.id, profileId))
    .limit(1);

  if (!exam) redirect('/');

  // reparte las preguntas según la mezcla real de la institución
  const mix = Object.entries(exam.mix ?? {});
  const totalWeight = mix.reduce((a, [, w]) => a + w, 0) || 100;
  const picked: string[] = [];

  for (const [areaId, weight] of mix) {
    const target = Math.round((weight / totalWeight) * exam.nQuestions);
    picked.push(...shuffle(await publishedInArea(areaId)).slice(0, target));
  }

  await launch({
    userId: profile.id,
    mode: 'exam',
    title: exam.name,
    profileId: exam.id,
    limitSeconds: exam.seconds,
    questionIds: shuffle(picked).slice(0, exam.nQuestions),
  });
}

/** "Repasar solo los errores" desde la pantalla de resultados. */
export async function retryWrong(formData: FormData) {
  const profile = await requireUser();
  const attemptId = String(formData.get('attempt_id') ?? '');

  const db = getDb();
  const rows = await db
    .select({ questionId: attemptItems.questionId })
    .from(attemptItems)
    .innerJoin(attempts, eq(attempts.id, attemptItems.attemptId))
    .where(
      and(
        eq(attemptItems.attemptId, attemptId),
        eq(attemptItems.isCorrect, false),
        eq(attempts.userId, profile.id),
      ),
    )
    .orderBy(attemptItems.ord);

  await launch({
    userId: profile.id,
    mode: 'errors',
    title: 'Repaso de errores',
    questionIds: rows.map((r) => r.questionId),
  });
}

/** Práctica de las preguntas ligadas a una clase visual, justo después de leerla. */
export async function startFromLesson(formData: FormData) {
  const profile = await requireUser();
  const lessonId = String(formData.get('lesson_id') ?? '');
  const title = String(formData.get('title') ?? 'Práctica de la clase');

  const db = getDb();
  const rows = await db
    .select({ id: questions.id })
    .from(questions)
    .where(and(eq(questions.status, 'published'), eq(questions.lessonId, lessonId)));

  await launch({
    userId: profile.id,
    mode: 'lesson',
    title,
    questionIds: shuffle(rows.map((q) => q.id)).slice(0, CHAPTER_SIZE),
  });
}

/** Cierra la sesión, calcula el puntaje y dispara racha/millas/insignias. */
export async function finishAttempt(formData: FormData) {
  const profile = await requireUser();
  const attemptId = String(formData.get('attempt_id') ?? '');
  const db = getDb();

  const [attempt] = await db
    .select({ id: attempts.id, userId: attempts.userId, finishedAt: attempts.finishedAt })
    .from(attempts)
    .where(eq(attempts.id, attemptId))
    .limit(1);

  if (!attempt || attempt.userId !== profile.id) redirect('/');
  if (attempt.finishedAt) redirect(`/resultados/${attemptId}`);

  const items = await db
    .select({ isCorrect: attemptItems.isCorrect })
    .from(attemptItems)
    .where(eq(attemptItems.attemptId, attemptId));

  const total = items.length;
  const correct = items.filter((i) => i.isCorrect).length;

  // el trigger `attempt_finished` se encarga de racha, millas e insignias
  await db
    .update(attempts)
    .set({
      finishedAt: new Date(),
      scorePct: total ? Math.round((correct / total) * 100) : 0,
    })
    .where(eq(attempts.id, attemptId));

  redirect(`/resultados/${attemptId}`);
}

/** Marca que el alumno abrió la resolución (telemetría, no penaliza). */
export async function markSolutionViewed(itemId: string) {
  const profile = await requireUser();
  const db = getDb();
  const [owned] = await db
    .select({ id: attemptItems.id })
    .from(attemptItems)
    .innerJoin(attempts, eq(attempts.id, attemptItems.attemptId))
    .where(and(eq(attemptItems.id, itemId), eq(attempts.userId, profile.id)))
    .limit(1);
  if (!owned) return;

  await db.update(attemptItems).set({ viewedSolution: true }).where(eq(attemptItems.id, itemId));
}

/** Marca/desmarca una pregunta para volver antes de entregar. */
export async function toggleFlag(itemId: string, flagged: boolean) {
  const profile = await requireUser();
  const db = getDb();
  const [owned] = await db
    .select({ id: attemptItems.id })
    .from(attemptItems)
    .innerJoin(attempts, eq(attempts.id, attemptItems.attemptId))
    .where(and(eq(attemptItems.id, itemId), eq(attempts.userId, profile.id)))
    .limit(1);
  if (!owned) return;

  await db.update(attemptItems).set({ flagged }).where(eq(attemptItems.id, itemId));
}
