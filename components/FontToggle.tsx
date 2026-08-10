'use client';

import { ALargeSmall } from 'lucide-react';
import { useSyncExternalStore } from 'react';

export const FONT_KEY = 'rumbo-font';

/** Los tres modos de lectura. La cadena vacía es la tipografía de siempre. */
export const FONT_MODES = ['', 'lexend', 'atkinson'] as const;
export type FontMode = (typeof FONT_MODES)[number];

/**
 * Tipografía de lectura, para quien la necesite.
 *
 * Inter es la de casa y sirve a la mayoría. Pero en una clase virtual hay
 * alumnos con dislexia o con poca visión, y para ellos la letra correcta es la
 * diferencia entre seguir la clase y abandonarla:
 *
 *  · **Lexend** se diseñó midiendo velocidad de lectura en escolares. Abre el
 *    espacio entre letras y simplifica los trazos.
 *  · **Atkinson Hyperlegible**, del Braille Institute, separa a propósito los
 *    pares que se confunden con poca visión: 0/O, I/l/1, b/d.
 *
 * Se guarda igual que el tema, en `data-font` sobre el `<html>`, y por tanto
 * cambia a la vez la app, el panel y la página de venta.
 */
export const FONT_BOOTSTRAP = `(function(){try{
  var f = localStorage.getItem('${FONT_KEY}');
  if (f === 'lexend' || f === 'atkinson') document.documentElement.dataset.font = f;
}catch(e){}})()`;

const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const readFont = () => document.documentElement.dataset.font ?? '';
const onServer = () => '';

export function FontToggle({
  variant = 'app',
  labels,
}: {
  variant?: 'app' | 'landing';
  labels: { standard: string; lexend: string; atkinson: string; next: string };
}) {
  const raw = useSyncExternalStore(subscribe, readFont, onServer);
  const mode: FontMode = FONT_MODES.includes(raw as FontMode) ? (raw as FontMode) : '';

  const name = { '': labels.standard, lexend: labels.lexend, atkinson: labels.atkinson };
  const next = FONT_MODES[(FONT_MODES.indexOf(mode) + 1) % FONT_MODES.length];

  const cycle = () => {
    if (next) document.documentElement.dataset.font = next;
    else delete document.documentElement.dataset.font;
    try {
      localStorage.setItem(FONT_KEY, next);
    } catch {
      // navegación privada: el cambio vale para esta visita
    }
    listeners.forEach((fn) => fn());
  };

  const title = `${labels.next}: ${name[next]}`;

  return (
    <button
      onClick={cycle}
      className={variant === 'landing' ? 'lp-fontbtn' : 'themebtn'}
      // el título dice qué pasa al pulsar; el estado, qué hay puesto ahora
      aria-label={title}
      title={title}
      data-on={mode !== '' ? 'true' : undefined}
    >
      <ALargeSmall size={17} />
      <span className="sr-only">{name[mode]}</span>
    </button>
  );
}
