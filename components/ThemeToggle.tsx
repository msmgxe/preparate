'use client';

import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

export const THEME_KEY = 'rumbo-theme';

/**
 * Un solo interruptor para las dos caras del producto.
 *
 * `data-theme` vive en el `<html>` y vale `light` o `dark`. Cuando no está
 * puesto, cada superficie usa su valor natural: la página de venta es clara y
 * la app de estudio es oscura, que es como nacieron. En cuanto el usuario
 * elige, la preferencia manda en ambas.
 */
export const THEME_BOOTSTRAP = `(function(){try{
  var t = localStorage.getItem('${THEME_KEY}');
  if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
}catch(e){}})()`;

const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const readTheme = () => document.documentElement.dataset.theme ?? '';
const onServer = () => '';

export function ThemeToggle({
  /** Qué significa «sin preferencia» en esta superficie. */
  defaultDark,
  label,
}: {
  defaultDark: boolean;
  label?: { toLight: string; toDark: string };
}) {
  const theme = useSyncExternalStore(subscribe, readTheme, onServer);
  const dark = theme === 'dark' || (theme === '' && defaultDark);

  const toggle = () => {
    const next = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // navegación privada: el cambio vale para esta visita
    }
    listeners.forEach((fn) => fn());
  };

  const title = dark ? (label?.toLight ?? 'Modo claro') : (label?.toDark ?? 'Modo oscuro');

  return (
    <button onClick={toggle} className="themebtn" aria-label={title} title={title}>
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
