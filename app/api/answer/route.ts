import { NextResponse } from 'next/server';
import { and, eq, isNull, sql } from 'drizzle-orm';
import { getDb } from '@/db';
import { getLocale } from '@/lib/i18n';
import { tr } from '@/lib/i18n/content';
import { attemptItems, attempts, questions, type Step } from '@/db/schema';
import { getProfile } from '@/lib/auth';

/**
 * REGLA DE ORO: `answer_index` no llega al navegador antes de responder.
 *
 * El cliente manda `{ attempt_item_id, chosen_index }`, el servidor califica
 * contra la fila real, guarda y recién entonces devuelve el veredicto. En modo
 * simulacro ni siquiera eso: solo confirma que quedó registrado.
 */
export type AnswerResult = {
  saved: true;
  revealed: boolean;
  is_correct?: boolean;
  answer_index?: number;
  /** La pidió el alumno sin responder, no la ganó respondiendo. */
  shown?: boolean;
  steps?: Step[];
  concept?: string | null;
  trick?: string | null;
  why_wrong?: string | null;
};

export async function POST(request: Request) {
  let body: {
    attempt_item_id?: string;
    chosen_index?: number;
    seconds?: number;
    /** «No sé cómo se hace»: abre la resolución sin responder. */
    reveal?: boolean;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo inválido.' }, { status: 400 });
  }

  const { attempt_item_id: itemId, chosen_index: chosen } = body;
  const reveal = body.reveal === true;
  const seconds = Math.max(0, Math.min(3600, Math.round(body.seconds ?? 0)));

  if (!itemId) {
    return NextResponse.json({ error: 'Faltan datos de la respuesta.' }, { status: 400 });
  }
  if (!reveal && (typeof chosen !== 'number' || !Number.isInteger(chosen) || chosen < 0)) {
    return NextResponse.json({ error: 'Faltan datos de la respuesta.' }, { status: 400 });
  }

  const profile = await getProfile();
  if (!profile) return NextResponse.json({ error: 'Sin sesión.' }, { status: 401 });

  const locale = await getLocale();
  const db = getDb();

  const [row] = await db
    .select({
      itemId: attemptItems.id,
      chosenIndex: attemptItems.chosenIndex,
      isCorrect: attemptItems.isCorrect,
      questionId: attemptItems.questionId,
      userId: attempts.userId,
      mode: attempts.mode,
      finishedAt: attempts.finishedAt,
      answerIndex: questions.answerIndex,
      options: questions.options,
      steps: questions.steps,
      concept: questions.concept,
      trick: questions.trick,
      distractors: questions.distractors,
      i18n: questions.i18n,
    })
    .from(attemptItems)
    .innerJoin(attempts, eq(attempts.id, attemptItems.attemptId))
    .innerJoin(questions, eq(questions.id, attemptItems.questionId))
    .where(eq(attemptItems.id, itemId))
    .limit(1);

  if (!row) {
    return NextResponse.json({ error: 'No existe esa pregunta en tu sesión.' }, { status: 404 });
  }
  // El dueño del intento es el único que puede responderlo.
  if (row.userId !== profile.id) {
    return NextResponse.json({ error: 'No es tu sesión.' }, { status: 403 });
  }
  if (row.finishedAt) {
    return NextResponse.json({ error: 'La sesión ya está cerrada.' }, { status: 409 });
  }
  if (!reveal && chosen! >= row.options.length) {
    return NextResponse.json({ error: 'Esa alternativa no existe.' }, { status: 400 });
  }

  const isExam = row.mode === 'exam';

  /**
   * Pedir la resolución sin responder.
   *
   * Un alumno atascado tiene que poder ver cómo se hace: esconderlo no le
   * enseña nada, solo lo frustra. Cuenta como fallo —no se puede ganar puntaje
   * mirando la respuesta— y entra en la bitácora para que vuelva a salir. En
   * simulacro no existe, igual que en el examen de verdad.
   */
  if (reveal) {
    if (isExam) {
      return NextResponse.json({ error: 'En simulacro no hay pistas.' }, { status: 409 });
    }
    if (row.chosenIndex === null) {
      await db
        .update(attemptItems)
        .set({ isCorrect: false, viewedSolution: true, seconds, answeredAt: new Date() })
        .where(and(eq(attemptItems.id, itemId), isNull(attemptItems.chosenIndex)));

      await db.execute(
        sql`select schedule_review(${profile.id}, ${row.questionId}::uuid, false)`,
      );
    } else {
      await db
        .update(attemptItems)
        .set({ viewedSolution: true })
        .where(eq(attemptItems.id, itemId));
    }

    return NextResponse.json<AnswerResult>({
      saved: true,
      revealed: true,
      is_correct: false,
      shown: true,
      answer_index: row.answerIndex,
      steps: tr(row, 'steps', locale) ?? [],
      concept: tr(row, 'concept', locale),
      trick: tr(row, 'trick', locale),
      why_wrong: null,
    });
  }
  const alreadyAnswered = row.chosenIndex !== null;
  const isCorrect = alreadyAnswered ? Boolean(row.isCorrect) : chosen! === row.answerIndex;

  if (!alreadyAnswered) {
    // En práctica la primera respuesta es la que cuenta.
    await db
      .update(attemptItems)
      .set({
        chosenIndex: chosen!,
        isCorrect,
        seconds,
        answeredAt: new Date(),
      })
      .where(and(eq(attemptItems.id, itemId), isNull(attemptItems.chosenIndex)));

    await db.execute(
      sql`select schedule_review(${profile.id}, ${row.questionId}::uuid, ${isCorrect})`,
    );
  } else if (isExam) {
    // en simulacro sí se puede corregir mientras no se entregue
    await db
      .update(attemptItems)
      .set({
        chosenIndex: chosen!,
        isCorrect: chosen! === row.answerIndex,
        seconds,
        answeredAt: new Date(),
      })
      .where(eq(attemptItems.id, itemId));
  }

  if (isExam) {
    return NextResponse.json<AnswerResult>({ saved: true, revealed: false });
  }

  return NextResponse.json<AnswerResult>({
    saved: true,
    revealed: true,
    is_correct: isCorrect,
    answer_index: row.answerIndex,
    steps: tr(row, 'steps', locale) ?? [],
    concept: tr(row, 'concept', locale),
    trick: tr(row, 'trick', locale),
    why_wrong: isCorrect ? null : ((row.distractors ?? {})[String(chosen!)] ?? null),
  });
}
