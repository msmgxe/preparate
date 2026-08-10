import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, chapters } from '@/db/schema';
import { requireAdmin } from '@/lib/auth';
import { env } from '@/lib/env';
import { insertDrafts } from '@/app/(admin)/actions';
import { SCHEMA, SYSTEM, buildPrompt } from '@/lib/question-gen';

/**
 * Generación asistida de preguntas con la Claude API.
 *
 * Todo lo que sale de aquí entra como `draft`. Nada pasa a `published` sin tu
 * visto bueno: una pregunta de examen mal calibrada enseña mal.
 */

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

  const prompt = buildPrompt({
    areaName: chapter.areaName,
    chapterTitle: chapter.title,
    count,
    notes: body.notes,
  });

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
