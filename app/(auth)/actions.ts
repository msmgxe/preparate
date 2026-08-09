'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { profiles } from '@/db/schema';
import { getAuth } from '@/lib/neon-auth';
import { getProfile, homeFor } from '@/lib/auth';
import { authConfigured, dbConfigured, env } from '@/lib/env';

export type AuthState = { error?: string; notice?: string };

const NOT_CONFIGURED: AuthState = {
  error:
    'Falta configurar Neon. Copia .env.local.example a .env.local y pon DATABASE_URL, NEON_AUTH_BASE_URL y NEON_AUTH_COOKIE_SECRET.',
};

function str(form: FormData, key: string): string {
  return String(form.get(key) ?? '').trim();
}

/** Mensajes de Better Auth traducidos a algo que un alumno entienda. */
function traducir(message: string | undefined): string {
  const m = (message ?? '').toLowerCase();
  if (m.includes('invalid') && (m.includes('credential') || m.includes('password')))
    return 'Correo o contraseña incorrectos.';
  if (m.includes('not verified') || m.includes('not confirmed'))
    return 'Confirma tu correo antes de entrar.';
  if (m.includes('already exists') || m.includes('already registered'))
    return 'Ese correo ya tiene cuenta. Inicia sesión.';
  if (m.includes('rate') || m.includes('too many'))
    return 'Demasiados intentos seguidos. Espera un minuto.';
  if (m.includes('password') && m.includes('short'))
    return 'La contraseña necesita al menos 8 caracteres.';
  return message || 'No se pudo completar. Intenta de nuevo.';
}

async function landing(): Promise<string> {
  const profile = await getProfile();
  return homeFor(profile?.role ?? 'student');
}

/**
 * Dónde aterriza el usuario recién autenticado.
 *
 * No sirve leer la sesión aquí: la cookie que acaba de emitir Neon Auth viaja
 * en la respuesta, no en la petición que estamos atendiendo, así que
 * `getSessionUser()` devolvería null. Vamos directo a `profiles` con el id que
 * nos dio la propia llamada, y si es el primer ingreso lo creamos.
 */
async function landingForUser(userId: string, email: string, name?: string): Promise<string> {
  const db = getDb();
  const [existing] = await db
    .select({ role: profiles.role })
    .from(profiles)
    .where(eq(profiles.id, userId))
    .limit(1);

  if (existing) return homeFor(existing.role);

  const isAdmin = env.adminEmails.includes(email.toLowerCase());
  await db
    .insert(profiles)
    .values({
      id: userId,
      email: email.toLowerCase(),
      displayName: name?.trim() || email.split('@')[0],
      role: isAdmin ? 'admin' : 'student',
    })
    .onConflictDoNothing();

  return homeFor(isAdmin ? 'admin' : 'student');
}

export async function signIn(_prev: AuthState, form: FormData): Promise<AuthState> {
  if (!authConfigured || !dbConfigured) return NOT_CONFIGURED;

  const email = str(form, 'email');
  const password = str(form, 'password');
  if (!email || !password) return { error: 'Escribe tu correo y tu contraseña.' };

  const { data, error } = await getAuth().signIn.email({ email, password });
  if (error) return { error: traducir(error.message) };

  const user = data?.user;
  if (!user) return { error: 'No se pudo abrir la sesión. Intenta de nuevo.' };

  revalidatePath('/', 'layout');
  redirect(await landingForUser(user.id, user.email, user.name));
}

export async function signUp(_prev: AuthState, form: FormData): Promise<AuthState> {
  if (!authConfigured || !dbConfigured) return NOT_CONFIGURED;

  const email = str(form, 'email');
  const password = str(form, 'password');
  const displayName = str(form, 'display_name');
  if (!displayName) return { error: 'Escribe tu nombre completo.' };
  if (!email || !password) return { error: 'Escribe tu correo y tu contraseña.' };
  if (password.length < 8) return { error: 'La contraseña necesita al menos 8 caracteres.' };

  const { data, error } = await getAuth().signUp.email({ email, password, name: displayName });
  if (error) return { error: traducir(error.message) };

  const user = data?.user;
  if (!user) return { error: 'La cuenta no se pudo crear. Intenta de nuevo.' };

  // Neon Auth solo guarda identidad; el resto de la ficha es nuestra.
  const isAdmin = env.adminEmails.includes(email.toLowerCase());
  const ficha = {
    displayName,
    school: str(form, 'school') || null,
    targetOrg: str(form, 'target_org') || null,
    targetDate: str(form, 'target_date') || null,
  };

  await getDb()
    .insert(profiles)
    .values({ id: user.id, email: email.toLowerCase(), role: isAdmin ? 'admin' : 'student', ...ficha })
    .onConflictDoUpdate({ target: profiles.id, set: ficha });

  /**
   * `token` es el discriminante: viene con valor cuando la sesión ya quedó
   * abierta, y `null` cuando el proyecto exige confirmar el correo primero.
   * Antes preguntaba por la sesión leyendo cookies que aún no existían, y
   * anunciaba un correo que nunca se llegó a enviar.
   */
  if (!data?.token) {
    return { notice: `Te enviamos un correo a ${email} para confirmar la cuenta.` };
  }

  revalidatePath('/', 'layout');
  redirect(homeFor(isAdmin ? 'admin' : 'student'));
}

export async function magicLink(_prev: AuthState, form: FormData): Promise<AuthState> {
  if (!authConfigured || !dbConfigured) return NOT_CONFIGURED;

  const email = str(form, 'email');
  if (!email) return { error: 'Escribe tu correo para enviarte el enlace.' };

  const { error } = await getAuth().signIn.magicLink({
    email,
    callbackURL: `${env.siteUrl}/`,
  });
  if (error) return { error: traducir(error.message) };

  return { notice: `Revisa ${email}: el enlace entra sin contraseña.` };
}

export async function signOut() {
  if (authConfigured) await getAuth().signOut();
  revalidatePath('/', 'layout');
  redirect('/login');
}

/** Edición de la ficha del alumno desde `/perfil`. */
export async function updateProfile(_prev: AuthState, form: FormData): Promise<AuthState> {
  const profile = await getProfile();
  if (!profile) return { error: 'Sesión expirada.' };

  const displayName = str(form, 'display_name');
  if (!displayName) return { error: 'El nombre no puede quedar vacío.' };

  const db = getDb();
  await db
    .update(profiles)
    .set({
      displayName,
      school: str(form, 'school') || null,
      targetOrg: str(form, 'target_org') || null,
      targetDate: str(form, 'target_date') || null,
    })
    .where(eq(profiles.id, profile.id));

  revalidatePath('/', 'layout');
  return { notice: 'Ficha actualizada.' };
}
