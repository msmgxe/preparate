'use client';

import { Check, Minus, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { whatsappLink } from '@/lib/site';

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
};

/** Lo que separa a un plan de otro, en la tabla comparativa. */
const MATRIX: { label: string; mensual: string | boolean; anual: string | boolean; familiar: string | boolean }[] = [
  { label: 'Módulos incluidos', mensual: 'Los 4 de admisión', anual: 'Los 4 + Inglés en preventa', familiar: 'Los 4 + Inglés en preventa' },
  { label: 'Simulacros cronometrados', mensual: 'Ilimitados', anual: 'Ilimitados', familiar: 'Ilimitados' },
  { label: 'Clases visuales y resolución paso a paso', mensual: true, anual: true, familiar: true },
  { label: 'Bitácora de errores (repetición espaciada)', mensual: true, anual: true, familiar: true },
  { label: 'Simulacros por institución (ISIL, USIL, UPC)', mensual: false, anual: true, familiar: true },
  { label: 'Plan de estudio según diagnóstico inicial', mensual: false, anual: true, familiar: true },
  { label: 'Reporte semanal a los padres', mensual: false, anual: false, familiar: true },
  { label: 'Alerta si deja de practicar 4 días', mensual: false, anual: false, familiar: true },
  { label: 'Asesorías de dudas con un profesor', mensual: false, anual: false, familiar: '2 al mes' },
  { label: 'Alumnos por suscripción', mensual: '1', anual: '1', familiar: 'Hasta 2' },
  { label: 'Garantía: si no ingresa, renuevas sin costo', mensual: false, anual: false, familiar: true },
];

const money = (n: number) => `S/ ${n.toLocaleString('es-PE')}`;

export function PlanPicker({ plans, modules }: { plans: PlanCard[]; modules: PickerModule[] }) {
  const sellable = modules.filter((m) => m.priceMonth !== null);
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
          <h3 style={{ fontSize: 19 }}>¿Cuántos módulos necesitas?</h3>
          <span className="lp-muted" style={{ fontSize: 14 }}>
            Marca los que te interesan y compara al instante.
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
                  <span style={{ fontSize: 11, color: 'var(--accent)' }}>pronto</span>
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
              Sueltos
            </div>
            <div style={{ fontSize: 27, fontWeight: 800, marginTop: 5 }}>
              {picked.length === 0 ? '—' : `${money(compare.loose)}`}
            </div>
            <div className="lp-muted" style={{ fontSize: 13 }}>
              al mes · {picked.length} {picked.length === 1 ? 'módulo' : 'módulos'}
            </div>
          </div>

          <div style={{ padding: 16, borderRadius: 13, background: 'var(--surface-2)' }}>
            <div className="lp-muted" style={{ fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em' }}>
              Plan Mensual
            </div>
            <div style={{ fontSize: 27, fontWeight: 800, marginTop: 5 }}>{money(compare.monthly)}</div>
            <div className="lp-muted" style={{ fontSize: 13 }}>al mes · todos los módulos</div>
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
              Pase de Admisión
            </div>
            <div style={{ fontSize: 27, fontWeight: 800, marginTop: 5, color: 'var(--text)' }}>
              {money(compare.yearlyAsMonth)}
            </div>
            <div style={{ fontSize: 13, color: 'var(--brand)', fontWeight: 600 }}>
              al mes · pagando el año
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
            Con el Pase de Admisión pagas {money(compare.savesVsLoose)} menos al mes que comprando
            esos {picked.length === 1 ? 'módulo' : `${picked.length} módulos`} sueltos — y además te
            llevas todos los demás.
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
                <Sparkles size={13} /> El más elegido
              </span>
            )}

            <h3 style={{ fontSize: 20 }}>{plan.name}</h3>
            <p style={{ fontSize: 14, marginTop: 5, minHeight: 42 }}>{plan.tagline}</p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-.03em' }}>
                {money(plan.price)}
              </span>
              <span className="lp-muted" style={{ fontSize: 15 }}>
                /{plan.period === 'year' ? 'año' : 'mes'}
              </span>
              {plan.compareAt && (
                <span className="lp-muted" style={{ fontSize: 14.5, textDecoration: 'line-through' }}>
                  {money(plan.compareAt)}
                </span>
              )}
            </div>

            {plan.period === 'year' && (
              <div style={{ fontSize: 13.5, color: 'var(--brand)', fontWeight: 600, marginTop: 3 }}>
                equivale a {money(Math.round(plan.price / 12))} al mes
              </div>
            )}

            {plan.audience && (
              <p className="lp-muted" style={{ fontSize: 13.5, marginTop: 10 }}>
                {plan.audience}
              </p>
            )}

            <a
              href={whatsappLink(
                `Hola, me interesa el plan ${plan.name} de RUMBO (${money(plan.price)} al ${plan.period === 'year' ? 'año' : 'mes'}). ¿Me cuentas cómo empiezo?`,
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
                Comparativa
              </th>
              {['Mensual', 'Pase de Admisión', 'Familiar'].map((n) => (
                <th
                  key={n}
                  style={{
                    padding: '16px 14px',
                    fontSize: 14,
                    fontWeight: 700,
                    color: n === 'Pase de Admisión' ? 'var(--brand)' : 'var(--text)',
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  {n}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MATRIX.map((row) => (
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
