/**
 * Variables de entorno en un solo lugar.
 * `DATABASE_URL`, `NEON_AUTH_COOKIE_SECRET` y `ANTHROPIC_API_KEY` jamás llevan
 * el prefijo `NEXT_PUBLIC_`: si lo llevaran, viajarían al navegador.
 */
export const env = {
  databaseUrl: process.env.DATABASE_URL ?? '',
  authBaseUrl: process.env.NEON_AUTH_BASE_URL ?? '',
  authCookieSecret: process.env.NEON_AUTH_COOKIE_SECRET ?? '',
  anthropicKey: process.env.ANTHROPIC_API_KEY ?? '',
  /** Correos que entran como admin la primera vez que inician sesión. */
  adminEmails: (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'),
};

export const dbConfigured = Boolean(env.databaseUrl);
export const authConfigured = Boolean(env.authBaseUrl && env.authCookieSecret.length >= 32);
