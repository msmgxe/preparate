import type { Visual } from './eng-visuals';

/**
 * Las infografías de Matemática.
 *
 * Mismas reglas que las demás: texto con `currentColor`, acentos en hex, solo
 * `animation-delay` como estilo en línea, ancho fijo de 640.
 *
 * Aquí el dibujo trabaja más que en otras áreas, porque casi todo lo que se
 * enseña en este curso es geométrico por debajo aunque se escriba con letras:
 * un producto notable es un cuadrado partido en cuatro, un sistema son dos
 * rectas que se cruzan, y la diferencia entre media y mediana se ve de un
 * golpe en cuanto pones los datos sobre una recta.
 */
const AMBER = '#EFA451';
const SKY = '#66BFE8';
const MINT = '#4FD69C';
const CORAL = '#FF5F57';
const VIOLET = '#B08BE8';

function box(x: number, y: number, w: number, h: number, c: string, label: string, size = 15) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${c}22" stroke="${c}" stroke-width="1.3"/><text x="${x + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle" fill="currentColor" font-size="${size}">${label}</text>`;
}
function tag(x: number, y: number, c: string, label: string, anchor = 'middle') {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${c}" font-size="11.5">${label}</text>`;
}
/** Un par de ejes en L, para los dos dibujos con gráfica. */
function axes(x: number, y: number, w: number, h: number) {
  return `<path d="M ${x} ${y} L ${x} ${y + h} L ${x + w} ${y + h}" fill="none" stroke="currentColor" stroke-opacity=".32" stroke-width="1.6"/>`;
}
const open = (h: number) =>
  `<svg viewBox="0 0 640 ${h}" xmlns="http://www.w3.org/2000/svg" font-family="DM Mono, monospace">`;

export const MAT_VISUALS: Visual[] = [
  // ── Sobre qué base se aplica cada porcentaje ────────────────────────────
  {
    id: 'v-mat-comercial',
    svg: `${open(228)}
  <g class="grow" style="animation-delay:0s">
    ${tag(320, 28, SKY, 'PRECIO DE LISTA · lo que dice la etiqueta')}
    ${box(50, 40, 430, 46, MINT, 'precio de venta')}
    ${box(490, 40, 100, 46, CORAL, 'dscto', 13)}
  </g>
  <g class="an" style="animation-delay:.7s">
    <path d="M 265 90 L 265 118" fill="none" stroke="${AMBER}" stroke-width="1.5"/>
    ${tag(320, 112, AMBER, 'el mismo dinero, partido de otra manera')}
  </g>
  <g class="grow" style="animation-delay:1.1s">
    ${box(50, 126, 300, 46, SKY, 'costo')}
    ${box(350, 126, 130, 46, AMBER, 'ganancia', 13)}
  </g>
  <g class="an" style="animation-delay:1.6s">
    ${tag(200, 196, SKY, 'la ganancia se calcula sobre el COSTO', 'middle')}
    ${tag(200, 214, CORAL, 'el descuento, sobre la LISTA', 'middle')}
    ${box(430, 182, 180, 40, MINT, 'nunca al revés', 14)}
  </g>
</svg>`,
  },

  // ── El producto notable como área ───────────────────────────────────────
  {
    id: 'v-mat-algebra',
    svg: `${open(252)}
  <g class="grow" style="animation-delay:0s">
    <rect x="60" y="34" width="120" height="120" fill="${SKY}22" stroke="${SKY}" stroke-width="1.4"/>
    <text x="120" y="100" text-anchor="middle" fill="currentColor" font-size="19">a²</text>
    ${tag(120, 24, SKY, 'a')}
    ${tag(50, 98, SKY, 'a', 'end')}
  </g>
  <g class="grow" style="animation-delay:.6s">
    <rect x="180" y="34" width="70" height="120" fill="${AMBER}22" stroke="${AMBER}" stroke-width="1.4"/>
    <text x="215" y="100" text-anchor="middle" fill="currentColor" font-size="17">ab</text>
    <rect x="60" y="154" width="120" height="70" fill="${AMBER}22" stroke="${AMBER}" stroke-width="1.4"/>
    <text x="120" y="196" text-anchor="middle" fill="currentColor" font-size="17">ab</text>
    ${tag(215, 24, AMBER, 'b')}
    ${tag(50, 194, AMBER, 'b', 'end')}
  </g>
  <g class="grow" style="animation-delay:1.1s">
    <rect x="180" y="154" width="70" height="70" fill="${MINT}22" stroke="${MINT}" stroke-width="1.4"/>
    <text x="215" y="196" text-anchor="middle" fill="currentColor" font-size="17">b²</text>
  </g>
  <g class="an" style="animation-delay:1.6s">
    ${box(300, 62, 310, 48, VIOLET, '(a + b)²  =  a² + 2ab + b²', 17)}
    ${tag(455, 136, AMBER, 'los dos rectángulos naranjas son el 2ab')}
    ${tag(455, 158, CORAL, 'quien escribe a² + b² se está comiendo')}
    ${tag(455, 176, CORAL, 'media figura')}
  </g>
</svg>`,
  },

  // ── Un sistema es la pregunta de dónde se cruzan ────────────────────────
  {
    id: 'v-mat-sistemas',
    svg: `${open(238)}
  <g class="grow" style="animation-delay:0s">
    ${axes(60, 40, 220, 140)}
    <line x1="70" y1="170" x2="270" y2="60" stroke="${SKY}" stroke-width="2.4"/>
    <line x1="70" y1="70" x2="270" y2="168" stroke="${AMBER}" stroke-width="2.4"/>
    ${tag(165, 30, SKY, 'SE CRUZAN')}
  </g>
  <g class="an" style="animation-delay:.8s">
    <circle cx="171" cy="119" r="8" fill="${MINT}" />
    <circle cx="171" cy="119" r="14" fill="none" stroke="${MINT}" stroke-width="1.5" stroke-opacity=".6"/>
    ${tag(165, 206, MINT, 'ese punto es la solución:')}
    ${tag(165, 224, MINT, 'el único par que cumple las dos')}
  </g>
  <g class="grow" style="animation-delay:1.3s">
    ${axes(370, 40, 220, 140)}
    <line x1="380" y1="170" x2="580" y2="70" stroke="${SKY}" stroke-width="2.4"/>
    <line x1="380" y1="130" x2="580" y2="30" stroke="${AMBER}" stroke-width="2.4"/>
    ${tag(475, 30, CORAL, 'PARALELAS')}
    ${tag(475, 206, CORAL, 'no se cruzan nunca:')}
    ${tag(475, 224, CORAL, 'el sistema no tiene solución')}
  </g>
</svg>`,
  },

  // ── Directa o inversa, antes de la regla de tres ────────────────────────
  {
    id: 'v-mat-proporcion',
    svg: `${open(246)}
  <g class="grow" style="animation-delay:0s">
    ${axes(60, 44, 220, 130)}
    <line x1="62" y1="172" x2="272" y2="50" stroke="${MINT}" stroke-width="2.6"/>
    ${tag(170, 34, MINT, 'DIRECTA · más → más')}
    ${box(60, 190, 220, 40, MINT, 'y / x  =  k', 17)}
    ${tag(170, 244, MINT, 'el doble de obreros, el doble de obra')}
  </g>
  <g class="grow" style="animation-delay:.9s">
    ${axes(370, 44, 220, 130)}
    <path d="M 388 56 C 430 152, 460 168, 580 172" fill="none" stroke="${CORAL}" stroke-width="2.6"/>
    ${tag(480, 34, CORAL, 'INVERSA · más → menos')}
    ${box(370, 190, 220, 40, CORAL, 'x · y  =  k', 17)}
    ${tag(480, 244, CORAL, 'el doble de obreros, la mitad de días')}
  </g>
</svg>`,
  },

  // ── La altura que cae fuera del triángulo ───────────────────────────────
  {
    id: 'v-mat-geometria',
    svg: `${open(250)}
  <g class="grow" style="animation-delay:0s">
    <path d="M 90 190 L 300 190 L 430 78 Z" fill="${SKY}1E" stroke="${SKY}" stroke-width="2"/>
    ${tag(195, 214, SKY, 'base')}
  </g>
  <g class="an" style="animation-delay:.7s">
    <line x1="300" y1="190" x2="450" y2="190" stroke="currentColor" stroke-opacity=".3" stroke-width="1.5" stroke-dasharray="6 5"/>
    ${tag(378, 214, AMBER, 'la base, prolongada')}
  </g>
  <g class="an" style="animation-delay:1.2s">
    <line x1="430" y1="78" x2="430" y2="190" stroke="${AMBER}" stroke-width="2.4" stroke-dasharray="7 5"/>
    <path d="M 430 176 L 416 176 L 416 190" fill="none" stroke="${AMBER}" stroke-width="1.6"/>
    ${tag(446, 136, AMBER, 'altura', 'start')}
  </g>
  <g class="an" style="animation-delay:1.7s">
    ${box(90, 30, 300, 40, MINT, 'área  =  base × altura / 2', 17)}
    ${tag(490, 42, CORAL, 'la altura es perpendicular')}
    ${tag(490, 60, CORAL, 'a la base, caiga donde caiga')}
    ${tag(490, 84, VIOLET, 'no es un lado del triángulo')}
  </g>
</svg>`,
  },

  // ── Un dato extremo mueve la media y no la mediana ──────────────────────
  {
    id: 'v-mat-estadistica',
    svg: `${open(232)}
  <g class="grow" style="animation-delay:0s">
    <line x1="50" y1="150" x2="600" y2="150" stroke="currentColor" stroke-opacity=".3" stroke-width="1.6"/>
    <circle cx="100" cy="150" r="10" fill="${SKY}55" stroke="${SKY}" stroke-width="1.5"/>
    <circle cx="140" cy="150" r="10" fill="${SKY}55" stroke="${SKY}" stroke-width="1.5"/>
    <circle cx="180" cy="150" r="10" fill="${SKY}55" stroke="${SKY}" stroke-width="1.5"/>
    <circle cx="220" cy="150" r="10" fill="${SKY}55" stroke="${SKY}" stroke-width="1.5"/>
    ${tag(160, 182, SKY, 'cuatro sueldos parecidos')}
  </g>
  <g class="grow" style="animation-delay:.7s">
    <circle cx="560" cy="150" r="10" fill="${CORAL}55" stroke="${CORAL}" stroke-width="1.5"/>
    ${tag(560, 182, CORAL, 'y el del gerente')}
  </g>
  <g class="an" style="animation-delay:1.2s">
    <path d="M 180 132 L 180 104" fill="none" stroke="${MINT}" stroke-width="1.8"/>
    ${tag(180, 96, MINT, 'MEDIANA · el del medio')}
  </g>
  <g class="an" style="animation-delay:1.7s">
    <path d="M 240 132 L 240 60" fill="none" stroke="${AMBER}" stroke-width="1.8"/>
    ${tag(268, 52, AMBER, 'MEDIA · arrastrada hacia el extremo', 'start')}
    ${tag(320, 216, VIOLET, 'ninguna de las dos miente: miden cosas distintas')}
  </g>
</svg>`,
  },
];
