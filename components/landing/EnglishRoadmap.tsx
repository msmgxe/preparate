'use client';

import { useState } from 'react';

/**
 * La ruta A1 → C1 y, debajo, el método de cada tramo.
 *
 * Los niveles son los del MCER y las técnicas son las que tienen respaldo:
 * repetición espaciada, input comprensible, shadowing y producción con
 * corrección. Es lo que justifica el precio frente a una app gratuita.
 */
const LEVELS = [
  {
    id: 'A1',
    name: 'Cimientos',
    can: 'Te presentas, pides algo y entiendes instrucciones simples.',
    weeks: '0 – 8',
    color: '#10B981',
    method: [
      ['Pares mínimos', 'Entrenar el oído antes que la boca: si no distingues /ɪ/ de /iː/, no puedes producirlo.'],
      ['Vocabulario por frecuencia', 'Las 1000 palabras más usadas cubren el 85 % del inglés cotidiano. Se aprenden primero.'],
      ['Repetición espaciada', 'Cada palabra vuelve justo antes de que la olvides, no antes ni después.'],
    ],
  },
  {
    id: 'A2',
    name: 'Autonomía',
    can: 'Cuentas lo que hiciste, describes a alguien y haces planes.',
    weeks: '8 – 20',
    color: '#0EA5E9',
    method: [
      ['Input comprensible', 'Material un punto por encima de tu nivel: entiendes el 90 % y deduces el resto.'],
      ['Verbos irregulares en contexto', 'No en lista alfabética: dentro de historias donde el pasado tiene sentido.'],
      ['Producción guiada', 'Escribes cinco frases al día sobre tu vida real, no ejercicios de relleno.'],
    ],
  },
  {
    id: 'B1',
    name: 'Umbral',
    can: 'Sostienes una conversación, explicas razones y sigues una serie sin subtítulos.',
    weeks: '20 – 40',
    color: '#6366F1',
    method: [
      ['Shadowing', 'Repites en voz alta pisando el audio original. Es lo que arregla ritmo y entonación.'],
      ['Contrastes que confunden al hispanohablante', 'Present perfect, phrasal verbs y preposiciones: donde se atasca el 80 %.'],
      ['Escucha a velocidad real', 'Conexión de sonidos: entender que "what do you" suena "whaddaya".'],
    ],
  },
  {
    id: 'B2',
    name: 'Avanzado',
    can: 'Defiendes una postura, entiendes una conferencia y escribes un texto argumentado.',
    weeks: '40 – 68',
    color: '#7C3AED',
    method: [
      ['Colocaciones', 'Dejar de traducir: se dice "make a decision", no "do a decision". Suena natural o no suena.'],
      ['Escritura con corrección razonada', 'No te marcan el error: te explican qué regla lo genera para que no se repita.'],
      ['Listening académico', 'Conferencias y entrevistas reales, sin guion ni locución lenta.'],
    ],
  },
  {
    id: 'C1',
    name: 'Dominio',
    can: 'Manejas matices, ironía y registro formal. Trabajas o estudias en inglés sin fricción.',
    weeks: '68 – 100',
    color: '#DB2777',
    method: [
      ['Estructuras enfáticas', 'Cleft sentences e inversión: poner el foco donde tú quieres, no donde cae.'],
      ['Lenguaje figurado', 'Idioms y connotación, que es lo que separa un B2 correcto de un C1 natural.'],
      ['Debate cronometrado', 'Producir bajo presión, reformular sobre la marcha y sostener el turno.'],
    ],
  },
];

export function EnglishRoadmap() {
  const [active, setActive] = useState('A1');
  const level = LEVELS.find((l) => l.id === active) ?? LEVELS[0];

  return (
    <>
      {/* la línea de niveles */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {LEVELS.map((l) => {
          const on = l.id === active;
          return (
            <button
              key={l.id}
              onClick={() => setActive(l.id)}
              aria-pressed={on}
              style={{
                flex: '1 1 150px',
                padding: '14px 16px',
                borderRadius: 14,
                cursor: 'pointer',
                textAlign: 'left',
                transition: '.18s',
                border: `1.5px solid ${on ? l.color : 'var(--line)'}`,
                background: on ? `color-mix(in srgb, ${l.color} 12%, var(--surface))` : 'var(--surface)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 19, fontWeight: 800, color: l.color }}>{l.id}</span>
                <span style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text)' }}>{l.name}</span>
              </div>
              <div className="lp-muted" style={{ fontSize: 12.5, marginTop: 3 }}>
                semanas {l.weeks}
              </div>
            </button>
          );
        })}
      </div>

      {/* el detalle del nivel elegido */}
      <div className="lp-card" style={{ padding: 24, marginTop: 16, borderColor: `color-mix(in srgb, ${level.color} 45%, var(--line))` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 26, fontWeight: 800, color: level.color }}>{level.id}</span>
          <h3 style={{ fontSize: 19 }}>{level.name}</h3>
        </div>
        <p style={{ fontSize: 16, marginTop: 8, color: 'var(--text)' }}>
          <strong style={{ fontWeight: 600 }}>Al terminar:</strong> {level.can}
        </p>

        <div className="lp-grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', marginTop: 20 }}>
          {level.method.map(([name, why]) => (
            <div key={name} style={{ padding: 16, borderRadius: 13, background: 'var(--surface-2)' }}>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text)' }}>{name}</div>
              <p style={{ fontSize: 13.5, marginTop: 6, lineHeight: 1.55 }}>{why}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
