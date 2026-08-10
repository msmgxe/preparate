import 'server-only';

import { count, eq, sql } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, chapters, lessons, plans, questions } from '@/db/schema';
import type { ModuleCard } from '@/components/landing/Modules';
import type { PlanCard } from '@/components/landing/PlanPicker';
import type { Locale } from '@/lib/i18n/config';
import { tr } from '@/lib/i18n/content';

/**
 * Los módulos tal como se venden, con su temario real.
 *
 * Se leen de la base, no de una constante: cuando publiques más preguntas o
 * clases, la página de venta lo refleja sola.
 */
export async function getLandingModules(locale: Locale = 'es'): Promise<ModuleCard[]> {
  const db = getDb();

  const [allAreas, chapterCounts, questionCounts, lessonCounts, samples] = await Promise.all([
    db.select().from(areas).orderBy(areas.ord),
    db
      .select({ areaId: chapters.areaId, n: count() })
      .from(chapters)
      .groupBy(chapters.areaId),
    db
      .select({ areaId: chapters.areaId, n: count() })
      .from(questions)
      .innerJoin(chapters, eq(chapters.id, questions.chapterId))
      .where(eq(questions.status, 'published'))
      .groupBy(chapters.areaId),
    db
      .select({ areaId: chapters.areaId, n: count() })
      .from(lessons)
      .innerJoin(chapters, eq(chapters.id, lessons.chapterId))
      .where(eq(lessons.status, 'published'))
      .groupBy(chapters.areaId),
    // un enunciado por área, solo para enseñar el tono de las preguntas
    db
      .select({ areaId: chapters.areaId, stem: questions.stem, i18n: questions.i18n })
      .from(questions)
      .innerJoin(chapters, eq(chapters.id, questions.chapterId))
      .where(eq(questions.status, 'published'))
      .orderBy(sql`random()`)
      .limit(40),
  ]);

  const byArea = <T extends { areaId: string; n: number }>(rows: T[]) =>
    new Map(rows.map((r) => [r.areaId, Number(r.n)]));

  const chaptersBy = byArea(chapterCounts);
  const questionsBy = byArea(questionCounts);
  const lessonsBy = byArea(lessonCounts);

  const sampleBy = new Map<string, string>();
  // solo el enunciado se traduce aquí: el resto de la pregunta ni se consulta
  for (const s of samples) if (!sampleBy.has(s.areaId)) sampleBy.set(s.areaId, tr(s, 'stem', locale));

  return allAreas.map((a) => ({
    id: a.id,
    name: tr(a, 'name', locale),
    short: tr(a, 'short', locale),
    symbol: a.symbol,
    accent: a.accent,
    tagline: tr(a, 'tagline', locale),
    blurb: tr(a, 'blurb', locale),
    locales: a.locales,
    status: a.status,
    priceMonth: a.priceMonth,
    priceYear: a.priceYear,
    chapters: chaptersBy.get(a.id) ?? 0,
    questions: questionsBy.get(a.id) ?? 0,
    lessons: lessonsBy.get(a.id) ?? 0,
    // el enunciado puede traer HTML del editor; en la landing va como texto plano
    sample: (sampleBy.get(a.id) ?? null)?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() ?? null,
  }));
}

export async function getLandingPlans(locale: Locale = 'es'): Promise<PlanCard[]> {
  const rows = await getDb().select().from(plans).orderBy(plans.ord);
  return rows.map((p) => ({
    id: p.id,
    name: tr(p, 'name', locale),
    kind: p.kind,
    tagline: tr(p, 'tagline', locale),
    audience: tr(p, 'audience', locale),
    price: p.price,
    period: p.period,
    compareAt: p.compareAt,
    highlight: p.highlight,
    cta: tr(p, 'cta', locale),
    features: (tr(p, 'features', locale) ?? []) as string[],
  }));
}
