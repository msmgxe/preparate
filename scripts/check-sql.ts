/**
 * Comprueba que `docs/*.sql` se parte en sentencias ejecutables, sin tocar la
 * base. Atrapa el fallo clásico: un `;` dentro de un comentario o de un
 * literal que corta una sentencia por la mitad.
 *
 *   npx tsx scripts/check-sql.ts
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { splitSql, stripSqlComments } from './split-sql';

const STARTS = /^(create|alter|drop|insert|update|delete|grant|revoke|do|comment|set|select|with)\b/i;

let failed = false;

for (const file of ['schema.sql', 'seed.sql', 'seed-ingles.sql']) {
  const source = readFileSync(resolve(process.cwd(), 'docs', file), 'utf8');
  const statements = splitSql(source);
  const problems: string[] = [];

  statements.forEach((statement, i) => {
    const body = stripSqlComments(statement);

    if (!STARTS.test(body)) {
      problems.push(`  #${i + 1} no empieza por una palabra clave SQL: ${body.slice(0, 80)}`);
    }
    for (const tag of ['$$', '$rumbo$']) {
      const n = statement.split(tag).length - 1;
      if (n % 2 !== 0) problems.push(`  #${i + 1} tiene ${tag} sin cerrar`);
    }
    const quotes = (body.replace(/''/g, '').match(/'/g) ?? []).length;
    if (quotes % 2 !== 0) problems.push(`  #${i + 1} tiene una comilla simple sin cerrar`);
  });

  console.log(`${file} → ${statements.length} sentencias, ${problems.length} problemas`);
  if (problems.length) {
    failed = true;
    console.log(problems.slice(0, 10).join('\n'));
  }
}

if (failed) process.exit(1);
console.log('\n✓ Todos los archivos se parten limpio.');
