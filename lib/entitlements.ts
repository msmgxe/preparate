import 'server-only';

import { and, asc, eq, inArray } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, chapters, entitlements, lessons, vUserModules } from '@/db/schema';

/**
 * Quién puede ver qué.
 *
 * Un módulo está **abierto** si el alumno tiene un acceso vigente sobre él
 * (o uno global, con `area_id` nulo). Si no lo está, queda una muestra: la
 * primera clase del módulo y sesiones cortas de `free_questions` preguntas.
 * La idea es que se pueda probar de verdad antes de pagar, sin regalar el
 * curso entero.
 */
export type Access = {
  open: Set<string>;
  /** Cuántas preguntas puede practicar en un módulo cerrado. */
  freeQuestions: Map<string, number>;
  /** Clase de muestra por módulo cerrado: la primera del temario. */
  freeLesson: Map<string, string>;
  isOpen: (areaId: string) => boolean;
  /** Tope de preguntas para una sesión de ese módulo. */
  limitFor: (areaId: string) => number;
  canReadLesson: (areaId: string, lessonId: string) => boolean;
};

export async function getAccess(userId: string): Promise<Access> {
  const db = getDb();

  const [granted, allAreas] = await Promise.all([
    db.select({ areaId: vUserModules.areaId }).from(vUserModules).where(eq(vUserModules.userId, userId)),
    db.select({ id: areas.id, free: areas.freeQuestions }).from(areas),
  ]);

  const open = new Set(granted.map((g) => g.areaId).filter((id): id is string => !!id));
  const freeQuestions = new Map(allAreas.map((a) => [a.id, a.free]));

  // la primera clase publicada de cada módulo cerrado queda abierta como muestra
  const closed = allAreas.map((a) => a.id).filter((id) => !open.has(id));
  const freeLesson = new Map<string, string>();

  if (closed.length) {
    const rows = await db
      .select({ areaId: chapters.areaId, lessonId: lessons.id, ord: chapters.ord })
      .from(lessons)
      .innerJoin(chapters, eq(chapters.id, lessons.chapterId))
      .where(and(eq(lessons.status, 'published'), inArray(chapters.areaId, closed)))
      .orderBy(asc(chapters.ord));

    for (const r of rows) if (!freeLesson.has(r.areaId)) freeLesson.set(r.areaId, r.lessonId);
  }

  const isOpen = (areaId: string) => open.has(areaId);

  return {
    open,
    freeQuestions,
    freeLesson,
    isOpen,
    limitFor: (areaId) => (isOpen(areaId) ? Number.MAX_SAFE_INTEGER : (freeQuestions.get(areaId) ?? 0)),
    canReadLesson: (areaId, lessonId) =>
      isOpen(areaId) || freeLesson.get(areaId) === lessonId,
  };
}

/** Conceder un módulo (o todos, con `areaId` nulo) desde el panel. */
export async function grantAccess(opts: {
  userId: string;
  areaId: string | null;
  planId: string | null;
  months: number | null;
  note: string | null;
  grantedBy: string;
}) {
  const expiresAt = opts.months
    ? new Date(Date.now() + opts.months * 30 * 24 * 60 * 60 * 1000)
    : null;

  await getDb().insert(entitlements).values({
    userId: opts.userId,
    areaId: opts.areaId,
    planId: opts.planId,
    note: opts.note,
    grantedBy: opts.grantedBy,
    expiresAt,
  });
}

export async function revokeAccess(id: string) {
  await getDb().update(entitlements).set({ status: 'revoked' }).where(eq(entitlements.id, id));
}

/** Accesos de un alumno, para la ficha del panel. */
export async function getEntitlementsFor(userId: string) {
  return getDb()
    .select({
      id: entitlements.id,
      areaId: entitlements.areaId,
      planId: entitlements.planId,
      status: entitlements.status,
      expiresAt: entitlements.expiresAt,
      note: entitlements.note,
      createdAt: entitlements.createdAt,
    })
    .from(entitlements)
    .where(eq(entitlements.userId, userId))
    .orderBy(entitlements.createdAt);
}
