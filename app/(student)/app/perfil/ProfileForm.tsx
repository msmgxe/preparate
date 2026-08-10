'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateProfile, type AuthState } from '@/app/(auth)/actions';
import type { Profile } from '@/db/schema';
import type { Dict } from '@/lib/i18n/dictionaries/es';
import { ORG_NAMES } from '@/app/(auth)/AuthCard';

function Submit({ label, saving }: { label: string; saving: string }) {
  const { pending } = useFormStatus();
  return (
    <button className="btn solid" disabled={pending}>
      {pending ? saving : label}
    </button>
  );
}

export function ProfileForm({ profile, t }: { profile: Profile; t: Dict }) {
  const [state, action] = useActionState(updateProfile, {} as AuthState);
  const known = [...ORG_NAMES, t.auth.orgUndecided];
  const orgs =
    profile.targetOrg && !known.includes(profile.targetOrg)
      ? [profile.targetOrg, ...known]
      : known;

  return (
    <form action={action} className="card" style={{ maxWidth: 520 }}>
      <div className="field">
        <label htmlFor="display_name">{t.auth.fullName}</label>
        <input id="display_name" name="display_name" defaultValue={profile.displayName} required />
      </div>
      <div className="field">
        <label htmlFor="school">{t.auth.school}</label>
        <input id="school" name="school" defaultValue={profile.school ?? ''} />
      </div>
      <div className="field">
        <label htmlFor="target_org">{t.auth.targetOrg}</label>
        <select id="target_org" name="target_org" defaultValue={profile.targetOrg ?? orgs[0]}>
          {orgs.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="target_date">{t.auth.examDate}</label>
        <input
          id="target_date"
          name="target_date"
          type="date"
          defaultValue={profile.targetDate ?? ''}
        />
      </div>

      <Submit label={t.app.profileSave} saving={t.app.profileSaving} />
      {state.error && <p className="notice bad">{state.error}</p>}
      {state.notice && <p className="notice good">{state.notice}</p>}
    </form>
  );
}
