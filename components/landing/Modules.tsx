'use client';

import { ChevronDown, Lock, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { Dict } from '@/lib/i18n/dictionaries/es';
import type { Locale } from '@/lib/i18n/config';
import { whatsappLink } from '@/lib/site';
import { fill } from '@/lib/i18n/fill';

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
  /** Idiomas en los que se ofrece; fuera de ellos la tarjeta no se muestra. */
  locales: string[];
};

/**
 * Tarjetas de módulo que se expanden.
 *
 * La expansión no es decorativa: dentro va el temario real y una pregunta de
 * muestra del módulo. Es lo que un padre quiere ver antes de pagar.
 */
export function Modules({
  modules,
  t,
  locale,
}: {
  modules: ModuleCard[];
  t: Dict['landing'];
  locale: Locale;
}) {
  const [open, setOpen] = useState<string | null>(modules[0]?.id ?? null);

  return (
    <div className="lp-grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}>
      {modules
        .filter((m) => m.locales.includes(locale))
        .map((m) => {
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
                  <Sparkles size={12} /> {t.moduleSoon}
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
              <span>{fill(t.moduleChapters, { n: m.chapters })}</span>
              {m.questions > 0 && <span>{fill(t.moduleQuestions, { n: m.questions })}</span>}
              {m.lessons > 0 && <span>{fill(t.moduleLessons, { n: m.lessons })}</span>}
            </div>

            <button
              onClick={() => setOpen(isOpen ? null : m.id)}
              className="lp-btn lp-btn-ghost"
              style={{ width: '100%', marginTop: 16, justifyContent: 'space-between', fontSize: 14.5 }}
              aria-expanded={isOpen}
            >
              {isOpen ? t.moduleClose : t.moduleOpen}
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
                      {t.moduleSample}
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
                    {t.moduleLoose}
                  </span>
                  <span className="lp-muted" style={{ fontSize: 13, marginLeft: 'auto' }}>
                    {fill(t.moduleYear, { price: m.priceYear ?? 0 })}
                  </span>
                </div>

                <a
                  className={`lp-btn ${soon ? 'lp-btn-accent' : 'lp-btn-primary'}`}
                  style={{ width: '100%', marginTop: 12 }}
                  href={soon ? '#ingles' : whatsappLink(fill(t.waBuyModule, { module: m.name }))}
                  {...(soon ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {soon ? (
                    <>
                      <Lock size={15} /> {t.moduleWaitlist}
                    </>
                  ) : (
                    t.moduleBuy
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
