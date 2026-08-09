/**
 * Aplica `docs/schema.sql` y, con `--seed`, también `docs/seed.sql` a Neon.
 *
 *   npm run db:setup     → solo el esquema
 *   npm run db:seed      → esquema + contenido del prototipo
 *
 * Los dos archivos son idempotentes: se pueden reejecutar.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { neon } from '@neondatabase/serverless';
import { splitSql, stripSqlComments } from './split-sql';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    '✕ No encuentro DATABASE_URL.\n\n' +
      '  1. Crea el archivo:   cp .env.local.example .env.local\n' +
      '  2. Ábrelo y pega la cadena de conexión de tu proyecto Neon\n' +
      '     (la que termina en «-pooler», desde console.neon.tech → Connect).\n\n' +
      '  Detalle completo en docs/SETUP.md.',
  );
  process.exit(1);
}

const sql = neon(url);

async function run(file: string) {
  const path = resolve(process.cwd(), 'docs', file);
  const statements = splitSql(readFileSync(path, 'utf8'));
  process.stdout.write(`\n▸ ${file} — ${statements.length} sentencias\n`);

  let done = 0;
  for (const statement of statements) {
    try {
      await sql.query(statement);
      done += 1;
    } catch (error) {
      const snippet = stripSqlComments(statement).slice(0, 240);
      console.error(`\n✕ Falló en la sentencia ${done + 1} de ${file}:\n${snippet}\n`);
      throw error;
    }
  }
  process.stdout.write(`  ✓ ${done} aplicadas\n`);
}

// Envuelto en `main()` a propósito: `tsx` compila este archivo a CommonJS,
// donde un `await` de nivel superior no está permitido.
async function main() {
  await run('schema.sql');
  if (process.argv.includes('--seed')) {
    await run('seed.sql');
    await run('seed-ingles.sql');
  }
  process.stdout.write('\n✓ Base lista.\n');
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
