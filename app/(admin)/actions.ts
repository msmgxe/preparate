'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { and, eq, max } from 'drizzle-orm';
import { getDb } from '@/db';
import { lessonBlocks, lessonVideos, lessons, questions } from '@/db/schema';
import { requireAdmin } from '@/lib/auth';
import { emptyPayload, type BlockKind } from '@/lib/blocks';
import { grantAccess, revokeAccess } from '@/lib/entitlements';

export type EditorState = { error?: string; notice?: string };

const str = (f: FormData, k: string) => String(f.get(k) ?? '').trim();
const STATUSES = ['draft', 'reviewed', 'published'] as const;
type Status = (typeof STATUSES)[number];

function parseStatus(value: string): Status {
  return (STATUSES as readonly string[]).includes(value) ? (value as Status) : 'draft';
}

/** Parsea un textarea JSON dando un error legible en vez de reventar. */
function parseJson<T>(raw: string, field: string): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new Error(`El campo ${field} no es JSON válido.`);
  }
}

// ══════════════════════════ BALOTARIO ══════════════════════════

export async function createQuestion(formData: FormData) {
  await requireAdmin();
  const chapterId = str(formData, 'chapter_id');
  if (!chapterId) redirect('/balotario');

  const db = getDb();
  const [row] = await db
    .insert(questions)
    .values({
      chapterId,
      stem: 'Enunciado nuevo',
      options: ['', '', ''],
      answerIndex: 0,
      status: 'draft',
      source: 'elaboración propia',
    })
    .returning({ id: questions.id });

  redirect(`/balotario/${row.id}`);
}

export async function saveQuestion(_prev: EditorState, formData: FormData): Promise<EditorState> {
  const admin = await requireAdmin();
  const id = str(formData, 'id');
  if (!id) return { error: 'Falta la pregunta.' };

  let options: string[];
  let steps: { t: string; p: string; m: string | null }[];
  let distractors: Record<string, string>;
  try {
    options = parseJson<string[]>(str(formData, 'options') || '[]', 'alternativas');
    steps = parseJson(str(formData, 'steps') || '[]', 'pasos');
    distractors = parseJson(str(formData, 'distractors') || '{}', 'distractores');
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'JSON inválido.' };
  }

  if (!Array.isArray(options) || options.length < 2) {
    return { error: 'Hacen falta al menos dos alternativas.' };
  }
  if (options.length > 5) return { error: 'Máximo cinco alternativas.' };

  const answerIndex = Number(formData.get('answer_index') ?? 0);
  if (!Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex >= options.length) {
    return { error: 'La alternativa correcta está fuera de rango.' };
  }

  const status = parseStatus(str(formData, 'status'));
  const stem = str(formData, 'stem');
  if (!stem) return { error: 'El enunciado no puede quedar vacío.' };

  // Nada llega a `published` sin enunciado, alternativas y resolución.
  if (status === 'published' && steps.length === 0) {
    return { error: 'Para publicar hace falta al menos un paso de resolución.' };
  }

  const db = getDb();
  await db
    .update(questions)
    .set({
      stem,
      passage: str(formData, 'passage') || null,
      options,
      answerIndex,
      difficulty: Math.min(3, Math.max(1, Number(formData.get('difficulty') ?? 2))),
      timeTargetS: Math.max(15, Number(formData.get('time_target_s') ?? 90)),
      steps,
      distractors,
      concept: str(formData, 'concept') || null,
      trick: str(formData, 'trick') || null,
      source: str(formData, 'source') || null,
      lessonId: str(formData, 'lesson_id') || null,
      status,
      createdBy: admin.id,
      updatedAt: new Date(),
    })
    .where(eq(questions.id, id));

  revalidatePath('/balotario');
  revalidatePath(`/balotario/${id}`);
  return { notice: `Guardada en estado «${status}».` };
}

export async function deleteQuestion(formData: FormData) {
  await requireAdmin();
  const id = str(formData, 'id');
  await getDb().delete(questions).where(eq(questions.id, id));
  revalidatePath('/balotario');
  redirect('/balotario');
}

// ══════════════════════════ CLASES ══════════════════════════

export async function createLesson(formData: FormData) {
  await requireAdmin();
  const chapterId = str(formData, 'chapter_id');
  if (!chapterId) redirect('/clases');

  const db = getDb();
  const [row] = await db
    .insert(lessons)
    .values({
      chapterId,
      title: 'Clase nueva',
      hook: 'Una frase que diga por qué esto importa. Sin definiciones.',
      minutes: 6,
      status: 'draft',
    })
    .returning({ id: lessons.id });

  redirect(`/clases/${row.id}`);
}

export async function saveLesson(_prev: EditorState, formData: FormData): Promise<EditorState> {
  await requireAdmin();
  const id = str(formData, 'id');
  if (!id) return { error: 'Falta la clase.' };

  const title = str(formData, 'title');
  const hook = str(formData, 'hook');
  if (!title || !hook) return { error: 'El título y el gancho son obligatorios.' };

  const minutes = Math.max(1, Math.min(30, Number(formData.get('minutes') ?? 6)));
  const status = parseStatus(str(formData, 'status'));

  // Regla del diseño: si una clase pasa de 8 minutos, se parte en dos.
  if (status === 'published' && minutes > 8) {
    return { error: 'Una clase de más de 8 minutos debería partirse en dos antes de publicarse.' };
  }

  const db = getDb();
  await db
    .update(lessons)
    .set({ title, hook, minutes, status, slug: str(formData, 'slug') || null })
    .where(eq(lessons.id, id));

  revalidatePath(`/clases/${id}`);
  return { notice: `Guardada en estado «${status}».` };
}

export async function addBlock(formData: FormData) {
  await requireAdmin();
  const lessonId = str(formData, 'lesson_id');
  const kind = str(formData, 'kind') as BlockKind;

  const db = getDb();
  const [{ top }] = await db
    .select({ top: max(lessonBlocks.ord) })
    .from(lessonBlocks)
    .where(eq(lessonBlocks.lessonId, lessonId));

  await db.insert(lessonBlocks).values({
    lessonId,
    ord: (top ?? -1) + 1,
    kind,
    payload: emptyPayload(kind) as never,
  });

  revalidatePath(`/clases/${lessonId}`);
}

export async function saveBlock(_prev: EditorState, formData: FormData): Promise<EditorState> {
  await requireAdmin();
  const id = str(formData, 'id');
  const lessonId = str(formData, 'lesson_id');

  let payload: unknown;
  try {
    payload = parseJson(str(formData, 'payload') || '{}', 'payload del bloque');
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'JSON inválido.' };
  }

  await getDb()
    .update(lessonBlocks)
    .set({ payload: payload as never })
    .where(eq(lessonBlocks.id, id));

  revalidatePath(`/clases/${lessonId}`);
  return { notice: 'Bloque guardado.' };
}

export async function deleteBlock(formData: FormData) {
  await requireAdmin();
  const id = str(formData, 'id');
  const lessonId = str(formData, 'lesson_id');
  await getDb().delete(lessonBlocks).where(eq(lessonBlocks.id, id));
  revalidatePath(`/clases/${lessonId}`);
}

/** Sube o baja un bloque intercambiando `ord` con su vecino. */
export async function moveBlock(formData: FormData) {
  await requireAdmin();
  const id = str(formData, 'id');
  const lessonId = str(formData, 'lesson_id');
  const direction = str(formData, 'direction') === 'up' ? -1 : 1;

  const db = getDb();
  const [current] = await db
    .select({ ord: lessonBlocks.ord })
    .from(lessonBlocks)
    .where(eq(lessonBlocks.id, id))
    .limit(1);
  if (!current) return;

  const targetOrd = current.ord + direction;
  const [neighbour] = await db
    .select({ id: lessonBlocks.id })
    .from(lessonBlocks)
    .where(and(eq(lessonBlocks.lessonId, lessonId), eq(lessonBlocks.ord, targetOrd)))
    .limit(1);
  if (!neighbour) return;

  // el índice único (lesson_id, ord) obliga a pasar por un valor libre
  await db.update(lessonBlocks).set({ ord: -1 }).where(eq(lessonBlocks.id, id));
  await db.update(lessonBlocks).set({ ord: current.ord }).where(eq(lessonBlocks.id, neighbour.id));
  await db.update(lessonBlocks).set({ ord: targetOrd }).where(eq(lessonBlocks.id, id));

  revalidatePath(`/clases/${lessonId}`);
}

export async function addVideo(_prev: EditorState, formData: FormData): Promise<EditorState> {
  await requireAdmin();
  const lessonId = str(formData, 'lesson_id');
  const url = str(formData, 'url');
  const title = str(formData, 'title');
  if (!url || !title) return { error: 'El video necesita título y enlace.' };
  if (!/^https?:\/\//i.test(url)) return { error: 'El enlace debe empezar por http(s).' };

  const db = getDb();
  const [{ top }] = await db
    .select({ top: max(lessonVideos.ord) })
    .from(lessonVideos)
    .where(eq(lessonVideos.lessonId, lessonId));

  await db.insert(lessonVideos).values({
    lessonId,
    title,
    source: str(formData, 'source') || null,
    url,
    ord: (top ?? -1) + 1,
  });

  revalidatePath(`/clases/${lessonId}`);
  return { notice: 'Video vinculado.' };
}

export async function deleteVideo(formData: FormData) {
  await requireAdmin();
  const id = str(formData, 'id');
  const lessonId = str(formData, 'lesson_id');
  await getDb().delete(lessonVideos).where(eq(lessonVideos.id, id));
  revalidatePath(`/clases/${lessonId}`);
}

/** Inserta los borradores que devuelve `/api/generate`. */
export async function insertDrafts(chapterId: string, drafts: unknown[]): Promise<number> {
  const admin = await requireAdmin();
  const db = getDb();

  const rows = drafts.flatMap((d) => {
    const q = d as {
      stem?: string;
      options?: string[];
      answer_index?: number;
      difficulty?: number;
      steps?: { t: string; p: string; m: string | null }[];
      concept?: string;
      trick?: string;
      passage?: string;
    };
    if (!q.stem || !Array.isArray(q.options) || typeof q.answer_index !== 'number') return [];
    return [
      {
        chapterId,
        stem: q.stem,
        passage: q.passage ?? null,
        options: q.options,
        answerIndex: Math.min(q.options.length - 1, Math.max(0, q.answer_index)),
        difficulty: Math.min(3, Math.max(1, q.difficulty ?? 2)),
        steps: q.steps ?? [],
        concept: q.concept ?? null,
        trick: q.trick ?? null,
        source: 'borrador generado',
        // SIEMPRE draft: nada pasa a published sin revisión humana
        status: 'draft' as const,
        createdBy: admin.id,
      },
    ];
  });

  if (!rows.length) return 0;
  await db.insert(questions).values(rows);
  revalidatePath('/balotario');
  return rows.length;
}

// ══════════════════════════ ACCESOS ══════════════════════════

/**
 * Abrir un módulo a un alumno.
 *
 * El cobro es manual: el padre paga por Yape o transferencia y tú abres el
 * acceso aquí. La nota queda como recibo interno («Yape 12/08 · S/ 89»).
 */
export async function grantModule(_prev: EditorState, formData: FormData): Promise<EditorState> {
  const admin = await requireAdmin();

  const userId = str(formData, 'user_id');
  const areaRaw = str(formData, 'area_id');
  const monthsRaw = str(formData, 'months');
  if (!userId) return { error: 'Falta el alumno.' };

  const months = monthsRaw === 'never' ? null : Number(monthsRaw);
  if (months !== null && (!Number.isFinite(months) || months <= 0)) {
    return { error: 'La duración no es válida.' };
  }

  await grantAccess({
    userId,
    areaId: areaRaw === 'all' ? null : areaRaw,
    planId: str(formData, 'plan_id') || null,
    months,
    note: str(formData, 'note') || null,
    grantedBy: admin.id,
  });

  revalidatePath(`/alumnos/${userId}`);
  return { notice: areaRaw === 'all' ? 'Todos los módulos abiertos.' : 'Módulo abierto.' };
}

export async function revokeModule(formData: FormData) {
  await requireAdmin();
  const id = str(formData, 'id');
  const userId = str(formData, 'user_id');
  await revokeAccess(id);
  revalidatePath(`/alumnos/${userId}`);
}
