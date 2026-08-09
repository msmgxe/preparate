'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { magicLink, signIn, signUp, type AuthState } from './actions';

const EMPTY: AuthState = {};

const ORGS = [
  'ISIL — Evaluación de Potencial',
  'USIL — Examen de admisión',
  'UPC',
  'Universidad de Lima',
  'Aún no decidido',
];

function Submit({ label, pending: forced }: { label: string; pending?: boolean }) {
  const { pending } = useFormStatus();
  const busy = pending || forced;
  return (
    <button type="submit" className="btn solid full" style={{ marginTop: 8 }} disabled={busy}>
      {busy ? 'Un momento…' : label}
    </button>
  );
}

function MagicLinkButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn full" style={{ marginTop: 10 }} disabled={pending}>
      {pending ? 'Enviando…' : '✦ Enviarme un enlace mágico'}
    </button>
  );
}

function Feedback({ state }: { state: AuthState }) {
  if (state.error) return <p className="notice bad">{state.error}</p>;
  if (state.notice) return <p className="notice good">{state.notice}</p>;
  return null;
}

export function AuthCard({ mode }: { mode: 'in' | 'up' }) {
  const [state, action] = useActionState(mode === 'up' ? signUp : signIn, EMPTY);
  const [magicState, magicAction] = useActionState(magicLink, EMPTY);

  return (
    <>
      <div className="card">
        <div className="seg">
          <Link href="/login" className={mode === 'in' ? 'on' : ''}>
            Iniciar sesión
          </Link>
          <Link href="/registro" className={mode === 'up' ? 'on' : ''}>
            Crear cuenta
          </Link>
        </div>

        <form action={action}>
          {mode === 'up' && (
            <>
              <div className="field">
                <label htmlFor="display_name">Nombre completo</label>
                <input id="display_name" name="display_name" placeholder="Rodrigo Mendoza" required />
              </div>
              <div className="field">
                <label htmlFor="school">Colegio / Academia</label>
                <input id="school" name="school" placeholder="Colegio San Agustín" />
              </div>
              <div className="field">
                <label htmlFor="target_org">Institución objetivo</label>
                <select id="target_org" name="target_org" defaultValue={ORGS[0]}>
                  {ORGS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="target_date">Fecha estimada del examen</label>
                <input id="target_date" name="target_date" type="date" defaultValue="2026-12-28" />
              </div>
            </>
          )}

          <div className="field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="rodrigo@correo.com"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={mode === 'up' ? 'new-password' : 'current-password'}
              placeholder="••••••••"
              required
              minLength={8}
            />
          </div>

          <Submit label={mode === 'up' ? 'Crear cuenta y abordar →' : 'Abordar →'} />
          <Feedback state={state} />
        </form>

        <div className="demo">
          <span className="eyebrow">Sin contraseña</span>
          <form action={magicAction}>
            <div className="field" style={{ marginTop: 12, marginBottom: 0 }}>
              <input name="email" type="email" placeholder="rodrigo@correo.com" required />
            </div>
            <MagicLinkButton />
            <Feedback state={magicState} />
          </form>
          <p className="hint">
            El enlace mágico llega a tu correo y entra directo. Útil en el celular.
          </p>
        </div>
      </div>

      <p className="hint" style={{ marginTop: 20 }}>
        Tus respuestas solo las ves tú y quien te acompaña.
      </p>
    </>
  );
}
