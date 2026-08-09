import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { areas, chapters, lessons, questions, vQuestionCalibration } from '@/db/schema';
import { requireAdmin } from '@/lib/auth';
import { QuestionEditor } from './QuestionEditor';
import { deleteQuestion } from '../../actions';

export const metadata: Metadata = { title: 'Editar pregunta · RUMBO' };

export default async function EditarPreguntaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireAdmin();
  const db = getDb();

  const [question] = await db.select().from(questions).where(eq(questions.id, id)).limit(1);
  if (!question) notFound();

  const [[context], lessonOptions, [calibration]] = await Promise.all([
    db
      .select({ chapterTitle: chapters.title, areaName: areas.name, areaAccent: areas.accent })
      .from(chapters)
      .innerJoin(areas, eq(areas.id, chapters.areaId))
      .where(eq(chapters.id, question.chapterId))
      .limit(1),
    db
      .select({ id: lessons.id, title: lessons.title })
      .from(lessons)
      .where(eq(lessons.chapterId, question.chapterId)),
    db.select().from(vQuestionCalibration).where(eq(vQuestionCalibration.id, id)).limit(1),
  ]);

  return (
    <>
      <Link className="back" href="/balotario">
        ← Volver al balotario
      </Link>

      <section style={{ marginTop: 8 }}>
        <span className="eyebrow" style={{ color: context?.areaAccent }}>
          {context?.areaName} · {context?.chapterTitle}
        </span>
        <h1 style={{ marginTop: 10, fontSize: 'clamp(24px,4vw,34px)' }}>Editar pregunta</h1>
      </section>

      {calibration && Number(calibration.timesSeen) >= 10 && (
        <section style={{ marginTop: 22 }}>
          <div className="grid4">
            <div className="kpi">
              <div className="l">Veces vista</div>
              <div className="v">{Number(calibration.timesSeen)}</div>
            </div>
            <div className="kpi">
              <div className="l">% de acierto</div>
              <div
                className="v"
                style={{
                  color:
                    Number(calibration.pctCorrect) < 45
                      ? 'var(--coral)'
                      : Number(calibration.pctCorrect) > 92
                        ? 'var(--paper-dim)'
                        : 'var(--paper)',
                }}
              >
                {Number(calibration.pctCorrect)}%
              </div>
              <div className="d flat">&lt;45 revisar · &gt;92 muy fácil</div>
            </div>
            <div className="kpi">
              <div className="l">Tiempo medio</div>
              <div className="v">{Number(calibration.avgSeconds)}s</div>
              <div className="d flat">objetivo {question.timeTargetS}s</div>
            </div>
            <div className="kpi">
              <div className="l">Estado actual</div>
              <div className="v" style={{ fontSize: 24 }}>
                {question.status}
              </div>
            </div>
          </div>
        </section>
      )}

      <section style={{ marginTop: 26 }}>
        <QuestionEditor question={question} lessonOptions={lessonOptions} />
      </section>

      <section style={{ marginTop: 40 }}>
        <form action={deleteQuestion}>
          <input type="hidden" name="id" value={question.id} />
          <button className="btn sm" style={{ borderColor: 'var(--coral)', color: 'var(--coral)' }}>
            Eliminar pregunta
          </button>
        </form>
      </section>
    </>
  );
}
