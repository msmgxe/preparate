'use client';

import { Check, RotateCcw, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Demo del hero: una pregunta real, resuelta en el sitio.
 *
 * Va escrita aquí y no sale del balotario a propósito. La regla de oro de la
 * app es que `answer_index` no viaja al navegador antes de responder; una
 * página pública sin sesión no puede llamar a `/api/answer`, así que traer una
 * pregunta de verdad obligaría a exponer su respuesta. Esta es de muestra.
 */
const DEMO = {
  area: 'Razonamiento Matemático',
  chapter: 'Fracciones y porcentajes',
  stem: 'Un hotel aplica 20 % de descuento por reserva anticipada y, sobre el precio ya rebajado, un 10 % adicional por pago con tarjeta. ¿A qué descuento único equivale?',
  options: ['26 %', '28 %', '30 %', '32 %'],
  answer: 1,
  why: {
    ok: 'Exacto. Descontar 20 % deja el 80 %; descontar 10 % deja el 90 %. Y los factores sí se multiplican: 0,80 × 0,90 = 0,72. Queda el 72 %, así que se descontó el 28 %.',
    no: 'La trampa es sumar 20 + 10. El segundo descuento se aplica sobre un precio que ya encogió: 0,80 × 0,90 = 0,72 → queda el 72 %, se descontó el 28 %.',
  },
  steps: [
    'No sumes los descuentos: 30 % es la alternativa trampa.',
    'Piensa en lo que queda: 20 % deja el 80 %; 10 % deja el 90 %.',
    'Multiplica los factores: 0,80 × 0,90 = 0,72.',
    'Convierte a descuento: 100 % − 72 % = 28 %.',
  ],
};

const LETTERS = ['A', 'B', 'C', 'D'];

export function Demo() {
  const [chosen, setChosen] = useState<number | null>(null);
  const answered = chosen !== null;
  const correct = chosen === DEMO.answer;

  return (
    <div className="lp-card" style={{ padding: 22, maxWidth: 520 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span className="lp-pill">{DEMO.area}</span>
        <span className="lp-pill lp-pill-accent">{DEMO.chapter}</span>
        <span style={{ marginLeft: 'auto', fontSize: 12.5, fontWeight: 600 }} className="lp-muted">
          Pruébalo ahora
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

      {answered && (
        <div
          style={{
            marginTop: 16,
            padding: '14px 16px',
            borderRadius: 12,
            background: 'var(--surface-2)',
            border: '1px solid var(--line)',
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 14.5,
              color: correct ? 'var(--lime)' : 'var(--warn)',
              marginBottom: 6,
            }}
          >
            {correct ? '✓ Correcto' : 'Casi — mira por qué'}
          </div>
          <p style={{ fontSize: 14.5, marginBottom: 12 }}>{correct ? DEMO.why.ok : DEMO.why.no}</p>

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
            <RotateCcw size={15} /> Intentar de nuevo
          </button>
        </div>
      )}

      {!answered && (
        <p className="lp-muted" style={{ fontSize: 13.5, marginTop: 14 }}>
          Así se resuelve cada pregunta dentro: eliges, y al instante ves por qué.
        </p>
      )}
    </div>
  );
}
