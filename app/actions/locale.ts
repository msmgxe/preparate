'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { profiles } from '@/db/schema';
import { getProfile } from '@/lib/auth';
import { isLocale, LOCALE_COOKIE } from '@/lib/i18n/config';

/**
 * Cambia el idioma. Se guarda en cookie para el visitante anónimo y, si hay
 * sesión, también en el perfil, para que le siga entre dispositivos.
 */
export async function setLocale(formData: FormData) {
  const next = String(formData.get('locale') ?? '');
  if (!isLocale(next)) return;

  const store = await cookies();
  store.set(LOCALE_COOKIE, next, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });

  const profile = await getProfile();
  if (profile) {
    await getDb().update(profiles).set({ locale: next }).where(eq(profiles.id, profile.id));
  }

  revalidatePath('/', 'layout');
}
