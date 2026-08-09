import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

/**
 * Conexión perezosa a Neon.
 *
 * `neon()` revienta si falta `DATABASE_URL`, y Next.js evalúa el código de
 * módulo en build: inicializar arriba rompería `next build` antes de que las
 * variables existan. Nada de envolver esto en un `Proxy` — rompe librerías que
 * inspeccionan el objeto.
 */
type Db = ReturnType<typeof create>;

function create() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'Falta DATABASE_URL. Copia .env.local.example a .env.local y pega la cadena de conexión de Neon.',
    );
  }
  return drizzle(neon(url), { schema });
}

let cached: Db | null = null;

export function getDb(): Db {
  if (!cached) cached = create();
  return cached;
}

export const dbConfigured = () => Boolean(process.env.DATABASE_URL);

export * as schema from './schema';
