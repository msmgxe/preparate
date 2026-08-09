import 'server-only';

import { count, desc, eq, sql } from 'drizzle-orm';
import { getDb } from '@/db';
import {
  areas,
  attempts,
  chapters,
  lessonVideos,
  lessons,
  questions,
  vAreaMastery,
  vChapterMastery,
  vQuestionCalibration,
  vStudentStats,
  vStudentWeekly,
} from '@/db/schema';

const PALETTE = ['#EFA451', '#66BFE8', '#FF5F57', '#B08BE8', '#4FD69C'];

export type StudentRow = {
  userId: string;
  name: string;
  email: string | null;
  color: string;
  targetOrg: string | null;
  streak: number;
  sessions: number;
  accuracy: number | null;
  minutesWeek: number;
  minutesTotal: number;
  exams: number;
  lastActive: Date | null;
  daysIdle: number | null;
  trend: number | null;
  status: 'g' | 'y' | 'r';
};

/** Las 8 últimas semanas como etiquetas S1…S8 y sus fechas de inicio. */
export function lastEightWeeks(): { key: string; label: string }[] {
  const weeks: { key: string; label: string }[] = [];
  const monday = new Date();
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7)); // lunes de esta semana

  for (let i = 7; i >= 0; i--) {
    const d = new Date(monday);
    d.setDate(d.getDate() - i * 7);
    weeks.push({ key: d.toISOString().slice(0, 10), label: `S${8 - i}` });
  }
  return weeks;
}

const daysBetween = (a: Date, b: Date) =>
  Math.floor((b.getTime() - a.getTime()) / 86_400_000);

/** Tabla de alumnos con tendencia y semáforo. */
export async function getStudents(): Promise<StudentRow[]> {
  const db = getDb();
  const [stats, weekly] = await Promise.all([
    db.select().from(vStudentStats).orderBy(desc(vStudentStats.lastActive)),
    db.select().from(vStudentWeekly),
  ]);

  const weeks = lastEightWeeks();
  const now = new Date();

  const byUser = new Map<string, Map<string, number>>();
  for (const w of weekly) {
    if (!w.userId || !w.week) continue;
    const map = byUser.get(w.userId) ?? new Map();
    map.set(String(w.week), Number(w.pct));
    byUser.set(w.userId, map);
  }

  return stats.map((s, i) => {
    const points = weeks.map((w) => byUser.get(s.userId!)?.get(w.key) ?? null);
    const known = points.filter((p): p is number => p !== null);
    // tendencia = últimas 4 semanas contra las 4 anteriores
    const recent = points.slice(4).filter((p): p is number => p !== null);
    const older = points.slice(0, 4).filter((p): p is number => p !== null);
    const trend =
      recent.length && older.length
        ? Math.round(
            recent.reduce((a, b) => a + b, 0) / recent.length -
              older.reduce((a, b) => a + b, 0) / older.length,
          )
        : null;

    const lastActive = s.lastActive ? new Date(s.lastActive) : null;
    const daysIdle = lastActive ? daysBetween(lastActive, now) : null;
    const accuracy = s.accuracy === null ? null : Number(s.accuracy);

    let status: StudentRow['status'] = 'g';
    if ((daysIdle ?? 99) >= 4 || (trend ?? 0) <= -8 || (accuracy ?? 100) < 50) status = 'r';
    else if ((daysIdle ?? 0) >= 2 || (accuracy ?? 100) < 65) status = 'y';

    return {
      userId: s.userId!,
      name: s.displayName ?? 'Alumno',
      email: s.email,
      color: s.avatarHex || PALETTE[i % PALETTE.length],
      targetOrg: s.targetOrg,
      streak: Number(s.streak ?? 0),
      sessions: Number(s.sessions ?? 0),
      accuracy,
      minutesWeek: Number(s.minutesWeek ?? 0),
      minutesTotal: Number(s.minutesTotal ?? 0),
      exams: Number(s.exams ?? 0),
      lastActive,
      daysIdle,
      trend,
      status,
      // `known` solo se usa para saber si hay serie dibujable
      ...(known.length ? {} : {}),
    };
  });
}

/** Serie semanal por alumno, alineada a las 8 semanas del panel. */
export async function getWeeklySeries() {
  const db = getDb();
  const weekly = await db.select().from(vStudentWeekly);
  const weeks = lastEightWeeks();

  const byUser = new Map<string, Map<string, number>>();
  for (const w of weekly) {
    if (!w.userId || !w.week) continue;
    const map = byUser.get(w.userId) ?? new Map();
    map.set(String(w.week), Number(w.pct));
    byUser.set(w.userId, map);
  }

  return {
    weeks,
    pointsFor: (userId: string) => weeks.map((w) => byUser.get(userId)?.get(w.key) ?? null),
  };
}

export async function getAreas() {
  return getDb().select().from(areas).orderBy(areas.ord);
}

/** Dominio por alumno y área, para el mapa de calor. */
export async function getAreaMastery() {
  const rows = await getDb().select().from(vAreaMastery);
  const map = new Map<string, number>();
  for (const r of rows) map.set(`${r.userId}|${r.areaId}`, Number(r.pct));
  return (userId: string, areaId: string) => map.get(`${userId}|${areaId}`) ?? null;
}

/** Capítulos flojos de todo el grupo: los que suben a alerta. */
export async function getWeakGroupChapters(limit = 3) {
  const db = getDb();
  const rows = await db
    .select({
      title: vChapterMastery.title,
      areaId: vChapterMastery.areaId,
      pct: sql<number>`round(avg(${vChapterMastery.pct}))`,
      n: sql<number>`sum(${vChapterMastery.n})`,
      students: count(),
    })
    .from(vChapterMastery)
    .groupBy(vChapterMastery.chapterId, vChapterMastery.title, vChapterMastery.areaId)
    .having(sql`sum(${vChapterMastery.n}) >= 5`)
    .orderBy(sql`avg(${vChapterMastery.pct}) asc`)
    .limit(limit);

  return rows.map((r) => ({ ...r, pct: Number(r.pct), n: Number(r.n) }));
}

/** Capítulos flojos de un alumno concreto. */
export async function getWeakChaptersFor(userId: string, limit = 5) {
  const db = getDb();
  return db
    .select({
      chapterId: vChapterMastery.chapterId,
      title: vChapterMastery.title,
      areaId: vChapterMastery.areaId,
      pct: vChapterMastery.pct,
      n: vChapterMastery.n,
    })
    .from(vChapterMastery)
    .where(eq(vChapterMastery.userId, userId))
    .orderBy(vChapterMastery.pct)
    .limit(limit);
}

/**
 * Calibración del balotario.
 *
 * Reglas del plan: < 45 % de acierto → revisar redacción; > 92 % → demasiado
 * fácil; tiempo medio > 2 × objetivo → tiempo alto.
 */
export type Calibration = {
  id: string;
  stem: string;
  areaId: string;
  chapter: string;
  timesSeen: number;
  pctCorrect: number;
  avgSeconds: number;
  timeTargetS: number;
  diagnosis: string;
  level: 'g' | 'y' | 'r' | 'n';
};

export async function getCalibration(minSeen = 10): Promise<Calibration[]> {
  const db = getDb();
  const rows = await db.select().from(vQuestionCalibration).orderBy(desc(vQuestionCalibration.timesSeen));

  return rows
    .filter((r) => Number(r.timesSeen) >= minSeen)
    .map((r) => {
      const pct = Number(r.pctCorrect);
      const avg = Number(r.avgSeconds);
      const target = Number(r.timeTargetS);

      let diagnosis = 'Bien calibrada';
      let level: Calibration['level'] = 'g';
      if (pct < 45) {
        diagnosis = 'Muy baja — revisar redacción';
        level = 'r';
      } else if (pct > 92) {
        diagnosis = 'Demasiado fácil';
        level = 'n';
      } else if (avg > target * 2) {
        diagnosis = 'Tiempo alto';
        level = 'y';
      }

      return {
        id: r.id!,
        stem: r.stem ?? '',
        areaId: r.areaId ?? '',
        chapter: r.chapter ?? '',
        timesSeen: Number(r.timesSeen),
        pctCorrect: pct,
        avgSeconds: avg,
        timeTargetS: target,
        diagnosis,
        level,
      };
    });
}

/** Contadores de la sección "Contenido". */
export async function getContentCounters() {
  const db = getDb();
  const [byStatus, lessonRows, videoRows, chapterRows] = await Promise.all([
    db.select({ status: questions.status, n: count() }).from(questions).groupBy(questions.status),
    db.select({ status: lessons.status, n: count() }).from(lessons).groupBy(lessons.status),
    db.select({ n: count() }).from(lessonVideos),
    db.select({ n: count() }).from(chapters),
  ]);

  const q = Object.fromEntries(byStatus.map((r) => [r.status, Number(r.n)]));
  const l = Object.fromEntries(lessonRows.map((r) => [r.status, Number(r.n)]));

  return {
    published: q.published ?? 0,
    reviewed: q.reviewed ?? 0,
    draft: q.draft ?? 0,
    lessonsPublished: l.published ?? 0,
    lessonsTotal: Object.values(l).reduce((a, b) => a + b, 0),
    videos: Number(videoRows[0]?.n ?? 0),
    chapters: Number(chapterRows[0]?.n ?? 0),
  };
}

/** Últimas sesiones de un alumno, para su ficha. */
export async function getSessionsFor(userId: string, limit = 10) {
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
    .where(eq(attempts.userId, userId))
    .orderBy(desc(attempts.startedAt))
    .limit(limit);
}
