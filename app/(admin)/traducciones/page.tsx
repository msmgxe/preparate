import type { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth';
import { LOCALE_NAMES, isLocale, type Locale } from '@/lib/i18n/config';
import { GROUPS, getRows } from '@/lib/translatable';
import { saveTranslation } from './actions';

export const metadata: Metadata = { title: 'Traducciones · RUMBO' };
export const dynamic = 'force-dynamic';

/** Los idiomas que se editan aquí. El español es el original, no se traduce. */
const EDITABLE: Locale[] = ['en', 'pt'];

export default async function TraduccionesPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string; grupo?: string }>;
}) {
  await requireAdmin();
  const { lang, grupo } = await searchParams;

  const locale: Locale = isLocale(lang) && lang !== 'es' ? lang : 'en';
  const group = GROUPS.find((g) => g.table === grupo) ?? GROUPS[0];
  const rows = await getRows(group, locale);

  const done = rows.filter((r) =>
    group.fields.some((f) => r.source[f.name] && r.target[f.name]),
  ).length;

  return (
    <>
      <section style={{ marginTop: 26 }}>
        <span className="eyebrow">Contenido</span>
        <h1 style={{ marginTop: 10 }}>Traducciones</h1>
        <p style={{ marginTop: 12, color: 'var(--paper-dim)', fontSize: 17, maxWidth: '64ch' }}>
          El español es el original y hace de respaldo: si dejas un campo vacío, el alumno verá el
          texto en español en lugar de un hueco. Los pasos de la resolución y los bloques de una
          clase se traducen desde el repositorio, con <code>npm run db:i18n</code>.
        </p>
      </section>

      {/* ── idioma ─────────────────────────────────────────────────────── */}
      <section style={{ marginTop: 24 }}>
        <div className="shead">
          <h2>Idioma</h2>
          <div className="rule" />
          <span className="eyebrow">
            {done} de {rows.length} traducidos
          </span>
        </div>
        <div className="qnav">
          {EDITABLE.map((code) => (
            <a
              key={code}
              className={`btn sm${code === locale ? ' solid' : ''}`}
              href={`/traducciones?lang=${code}&grupo=${group.table}`}
            >
              {LOCALE_NAMES[code]}
            </a>
          ))}
        </div>
      </section>

      {/* ── grupo ──────────────────────────────────────────────────────── */}
      <section style={{ marginTop: 20 }}>
        <div className="shead">
          <h2>Qué traducir</h2>
          <div className="rule" />
        </div>
        <div className="qnav">
          {GROUPS.map((g) => (
            <a
              key={g.table}
              className={`btn sm${g.table === group.table ? ' solid' : ''}`}
              href={`/traducciones?lang=${locale}&grupo=${g.table}`}
            >
              {g.title}
            </a>
          ))}
        </div>
        <p className="hint" style={{ textAlign: 'left', marginTop: 12 }}>
          {group.hint}
        </p>
      </section>

      {/* ── filas ──────────────────────────────────────────────────────── */}
      <section style={{ marginTop: 8 }}>
        <div style={{ display: 'grid', gap: 14 }}>
          {rows.map((row) => (
            <details key={row.id} className="qcardbox" style={{ padding: 0 }}>
              <summary className="rl" style={{ cursor: 'pointer', listStyle: 'none' }}>
                <span
                  className={`st ${group.fields.some((f) => r0(row, f.name)) ? 'ok' : 'bad'}`}
                >
                  {group.fields.some((f) => r0(row, f.name)) ? '✓' : '·'}
                </span>
                <span className="tx">{row.label}</span>
                <span className="ar">{locale.toUpperCase()}</span>
              </summary>

              <form action={saveTranslation} style={{ padding: '4px 20px 22px' }}>
                <input type="hidden" name="table" value={group.table} />
                <input type="hidden" name="id" value={row.id} />
                <input type="hidden" name="locale" value={locale} />

                {group.fields.map((field) => {
                  // un campo que no existe en español tampoco se traduce
                  if (!row.source[field.name]) return null;
                  return (
                    <div className="field" key={field.name}>
                      <label htmlFor={`${row.id}-${field.name}`}>{field.label}</label>
                      <p
                        className="mono"
                        style={{
                          fontSize: 12.5,
                          color: 'var(--paper-dim)',
                          margin: '0 0 8px',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {row.source[field.name]}
                      </p>
                      {field.kind === 'line' ? (
                        <input
                          id={`${row.id}-${field.name}`}
                          name={field.name}
                          defaultValue={row.target[field.name]}
                          placeholder="sin traducir"
                        />
                      ) : (
                        <textarea
                          id={`${row.id}-${field.name}`}
                          name={field.name}
                          rows={field.kind === 'list' ? 6 : 3}
                          defaultValue={row.target[field.name]}
                          placeholder="sin traducir"
                        />
                      )}
                    </div>
                  );
                })}

                <button className="btn solid sm">Guardar {LOCALE_NAMES[locale]}</button>
              </form>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

/** ¿Este campo tiene traducción guardada? */
function r0(row: { source: Record<string, string>; target: Record<string, string> }, name: string) {
  return Boolean(row.source[name] && row.target[name]);
}
