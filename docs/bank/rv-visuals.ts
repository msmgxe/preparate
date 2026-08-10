import type { Visual } from './eng-visuals';

/**
 * Las infografías de Razonamiento Verbal.
 *
 * Aquí el dibujo tiene que trabajar distinto que en las áreas de números: no
 * hay figuras que descomponer ni magnitudes que graficar. Lo que sí se puede
 * dibujar es la *estructura* de la pregunta —qué parte del texto mira cada
 * tipo de pregunta, dónde está la pista, qué criterio agrupa a cuatro palabras
 * y deja una fuera—, que es exactamente lo que un alumno no ve solo.
 *
 * Mismas reglas técnicas: `currentColor` para el texto, acentos en hex, solo
 * `animation-delay` en línea, ancho fijo de 640.
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
/** Renglón de texto simulado, para dibujar un párrafo sin escribirlo. */
function linea(x: number, y: number, w: number, op = 0.22) {
  return `<rect x="${x}" y="${y}" width="${w}" height="9" rx="4.5" fill="currentColor" fill-opacity="${op}"/>`;
}
/** Llave vertical que abarca un tramo del párrafo. */
function llave(x: number, y1: number, y2: number, c: string) {
  return `<path d="M ${x - 7} ${y1} L ${x} ${y1} L ${x} ${y2} L ${x - 7} ${y2}" fill="none" stroke="${c}" stroke-width="1.6"/>`;
}
const open = (h: number) =>
  `<svg viewBox="0 0 640 ${h}" xmlns="http://www.w3.org/2000/svg" font-family="DM Mono, monospace">`;

export const RV_VISUALS: Visual[] = [
  // ── Los tres alcances de una pregunta de lectura ────────────────────────
  {
    id: 'v-rv-lectura',
    svg: `${open(238)}
  <g class="grow" style="animation-delay:0s">
    ${linea(40, 40, 220)}
    ${linea(40, 60, 240)}
    ${linea(40, 80, 200, 0.42)}
    ${linea(40, 100, 235)}
    ${linea(40, 120, 210)}
    ${linea(40, 140, 175)}
    ${tag(150, 172, SKY, 'el mismo texto, tres preguntas distintas')}
  </g>
  <g class="an" style="animation-delay:.7s">
    ${llave(310, 78, 91, MINT)}
    ${tag(322, 88, MINT, 'LITERAL · está escrito en esa línea', 'start')}
  </g>
  <g class="an" style="animation-delay:1.2s">
    ${llave(310, 38, 151, AMBER)}
    ${tag(322, 128, AMBER, 'INFERENCIA · se deduce, no aparece', 'start')}
  </g>
  <g class="an" style="animation-delay:1.7s">
    ${box(310, 186, 300, 40, VIOLET, 'IDEA PRINCIPAL · todo junto', 14)}
    ${tag(150, 216, CORAL, 'ojo: una alternativa puede ser verdadera')}
    ${tag(150, 232, CORAL, 'y aun así no responder la pregunta')}
  </g>
</svg>`,
  },

  // ── Los sinónimos no son intercambiables ────────────────────────────────
  {
    id: 'v-rv-sinonimos',
    svg: `${open(214)}
  <g class="grow" style="animation-delay:0s">
    <line x1="60" y1="120" x2="580" y2="120" stroke="currentColor" stroke-opacity=".3" stroke-width="1.6"/>
    <path d="M 570 112 L 590 120 L 570 128 Z" fill="currentColor" fill-opacity=".3"/>
    ${tag(320, 32, SKY, 'TODOS SIGNIFICAN «ENOJADO»')}
  </g>
  <g class="grow" style="animation-delay:.5s">
    <circle cx="110" cy="120" r="9" fill="${MINT}55" stroke="${MINT}" stroke-width="1.5"/>
    <text x="110" y="98" text-anchor="middle" fill="currentColor" font-size="14">molesto</text>
    <circle cx="255" cy="120" r="9" fill="${SKY}55" stroke="${SKY}" stroke-width="1.5"/>
    <text x="255" y="98" text-anchor="middle" fill="currentColor" font-size="14">enfadado</text>
  </g>
  <g class="grow" style="animation-delay:1s">
    <circle cx="400" cy="120" r="9" fill="${AMBER}55" stroke="${AMBER}" stroke-width="1.5"/>
    <text x="400" y="98" text-anchor="middle" fill="currentColor" font-size="14">furioso</text>
    <circle cx="540" cy="120" r="9" fill="${CORAL}55" stroke="${CORAL}" stroke-width="1.5"/>
    <text x="540" y="98" text-anchor="middle" fill="currentColor" font-size="14">iracundo</text>
  </g>
  <g class="an" style="animation-delay:1.5s">
    ${tag(320, 152, AMBER, 'misma idea · distinta intensidad y distinto registro')}
    ${box(170, 166, 300, 38, VIOLET, 'la frase decide cuál cabe', 14)}
  </g>
</svg>`,
  },

  // ── El criterio va antes que la palabra ─────────────────────────────────
  {
    id: 'v-rv-excluido',
    svg: `${open(236)}
  <g class="grow" style="animation-delay:0s">
    <ellipse cx="240" cy="126" rx="196" ry="86" fill="${SKY}14" stroke="${SKY}" stroke-width="1.6"/>
    ${tag(240, 28, SKY, 'CRITERIO: son herramientas')}
  </g>
  <g class="grow" style="animation-delay:.5s">
    <text x="150" y="106" text-anchor="middle" fill="currentColor" font-size="16">martillo</text>
    <text x="330" y="106" text-anchor="middle" fill="currentColor" font-size="16">alicate</text>
    <text x="150" y="156" text-anchor="middle" fill="currentColor" font-size="16">sierra</text>
    <text x="330" y="156" text-anchor="middle" fill="currentColor" font-size="16">llave</text>
  </g>
  <g class="an" style="animation-delay:1.1s">
    <circle cx="540" cy="126" r="52" fill="${CORAL}18" stroke="${CORAL}" stroke-width="1.6" stroke-dasharray="6 5"/>
    <text x="540" y="132" text-anchor="middle" fill="currentColor" font-size="16">clavo</text>
  </g>
  <g class="an" style="animation-delay:1.6s">
    ${tag(320, 226, CORAL, 'el clavo no es una herramienta: es con lo que trabajan las otras cuatro')}
  </g>
</svg>`,
  },

  // ── Cada conector apunta a un lado ──────────────────────────────────────
  {
    id: 'v-rv-conectores',
    svg: `${open(230)}
  <g class="grow" style="animation-delay:0s">
    ${box(24, 34, 140, 46, MINT, 'ADICIÓN', 13)}
    <path d="M 54 108 L 104 108 M 92 100 L 104 108 L 92 116" fill="none" stroke="${MINT}" stroke-width="2"/>
    <path d="M 54 128 L 104 128 M 92 120 L 104 128 L 92 136" fill="none" stroke="${MINT}" stroke-width="2"/>
    ${tag(94, 162, MINT, 'van al mismo lado')}
    ${tag(94, 180, MINT, 'además · asimismo')}
  </g>
  <g class="grow" style="animation-delay:.5s">
    ${box(180, 34, 140, 46, CORAL, 'OPOSICIÓN', 13)}
    <path d="M 210 108 L 260 108 M 248 100 L 260 108 L 248 116" fill="none" stroke="${CORAL}" stroke-width="2"/>
    <path d="M 260 128 L 210 128 M 222 120 L 210 128 L 222 136" fill="none" stroke="${CORAL}" stroke-width="2"/>
    ${tag(250, 162, CORAL, 'la segunda contradice')}
    ${tag(250, 180, CORAL, 'sin embargo · pero')}
  </g>
  <g class="grow" style="animation-delay:1s">
    ${box(336, 34, 140, 46, AMBER, 'CAUSA', 13)}
    <circle cx="418" cy="118" r="10" fill="${AMBER}44" stroke="${AMBER}" stroke-width="1.6"/>
    <path d="M 400 118 L 356 118 M 368 110 L 356 118 L 368 126" fill="none" stroke="${AMBER}" stroke-width="2"/>
    ${tag(406, 162, AMBER, 'explica lo anterior')}
    ${tag(406, 180, AMBER, 'porque · puesto que')}
  </g>
  <g class="grow" style="animation-delay:1.5s">
    ${box(492, 34, 124, 46, VIOLET, 'EFECTO', 13)}
    <circle cx="522" cy="118" r="10" fill="${VIOLET}44" stroke="${VIOLET}" stroke-width="1.6"/>
    <path d="M 540 118 L 594 118 M 582 110 L 594 118 L 582 126" fill="none" stroke="${VIOLET}" stroke-width="2"/>
    ${tag(554, 162, VIOLET, 'se sigue de lo anterior')}
    ${tag(554, 180, VIOLET, 'por lo tanto · así')}
  </g>
  <g class="an" style="animation-delay:2s">
    ${tag(320, 216, SKY, 'decide la relación mirando las dos ideas, y recién después lee las alternativas')}
  </g>
</svg>`,
  },

  // ── El embudo del plan de redacción ─────────────────────────────────────
  {
    id: 'v-rv-plan',
    svg: `${open(248)}
  <g class="grow" style="animation-delay:0s">
    ${box(90, 26, 460, 38, SKY, '1 · qué es: la definición', 14)}
  </g>
  <g class="grow" style="animation-delay:.4s">
    ${box(130, 72, 380, 38, SKY, '2 · de dónde viene: el origen', 14)}
  </g>
  <g class="grow" style="animation-delay:.8s">
    ${box(170, 118, 300, 38, AMBER, '3 · qué clases hay', 14)}
  </g>
  <g class="grow" style="animation-delay:1.2s">
    ${box(210, 164, 220, 38, AMBER, '4 · un caso concreto', 14)}
  </g>
  <g class="grow" style="animation-delay:1.6s">
    ${box(250, 210, 140, 34, MINT, '5 · conclusión', 13)}
  </g>
  <g class="an" style="animation-delay:2s">
    <path d="M 596 34 L 596 232 M 588 220 L 596 234 L 604 220" fill="none" stroke="${VIOLET}" stroke-width="1.8"/>
    <text x="578" y="120" text-anchor="middle" fill="${VIOLET}" font-size="11.5" transform="rotate(90 578 120)">de lo general a lo particular</text>
  </g>
</svg>`,
  },

  // ── La pista está pegada al espacio ─────────────────────────────────────
  {
    id: 'v-rv-incompletas',
    svg: `${open(226)}
  <g class="grow" style="animation-delay:0s">
    <text x="40" y="80" fill="currentColor" font-size="18">El proyecto</text>
    <rect x="176" y="56" width="120" height="34" rx="8" fill="none" stroke="${AMBER}" stroke-width="1.8" stroke-dasharray="6 5"/>
    <text x="316" y="80" fill="currentColor" font-size="18">de fondos.</text>
  </g>
  <g class="an" style="animation-delay:.7s">
    <path d="M 340 96 L 340 126" fill="none" stroke="${CORAL}" stroke-width="1.8"/>
    ${tag(392, 142, CORAL, 'esta preposición es la pista', 'start')}
    ${tag(392, 160, CORAL, 'y elimina tres alternativas', 'start')}
  </g>
  <g class="grow" style="animation-delay:1.3s">
    ${box(40, 152, 130, 38, CORAL, 'necesita', 14)}
    ${box(180, 152, 130, 38, MINT, 'carece', 14)}
    ${tag(105, 208, CORAL, 'necesita fondos')}
    ${tag(245, 208, MINT, 'carece DE fondos')}
  </g>
</svg>`,
  },
];
