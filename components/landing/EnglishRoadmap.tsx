'use client';

import { useState } from 'react';
import type { Dict } from '@/lib/i18n/dictionaries/es';

/** Un color por nivel; el texto llega traducido desde el diccionario. */
const COLORS = ['#10B981', '#0EA5E9', '#6366F1', '#7C3AED', '#DB2777'];

/**
 * La ruta A1 → C1 y, debajo, el método de cada tramo.
 *
 * Los niveles son los del MCER y las técnicas son las que tienen respaldo:
 * repetición espaciada, input comprensible, shadowing y producción con
 * corrección. Es lo que justifica el precio frente a una app gratuita.
 */
export function EnglishRoadmap({
  levels,
  weeksLabel,
  onFinishLabel,
}: {
  levels: Dict['landing']['roadmap'];
  weeksLabel: string;
  onFinishLabel: string;
}) {
  const LEVELS = levels.map((l, i) => ({ ...l, color: COLORS[i % COLORS.length] }));
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
                {weeksLabel} {l.weeks}
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
          <strong style={{ fontWeight: 600 }}>{onFinishLabel}</strong> {level.can}
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
