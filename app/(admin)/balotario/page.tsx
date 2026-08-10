import Link from 'next/link';
import type { Metadata } from 'next';
import { and, desc, eq, type SQL } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, chapters, questions } from '@/db/schema';
import { requireAdmin } from '@/lib/auth';
import { createQuestion } from '../actions';
import { GenerateDrafts } from './GenerateDrafts';

export const metadata: Metadata = { title: 'Balotario · RUMBO' };

const STATUS_PILL: Record<string, string> = { published: 'g', reviewed: 'y', draft: 'n' };
const STATUS_LABEL: Record<string, string> = {
  published: 'Publicada',
  reviewed: 'Revisada',
  draft: 'Borrador',
};

export default async function BalotarioPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string; area?: string }>;
}) {
  await requireAdmin();
  const { estado, area } = await searchParams;
  const db = getDb();

  const filters: SQL[] = [];
  if (estado && ['draft', 'reviewed', 'published'].includes(estado)) {
    filters.push(eq(questions.status, estado as 'draft' | 'reviewed' | 'published'));
  }
  if (area) filters.push(eq(chapters.areaId, area));

  const [rows, allAreas, allChapters] = await Promise.all([
    db
      .select({
        id: questions.id,
        stem: questions.stem,
        status: questions.status,
        difficulty: questions.difficulty,
        updatedAt: questions.updatedAt,
        chapterTitle: chapters.title,
        areaId: areas.id,
        areaShort: areas.short,
        areaAccent: areas.accent,
        lessonId: questions.lessonId,
      })
      .from(questions)
      .innerJoin(chapters, eq(chapters.id, questions.chapterId))
      .innerJoin(areas, eq(areas.id, chapters.areaId))
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(desc(questions.updatedAt))
      .limit(300),
    db.select().from(areas).orderBy(areas.ord),
    db
      .select({ id: chapters.id, title: chapters.title, areaId: chapters.areaId })
      .from(chapters)
      .orderBy(chapters.ord),
  ]);

  return (
    <>
      <section style={{ marginTop: 32 }}>
        <span className="eyebrow">Contenido</span>
        <h1 style={{ marginTop: 10, fontSize: 'clamp(28px,4.6vw,42px)' }}>Balotario</h1>
      </section>

      <section style={{ marginTop: 24 }}>
        <div className="tabs">
          <Link className={`tab${!estado ? ' on' : ''}`} href="/balotario">
            Todas ({rows.length})
          </Link>
          <Link className={`tab${estado === 'draft' ? ' on' : ''}`} href="/balotario?estado=draft">
            Borradores
          </Link>
          <Link
            className={`tab${estado === 'reviewed' ? ' on' : ''}`}
            href="/balotario?estado=reviewed"
          >
            Revisadas
          </Link>
          <Link
            className={`tab${estado === 'published' ? ' on' : ''}`}
            href="/balotario?estado=published"
          >
            Publicadas
          </Link>
        </div>

        <div className="tabs">
          <Link className={`tab${!area ? ' on' : ''}`} href={`/balotario${estado ? `?estado=${estado}` : ''}`}>
            Todas las áreas
          </Link>
          {allAreas.map((a) => (
            <Link
              key={a.id}
              className={`tab${area === a.id ? ' on' : ''}`}
              href={`/balotario?area=${a.id}${estado ? `&estado=${estado}` : ''}`}
            >
              {a.short}
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <span className="eyebrow">Nueva pregunta</span>
          <form
            action={createQuestion}
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
                background: 'rgba(var(--bg-rgb),.5)',
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

        <GenerateDrafts areas={allAreas} chapters={allChapters} />
      </section>

      <section>
        {rows.length === 0 ? (
          <p className="empty">No hay preguntas con ese filtro.</p>
        ) : (
          <div className="tblwrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Enunciado</th>
                  <th>Área</th>
                  <th>Capítulo</th>
                  <th>Dif.</th>
                  <th>Clase</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((q) => (
                  <tr key={q.id}>
                    <td style={{ maxWidth: 380 }}>
                      <Link href={`/balotario/${q.id}`}>
                        {q.stem.replace(/<[^>]+>/g, ' ').trim().slice(0, 90)}…
                      </Link>
                    </td>
                    <td>
                      <span
                        className="tagl"
                        style={{ borderColor: q.areaAccent, color: q.areaAccent }}
                      >
                        {q.areaShort}
                      </span>
                    </td>
                    <td style={{ color: 'var(--paper-dim)', fontSize: 14 }}>{q.chapterTitle}</td>
                    <td className="mono">
                      {'●'.repeat(q.difficulty)}
                      {'○'.repeat(3 - q.difficulty)}
                    </td>
                    <td className="mono" style={{ color: 'var(--paper-dim)' }}>
                      {q.lessonId ? '◐' : '—'}
                    </td>
                    <td>
                      <span className={`pill ${STATUS_PILL[q.status]}`}>
                        {STATUS_LABEL[q.status]}
                      </span>
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
