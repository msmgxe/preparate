import Link from 'next/link';
import type { Metadata } from 'next';
import { count, desc, eq, sql } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, chapters, lessonBlocks, lessonVideos, lessons } from '@/db/schema';
import { requireAdmin } from '@/lib/auth';
import { createLesson } from '../actions';

export const metadata: Metadata = { title: 'Clases visuales · RUMBO' };

const STATUS_PILL: Record<string, string> = { published: 'g', reviewed: 'y', draft: 'n' };

export default async function ClasesPage() {
  await requireAdmin();
  const db = getDb();

  const [rows, allAreas, allChapters] = await Promise.all([
    db
      .select({
        id: lessons.id,
        title: lessons.title,
        minutes: lessons.minutes,
        status: lessons.status,
        createdAt: lessons.createdAt,
        chapterTitle: chapters.title,
        areaShort: areas.short,
        areaAccent: areas.accent,
        blocks: sql<number>`(select count(*) from ${lessonBlocks} where ${lessonBlocks.lessonId} = ${lessons.id})`,
        videos: sql<number>`(select count(*) from ${lessonVideos} where ${lessonVideos.lessonId} = ${lessons.id})`,
      })
      .from(lessons)
      .innerJoin(chapters, eq(chapters.id, lessons.chapterId))
      .innerJoin(areas, eq(areas.id, chapters.areaId))
      .orderBy(desc(lessons.createdAt)),
    db.select().from(areas).orderBy(areas.ord),
    db
      .select({ id: chapters.id, title: chapters.title, areaId: chapters.areaId })
      .from(chapters)
      .orderBy(chapters.ord),
  ]);

  const [{ n: chapterCount }] = await db.select({ n: count() }).from(chapters);

  return (
    <>
      <section style={{ marginTop: 32 }}>
        <span className="eyebrow">Contenido</span>
        <h1 style={{ marginTop: 10, fontSize: 'clamp(28px,4.6vw,42px)' }}>Clases visuales</h1>
        <p style={{ marginTop: 14, color: '#CFC6B4', fontSize: 17, maxWidth: '62ch' }}>
          {rows.length} de {Number(chapterCount)} capítulos tienen clase. Cada infografía cuesta 1–2
          horas de diseño real: haz primero las de los capítulos donde el grupo está peor y deja el
          resto en resolución paso a paso, que ya es buena. La calibración te dirá cuáles.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <div className="card" style={{ padding: 20 }}>
          <span className="eyebrow">Nueva clase</span>
          <form
            action={createLesson}
            style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}
          >
            <select
              name="chapter_id"
              className="mono"
              style={{
                flex: 1,
                minWidth: 240,
                padding: '11px 14px',
                borderRadius: 10,
                border: '1px solid var(--line-strong)',
                background: 'rgba(8,21,30,.5)',
                color: 'var(--paper)',
              }}
              required
            >
              {allAreas.map((a) => (
                <optgroup label={a.name} key={a.id}>
                  {allChapters
                    .filter((c) => c.areaId === a.id)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
            <button className="btn solid">Crear borrador →</button>
          </form>
        </div>
      </section>

      <section>
        {rows.length === 0 ? (
          <p className="empty">Todavía no hay clases.</p>
        ) : (
          <div className="tblwrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Clase</th>
                  <th>Área</th>
                  <th>Capítulo</th>
                  <th>Min.</th>
                  <th>Bloques</th>
                  <th>Videos</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((l) => (
                  <tr key={l.id}>
                    <td>
                      <Link href={`/clases/${l.id}`}>
                        <b>{l.title}</b>
                      </Link>
                    </td>
                    <td>
                      <span className="tagl" style={{ borderColor: l.areaAccent, color: l.areaAccent }}>
                        {l.areaShort}
                      </span>
                    </td>
                    <td style={{ color: 'var(--paper-dim)', fontSize: 14 }}>{l.chapterTitle}</td>
                    <td className="mono">{l.minutes}</td>
                    <td className="mono">{Number(l.blocks)}</td>
                    <td className="mono">{Number(l.videos)}</td>
                    <td>
                      <span className={`pill ${STATUS_PILL[l.status]}`}>{l.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
