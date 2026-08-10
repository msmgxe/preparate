import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { eq, inArray } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, chapters, lessonBlocks, lessonVideos, lessons, visuals } from '@/db/schema';
import { getI18n } from '@/lib/i18n';
import { requireAdmin } from '@/lib/auth';
import { BLOCK_KINDS, BLOCK_LABEL, toBlock, type Block } from '@/lib/blocks';
import { sanitizeSvg } from '@/components/SafeHtml';
import { LessonRenderer } from '@/components/lesson/LessonRenderer';
import { BlockEditor } from './BlockEditor';
import { LessonMeta } from './LessonMeta';
import { addBlock } from '../../actions';

export const metadata: Metadata = { title: 'Editar clase · RUMBO' };

export default async function EditarClasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireAdmin();
  const { t } = await getI18n();
  const db = getDb();

  const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id)).limit(1);
  if (!lesson) notFound();

  const [[context], rawBlocks, videos] = await Promise.all([
    db
      .select({ chapterTitle: chapters.title, areaName: areas.name, areaAccent: areas.accent })
      .from(chapters)
      .innerJoin(areas, eq(areas.id, chapters.areaId))
      .where(eq(chapters.id, lesson.chapterId))
      .limit(1),
    db.select().from(lessonBlocks).where(eq(lessonBlocks.lessonId, id)).orderBy(lessonBlocks.ord),
    db.select().from(lessonVideos).where(eq(lessonVideos.lessonId, id)).orderBy(lessonVideos.ord),
  ]);

  const blocks = rawBlocks
    .map((row) => toBlock({ id: row.id, ord: row.ord, kind: row.kind, payload: row.payload }))
    .filter((b): b is Block => b !== null);

  const vizIds = blocks.flatMap((b) => (b.kind === 'viz' ? [b.payload.viz_id] : []));
  const svgRows = vizIds.length
    ? await db.select({ id: visuals.id, svg: visuals.svg }).from(visuals).where(inArray(visuals.id, vizIds))
    : [];
  const svgById = Object.fromEntries(svgRows.map((v) => [v.id, sanitizeSvg(v.svg)]));

  const allVisuals = await db.select({ id: visuals.id, caption: visuals.caption }).from(visuals);

  return (
    <>
      <Link className="back" href="/clases">
        ← Volver a las clases
      </Link>

      <section style={{ marginTop: 8 }}>
        <span className="eyebrow" style={{ color: context?.areaAccent }}>
          {context?.areaName} · {context?.chapterTitle}
        </span>
        <h1 style={{ marginTop: 10, fontSize: 'clamp(24px,4vw,34px)' }}>{lesson.title}</h1>
      </section>

      <section style={{ marginTop: 26 }}>
        <div className="editgrid">
          <div>
            <LessonMeta lesson={lesson} videos={videos} />

            <div style={{ marginTop: 20 }}>
              <div className="shead">
                <h2 style={{ fontSize: 19 }}>Bloques</h2>
                <div className="rule" />
              </div>

              <div className="blocklist">
                {blocks.length === 0 && (
                  <p className="empty">
                    Sin bloques. El orden recomendado: hook · intuición · infografía · método ·
                    callout · 2ª mirada · checkpoint · errores · video.
                  </p>
                )}
                {blocks.map((block, i) => (
                  <BlockEditor
                    key={block.id}
                    block={block}
                    lessonId={lesson.id}
                    isFirst={i === 0}
                    isLast={i === blocks.length - 1}
                  />
                ))}
              </div>

              <div className="card" style={{ marginTop: 14, padding: 18 }}>
                <span className="eyebrow">Añadir bloque</span>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                  {BLOCK_KINDS.map((kind) => (
                    <form action={addBlock} key={kind}>
                      <input type="hidden" name="lesson_id" value={lesson.id} />
                      <input type="hidden" name="kind" value={kind} />
                      <button className="btn sm">+ {BLOCK_LABEL[kind]}</button>
                    </form>
                  ))}
                </div>
                {allVisuals.length > 0 && (
                  <p className="hint" style={{ textAlign: 'left' }}>
                    Infografías disponibles para <span className="mono">viz_id</span>:{' '}
                    <span className="mono">{allVisuals.map((v) => v.id).join(', ')}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Previsualización lado a lado: la clase tal como la lee el alumno */}
          <div>
            <span className="eyebrow">Previsualización</span>
            <div className="lesson" style={{ marginTop: 12 }}>
              <div className="lhead">
                <span className="eyebrow" style={{ color: context?.areaAccent }}>
                  Clase · {context?.chapterTitle} · {lesson.minutes} min
                </span>
                <h3>{lesson.title}</h3>
                <p>{lesson.hook}</p>
              </div>
              <LessonRenderer
                lessonId={lesson.id}
                blocks={blocks}
                visuals={svgById}
                videos={videos}
            t={t}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
