import 'server-only';

import { eq } from 'drizzle-orm';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { getDb } from '@/db';
import { profiles, type Profile } from '@/db/schema';
import { getAuth } from '@/lib/neon-auth';
import { authConfigured, dbConfigured, env } from '@/lib/env';

export type { Profile };

type SessionUser = { id: string; email?: string | null; name?: string | null };

/** Usuario autenticado según Neon Auth, sin tocar la base. */
export async function getSessionUser(): Promise<SessionUser | null> {
  if (!authConfigured) return null;
  try {
    const { data } = await getAuth().getSession();
    const user = data?.user;
    return user?.id ? { id: user.id, email: user.email, name: user.name } : null;
  } catch {
    return null;
  }
}

/**
 * Crea la fila de `profiles` la primera vez que alguien entra.
 *
 * Con Supabase esto era un trigger sobre `auth.users`. Con Neon Auth la
 * identidad vive en el esquema `neon_auth`, que administra Neon: acoplarnos a
 * su forma interna sería frágil, así que el perfil se materializa aquí.
 */
async function ensureProfile(user: SessionUser): Promise<Profile> {
  const db = getDb();
  const email = user.email?.toLowerCase() ?? null;
  const isAdmin = Boolean(email && env.adminEmails.includes(email));

  const [row] = await db
    .insert(profiles)
    .values({
      id: user.id,
      email,
      displayName: user.name?.trim() || email?.split('@')[0] || 'Alumno',
      role: isAdmin ? 'admin' : 'student',
    })
    .onConflictDoUpdate({
      target: profiles.id,
      // el nombre y el rol los manda el perfil, no la sesión: solo se refresca el correo
      set: { email },
    })
    .returning();

  return row;
}

/** Perfil del usuario actual, o null si no hay sesión. */
export const getProfile = cache(async (): Promise<Profile | null> => {
  if (!dbConfigured) return null;
  const user = await getSessionUser();
  if (!user) return null;

  const db = getDb();
  const [existing] = await db.select().from(profiles).where(eq(profiles.id, user.id)).limit(1);
  return existing ?? (await ensureProfile(user));
});

/** Guard de `(student)`: hace falta sesión. El admin también puede mirar. */
export async function requireUser(): Promise<Profile> {
  const profile = await getProfile();
  if (!profile) redirect('/login');
  return profile;
}

/** Guard de `(admin)`: si no eres admin, te devuelve a tu itinerario. */
export async function requireAdmin(): Promise<Profile> {
  const profile = await getProfile();
  if (!profile) redirect('/login');
  if (profile.role !== 'admin') redirect('/');
  return profile;
}

/** Dónde aterriza cada rol al entrar. */
export function homeFor(role: Profile['role']): string {
  return role === 'admin' ? '/panel' : '/app';
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}
