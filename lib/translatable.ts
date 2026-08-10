import 'server-only';

import { and, asc, eq, inArray, sql } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, chapters, lessons, plans, questions } from '@/db/schema';
import type { Locale } from '@/lib/i18n/config';

/**
 * Qué se puede traducir desde el panel.
 *
 * Solo campos de texto planos y listas de texto. Los pasos de la resolución y
 * los bloques de una clase son objetos anidados con forma variable: editarlos
 * en un formulario genérico sería una fuente de datos rotos, así que viven en
 * `docs/i18n-content.ts` y se aplican con `npm run db:i18n`.
 */
export type FieldKind = 'line' | 'text' | 'list';

export type Field = { name: string; label: string; kind: FieldKind };

export type Group = {
  /** Identifica la tabla en la acción de guardado. */
  table: 'areas' | 'chapters' | 'lessons' | 'plans' | 'questions';
  title: string;
  hint: string;
  fields: Field[];
};

export const GROUPS: Group[] = [
  {
    table: 'areas',
    title: 'Módulos',
    hint: 'Lo que se ve en la landing y en el itinerario.',
    fields: [
      { name: 'name', label: 'Nombre', kind: 'line' },
      { name: 'short', label: 'Sigla', kind: 'line' },
      { name: 'tagline', label: 'Frase corta', kind: 'line' },
      { name: 'blurb', label: 'Descripción', kind: 'text' },
    ],
  },
  {
    table: 'chapters',
    title: 'Capítulos',
    hint: 'Los títulos del temario.',
    fields: [{ name: 'title', label: 'Título', kind: 'line' }],
  },
  {
    table: 'lessons',
    title: 'Clases',
    hint: 'Título y gancho. Los bloques de dentro se traducen desde el repositorio.',
    fields: [
      { name: 'title', label: 'Título', kind: 'line' },
      { name: 'hook', label: 'Gancho', kind: 'text' },
    ],
  },
  {
    table: 'questions',
    title: 'Preguntas',
    hint: 'Enunciado, alternativas y cierre. Los pasos guiados se traducen desde el repositorio.',
    fields: [
      { name: 'stem', label: 'Enunciado', kind: 'text' },
      { name: 'passage', label: 'Lectura', kind: 'text' },
      { name: 'options', label: 'Alternativas (una por línea)', kind: 'list' },
      { name: 'concept', label: 'Concepto clave', kind: 'text' },
      { name: 'trick', label: 'Truco de examen', kind: 'text' },
    ],
  },
  {
    table: 'plans',
    title: 'Planes',
    hint: 'Los precios no se traducen: el importe es el mismo en soles.',
    fields: [
      { name: 'name', label: 'Nombre', kind: 'line' },
      { name: 'tagline', label: 'Frase corta', kind: 'line' },
      { name: 'audience', label: 'Para quién es', kind: 'line' },
      { name: 'cta', label: 'Botón', kind: 'line' },
      { name: 'features', label: 'Beneficios (uno por línea)', kind: 'list' },
    ],
  },
];

export type Row = {
  id: string;
  /** Cómo se reconoce la fila en la lista. */
  label: string;
  /** Valor en español de cada campo, para tenerlo al lado. */
  source: Record<string, string>;
  /** Traducción guardada para el idioma pedido. */
  target: Record<string, string>;
};

/** Convierte cualquier valor a lo que se pinta en el formulario. */
function asText(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (Array.isArray(value)) return value.map(String).join('\n');
  return String(value);
}

function pick(
  fields: Field[],
  row: Record<string, unknown>,
  bag: Record<string, unknown> | null | undefined,
): { source: Record<string, string>; target: Record<string, string> } {
  const source: Record<string, string> = {};
  const target: Record<string, string> = {};
  for (const field of fields) {
    source[field.name] = asText(row[field.name]);
    target[field.name] = asText(bag?.[field.name]);
  }
  return { source, target };
}

/**
 * Todo lo traducible de un grupo, ya emparejado con su traducción.
 *
 * Un módulo que no se ofrece en ese idioma queda fuera, con su temario y sus
 * clases: aparecería siempre como «sin traducir» y sería una tarea que nadie
 * debe hacer. Hoy es el caso del módulo de Inglés, que se vende solo en español.
 */
export async function getRows(group: Group, locale: Locale): Promise<Row[]> {
  const db = getDb();
  const offered = sql`${areas.locales} @> array[${locale}]::text[]`;

  if (group.table === 'areas') {
    const rows = await db.select().from(areas).where(offered).orderBy(areas.ord);
    return rows.map((r) => ({
      id: r.id,
      label: r.name,
      ...pick(group.fields, r, r.i18n?.[locale]),
    }));
  }

  const areaIds = (await db.select({ id: areas.id }).from(areas).where(offered)).map((a) => a.id);

  if (group.table === 'chapters') {
    const rows = await db
      .select({ id: chapters.id, title: chapters.title, areaId: chapters.areaId, i18n: chapters.i18n })
      .from(chapters)
      .where(inArray(chapters.areaId, areaIds))
      .orderBy(asc(chapters.areaId), asc(chapters.ord));
    return rows.map((r) => ({
      id: r.id,
      label: `${r.areaId.toUpperCase()} · ${r.title}`,
      ...pick(group.fields, r, r.i18n?.[locale]),
    }));
  }

  if (group.table === 'lessons') {
    const rows = await db
      .select({ id: lessons.id, title: lessons.title, hook: lessons.hook, i18n: lessons.i18n })
      .from(lessons)
      .innerJoin(chapters, eq(chapters.id, lessons.chapterId))
      .where(inArray(chapters.areaId, areaIds))
      .orderBy(lessons.title);
    return rows.map((r) => ({
      id: r.id,
      label: r.title,
      ...pick(group.fields, r, r.i18n?.[locale]),
    }));
  }

  if (group.table === 'plans') {
    const rows = await db.select().from(plans).orderBy(plans.ord);
    return rows.map((r) => ({
      id: r.id,
      label: r.name,
      ...pick(group.fields, r, r.i18n?.[locale]),
    }));
  }

  const rows = await db
    .select({
      id: questions.id,
      stem: questions.stem,
      passage: questions.passage,
      options: questions.options,
      concept: questions.concept,
      trick: questions.trick,
      i18n: questions.i18n,
    })
    .from(questions)
    .innerJoin(chapters, eq(chapters.id, questions.chapterId))
    .where(and(eq(questions.status, 'published'), inArray(chapters.areaId, areaIds)))
    .orderBy(questions.createdAt);
  return rows.map((r) => ({
    id: r.id,
    label: r.stem.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 70),
    ...pick(group.fields, r, r.i18n?.[locale]),
  }));
}
