'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateProfile, type AuthState } from '@/app/(auth)/actions';
import type { Profile } from '@/db/schema';

const ORGS = [
  'ISIL — Evaluación de Potencial',
  'USIL — Examen de admisión',
  'UPC',
  'Universidad de Lima',
  'Aún no decidido',
];

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="btn solid" disabled={pending}>
      {pending ? 'Guardando…' : 'Guardar ficha'}
    </button>
  );
}

export function ProfileForm({ profile }: { profile: Profile }) {
  const [state, action] = useActionState(updateProfile, {} as AuthState);
  const orgs = profile.targetOrg && !ORGS.includes(profile.targetOrg)
    ? [profile.targetOrg, ...ORGS]
    : ORGS;

  return (
    <form action={action} className="card" style={{ maxWidth: 520 }}>
      <div className="field">
        <label htmlFor="display_name">Nombre completo</label>
        <input id="display_name" name="display_name" defaultValue={profile.displayName} required />
      </div>
      <div className="field">
        <label htmlFor="school">Colegio / Academia</label>
        <input id="school" name="school" defaultValue={profile.school ?? ''} />
      </div>
      <div className="field">
        <label htmlFor="target_org">Institución objetivo</label>
        <select id="target_org" name="target_org" defaultValue={profile.targetOrg ?? ORGS[0]}>
          {orgs.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="target_date">Fecha del examen</label>
        <input
          id="target_date"
          name="target_date"
          type="date"
          defaultValue={profile.targetDate ?? ''}
        />
      </div>

      <Submit />
      {state.error && <p className="notice bad">{state.error}</p>}
      {state.notice && <p className="notice good">{state.notice}</p>}
    </form>
  );
}
