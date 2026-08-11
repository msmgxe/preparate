'use client';

import { Check, RotateCcw, X } from 'lucide-react';
import { useState } from 'react';
import type { Dict } from '@/lib/i18n/dictionaries/es';

/**
 * La muestra: una pregunta real, resuelta en el sitio.
 *
 * Al responder, la explicación no se despliega debajo sino que abre una
 * segunda columna al lado. Debajo obligaba a bajar con la rueda justo en el
 * momento en que la persona acaba de acertar —que es cuando hay que enseñarle
 * por qué—, y esa media pantalla de scroll se pierden muchos.
 *
 * Va escrita aquí y no sale del balotario a propósito. La regla de oro de la
 * app es que `answer_index` no viaja al navegador antes de responder; una
 * página pública sin sesión no puede llamar a `/api/answer`, así que traer una
 * pregunta de verdad obligaría a exponer su respuesta. Esta es de muestra.
 */
const LETTERS = ['A', 'B', 'C', 'D'];

export function Demo({ t }: { t: Dict['landing'] }) {
  const DEMO = { ...t.demo, answer: 1 };
  const [chosen, setChosen] = useState<number | null>(null);
  const answered = chosen !== null;
  const correct = chosen === DEMO.answer;

  return (
    <div className={`lp-card lp-demo${answered ? ' is-open' : ''}`}>
      <div className="lp-demo-q">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span className="lp-pill">{DEMO.area}</span>
        <span className="lp-pill lp-pill-accent">{DEMO.chapter}</span>
        <span style={{ marginLeft: 'auto', fontSize: 12.5, fontWeight: 600 }} className="lp-muted">
          {t.demoTry}
        </span>
      </div>

      <p style={{ marginTop: 16, fontSize: 16.5, color: 'var(--text)', fontWeight: 500 }}>
        {DEMO.stem}
      </p>

      <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
        {DEMO.options.map((option, i) => {
          const isAnswer = i === DEMO.answer;
          const isChosen = i === chosen;
          let border = 'var(--line)';
          let bg = 'var(--surface)';
          if (answered && isAnswer) {
            border = 'var(--lime)';
            bg = 'color-mix(in srgb, var(--lime) 12%, var(--surface))';
          } else if (answered && isChosen) {
            border = 'var(--rose)';
            bg = 'color-mix(in srgb, var(--rose) 10%, var(--surface))';
          }

          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => setChosen(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '13px 15px',
                borderRadius: 12,
                border: `1.5px solid ${border}`,
                background: bg,
                cursor: answered ? 'default' : 'pointer',
                textAlign: 'left',
                fontSize: 15.5,
                fontWeight: 500,
                color: 'var(--text)',
                transition: '.16s',
              }}
            >
              <span
                style={{
                  width: 26,
                  height: 26,
                  flex: 'none',
                  display: 'grid',
                  placeContent: 'center',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  border: `1.5px solid ${border}`,
                  color: answered && isAnswer ? 'var(--lime)' : 'var(--text-3)',
                }}
              >
                {answered && isAnswer ? <Check size={14} /> : answered && isChosen ? <X size={14} /> : LETTERS[i]}
              </span>
              {option}
            </button>
          );
        })}
      </div>

        {!answered && (
          <p className="lp-muted" style={{ fontSize: 13.5, marginTop: 14 }}>
            {t.demoHint}
          </p>
        )}
      </div>

      {answered && (
        <aside className="lp-demo-a">
          <div
            style={{
              fontWeight: 700,
              fontSize: 14.5,
              color: correct ? 'var(--lime)' : 'var(--warn)',
              marginBottom: 6,
            }}
          >
            {correct ? t.demoCorrect : t.demoWrong}
          </div>
          <p style={{ fontSize: 14.5, marginBottom: 12 }}>{correct ? DEMO.ok : DEMO.no}</p>

          <div style={{ display: 'grid', gap: 7 }}>
            {DEMO.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span
                  style={{
                    flex: 'none',
                    width: 21,
                    height: 21,
                    borderRadius: 6,
                    display: 'grid',
                    placeContent: 'center',
                    background: 'var(--brand-soft)',
                    color: 'var(--brand)',
                    fontSize: 11.5,
                    fontWeight: 700,
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontSize: 14, color: 'var(--text-2)' }}>{step}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setChosen(null)}
            className="lp-btn lp-btn-ghost"
            style={{ marginTop: 14, fontSize: 14, padding: '9px 15px' }}
          >
            <RotateCcw size={15} /> {t.demoRetry}
          </button>
        </aside>
      )}
    </div>
  );
}
