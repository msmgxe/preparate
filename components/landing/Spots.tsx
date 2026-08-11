/**
 * Las viñetas de la sección «cómo se estudia aquí».
 *
 * Son dibujos pequeños, uno por afirmación, y cada uno enseña justo la cosa
 * que el párrafo de al lado describe: los pasos de una resolución, la
 * alternativa marcada con su motivo, los cuatro días del repaso, la clase que
 * va antes de la práctica. Si un dibujo solo repitiera el titular con un icono
 * bonito, sobraría; el criterio aquí es el mismo que en las infografías de las
 * clases.
 *
 * Al ser componentes de React y no SVG guardados en la base, los colores
 * pueden ir en `style` con `var()` —dentro de un atributo de SVG no se
 * sustituirían— y heredan el tema claro y oscuro sin dos versiones.
 */

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 260 96" width="100%" style={{ height: 'auto', display: 'block' }} role="img" aria-hidden="true">
      {children}
    </svg>
  );
}

const line = { stroke: 'var(--line)', strokeWidth: 1.4 };
const ink = (o: number) => ({ fill: 'var(--text)', opacity: o });

/** La resolución paso a paso, siempre disponible. */
export function SpotSteps() {
  return (
    <Frame>
      <rect x="4" y="10" width="104" height="76" rx="10" style={{ fill: 'var(--surface-2)' }} />
      <rect x="4" y="10" width="104" height="76" rx="10" style={{ ...line, fill: 'none' }} />
      <rect x="16" y="24" width="72" height="7" rx="3.5" style={ink(0.28)} />
      <rect x="16" y="38" width="56" height="7" rx="3.5" style={ink(0.18)} />
      <rect x="16" y="56" width="80" height="18" rx="6" style={{ fill: 'var(--brand-soft)' }} />
      <text x="56" y="69" textAnchor="middle" style={{ fill: 'var(--brand)', fontSize: 11, fontWeight: 700 }}>
        ¿por qué?
      </text>

      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(0 ${i * 24})`}>
          <circle cx="134" cy="24" r="9" style={{ fill: 'var(--brand)' }} />
          <text x="134" y="28" textAnchor="middle" style={{ fill: '#fff', fontSize: 10, fontWeight: 800 }}>
            {i + 1}
          </text>
          <rect x="150" y="20" width={92 - i * 18} height="8" rx="4" style={ink(0.22)} />
        </g>
      ))}
      <path d="M 112 66 L 124 66" style={{ stroke: 'var(--brand)', strokeWidth: 1.6 }} />
    </Frame>
  );
}

/** Cada alternativa equivocada trae escrito el error que la explica. */
export function SpotWhy() {
  return (
    <Frame>
      {[
        { y: 8, label: '20 %', ok: false },
        { y: 34, label: '28 %', ok: true },
        { y: 60, label: '30 %', ok: false, note: true },
      ].map((row) => (
        <g key={row.y}>
          <rect
            x="4"
            y={row.y}
            width="120"
            height="22"
            rx="7"
            style={{
              fill: row.ok ? 'color-mix(in srgb, var(--lime) 16%, var(--surface))' : 'var(--surface-2)',
              stroke: row.ok ? 'var(--lime)' : 'var(--line)',
              strokeWidth: 1.3,
            }}
          />
          <text x="20" y={row.y + 15} style={{ fill: 'var(--text)', fontSize: 11 }}>
            {row.label}
          </text>
          {row.ok && (
            <path
              d={`M 100 ${row.y + 11} l 4 4 l 8 -8`}
              style={{ fill: 'none', stroke: 'var(--lime)', strokeWidth: 2, strokeLinecap: 'round' }}
            />
          )}
          {row.note && (
            <>
              <path d={`M 128 ${row.y + 11} L 142 ${row.y + 11}`} style={{ stroke: 'var(--rose)', strokeWidth: 1.4 }} />
              <rect x="144" y={row.y - 4} width="112" height="30" rx="8" style={{ fill: 'color-mix(in srgb, var(--rose) 12%, var(--surface))' }} />
              <text x="200" y={row.y + 9} textAnchor="middle" style={{ fill: 'var(--rose)', fontSize: 9.5, fontWeight: 700 }}>
                sumaste los
              </text>
              <text x="200" y={row.y + 20} textAnchor="middle" style={{ fill: 'var(--rose)', fontSize: 9.5, fontWeight: 700 }}>
                porcentajes
              </text>
            </>
          )}
        </g>
      ))}
    </Frame>
  );
}

/** Lo fallado vuelve a los días 1, 3, 7 y 21. */
export function SpotSpaced() {
  const days = [1, 3, 7, 21];
  const x = [24, 74, 140, 236];
  return (
    <Frame>
      <line x1="10" y1="56" x2="250" y2="56" style={{ stroke: 'var(--line)', strokeWidth: 2 }} />
      {x.map((cx, i) => (
        <g key={days[i]}>
          <line x1={cx} y1="56" x2={cx} y2="40" style={{ stroke: 'var(--brand)', strokeWidth: 1.4 }} />
          <circle cx={cx} cy="56" r={7 - i * 0.6} style={{ fill: 'var(--brand)' }} />
          <text x={cx} y="32" textAnchor="middle" style={{ fill: 'var(--brand)', fontSize: 11, fontWeight: 800 }}>
            {days[i]}
          </text>
          <text x={cx} y="78" textAnchor="middle" style={{ fill: 'var(--text-3)', fontSize: 9 }}>
            {i === 0 ? 'día' : ''}
          </text>
        </g>
      ))}
      <path d="M 244 50 L 254 56 L 244 62 Z" style={{ fill: 'var(--line)' }} />
      <text x="130" y="16" textAnchor="middle" style={{ fill: 'var(--text-3)', fontSize: 10 }}>
        cada vez más separado
      </text>
    </Frame>
  );
}

/** Primero la clase, después las preguntas. */
export function SpotLesson() {
  return (
    <Frame>
      <rect x="4" y="14" width="104" height="68" rx="10" style={{ fill: 'var(--accent-soft)' }} />
      <rect x="4" y="14" width="104" height="68" rx="10" style={{ ...line, fill: 'none' }} />
      <circle cx="40" cy="42" r="13" style={{ fill: 'var(--accent)', opacity: 0.28 }} />
      <rect x="60" y="34" width="34" height="7" rx="3.5" style={{ fill: 'var(--accent)', opacity: 0.55 }} />
      <rect x="60" y="46" width="24" height="7" rx="3.5" style={{ fill: 'var(--accent)', opacity: 0.35 }} />
      <rect x="18" y="62" width="76" height="9" rx="4.5" style={{ fill: 'var(--accent)', opacity: 0.2 }} />
      <text x="56" y="106" textAnchor="middle" style={{ fill: 'var(--accent)', fontSize: 10 }} />

      <path d="M 116 48 L 140 48 M 133 42 L 140 48 L 133 54" style={{ fill: 'none', stroke: 'var(--text-3)', strokeWidth: 1.6 }} />

      <rect x="150" y="14" width="106" height="68" rx="10" style={{ fill: 'var(--surface-2)' }} />
      <rect x="150" y="14" width="106" height="68" rx="10" style={{ ...line, fill: 'none' }} />
      <rect x="162" y="26" width="70" height="7" rx="3.5" style={ink(0.26)} />
      {[42, 56, 70].map((y, i) => (
        <g key={y}>
          <rect x="162" y={y} width="82" height="10" rx="5" style={{ fill: 'var(--text)', opacity: i === 1 ? 0.14 : 0.07 }} />
          {i === 1 && <circle cx="238" cy={y + 5} r="4" style={{ fill: 'var(--lime)' }} />}
        </g>
      ))}
    </Frame>
  );
}

/**
 * El dibujo de «con las cartas sobre la mesa»: cuatro métodos sueltos que se
 * juntan en uno. Es literalmente lo que dice el párrafo de al lado.
 */
export function SpotStartup() {
  const items = ['repetición espaciada', 'práctica recuperativa', 'aprendizaje visual', 'retroalimentación'];
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ height: 'auto', display: 'block' }} role="img" aria-hidden="true">
      {items.map((label, i) => {
        const y = 12 + i * 34;
        return (
          <g key={label}>
            <rect x="0" y={y} width="150" height="26" rx="8" style={{ fill: 'var(--surface-2)', stroke: 'var(--line)', strokeWidth: 1.2 }} />
            <text x="12" y={y + 17} style={{ fill: 'var(--text-2)', fontSize: 9.5 }}>
              {label}
            </text>
            <path
              d={`M 154 ${y + 13} C 186 ${y + 13}, 190 100, 214 100`}
              style={{ fill: 'none', stroke: 'var(--brand)', strokeWidth: 1.3, opacity: 0.45 }}
            />
          </g>
        );
      })}
      <rect x="216" y="70" width="82" height="60" rx="14" style={{ fill: 'var(--brand)' }} />
      <text x="257" y="95" textAnchor="middle" style={{ fill: '#fff', fontSize: 11, fontWeight: 800 }}>
        juntos
      </text>
      <text x="257" y="110" textAnchor="middle" style={{ fill: '#fff', fontSize: 11, fontWeight: 800, opacity: 0.9 }}>
        y en orden
      </text>
      <text x="257" y="150" textAnchor="middle" style={{ fill: 'var(--text-3)', fontSize: 9.5 }}>
        en un solo sitio
      </text>
    </svg>
  );
}

export const PROOF_SPOTS = [SpotSteps, SpotWhy, SpotSpaced, SpotLesson];
