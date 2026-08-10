'use client';

import { useState, useSyncExternalStore } from 'react';
import { BookOpenCheck, BrainCircuit, ChevronDown, Lightbulb, Target, Timer } from 'lucide-react';
import { Road } from '@/components/Road';
import type { Dict } from '@/lib/i18n/dictionaries/es';

const ICONS = [BookOpenCheck, Target, BrainCircuit, Timer];
const COLORS = ['var(--sky)', 'var(--amber)', 'var(--coral)', 'var(--mint)'];

const KEY = 'rumbo-guide';

const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
/** Lo guardado, si hay algo. En el servidor no hay `localStorage`. */
const readSaved = () => {
  try {
    return localStorage.getItem(KEY) ?? '';
  } catch {
    return '';
  }
};
const onServer = () => '';

/**
 * La guía de a bordo.
 *
 * Un alumno que entra por primera vez ve cuatro secciones y ningún hilo que
 * las una. Esto es ese hilo: qué hace cada herramienta, en qué orden usarlas y
 * con qué ritmo. Se abre sola la primera vez y luego se queda plegada, porque
 * una guía que no se puede cerrar acaba siendo ruido.
 *
 * La ruta se dibuja como la carretera de la página de venta, con las mismas
 * cuatro escalas. No es solo estética: quien llegó desde ahí ya vio ese dibujo
 * y reconoce en qué etapa está, sin que nadie se lo explique otra vez.
 */
export function Guide({ t, startOpen }: { t: Dict; startOpen: boolean }) {
  const g = t.guide;
  const [active, setActive] = useState(0);

  // se lee con `useSyncExternalStore` y no en un efecto: así el primer render
  // del cliente ya trae el valor bueno y no hay un salto visible
  const saved = useSyncExternalStore(subscribe, readSaved, onServer);
  const open = saved === 'open' ? true : saved === 'closed' ? false : startOpen;

  const toggle = () => {
    try {
      localStorage.setItem(KEY, open ? 'closed' : 'open');
    } catch {
      // sin persistencia, pero el cambio vale para esta visita
    }
    listeners.forEach((fn) => fn());
  };

  const step = g.steps[active];
  const Icon = ICONS[active];

  return (
    <section className="guide" style={{ marginTop: 30 }}>
      <button className="guidebar" onClick={toggle} aria-expanded={open}>
        <span className="eyebrow" style={{ color: 'var(--amber)' }}>
          {g.eyebrow}
        </span>
        <b>{open ? g.title : g.open}</b>
        <ChevronDown
          size={18}
          style={{ marginLeft: 'auto', transition: 'transform .22s', transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </button>

      {open && (
        <div className="guidebody">
          <p className="guideintro">{g.intro}</p>

          {/* ── la ruta, como carretera ──────────────────────────────────
              Es el mismo componente que la página de venta: quien llega
              desde ahí reconoce el dibujo y sabe que está en la etapa que
              le vendieron. Aquí además es el selector de las escalas. */}
          <Road
            label={g.routeTitle}
            colors={COLORS}
            active={active}
            onSelect={setActive}
            stops={g.steps.map((s, i) => ({
              tag: s.tag,
              title: s.title,
              icon: (() => {
                const Icon = ICONS[i];
                return <Icon size={21} />;
              })(),
            }))}
          />

          {/* ── la escala elegida ────────────────────────────────────── */}
          <div className="guidestep" style={{ borderColor: COLORS[active] }}>
            <div className="guidestep-head">
              <span className="guidestep-icon" style={{ background: COLORS[active] }}>
                <Icon size={19} />
              </span>
              <div>
                <span className="eyebrow" style={{ color: COLORS[active] }}>
                  {step.tag} · {step.time}
                </span>
                <h3 style={{ marginTop: 3 }}>{step.title}</h3>
              </div>
            </div>
            <p className="guidestep-body">{step.body}</p>
            <p className="guidestep-tip">
              <Lightbulb size={15} style={{ flex: 'none', marginTop: 2, color: 'var(--amber)' }} />
              <span>{step.tip}</span>
            </p>
          </div>

          {/* ── el ritmo ─────────────────────────────────────────────── */}
          <div className="guidegrid">
            <div>
              <h4>{g.routeTitle}</h4>
              <p className="guidesub">{g.routeBody}</p>
              <ul className="guideroute">
                {g.route.map(([when, what]) => (
                  <li key={when}>
                    <b>{when}</b>
                    <span>{what}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>{g.tipsTitle}</h4>
              <ul className="guidetips">
                {g.tips.map(([head, body], i) => (
                  <li key={head} style={{ animationDelay: `${i * 90}ms` }}>
                    <b>{head}</b>
                    <span>{body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button className="btn sm" onClick={toggle} style={{ marginTop: 20 }}>
            {g.close}
          </button>
        </div>
      )}
    </section>
  );
}
