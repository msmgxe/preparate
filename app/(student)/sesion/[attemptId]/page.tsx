import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, attemptItems, attempts, chapters, lessons, questions } from '@/db/schema';
import { requireUser } from '@/lib/auth';
import { publicQuestionColumns } from '@/lib/queries';
import { Runner, type RunnerItem } from '@/components/Runner';

export const metadata: Metadata = { title: 'Sesión · RUMBO' };

export default async function SesionPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const { attemptId } = await params;
  const profile = await requireUser();
  const db = getDb();

  const [attempt] = await db.select().from(attempts).where(eq(attempts.id, attemptId)).limit(1);

  if (!attempt || attempt.userId !== profile.id) redirect('/');
  if (attempt.finishedAt) redirect(`/resultados/${attemptId}`);

  const items = await db
    .select({
      id: attemptItems.id,
      ord: attemptItems.ord,
      flagged: attemptItems.flagged,
      chosenIndex: attemptItems.chosenIndex,
      questionId: attemptItems.questionId,
      /**
       * `answerIndex` y la resolución solo se traen para lo YA respondido en
       * modo práctica: es lo que permite que la corrección siga visible al
       * recargar. Para lo pendiente no se selecciona ni se serializa.
       */
      answerIndex: questions.answerIndex,
      steps: questions.steps,
      concept: questions.concept,
      trick: questions.trick,
      question: publicQuestionColumns,
      chapterTitle: chapters.title,
      areaName: areas.name,
      areaShort: areas.short,
      areaAccent: areas.accent,
      lessonId: lessons.id,
      lessonTitle: lessons.title,
      lessonMinutes: lessons.minutes,
      lessonHook: lessons.hook,
    })
    .from(attemptItems)
    .innerJoin(questions, eq(questions.id, attemptItems.questionId))
    .innerJoin(chapters, eq(chapters.id, questions.chapterId))
    .innerJoin(areas, eq(areas.id, chapters.areaId))
    .leftJoin(lessons, eq(lessons.id, questions.lessonId))
    .where(eq(attemptItems.attemptId, attemptId))
    .orderBy(attemptItems.ord);

  const isExam = attempt.mode === 'exam';

  const runnerItems: RunnerItem[] = items.map((item) => ({
    id: item.id,
    ord: item.ord,
    flagged: item.flagged,
    chosen_index: item.chosenIndex,
    question: {
      id: item.question.id,
      stem: item.question.stem,
      passage: item.question.passage,
      options: item.question.options,
      difficulty: item.question.difficulty,
    },
    area: { name: item.areaName, short: item.areaShort, accent: item.areaAccent },
    chapter: item.chapterTitle,
    lesson:
      item.lessonId && item.lessonTitle
        ? {
            id: item.lessonId,
            title: item.lessonTitle,
            minutes: item.lessonMinutes ?? 6,
            hook: item.lessonHook ?? '',
          }
        : null,
    solution:
      !isExam && item.chosenIndex !== null
        ? {
            answer_index: item.answerIndex,
            steps: item.steps ?? [],
            concept: item.concept,
            trick: item.trick,
          }
        : null,
  }));

  return (
    <Runner
      attemptId={attempt.id}
      mode={attempt.mode}
      title={attempt.title}
      limitSeconds={attempt.limitSeconds}
      startedAt={attempt.startedAt.toISOString()}
      items={runnerItems}
    />
  );
}
