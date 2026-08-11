import Link from 'next/link';
import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { chapters, questions } from '@/db/schema';
import { getI18n } from '@/lib/i18n';
import { requireUser } from '@/lib/auth';
import { getAccess } from '@/lib/entitlements';
import { startDiagnostic } from '@/app/(student)/actions';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: `${t.diag.title} · RUMBO` };
}

/** Dos por capítulo, igual que en la acción que lo lanza. */
const PER_CHAPTER = 2;
/** Ritmo realista sin reloj: minuto y medio por pregunta. */
const SECONDS_PER_QUESTION = 90;

export default async function DiagnosticoPage() {
  const profile = await requireUser();
  const { t } = await getI18n();
  const d = t.diag;
  const db = getDb();

  const [access, rows] = await Promise.all([
    getAccess(profile.id),
    db
      .select({ chapterId: questions.chapterId, areaId: chapters.areaId })
      .from(questions)
      .innerJoin(chapters, eq(chapters.id, questions.chapterId))
      .where(eq(questions.status, 'published')),
  ]);

  /**
   * Se cuenta aquí lo mismo que la acción elige después, para que el número
   * que se promete y el que sale sean el mismo. Si divergieran, el alumno
   * empezaría un examen de otra longitud que la anunciada.
   */
  const porCapitulo = new Map<string, number>();
  const areasCerradas = new Set<string>();
  for (const r of rows) {
    if (!r.chapterId) continue;
    if (!access.isOpen(r.areaId)) {
      areasCerradas.add(r.areaId);
      if (access.limitFor(r.areaId) === 0) continue;
    }
    porCapitulo.set(r.chapterId, (porCapitulo.get(r.chapterId) ?? 0) + 1);
  }

  const nChapters = porCapitulo.size;
  const nQuestions = [...porCapitulo.values()].reduce((sum, n) => sum + Math.min(n, PER_CHAPTER), 0);
  const minutes = Math.max(1, Math.round((nQuestions * SECONDS_PER_QUESTION) / 60));

  return (
    <>
      <Link className="back" href="/app">
        {t.common.backToItinerary}
      </Link>

      <section style={{ marginTop: 8 }}>
        <span className="eyebrow" style={{ color: 'var(--sky)' }}>
          {d.eyebrow}
        </span>
        <h1 style={{ marginTop: 10 }}>{d.title}</h1>
        <p style={{ marginTop: 14, color: 'var(--paper-dim)', fontSize: 18, maxWidth: '64ch' }}>
          {d.lead}
        </p>
      </section>

      <section style={{ marginTop: 26 }}>
        <div className="grid4">
          <div className="kpi">
            <div className="l">{d.statQuestions}</div>
            <div className="v">{nQuestions}</div>
          </div>
          <div className="kpi">
            <div className="l">{d.statChapters}</div>
            <div className="v">{nChapters}</div>
          </div>
          <div className="kpi">
            <div className="l">{d.statTime}</div>
            <div className="v">{minutes}</div>
          </div>
          <div className="kpi">
            <div className="l">{t.app.examTime}</div>
            <div className="v" style={{ fontSize: 24, color: 'var(--mint)' }}>
              {d.statFree}
            </div>
          </div>
        </div>
      </section>

      {areasCerradas.size > 0 && (
        <p className="notice" style={{ marginTop: 22 }}>
          {d.partial}
        </p>
      )}

      <section className="diaghow">
        {d.steps.map(([title, body], i) => (
          <article key={title} className="diagstep">
            <span className="diagstep-n">{i + 1}</span>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </article>
        ))}
      </section>

      <section style={{ marginTop: 28 }}>
        {nQuestions === 0 ? (
          <p className="notice bad">{d.empty}</p>
        ) : (
          <form action={startDiagnostic}>
            <button className="btn primary lg" type="submit">
              {d.cta} · {nQuestions} {d.statQuestions}
            </button>
          </form>
        )}
        <p className="mono" style={{ fontSize: 12.5, color: 'var(--paper-dim)', marginTop: 14 }}>
          {d.redoHint}
        </p>
      </section>
    </>
  );
}
