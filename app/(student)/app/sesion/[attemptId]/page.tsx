import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, attemptItems, attempts, chapters, lessons, questions } from '@/db/schema';
import { requireUser } from '@/lib/auth';
import { publicQuestionColumns } from '@/lib/queries';
import { Runner, type RunnerItem } from '@/components/Runner';
import { getI18n } from '@/lib/i18n';
import { tr } from '@/lib/i18n/content';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: `${t.titles.session} · RUMBO` };
}

export default async function SesionPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const { attemptId } = await params;
  const profile = await requireUser();
  const { locale, t } = await getI18n();
  const db = getDb();

  const [attempt] = await db.select().from(attempts).where(eq(attempts.id, attemptId)).limit(1);

  if (!attempt || attempt.userId !== profile.id) redirect('/app');
  if (attempt.finishedAt) redirect(`/app/resultados/${attemptId}`);

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
      /**
       * El blob de traducciones se queda en el servidor: lleva dentro los pasos
       * y el truco. Aquí se usa para resolver el idioma y se descarta.
       */
      questionI18n: questions.i18n,
      chapterTitle: chapters.title,
      chapterI18n: chapters.i18n,
      areaName: areas.name,
      areaShort: areas.short,
      areaAccent: areas.accent,
      areaI18n: areas.i18n,
      lessonId: lessons.id,
      lessonTitle: lessons.title,
      lessonMinutes: lessons.minutes,
      lessonHook: lessons.hook,
      lessonI18n: lessons.i18n,
    })
    .from(attemptItems)
    .innerJoin(questions, eq(questions.id, attemptItems.questionId))
    .innerJoin(chapters, eq(chapters.id, questions.chapterId))
    .innerJoin(areas, eq(areas.id, chapters.areaId))
    .leftJoin(lessons, eq(lessons.id, questions.lessonId))
    .where(eq(attemptItems.attemptId, attemptId))
    .orderBy(attemptItems.ord);

  const isExam = attempt.mode === 'exam';

  const runnerItems: RunnerItem[] = items.map((item) => {
    const q = { i18n: item.questionI18n, ...item.question };
    const sol = {
      i18n: item.questionI18n,
      steps: item.steps,
      concept: item.concept,
      trick: item.trick,
    };
    return {
      id: item.id,
      ord: item.ord,
      flagged: item.flagged,
      chosen_index: item.chosenIndex,
      question: {
        id: item.question.id,
        stem: tr(q, 'stem', locale),
        passage: tr(q, 'passage', locale),
        options: tr(q, 'options', locale),
        difficulty: item.question.difficulty,
      },
      area: {
        name: tr({ i18n: item.areaI18n, name: item.areaName }, 'name', locale),
        short: tr({ i18n: item.areaI18n, short: item.areaShort }, 'short', locale),
        accent: item.areaAccent,
      },
      chapter: tr({ i18n: item.chapterI18n, title: item.chapterTitle }, 'title', locale),
      lesson:
        item.lessonId && item.lessonTitle
          ? {
              id: item.lessonId,
              title: tr({ i18n: item.lessonI18n, title: item.lessonTitle }, 'title', locale),
              minutes: item.lessonMinutes ?? 6,
              hook: tr({ i18n: item.lessonI18n, hook: item.lessonHook ?? '' }, 'hook', locale),
            }
          : null,
      solution:
        !isExam && item.chosenIndex !== null
          ? {
              answer_index: item.answerIndex,
              steps: tr(sol, 'steps', locale) ?? [],
              concept: tr(sol, 'concept', locale),
              trick: tr(sol, 'trick', locale),
            }
          : null,
    };
  });

  return (
    <Runner
      t={t}
      attemptId={attempt.id}
      mode={attempt.mode}
      title={attempt.title}
      limitSeconds={attempt.limitSeconds}
      startedAt={attempt.startedAt.toISOString()}
      items={runnerItems}
    />
  );
}
