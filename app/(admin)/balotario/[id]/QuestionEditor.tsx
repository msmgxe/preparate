'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { saveQuestion, type EditorState } from '../../actions';
import { SafeHtml } from '@/components/SafeHtml';
import type { Question } from '@/db/schema';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

function Save() {
  const { pending } = useFormStatus();
  return (
    <button className="btn solid" disabled={pending}>
      {pending ? 'Guardando…' : 'Guardar'}
    </button>
  );
}

export function QuestionEditor({
  question,
  lessonOptions,
}: {
  question: Question;
  lessonOptions: { id: string; title: string }[];
}) {
  const [state, action] = useActionState(saveQuestion, {} as EditorState);

  // el previo se dibuja con lo que hay en el formulario, no con lo guardado
  const [stem, setStem] = useState(question.stem);
  const [passage, setPassage] = useState(question.passage ?? '');
  const [optionsRaw, setOptionsRaw] = useState(JSON.stringify(question.options, null, 2));
  const [answerIndex, setAnswerIndex] = useState(question.answerIndex);
  const [stepsRaw, setStepsRaw] = useState(JSON.stringify(question.steps, null, 2));
  const [concept, setConcept] = useState(question.concept ?? '');
  const [trick, setTrick] = useState(question.trick ?? '');

  let options: string[] = [];
  let optionsError = false;
  try {
    const parsed = JSON.parse(optionsRaw);
    options = Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    optionsError = true;
  }

  let steps: { t: string; p: string; m: string | null }[] = [];
  let stepsError = false;
  try {
    const parsed = JSON.parse(stepsRaw);
    steps = Array.isArray(parsed) ? parsed : [];
  } catch {
    stepsError = true;
  }

  return (
    <div className="editgrid">
      <form action={action} className="card">
        <input type="hidden" name="id" value={question.id} />

        <div className="field">
          <label htmlFor="stem">Enunciado · admite HTML acotado</label>
          <textarea
            id="stem"
            name="stem"
            rows={4}
            value={stem}
            onChange={(e) => setStem(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="passage">Texto de lectura (solo comprensión lectora)</label>
          <textarea
            id="passage"
            name="passage"
            rows={4}
            value={passage}
            onChange={(e) => setPassage(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="options">
            Alternativas · JSON, de 2 a 5{optionsError ? ' — JSON inválido' : ''}
          </label>
          <textarea
            id="options"
            name="options"
            rows={6}
            value={optionsRaw}
            onChange={(e) => setOptionsRaw(e.target.value)}
            style={optionsError ? { borderColor: 'var(--coral)' } : undefined}
          />
        </div>

        <div className="field">
          <label htmlFor="answer_index">Alternativa correcta</label>
          <select
            id="answer_index"
            name="answer_index"
            value={answerIndex}
            onChange={(e) => setAnswerIndex(Number(e.target.value))}
          >
            {options.map((option, i) => (
              <option key={i} value={i}>
                {LETTERS[i]} · {option.slice(0, 60)}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="field">
            <label htmlFor="difficulty">Dificultad</label>
            <select id="difficulty" name="difficulty" defaultValue={question.difficulty}>
              <option value={1}>1 · básica</option>
              <option value={2}>2 · media</option>
              <option value={3}>3 · difícil</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="time_target_s">Tiempo objetivo (s)</label>
            <input
              id="time_target_s"
              name="time_target_s"
              type="number"
              min={15}
              max={600}
              defaultValue={question.timeTargetS}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="steps">
            Resolución paso a paso · JSON [{'{'}t,p,m{'}'}]{stepsError ? ' — JSON inválido' : ''}
          </label>
          <textarea
            id="steps"
            name="steps"
            rows={10}
            value={stepsRaw}
            onChange={(e) => setStepsRaw(e.target.value)}
            style={stepsError ? { borderColor: 'var(--coral)' } : undefined}
          />
        </div>

        <div className="field">
          <label htmlFor="distractors">
            Por qué falla cada alternativa · JSON {'{'}&quot;0&quot;:&quot;…&quot;{'}'}
          </label>
          <textarea
            id="distractors"
            name="distractors"
            rows={4}
            defaultValue={JSON.stringify(question.distractors, null, 2)}
          />
        </div>

        <div className="field">
          <label htmlFor="concept">Concepto clave</label>
          <textarea
            id="concept"
            name="concept"
            rows={2}
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="trick">Truco de examen</label>
          <textarea
            id="trick"
            name="trick"
            rows={2}
            value={trick}
            onChange={(e) => setTrick(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="lesson_id">Clase visual vinculada</label>
          <select id="lesson_id" name="lesson_id" defaultValue={question.lessonId ?? ''}>
            <option value="">— sin clase —</option>
            {lessonOptions.map((l) => (
              <option key={l.id} value={l.id}>
                {l.title}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="source">Fuente</label>
          <input id="source" name="source" defaultValue={question.source ?? ''} />
        </div>

        <div className="field">
          <label htmlFor="status">Estado</label>
          <select id="status" name="status" defaultValue={question.status}>
            <option value="draft">Borrador</option>
            <option value="reviewed">Revisada</option>
            <option value="published">Publicada — visible para los alumnos</option>
          </select>
        </div>

        <Save />
        {state.error && <p className="notice bad">{state.error}</p>}
        {state.notice && <p className="notice good">{state.notice}</p>}
      </form>

      {/* Previsualización: exactamente lo que verá el alumno */}
      <div>
        <span className="eyebrow">Previsualización</span>
        <div className="qcardbox" style={{ marginTop: 12 }}>
          <div className="stem">
            {passage && <SafeHtml as="span" className="lect" html={passage} />}
            <SafeHtml as="span" html={stem} />
          </div>
          <div className="opts">
            {options.map((option, i) => (
              <div className={`opt dis${i === answerIndex ? ' right' : ''}`} key={i}>
                <span className="k">{LETTERS[i]}</span>
                <SafeHtml as="span" html={option} />
              </div>
            ))}
          </div>
        </div>

        <div className="qcardbox" style={{ marginTop: 14 }}>
          <span className="eyebrow" style={{ color: 'var(--amber)' }}>
            Resolución guiada
          </span>
          <div className="steps" style={{ marginTop: 16 }}>
            {steps.map((step, i) => (
              <div className="step" key={i}>
                <div className="n" />
                <div className="c">
                  <b>{step.t}</b>
                  <p>{step.p}</p>
                  {step.m && <div className="math">{step.m}</div>}
                </div>
              </div>
            ))}
          </div>
          {concept && (
            <div className="concept">
              <div className="eyebrow">Concepto clave</div>
              <p>{concept}</p>
            </div>
          )}
          {trick && (
            <div className="trick">
              <div className="eyebrow">Truco de examen</div>
              <p>{trick}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
