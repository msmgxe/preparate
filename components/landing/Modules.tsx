'use client';

import { ChevronDown, Lock, Sparkles } from 'lucide-react';
import { useState } from 'react';

export type ModuleCard = {
  id: string;
  name: string;
  short: string;
  symbol: string;
  accent: string;
  tagline: string | null;
  blurb: string | null;
  status: string;
  priceMonth: number | null;
  priceYear: number | null;
  chapters: number;
  questions: number;
  lessons: number;
  sample: string | null;
};

/**
 * Tarjetas de módulo que se expanden.
 *
 * La expansión no es decorativa: dentro va el temario real y una pregunta de
 * muestra del módulo. Es lo que un padre quiere ver antes de pagar.
 */
export function Modules({ modules }: { modules: ModuleCard[] }) {
  const [open, setOpen] = useState<string | null>(modules[0]?.id ?? null);

  return (
    <div className="lp-grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}>
      {modules.map((m) => {
        const isOpen = open === m.id;
        const soon = m.status === 'soon';

        return (
          <article
            key={m.id}
            className="lp-card lp-card-hover"
            style={{
              padding: 22,
              borderColor: isOpen ? `color-mix(in srgb, ${m.accent} 55%, var(--line))` : undefined,
              gridColumn: isOpen ? 'span 1' : undefined,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span
                style={{
                  width: 44,
                  height: 44,
                  flex: 'none',
                  borderRadius: 13,
                  display: 'grid',
                  placeContent: 'center',
                  fontSize: 21,
                  fontWeight: 800,
                  color: m.accent,
                  background: `color-mix(in srgb, ${m.accent} 14%, transparent)`,
                }}
              >
                {m.symbol}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 17.5 }}>{m.name}</h3>
                <p style={{ fontSize: 13.5, marginTop: 3 }}>{m.tagline}</p>
              </div>
              {soon && (
                <span className="lp-pill lp-pill-accent" style={{ fontSize: 11.5, padding: '5px 10px' }}>
                  <Sparkles size={12} /> Pronto
                </span>
              )}
            </div>

            <div
              style={{
                display: 'flex',
                gap: 16,
                marginTop: 16,
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--text-3)',
              }}
            >
              <span>{m.chapters} capítulos</span>
              {m.questions > 0 && <span>{m.questions} preguntas</span>}
              {m.lessons > 0 && <span>{m.lessons} clases</span>}
            </div>

            <button
              onClick={() => setOpen(isOpen ? null : m.id)}
              className="lp-btn lp-btn-ghost"
              style={{ width: '100%', marginTop: 16, justifyContent: 'space-between', fontSize: 14.5 }}
              aria-expanded={isOpen}
            >
              {isOpen ? 'Ocultar temario' : 'Ver temario y ejemplo'}
              <ChevronDown
                size={17}
                style={{ transition: 'transform .2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}
              />
            </button>

            {isOpen && (
              <div style={{ marginTop: 14, animation: 'fade .3s ease' }}>
                <p style={{ fontSize: 14, lineHeight: 1.6 }}>{m.blurb}</p>

                {m.sample && (
                  <div
                    style={{
                      marginTop: 14,
                      padding: '13px 15px',
                      borderRadius: 12,
                      background: 'var(--surface-2)',
                      border: '1px solid var(--line)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11.5,
                        fontWeight: 700,
                        letterSpacing: '.08em',
                        textTransform: 'uppercase',
                        color: m.accent,
                        marginBottom: 6,
                      }}
                    >
                      Pregunta de muestra
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--text)' }}>{m.sample}</p>
                  </div>
                )}

                <div
                  style={{
                    marginTop: 16,
                    paddingTop: 14,
                    borderTop: '1px dashed var(--line)',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)' }}>
                    S/ {m.priceMonth}
                  </span>
                  <span className="lp-muted" style={{ fontSize: 14 }}>
                    / mes suelto
                  </span>
                  <span className="lp-muted" style={{ fontSize: 13, marginLeft: 'auto' }}>
                    o S/ {m.priceYear} al año
                  </span>
                </div>

                <a
                  className={`lp-btn ${soon ? 'lp-btn-accent' : 'lp-btn-primary'}`}
                  style={{ width: '100%', marginTop: 12 }}
                  href={soon ? '#ingles' : '#planes'}
                >
                  {soon ? (
                    <>
                      <Lock size={15} /> Entrar a la lista de espera
                    </>
                  ) : (
                    'Comprar solo este módulo'
                  )}
                </a>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
