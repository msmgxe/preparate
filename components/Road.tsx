'use client';

import type { ReactNode } from 'react';

/**
 * La carretera: una ruta de tres o cuatro paradas dibujada como un camino.
 *
 * Se usa en dos sitios que no comparten paleta —la página de venta y la guía
 * del alumno—, así que no toma ningún color por su cuenta: los lee de cuatro
 * variables (`--road-ink`, `--road-bg`, `--road-line`, `--road-dim`) que cada
 * contexto define en su propio CSS. Así el mismo componente se ve nativo en
 * los dos sin condicionales dentro del JSX.
 *
 * El truco para que los números caigan exactamente encima de sus tarjetas es
 * que ambos usan la misma fracción: la parada i está en (i + ½)/n del ancho, y
 * la columna i de la rejilla también. Como el SVG conserva su proporción, la
 * alineación aguanta en cualquier ancho sin una sola medida en píxeles.
 */
export type RoadStop = {
  tag: string;
  title: string;
  /** Opcional: sin él las tarjetas quedan compactas y sirven de selector. */
  body?: string;
  icon: ReactNode;
};

const HIGH = 58;
const LOW = 112;

export function Road({
  stops,
  colors,
  active,
  onSelect,
  label,
}: {
  stops: RoadStop[];
  colors: string[];
  /** Si se pasa, la parada elegida se resalta y las demás se atenúan. */
  active?: number;
  onSelect?: (index: number) => void;
  label: string;
}) {
  const n = stops.length;
  const points = stops.map((_, i) => ({
    x: ((i + 0.5) / n) * 1000,
    y: i % 2 === 0 ? LOW : HIGH,
  }));

  // el camino pasa exactamente por cada parada; los tirantes de las curvas van
  // horizontales para que entre y salga plano y la curva no haga un látigo
  let d = `M 0 ${points[0].y} L ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < n; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    const mid = (a.x + b.x) / 2;
    d += ` C ${mid} ${a.y}, ${mid} ${b.y}, ${b.x} ${b.y}`;
  }
  const end = points[n - 1];
  d += ` L 968 ${end.y}`;

  const interactive = typeof onSelect === 'function';

  return (
    <div className="road" style={{ ['--road-n' as string]: n }}>
      <svg
        className="road-track"
        viewBox="0 0 1000 172"
        width="100%"
        style={{ height: 'auto', display: 'block' }}
        role="img"
        aria-label={label}
      >
        {/* el asfalto */}
        <path
          d={d}
          fill="none"
          style={{ stroke: 'var(--road-ink)', opacity: 0.14 }}
          strokeWidth="34"
          strokeLinecap="round"
        />
        {/* la línea discontinua del centro */}
        <path
          d={d}
          fill="none"
          style={{ stroke: 'var(--road-bg)', opacity: 0.85 }}
          strokeWidth="3"
          strokeDasharray="18 20"
          strokeLinecap="round"
        />
        {/* la punta de flecha del final */}
        <path
          d={`M 962 ${end.y - 19} L 998 ${end.y} L 962 ${end.y + 19} Z`}
          style={{ fill: 'var(--road-ink)', opacity: 0.22 }}
        />

        {points.map((p, i) => {
          const on = active === undefined || active === i;
          return (
            <g key={stops[i].title}>
              {/* el tirante que baja hasta la tarjeta */}
              <line
                x1={p.x}
                y1={p.y + 26}
                x2={p.x}
                y2={172}
                style={{ stroke: 'var(--road-line)' }}
                strokeWidth="2"
                strokeDasharray="5 6"
              />
              <g
                onClick={interactive ? () => onSelect?.(i) : undefined}
                style={{ cursor: interactive ? 'pointer' : 'default' }}
                role={interactive ? 'button' : undefined}
                aria-label={interactive ? stops[i].title : undefined}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="27"
                  style={{
                    fill: colors[i % colors.length],
                    opacity: on ? 1 : 0.4,
                    transition: 'opacity .2s',
                  }}
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="27"
                  fill="none"
                  style={{ stroke: 'var(--road-bg)', opacity: 0.9 }}
                  strokeWidth="4"
                />
                <text
                  x={p.x}
                  y={p.y + 8}
                  textAnchor="middle"
                  style={{ fill: '#fff', fontSize: 23, fontWeight: 800, pointerEvents: 'none' }}
                >
                  {i + 1}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      <div className="road-stops">
        {stops.map((stop, i) => {
          const on = active === undefined || active === i;
          const color = colors[i % colors.length];
          const Tag = interactive ? 'button' : 'div';
          return (
            <Tag
              key={stop.title}
              className={`road-stop${on ? '' : ' is-off'}`}
              style={{ borderColor: on ? color : 'var(--road-line)' }}
              onClick={interactive ? () => onSelect?.(i) : undefined}
              type={interactive ? 'button' : undefined}
            >
              <span className="road-icon" style={{ background: color }}>
                {stop.icon}
              </span>
              <span className="road-tag" style={{ color }}>
                {stop.tag}
              </span>
              <b className="road-title">{stop.title}</b>
              {stop.body && <span className="road-body">{stop.body}</span>}
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
