import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { AuthCard } from '../AuthCard';
import { getProfile, homeFor } from '@/lib/auth';

export const metadata: Metadata = { title: 'Crear cuenta · RUMBO' };

export default async function RegistroPage() {
  const profile = await getProfile();
  if (profile) redirect(homeFor(profile.role));

  return <AuthCard mode="up" />;
}
