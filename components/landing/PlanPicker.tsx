'use client';

import { Check, Minus, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { whatsappLink } from '@/lib/site';
import type { Dict } from '@/lib/i18n/dictionaries/es';
import type { Locale } from '@/lib/i18n/config';
import { fill } from '@/lib/i18n/fill';
import { money as format, soles } from '@/lib/money';

export type PlanCard = {
  id: string;
  name: string;
  kind: string;
  tagline: string | null;
  audience: string | null;
  price: number;
  period: string;
  compareAt: number | null;
  highlight: boolean;
  cta: string;
  features: string[];
};

export type PickerModule = {
  id: string;
  short: string;
  name: string;
  accent: string;
  priceMonth: number | null;
  status: string;
  /** Idiomas en los que se ofrece el módulo. */
  locales: string[];
};



export function PlanPicker({
  plans,
  modules,
  t,
  locale,
}: {
  plans: PlanCard[];
  modules: PickerModule[];
  t: Dict['landing'];
  locale: Locale;
}) {
  const money = (n: number) => format(n, locale);
  const sellable = modules.filter((m) => m.priceMonth !== null && m.locales.includes(locale));
  const [picked, setPicked] = useState<string[]>(sellable.slice(0, 2).map((m) => m.id));

  const anual = plans.find((p) => p.id === 'anual');
  const mensual = plans.find((p) => p.id === 'mensual');

  /**
   * El argumento de venta, calculado en vivo: qué cuesta comprar sueltos los
   * módulos elegidos frente a llevárselos todos en un plan.
   */
  const compare = useMemo(() => {
    const loose = sellable
      .filter((m) => picked.includes(m.id))
      .reduce((sum, m) => sum + (m.priceMonth ?? 0), 0);
    const monthly = mensual?.price ?? 0;
    const yearlyAsMonth = anual ? Math.round(anual.price / 12) : 0;
    return { loose, monthly, yearlyAsMonth, savesVsLoose: loose - yearlyAsMonth };
  }, [picked, sellable, mensual, anual]);

  const toggle = (id: string) =>
    setPicked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <>
      {/* ── calculadora: sueltos frente a plan ─────────────────────────── */}
      <div className="lp-card" style={{ padding: 24, marginBottom: 34 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <h3 style={{ fontSize: 19 }}>{t.pickerTitle}</h3>
          <span className="lp-muted" style={{ fontSize: 14 }}>
            {t.pickerHint}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginTop: 16 }}>
          {sellable.map((m) => {
            const on = picked.includes(m.id);
            return (
              <button
                key={m.id}
                onClick={() => toggle(m.id)}
                aria-pressed={on}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 15px',
                  borderRadius: 100,
                  fontSize: 14.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: '.16s',
                  border: `1.5px solid ${on ? m.accent : 'var(--line)'}`,
                  background: on ? `color-mix(in srgb, ${m.accent} 13%, var(--surface))` : 'var(--surface)',
                  color: on ? 'var(--text)' : 'var(--text-3)',
                }}
              >
                <span
                  style={{
                    width: 17,
                    height: 17,
                    borderRadius: 5,
                    display: 'grid',
                    placeContent: 'center',
                    background: on ? m.accent : 'transparent',
                    border: on ? 'none' : '1.5px solid var(--line)',
                    color: '#fff',
                  }}
                >
                  {on && <Check size={11} strokeWidth={3} />}
                </span>
                {m.name}
                {m.status === 'soon' && (
                  <span style={{ fontSize: 11, color: 'var(--accent)' }}>{t.planSoonShort}</span>
                )}
              </button>
            );
          })}
        </div>

        <div
          className="lp-grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', marginTop: 20 }}
        >
          <div style={{ padding: 16, borderRadius: 13, background: 'var(--surface-2)' }}>
            <div className="lp-muted" style={{ fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em' }}>
              {t.pickerLoose}
            </div>
            <div style={{ fontSize: 27, fontWeight: 800, marginTop: 5 }}>
              {picked.length === 0 ? '—' : `${money(compare.loose)}`}
            </div>
            <div className="lp-muted" style={{ fontSize: 13 }}>
              {fill(t.pickerModulesCount, { n: picked.length })}
            </div>
          </div>

          <div style={{ padding: 16, borderRadius: 13, background: 'var(--surface-2)' }}>
            <div className="lp-muted" style={{ fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em' }}>
              {t.pickerMonthly}
            </div>
            <div style={{ fontSize: 27, fontWeight: 800, marginTop: 5 }}>{money(compare.monthly)}</div>
            <div className="lp-muted" style={{ fontSize: 13 }}>{t.pickerAllModules}</div>
          </div>

          <div
            style={{
              padding: 16,
              borderRadius: 13,
              background: 'color-mix(in srgb, var(--brand) 10%, var(--surface))',
              border: '1.5px solid var(--brand)',
            }}
          >
            <div style={{ fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--brand)' }}>
              {t.pickerYearly}
            </div>
            <div style={{ fontSize: 27, fontWeight: 800, marginTop: 5, color: 'var(--text)' }}>
              {money(compare.yearlyAsMonth)}
            </div>
            <div style={{ fontSize: 13, color: 'var(--brand)', fontWeight: 600 }}>
              {t.pickerPayingYear}
            </div>
          </div>
        </div>

        {picked.length > 0 && compare.savesVsLoose > 0 && (
          <p
            style={{
              marginTop: 16,
              padding: '13px 16px',
              borderRadius: 12,
              background: 'color-mix(in srgb, var(--lime) 12%, transparent)',
              color: 'var(--text)',
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            {fill(t.pickerSaving, { amount: money(compare.savesVsLoose), n: picked.length })}
          </p>
        )}
      </div>

      {/* ── los tres planes ───────────────────────────────────────────── */}
      <div className="lp-grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', alignItems: 'start' }}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="lp-card"
            style={{
              padding: 26,
              position: 'relative',
              borderColor: plan.highlight ? 'var(--brand)' : undefined,
              borderWidth: plan.highlight ? 2 : 1,
              boxShadow: plan.highlight ? 'var(--shadow-lg)' : undefined,
            }}
          >
            {plan.highlight && (
              <span
                className="lp-pill"
                style={{
                  position: 'absolute',
                  top: -13,
                  left: 26,
                  background: 'var(--brand)',
                  color: '#fff',
                }}
              >
                <Sparkles size={13} /> {t.planPopular}
              </span>
            )}

            <h3 style={{ fontSize: 20 }}>{plan.name}</h3>
            <p style={{ fontSize: 14, marginTop: 5, minHeight: 42 }}>{plan.tagline}</p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-.03em' }}>
                {money(plan.price)}
              </span>
              <span className="lp-muted" style={{ fontSize: 15 }}>
                /{plan.period === 'year' ? t.planPeriodYear : t.planPeriodMonth}
              </span>
              {plan.compareAt && (
                <span className="lp-muted" style={{ fontSize: 14.5, textDecoration: 'line-through' }}>
                  {money(plan.compareAt)}
                </span>
              )}
            </div>

            {plan.period === 'year' && (
              <div style={{ fontSize: 13.5, color: 'var(--brand)', fontWeight: 600, marginTop: 3 }}>
                {fill(t.planEquivalent, { amount: money(Math.round(plan.price / 12)) })}
              </div>
            )}

            {plan.audience && (
              <p className="lp-muted" style={{ fontSize: 13.5, marginTop: 10 }}>
                {plan.audience}
              </p>
            )}

            <a
              href={whatsappLink(
                fill(t.waBuyPlan, {
                  plan: plan.name,
                  price: soles(plan.price),
                  period: plan.period === 'year' ? t.planPeriodYear : t.planPeriodMonth,
                }),
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={`lp-btn ${plan.highlight ? 'lp-btn-primary' : 'lp-btn-ghost'} lp-btn-block`}
              style={{ marginTop: 18 }}
            >
              {plan.cta}
            </a>

            <ul style={{ listStyle: 'none', marginTop: 20, display: 'grid', gap: 10 }}>
              {plan.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14.5 }}>
                  <Check size={16} style={{ flex: 'none', marginTop: 3, color: 'var(--lime)' }} />
                  <span style={{ color: 'var(--text-2)' }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── comparativa fila a fila ───────────────────────────────────── */}
      <div className="lp-card" style={{ marginTop: 34, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 620 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: 13.5, color: 'var(--text-3)', fontWeight: 700 }}>
                {t.compare}
              </th>
              {[t.colMonthly, t.colYearly, t.colFamily].map((n) => (
                <th
                  key={n}
                  style={{
                    padding: '16px 14px',
                    fontSize: 14,
                    fontWeight: 700,
                    color: n === t.colYearly ? 'var(--brand)' : 'var(--text)',
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  {n}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.matrix.map((row) => (
              <tr key={row.label}>
                <td style={{ padding: '13px 20px', fontSize: 14.5, color: 'var(--text-2)', borderTop: '1px solid var(--line)' }}>
                  {row.label}
                </td>
                {([row.mensual, row.anual, row.familiar] as const).map((cell, i) => (
                  <td
                    key={i}
                    style={{
                      padding: '13px 14px',
                      textAlign: 'center',
                      fontSize: 14,
                      borderTop: '1px solid var(--line)',
                      background: i === 1 ? 'color-mix(in srgb, var(--brand) 5%, transparent)' : undefined,
                      color: 'var(--text-2)',
                    }}
                  >
                    {cell === true ? (
                      <Check size={17} style={{ color: 'var(--lime)' }} />
                    ) : cell === false ? (
                      <Minus size={16} style={{ color: 'var(--text-3)' }} />
                    ) : (
                      <span style={{ fontWeight: 600, color: 'var(--text)' }}>{cell}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
