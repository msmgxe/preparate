/**
 * Gráficos en SVG propio, sin librería de charts.
 *
 * Son server components: no hay interactividad ni tooltips, y por eso cada
 * valor va etiquetado dentro del gráfico en vez de en una leyenda flotante.
 */

export type Series = { name: string; color: string; points: (number | null)[] };

/**
 * `var()` no se resuelve dentro de un atributo SVG (`stroke="…"`), solo dentro
 * de una propiedad CSS. Por eso el trazo de la rejilla se pinta con `style`.
 */
const GRID = 'rgba(var(--fg-rgb),.09)';
const DIM = '#B9AE99';

/** Precisión semanal, una línea por alumno. */
export function TrendChart({
  series,
  labels,
  width = 620,
  height = 190,
}: {
  series: Series[];
  labels: string[];
  width?: number;
  height?: number;
}) {
  const padLeft = 34;
  const padBottom = 26;
  const span = Math.max(1, labels.length - 1);

  const x = (i: number) => padLeft + (i * (width - padLeft - 14)) / span;
  const y = (v: number) => height - padBottom - ((v - 30) * (height - padBottom - 14)) / 60;

  const hasData = series.some((s) => s.points.some((p) => p !== null));

  return (
    <>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto' }}>
        {[40, 60, 80, 90].map((v) => (
          <g key={v}>
            <line x1={padLeft} y1={y(v)} x2={width - 10} y2={y(v)} style={{ stroke: GRID }} strokeWidth="1" />
            <text x="6" y={y(v) + 4} fill={DIM} fontSize="9" fontFamily="var(--mono)">
              {v}%
            </text>
          </g>
        ))}

        {labels.map((label, i) => (
          <text
            key={label + i}
            x={x(i)}
            y={height - 8}
            textAnchor="middle"
            fill={DIM}
            fontSize="9"
            fontFamily="var(--mono)"
          >
            {label}
          </text>
        ))}

        {series.map((s, si) => {
          const drawn = s.points
            .map((v, i) => (v === null ? null : { i, v }))
            .filter((p): p is { i: number; v: number } => p !== null);
          if (!drawn.length) return null;

          const d = drawn.map((p, k) => `${k ? 'L' : 'M'} ${x(p.i)} ${y(p.v)}`).join(' ');
          return (
            <g key={s.name}>
              <path
                d={d}
                fill="none"
                stroke={s.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity=".9"
                className="draw"
                style={{ '--len': 1400, animationDelay: `${si * 0.12}s` } as React.CSSProperties}
              />
              {drawn.map((p) => (
                <circle
                  key={p.i}
                  cx={x(p.i)}
                  cy={y(p.v)}
                  r="2.6"
                  fill={s.color}
                  className="an"
                  style={{ animationDelay: `${0.5 + si * 0.1 + p.i * 0.03}s` }}
                />
              ))}
            </g>
          );
        })}
      </svg>

      {hasData ? (
        <div className="legend">
          {series.map((s) => (
            <span key={s.name}>
              <i style={{ background: s.color }} />
              {s.name.split(' ')[0]}
            </span>
          ))}
        </div>
      ) : (
        <p className="empty" style={{ marginTop: 10 }}>
          Todavía no hay suficientes sesiones para dibujar la tendencia.
        </p>
      )}
    </>
  );
}

export function heatColor(v: number | null): string {
  if (v === null) return 'rgba(var(--fg-rgb),.07)';
  if (v < 50) return 'rgba(255,95,87,.75)';
  if (v < 70) return 'rgba(239,164,81,.75)';
  if (v < 85) return 'rgba(79,214,156,.55)';
  return 'rgba(79,214,156,.95)';
}

/** Mapa de calor alumno × área. Encuentra el hueco de un vistazo. */
export function Heatmap({
  rows,
  cols,
  value,
}: {
  rows: { id: string; label: string }[];
  cols: { id: string; label: string }[];
  value: (rowId: string, colId: string) => number | null;
}) {
  return (
    <div className="heat" style={{ gridTemplateColumns: `130px repeat(${cols.length}, 1fr)` }}>
      <div />
      {cols.map((c) => (
        <div className="heatlbl" style={{ justifyContent: 'center' }} key={c.id}>
          {c.label}
        </div>
      ))}
      {rows.map((r) => (
        <ContentRow key={r.id} row={r} cols={cols} value={value} />
      ))}
    </div>
  );
}

function ContentRow({
  row,
  cols,
  value,
}: {
  row: { id: string; label: string };
  cols: { id: string; label: string }[];
  value: (rowId: string, colId: string) => number | null;
}) {
  return (
    <>
      <div className="heatlbl">{row.label}</div>
      {cols.map((c) => {
        const v = value(row.id, c.id);
        return (
          <div
            className="heatcell"
            key={c.id}
            style={{ background: heatColor(v), color: v === null ? DIM : 'var(--ink)' }}
          >
            {v === null ? '—' : v}
          </div>
        );
      })}
    </>
  );
}

/** Curva de precisión con área sombreada, para la ficha individual. */
export function AreaCurve({
  points,
  color,
  labels,
  width = 560,
  height = 170,
}: {
  points: (number | null)[];
  color: string;
  labels: string[];
  width?: number;
  height?: number;
}) {
  const padLeft = 32;
  const padBottom = 24;
  const span = Math.max(1, points.length - 1);
  const x = (i: number) => padLeft + (i * (width - padLeft - 14)) / span;
  const y = (v: number) => height - padBottom - ((v - 30) * (height - padBottom - 14)) / 60;

  const drawn = points
    .map((v, i) => (v === null ? null : { i, v }))
    .filter((p): p is { i: number; v: number } => p !== null);

  if (drawn.length < 2) {
    return <p className="empty">Hacen falta al menos dos semanas con actividad.</p>;
  }

  const line = drawn.map((p, k) => `${k ? 'L' : 'M'} ${x(p.i)} ${y(p.v)}`).join(' ');
  const area =
    `M ${x(drawn[0].i)} ${height - padBottom} ` +
    drawn.map((p) => `L ${x(p.i)} ${y(p.v)}`).join(' ') +
    ` L ${x(drawn[drawn.length - 1].i)} ${height - padBottom} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto' }}>
      {[40, 60, 80].map((v) => (
        <g key={v}>
          <line x1={padLeft} y1={y(v)} x2={width - 10} y2={y(v)} style={{ stroke: GRID }} />
          <text x="4" y={y(v) + 4} fill={DIM} fontSize="9" fontFamily="var(--mono)">
            {v}%
          </text>
        </g>
      ))}
      <path d={area} fill={color} opacity=".12" />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        className="draw"
        style={{ '--len': 1200 } as React.CSSProperties}
      />
      {drawn.map((p) => (
        <g key={p.i} className="an" style={{ animationDelay: `${0.4 + p.i * 0.06}s` }}>
          <circle cx={x(p.i)} cy={y(p.v)} r="3.4" fill={color} />
          <text
            x={x(p.i)}
            y={y(p.v) - 11}
            textAnchor="middle"
            fill={DIM}
            fontSize="9"
            fontFamily="var(--mono)"
          >
            {p.v}
          </text>
        </g>
      ))}
      {labels.map((label, i) => (
        <text
          key={label + i}
          x={x(i)}
          y={height - 6}
          textAnchor="middle"
          fill={DIM}
          fontSize="9"
          fontFamily="var(--mono)"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}
