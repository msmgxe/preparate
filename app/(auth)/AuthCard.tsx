'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { magicLink, signIn, signUp, type AuthState } from './actions';
import type { Dict } from '@/lib/i18n/dictionaries/es';

const EMPTY: AuthState = {};

/** Los nombres de las instituciones no se traducen: son nombres propios. */
export const ORG_NAMES = [
  'ISIL — Evaluación de Potencial',
  'USIL — Examen de admisión',
  'UPC',
  'Universidad de Lima',
];

function Submit({ label, working, pending: forced }: { label: string; working: string; pending?: boolean }) {
  const { pending } = useFormStatus();
  const busy = pending || forced;
  return (
    <button type="submit" className="btn solid full" style={{ marginTop: 8 }} disabled={busy}>
      {busy ? working : label}
    </button>
  );
}

function MagicLinkButton({ label, sending }: { label: string; sending: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn full" style={{ marginTop: 10 }} disabled={pending}>
      {pending ? sending : label}
    </button>
  );
}

function Feedback({ state }: { state: AuthState }) {
  if (state.error) return <p className="notice bad">{state.error}</p>;
  if (state.notice) return <p className="notice good">{state.notice}</p>;
  return null;
}

export function AuthCard({ mode, t }: { mode: 'in' | 'up'; t: Dict }) {
  const [state, action] = useActionState(mode === 'up' ? signUp : signIn, EMPTY);
  const [magicState, magicAction] = useActionState(magicLink, EMPTY);
  const a = t.auth;
  const orgs = [...ORG_NAMES, a.orgUndecided];

  return (
    <>
      <div className="card">
        <div className="seg">
          <Link href="/login" className={mode === 'in' ? 'on' : ''}>
            {a.signIn}
          </Link>
          <Link href="/registro" className={mode === 'up' ? 'on' : ''}>
            {a.signUp}
          </Link>
        </div>

        <form action={action}>
          {mode === 'up' && (
            <>
              <div className="field">
                <label htmlFor="display_name">{a.fullName}</label>
                <input id="display_name" name="display_name" placeholder="Rodrigo Mendoza" required />
              </div>
              <div className="field">
                <label htmlFor="school">{a.school}</label>
                <input id="school" name="school" placeholder="Colegio San Agustín" />
              </div>
              <div className="field">
                <label htmlFor="target_org">{a.targetOrg}</label>
                <select id="target_org" name="target_org" defaultValue={orgs[0]}>
                  {orgs.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="target_date">{a.examDate}</label>
                <input id="target_date" name="target_date" type="date" defaultValue="2026-12-28" />
              </div>
            </>
          )}

          <div className="field">
            <label htmlFor="email">{a.email}</label>
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
            <label htmlFor="password">{a.password}</label>
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

          <Submit label={mode === 'up' ? a.submitUp : a.submitIn} working={a.working} />
          <Feedback state={state} />
        </form>

        <div className="demo">
          <span className="eyebrow">{a.noPassword}</span>
          <form action={magicAction}>
            <div className="field" style={{ marginTop: 12, marginBottom: 0 }}>
              <input name="email" type="email" placeholder="rodrigo@correo.com" required />
            </div>
            <MagicLinkButton label={a.magicLink} sending={a.sending} />
            <Feedback state={magicState} />
          </form>
          <p className="hint">
            {a.magicHint}
          </p>
        </div>
      </div>

      <p className="hint" style={{ marginTop: 20 }}>
        {a.privacy}
      </p>
    </>
  );
}
