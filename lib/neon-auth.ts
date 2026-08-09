import { createNeonAuth } from '@neondatabase/auth/next/server';
import { env, authConfigured } from '@/lib/env';

/**
 * Instancia única de Neon Auth (Better Auth gestionado).
 *
 * Expone `signIn.email`, `signIn.magicLink`, `signUp.email`, `signOut`,
 * `getSession`, más `handler()` para la ruta `/api/auth/[...path]` y
 * `middleware()` para el proxy.
 *
 * `cookies.secret` debe tener 32 caracteres o más, si no revienta al crearse:
 * por eso se construye perezosamente y solo cuando está configurado.
 */
type Auth = ReturnType<typeof createNeonAuth>;

let cached: Auth | null = null;

export function getAuth(): Auth {
  if (!authConfigured) {
    throw new Error(
      'Falta configurar Neon Auth. Necesitas NEON_AUTH_BASE_URL y un NEON_AUTH_COOKIE_SECRET de 32+ caracteres en .env.local.',
    );
  }
  if (!cached) {
    cached = createNeonAuth({
      baseUrl: env.authBaseUrl,
      cookies: { secret: env.authCookieSecret, sameSite: 'lax' },
      logLevel: 'warn',
    });
  }
  return cached;
}
