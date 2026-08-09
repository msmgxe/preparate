import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, chapters } from '@/db/schema';
import { requireAdmin } from '@/lib/auth';
import { env } from '@/lib/env';
import { insertDrafts } from '@/app/(admin)/actions';

/**
 * Generación asistida de preguntas con la Claude API.
 *
 * Todo lo que sale de aquí entra como `draft`. Nada pasa a `published` sin tu
 * visto bueno: una pregunta de examen mal calibrada enseña mal.
 */

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['questions'],
  properties: {
    questions: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['stem', 'options', 'answer_index', 'difficulty', 'steps', 'concept', 'trick'],
        properties: {
          stem: { type: 'string' },
          passage: { type: 'string' },
          options: { type: 'array', items: { type: 'string' } },
          answer_index: { type: 'integer', enum: [0, 1, 2, 3, 4] },
          difficulty: { type: 'integer', enum: [1, 2, 3] },
          steps: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['t', 'p', 'm'],
              properties: {
                t: { type: 'string' },
                p: { type: 'string' },
                m: { type: 'string' },
              },
            },
          },
          concept: { type: 'string' },
          trick: { type: 'string' },
        },
      },
    },
  },
} as const;

const SYSTEM = `Eres un redactor de exámenes de admisión peruanos (ISIL, USIL, UPC, U. de Lima).
Escribes en español del Perú, con contexto local cuando ayuda (soles, distritos de Lima, turismo, hotelería).

Reglas de redacción:
- El enunciado se lee una sola vez y no admite ambigüedad.
- Entre 3 y 5 alternativas. Exactamente una correcta.
- Los distractores representan errores reales de razonamiento, no ruido. El error más común va primero.
- La resolución tiene entre 3 y 5 pasos. Cada paso: "t" es la acción, "p" explica el porqué en una o dos frases, "m" es el bloque de cálculo en monoespaciado (cadena vacía si no aplica).
- "concept" nombra la idea general que se transfiere a otras preguntas.
- "trick" es el atajo que ahorra tiempo en el examen.
- Nunca empieces la explicación por la definición formal: primero la intuición, la fórmula al final.
- HTML permitido en el enunciado solo para <b>, <br> y <span class="math">.`;

export async function POST(request: Request) {
  await requireAdmin();

  if (!env.anthropicKey) {
    return NextResponse.json(
      { error: 'Falta ANTHROPIC_API_KEY en el entorno del servidor.' },
      { status: 501 },
    );
  }

  let body: { chapter_id?: string; count?: number; notes?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo inválido.' }, { status: 400 });
  }

  const chapterId = body.chapter_id;
  const count = Math.max(1, Math.min(8, Math.round(body.count ?? 4)));
  if (!chapterId) return NextResponse.json({ error: 'Falta el capítulo.' }, { status: 400 });

  const db = getDb();
  const [chapter] = await db
    .select({ title: chapters.title, areaName: areas.name })
    .from(chapters)
    .innerJoin(areas, eq(areas.id, chapters.areaId))
    .where(eq(chapters.id, chapterId))
    .limit(1);

  if (!chapter) return NextResponse.json({ error: 'Ese capítulo no existe.' }, { status: 404 });

  const client = new Anthropic({ apiKey: env.anthropicKey });

  const prompt = [
    `Área: ${chapter.areaName}`,
    `Capítulo: ${chapter.title}`,
    `Escribe ${count} preguntas nuevas de opción múltiple para este capítulo.`,
    body.notes ? `Indicaciones adicionales: ${body.notes}` : '',
    'Varía la dificultad: al menos una de nivel 1 y una de nivel 3.',
    'Usa "passage" solo si la pregunta requiere un texto de lectura.',
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const response = await client.messages.create({
      model: 'claude-opus-5',
      max_tokens: 16000,
      system: SYSTEM,
      output_config: { format: { type: 'json_schema', schema: SCHEMA } },
      messages: [{ role: 'user', content: prompt }],
    });

    if (response.stop_reason === 'refusal') {
      return NextResponse.json(
        { error: 'El modelo declinó la solicitud. Ajusta las indicaciones.' },
        { status: 422 },
      );
    }

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('');

    let parsed: { questions?: unknown[] };
    try {
      parsed = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: 'La respuesta del modelo no vino en JSON válido. Intenta de nuevo.' },
        { status: 502 },
      );
    }

    const inserted = await insertDrafts(chapterId, parsed.questions ?? []);

    return NextResponse.json({
      inserted,
      message:
        inserted === 0
          ? 'El modelo no devolvió preguntas utilizables.'
          : `${inserted} ${inserted === 1 ? 'borrador creado' : 'borradores creados'}. Revísalos antes de publicar.`,
    });
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: `Claude API (${error.status}): ${error.message}` },
        { status: 502 },
      );
    }
    return NextResponse.json({ error: 'No se pudo generar. Intenta de nuevo.' }, { status: 500 });
  }
}
