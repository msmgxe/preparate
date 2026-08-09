/**
 * Partido de un archivo .sql en sentencias ejecutables.
 * Vive aparte de `db.ts` para poder verificarlo sin tocar la base.
 */

export const stripSqlComments = (s: string) =>
  s
    .split('\n')
    .filter((line) => !line.trimStart().startsWith('--'))
    .join('\n')
    .trim();

/**
 * Parte el archivo en sentencias por `;`.
 *
 * Solo cuenta un `;` que esté "al aire". Hay cuatro sitios donde no lo está y
 * partir ahí rompería el SQL: los comentarios de línea `--`, los de bloque
 * `/* *\/`, los literales `'…'` y el dollar-quoting (`$$` de los cuerpos de
 * función, `$rumbo$` del seed).
 */
export function splitSql(source: string): string[] {
  const statements: string[] = [];
  let buffer = '';
  let i = 0;

  const push = () => {
    if (stripSqlComments(buffer) !== '') statements.push(buffer.trim());
    buffer = '';
  };

  while (i < source.length) {
    const rest = source.slice(i);

    // comentario de línea: hasta el salto, inclusive
    if (rest.startsWith('--')) {
      const end = source.indexOf('\n', i);
      const stop = end === -1 ? source.length : end + 1;
      buffer += source.slice(i, stop);
      i = stop;
      continue;
    }

    // comentario de bloque (Postgres los anida)
    if (rest.startsWith('/*')) {
      let depth = 0;
      const start = i;
      while (i < source.length) {
        if (source.startsWith('/*', i)) {
          depth += 1;
          i += 2;
        } else if (source.startsWith('*/', i)) {
          depth -= 1;
          i += 2;
          if (depth === 0) break;
        } else {
          i += 1;
        }
      }
      buffer += source.slice(start, i);
      continue;
    }

    // literal entre comillas simples ('' escapa una comilla)
    if (rest.startsWith("'")) {
      const start = i;
      i += 1;
      while (i < source.length) {
        if (source[i] === "'") {
          if (source[i + 1] === "'") i += 2;
          else {
            i += 1;
            break;
          }
        } else i += 1;
      }
      buffer += source.slice(start, i);
      continue;
    }

    // dollar-quoting: $$ … $$ o $etiqueta$ … $etiqueta$
    const open = /^\$[A-Za-z_]*\$/.exec(rest);
    if (open) {
      const tag = open[0];
      const close = source.indexOf(tag, i + tag.length);
      const stop = close === -1 ? source.length : close + tag.length;
      buffer += source.slice(i, stop);
      i = stop;
      continue;
    }

    if (source[i] === ';') {
      push();
      i += 1;
      continue;
    }

    buffer += source[i];
    i += 1;
  }

  push();
  return statements;
}
