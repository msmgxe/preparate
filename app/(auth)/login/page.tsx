import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getI18n } from '@/lib/i18n';
import { AuthCard } from '../AuthCard';
import { getProfile, homeFor } from '@/lib/auth';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: `${t.titles.login} · RUMBO` };
}

export default async function LoginPage() {
  const { t } = await getI18n();
  const profile = await getProfile();
  if (profile) redirect(homeFor(profile.role));

  return <AuthCard mode="in" t={t} />;
}
