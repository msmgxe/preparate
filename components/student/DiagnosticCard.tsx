'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { Compass, X } from 'lucide-react';
import type { Dict } from '@/lib/i18n/dictionaries/es';

/**
 * La invitación al diagnóstico, en la portada del alumno.
 *
 * Es opcional de verdad: se puede cerrar y no vuelve a aparecer. Por eso el
 * estado vive en `localStorage` y no en la base — es una preferencia de esta
 * persona en este navegador, no un dato del curso, y guardarlo en el servidor
 * obligaría a una tabla y a una acción para algo que no lo merece.
 *
 * Quien la cierre y luego la quiera puede entrar igual: el enlace sigue en la
 * sala de simulacros.
 */
const KEY = 'rumbo-diag-card';
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const read = () => {
  try {
    return localStorage.getItem(KEY) ?? '';
  } catch {
    return '';
  }
};
const onServer = () => '';

export function DiagnosticCard({ t }: { t: Dict }) {
  const d = t.diag;
  const hidden = useSyncExternalStore(subscribe, read, onServer) === 'off';
  if (hidden) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, 'off');
    } catch {
      // sin persistencia se cierra solo para esta visita, que es suficiente
    }
    listeners.forEach((fn) => fn());
  };

  return (
    <aside className="diagcard">
      <span className="diagcard-icon">
        <Compass size={20} />
      </span>
      <div className="diagcard-txt">
        <span className="eyebrow" style={{ color: 'var(--sky)' }}>
          {d.eyebrow}
        </span>
        <b>{d.cardTitle}</b>
        <p>{d.cardBody}</p>
      </div>
      <div className="diagcard-cta">
        <Link className="btn sm primary" href="/app/diagnostico">
          {d.cardCta}
        </Link>
        <button className="diagcard-x" onClick={dismiss} aria-label={d.later}>
          <X size={16} />
        </button>
      </div>
    </aside>
  );
}
