import Link from 'next/link';
import type { Metadata } from 'next';
import { requireUser } from '@/lib/auth';
import { ProfileForm } from './ProfileForm';
import { getI18n } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: `${t.titles.profile} · RUMBO` };
}

export default async function PerfilPage() {
  const profile = await requireUser();
  const { t } = await getI18n();

  return (
    <>
      <Link className="back" href="/app">
        {t.common.backToItinerary}
      </Link>

      <section style={{ marginTop: 8 }}>
        <span className="eyebrow">{t.app.passenger}</span>
        <h1 style={{ marginTop: 10 }}>{t.app.profileTitle}</h1>
        <p style={{ marginTop: 14, color: 'var(--paper-dim)', fontSize: 17, maxWidth: '58ch' }}>
          {t.app.profileBody}
        </p>
      </section>

      <section style={{ marginTop: 26 }}>
        <ProfileForm profile={profile} t={t} />
      </section>
    </>
  );
}
