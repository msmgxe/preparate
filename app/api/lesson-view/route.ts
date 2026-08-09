import { NextResponse } from 'next/server';
import { getDb } from '@/db';
import { lessonViews } from '@/db/schema';
import { getProfile } from '@/lib/auth';

/**
 * Telemetría de la clase visual. Se llama con `navigator.sendBeacon` al salir,
 * así que acepta texto plano y responde corto.
 *
 * Sirve para una sola pregunta del panel: ¿abrió la clase antes de practicar y
 * llegó al final? Nada de esto se le oculta al alumno.
 */
export async function POST(request: Request) {
  let body: {
    lesson_id?: string;
    seconds?: number;
    scroll_pct?: number;
    check_ok?: boolean | null;
    video_click?: boolean;
  };
  try {
    body = JSON.parse(await request.text());
  } catch {
    return NextResponse.json({ error: 'Cuerpo inválido.' }, { status: 400 });
  }

  if (!body.lesson_id) return NextResponse.json({ error: 'Falta la clase.' }, { status: 400 });

  const profile = await getProfile();
  if (!profile) return NextResponse.json({ error: 'Sin sesión.' }, { status: 401 });

  const clamp = (n: number, max: number) => Math.max(0, Math.min(max, Math.round(n)));

  await getDb()
    .insert(lessonViews)
    .values({
      userId: profile.id,
      lessonId: body.lesson_id,
      seconds: clamp(body.seconds ?? 0, 7200),
      scrollPct: clamp(body.scroll_pct ?? 0, 100),
      checkOk: body.check_ok ?? null,
      videoClick: Boolean(body.video_click),
    });

  return NextResponse.json({ ok: true });
}
