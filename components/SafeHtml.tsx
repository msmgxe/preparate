import sanitize from 'sanitize-html';

/**
 * Saneado de contenido antes de inyectarlo con `dangerouslySetInnerHTML`.
 *
 * Usa `sanitize-html` (htmlparser2) y no DOMPurify a propósito: DOMPurify
 * necesita un DOM, y en el servidor eso significa arrastrar jsdom, cuya cadena
 * de dependencias revienta en el runtime de Vercel con `ERR_REQUIRE_ESM`.
 * Este parser es JavaScript puro y funciona igual en servidor y navegador.
 */

/** Enunciados y párrafos de las clases: HTML muy acotado. */
const INLINE: sanitize.IOptions = {
  allowedTags: ['b', 'strong', 'i', 'em', 'u', 'br', 'span', 'sub', 'sup', 'code', 'p', 'a'],
  allowedAttributes: {
    '*': ['class'],
    a: ['href', 'target', 'rel'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  disallowedTagsMode: 'discard',
};

export function sanitizeInline(html: string): string {
  return sanitize(html, INLINE);
}

/**
 * Infografías. El allowlist cubre el subconjunto que usan las clases; todo lo
 * demás cae, incluidos `<script>`, `<foreignObject>` y los manejadores `on*`.
 *
 * `lowerCaseAttributeNames: false` es imprescindible: SVG distingue mayúsculas
 * y sin esto `viewBox` llegaría como `viewbox` y el gráfico saldría descuadrado.
 */
const SVG: sanitize.IOptions = {
  allowedTags: [
    'svg', 'g', 'defs', 'marker', 'circle', 'ellipse', 'rect', 'line',
    'polyline', 'polygon', 'path', 'text', 'tspan', 'title', 'desc',
    'linearGradient', 'radialGradient', 'stop', 'clipPath', 'use', 'symbol',
  ],
  allowedAttributes: {
    '*': [
      'class', 'style', 'id', 'transform', 'opacity', 'fill', 'fill-opacity',
      'fill-rule', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin',
      'stroke-dasharray', 'stroke-dashoffset', 'stroke-opacity',
      'x', 'y', 'dx', 'dy', 'width', 'height', 'rx', 'ry',
      'cx', 'cy', 'r', 'x1', 'y1', 'x2', 'y2', 'd', 'points',
      'font-family', 'font-size', 'font-weight', 'letter-spacing',
      'text-anchor', 'dominant-baseline', 'offset', 'stop-color', 'stop-opacity',
      'viewBox', 'preserveAspectRatio', 'xmlns', 'clip-path',
      'marker-start', 'marker-mid', 'marker-end',
      'markerWidth', 'markerHeight', 'refX', 'refY', 'orient', 'markerUnits',
      'gradientUnits', 'gradientTransform', 'href',
    ],
  },
  // Solo lo que necesita la revelación progresiva; el resto de CSS se descarta.
  allowedStyles: {
    '*': {
      'animation-delay': [/^[\d.]+m?s$/],
      'animation-duration': [/^[\d.]+m?s$/],
      opacity: [/^[\d.]+$/],
    },
  },
  allowedSchemes: ['http', 'https'],
  disallowedTagsMode: 'discard',
  parser: { lowerCaseAttributeNames: false },
};

export function sanitizeSvg(svg: string): string {
  return sanitize(svg, SVG);
}

export function SafeHtml({
  html,
  as: Tag = 'div',
  className,
  style,
}: {
  html: string;
  as?: 'div' | 'span' | 'p';
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Tag
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: sanitizeInline(html) }}
    />
  );
}
