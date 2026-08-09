import DOMPurify from 'isomorphic-dompurify';

/**
 * El enunciado y los bloques de texto admiten HTML acotado (negritas, saltos,
 * el bloque `.math`). Todo pasa por DOMPurify antes de inyectarse — el
 * contenido lo escribe un humano en el editor, pero eso no lo hace confiable.
 */
const INLINE = {
  ALLOWED_TAGS: ['b', 'strong', 'i', 'em', 'u', 'br', 'span', 'sub', 'sup', 'code', 'p', 'a'],
  ALLOWED_ATTR: ['class', 'href', 'target', 'rel'],
  ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|#)/i,
};

export function sanitizeInline(html: string): string {
  return DOMPurify.sanitize(html, INLINE);
}

/** SVG de las infografías: se permite el subconjunto gráfico, nada de scripts. */
export function sanitizeSvg(svg: string): string {
  return DOMPurify.sanitize(svg, {
    USE_PROFILES: { svg: true, svgFilters: true },
    ADD_ATTR: ['class', 'style'],
    FORBID_TAGS: ['script', 'foreignObject'],
    FORBID_ATTR: ['onload', 'onclick', 'onerror'],
  });
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
