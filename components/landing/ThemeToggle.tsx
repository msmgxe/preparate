'use client';

import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

export const THEME_KEY = 'rumbo-lp-theme';

/**
 * Script que corre antes de pintar, para que quien prefiera el modo oscuro no
 * vea un fogonazo blanco. Se inyecta dentro del `.lp`, así que
 * `currentScript.parentElement` es exactamente ese nodo.
 */
export const THEME_BOOTSTRAP = `(function(){try{
  var saved = localStorage.getItem('${THEME_KEY}');
  var dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  if (dark && document.currentScript) document.currentScript.parentElement.classList.add('dark');
}catch(e){}})()`;

const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

/**
 * La fuente de verdad es la clase del DOM, que ya dejó puesta el script de
 * arriba. Leerla con `useSyncExternalStore` evita tener que sincronizarla
 * desde un efecto, que es lo que provoca renders en cascada.
 */
const isDark = () => document.querySelector('.lp')?.classList.contains('dark') ?? false;
const onServer = () => false;

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, onServer);

  const toggle = () => {
    const lp = document.querySelector('.lp');
    if (!lp) return;
    const next = !lp.classList.contains('dark');
    lp.classList.toggle('dark', next);
    try {
      localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
    } catch {
      // modo privado o almacenamiento bloqueado: el cambio vale para esta visita
    }
    listeners.forEach((fn) => fn());
  };

  return (
    <button
      onClick={toggle}
      className="lp-btn lp-btn-ghost"
      style={{ padding: 10, borderRadius: 10 }}
      aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={dark ? 'Modo claro' : 'Modo oscuro'}
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
