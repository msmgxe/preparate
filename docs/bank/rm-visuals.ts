import type { Visual } from './eng-visuals';

/**
 * Las infografías de Razonamiento Matemático.
 *
 * Mismas reglas que las del inglés: texto con `currentColor`, acentos en hex,
 * y solo `animation-delay` como estilo en línea —lo único que el saneador deja
 * pasar—. Ancho fijo de 640.
 *
 * El criterio para dibujar una es que el dibujo enseñe algo que el texto no
 * puede: una tabla que hace evidente una constante, una figura descompuesta
 * por tamaños, una manecilla que se movió cuando nadie la miraba.
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
const open = (h: number) =>
  `<svg viewBox="0 0 640 ${h}" xmlns="http://www.w3.org/2000/svg" font-family="DM Mono, monospace">`;

export const RM_VISUALS: Visual[] = [
  // ── Traducir del castellano al álgebra ──────────────────────────────────
  {
    id: 'v-rm-planteo',
    svg: `${open(215)}
  <g class="grow" style="animation-delay:0s">
    ${box(30, 24, 150, 42, SKY, 'El triple')}
    ${box(190, 24, 200, 42, SKY, 'de un número')}
    ${box(400, 24, 210, 42, SKY, 'aumentado en 5')}
  </g>
  <g class="an" style="animation-delay:.7s">
    <path d="M 105 70 L 105 96" fill="none" stroke="${AMBER}" stroke-width="1.5"/>
    <path d="M 290 70 L 290 96" fill="none" stroke="${AMBER}" stroke-width="1.5"/>
    <path d="M 505 70 L 505 96" fill="none" stroke="${AMBER}" stroke-width="1.5"/>
    ${tag(320, 90, AMBER, 'trozo a trozo, sin saltarse ninguno')}
  </g>
  <g class="grow" style="animation-delay:1.1s">
    ${box(30, 102, 150, 42, AMBER, '3 ·', 18)}
    ${box(190, 102, 200, 42, AMBER, 'x', 18)}
    ${box(400, 102, 210, 42, AMBER, '+ 5', 18)}
  </g>
  <g class="an" style="animation-delay:1.6s">
    ${box(190, 158, 260, 42, MINT, '3x + 5 = 26', 18)}
    ${tag(500, 184, MINT, 'y solo entonces, resolver', 'start')}
  </g>
</svg>`,
  },

  // ── El cuadro de las edades ─────────────────────────────────────────────
  {
    id: 'v-rm-edades',
    svg: `${open(225)}
  <g class="grow" style="animation-delay:0s">
    ${tag(200, 34, SKY, 'HACE 5 AÑOS')}
    ${tag(360, 34, SKY, 'HOY')}
    ${tag(530, 34, SKY, 'DENTRO DE 5')}
    ${tag(90, 74, AMBER, 'Ana', 'start')}
    ${tag(90, 134, VIOLET, 'Beto', 'start')}
  </g>
  <g class="grow" style="animation-delay:.5s">
    ${box(140, 48, 120, 40, AMBER, '20')}
    ${box(300, 48, 120, 40, AMBER, '25')}
    ${box(470, 48, 120, 40, AMBER, '30')}
  </g>
  <g class="grow" style="animation-delay:1s">
    ${box(140, 108, 120, 40, VIOLET, '10')}
    ${box(300, 108, 120, 40, VIOLET, '15')}
    ${box(470, 108, 120, 40, VIOLET, '20')}
  </g>
  <g class="an" style="animation-delay:1.5s">
    <path d="M 200 92 L 200 104" fill="none" stroke="${MINT}" stroke-width="1.5"/>
    <path d="M 360 92 L 360 104" fill="none" stroke="${MINT}" stroke-width="1.5"/>
    <path d="M 530 92 L 530 104" fill="none" stroke="${MINT}" stroke-width="1.5"/>
    ${box(140, 166, 450, 38, MINT, 'la diferencia siempre son 10 años', 15)}
    ${tag(320, 218, MINT, 'ese dato solo resuelve media pregunta')}
  </g>
</svg>`,
  },

  // ── Un operador es una receta ───────────────────────────────────────────
  {
    id: 'v-rm-operadores',
    svg: `${open(200)}
  <g class="grow" style="animation-delay:0s">
    ${box(150, 24, 340, 44, SKY, 'a ∗ b  =  a + 2b', 18)}
    ${tag(320, 88, SKY, 'la regla te la dan: no hay nada que recordar')}
  </g>
  <g class="an" style="animation-delay:.7s">
    <circle cx="215" cy="120" r="17" fill="${AMBER}33" stroke="${AMBER}" stroke-width="1.5"/>
    <text x="215" y="126" text-anchor="middle" fill="${AMBER}" font-size="15">3</text>
    <circle cx="425" cy="120" r="17" fill="${VIOLET}33" stroke="${VIOLET}" stroke-width="1.5"/>
    <text x="425" y="126" text-anchor="middle" fill="${VIOLET}" font-size="15">5</text>
    ${tag(150, 126, AMBER, 'a', 'end')}
    ${tag(490, 126, VIOLET, 'b', 'start')}
  </g>
  <g class="grow" style="animation-delay:1.2s">
    ${box(150, 148, 340, 44, MINT, '3 + 2(5)  =  13', 18)}
  </g>
</svg>`,
  },

  // ── Contar por tamaños ──────────────────────────────────────────────────
  {
    id: 'v-rm-conteo',
    svg: `${open(230)}
  <g class="grow" style="animation-delay:0s">
    <rect x="40" y="34" width="150" height="150" rx="4" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="1.5"/>
    <line x1="90" y1="34" x2="90" y2="184" stroke="currentColor" stroke-opacity=".35" stroke-width="1.5"/>
    <line x1="140" y1="34" x2="140" y2="184" stroke="currentColor" stroke-opacity=".35" stroke-width="1.5"/>
    <line x1="40" y1="84" x2="190" y2="84" stroke="currentColor" stroke-opacity=".35" stroke-width="1.5"/>
    <line x1="40" y1="134" x2="190" y2="134" stroke="currentColor" stroke-opacity=".35" stroke-width="1.5"/>
    ${tag(115, 210, SKY, 'una reja de 3 × 3')}
  </g>
  <g class="grow" style="animation-delay:.6s">
    <rect x="245" y="60" width="50" height="50" rx="4" fill="${MINT}33" stroke="${MINT}" stroke-width="1.5"/>
    <text x="330" y="92" fill="currentColor" font-size="17">de 1×1  →  9</text>
  </g>
  <g class="grow" style="animation-delay:1.1s">
    <rect x="245" y="120" width="60" height="60" rx="4" fill="${AMBER}33" stroke="${AMBER}" stroke-width="1.5"/>
    <text x="340" y="156" fill="currentColor" font-size="17">de 2×2  →  4</text>
  </g>
  <g class="an" style="animation-delay:1.6s">
    <text x="245" y="30" fill="${VIOLET}" font-size="17">de 3×3  →  1</text>
    ${box(430, 168, 180, 44, VIOLET, 'total  14', 18)}
  </g>
</svg>`,
  },

  // ── Probabilidad frente a certeza ───────────────────────────────────────
  {
    id: 'v-rm-certezas',
    svg: `${open(235)}
  <g class="grow" style="animation-delay:0s">
    ${tag(160, 28, SKY, 'PROBABILIDAD  ·  ¿qué tan posible?')}
    ${box(60, 44, 200, 44, SKY, 'favorables', 15)}
    <line x1="60" y1="100" x2="260" y2="100" stroke="${SKY}" stroke-width="2"/>
    ${box(60, 110, 200, 44, SKY, 'posibles', 15)}
    ${tag(160, 184, SKY, 'siempre entre 0 y 1')}
  </g>
  <g class="grow" style="animation-delay:.8s">
    ${tag(460, 28, CORAL, 'CERTEZA  ·  ¿cuántas para asegurar?')}
    <circle cx="350" cy="70" r="18" fill="${AMBER}33" stroke="${AMBER}" stroke-width="1.5"/>
    <circle cx="398" cy="70" r="18" fill="${AMBER}33" stroke="${AMBER}" stroke-width="1.5"/>
    <circle cx="446" cy="70" r="18" fill="${SKY}33" stroke="${SKY}" stroke-width="1.5"/>
    <circle cx="494" cy="70" r="18" fill="${SKY}33" stroke="${SKY}" stroke-width="1.5"/>
    <circle cx="542" cy="70" r="18" fill="${MINT}33" stroke="${MINT}" stroke-width="1.5"/>
    ${tag(460, 108, CORAL, 'el peor caso: primero salen todas las que no sirven')}
  </g>
  <g class="an" style="animation-delay:1.4s">
    <path d="M 542 92 L 542 116" fill="none" stroke="${MINT}" stroke-width="1.6"/>
    ${box(340, 122, 260, 44, MINT, 'la última asegura', 15)}
    ${tag(470, 190, MINT, 'suma todo lo que NO quieres y añade uno')}
  </g>
</svg>`,
  },

  // ── La manecilla que no se queda quieta ─────────────────────────────────
  {
    id: 'v-rm-cronometria',
    svg: `${open(240)}
  <g class="grow" style="animation-delay:0s">
    <circle cx="150" cy="120" r="88" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="2"/>
    <text x="150" y="48" text-anchor="middle" fill="currentColor" fill-opacity=".55" font-size="13">12</text>
    <text x="224" y="126" text-anchor="middle" fill="currentColor" fill-opacity=".55" font-size="13">3</text>
    <text x="150" y="202" text-anchor="middle" fill="currentColor" fill-opacity=".55" font-size="13">6</text>
    <text x="76" y="126" text-anchor="middle" fill="currentColor" fill-opacity=".55" font-size="13">9</text>
    <circle cx="150" cy="120" r="4" fill="currentColor"/>
  </g>
  <g class="grow" style="animation-delay:.6s">
    <line x1="150" y1="120" x2="212" y2="151" stroke="${SKY}" stroke-width="3" stroke-linecap="round"/>
    ${tag(250, 168, SKY, 'minutero · 20 min = 120°', 'start')}
  </g>
  <g class="grow" style="animation-delay:1.1s">
    <line x1="150" y1="120" x2="196" y2="153" stroke="${AMBER}" stroke-width="4.5" stroke-linecap="round"/>
    ${tag(250, 196, AMBER, 'horaria · ya pasó del 4: 130°', 'start')}
  </g>
  <g class="an" style="animation-delay:1.7s">
    ${box(250, 40, 340, 44, MINT, '| 30·H − 5,5·M |  =  10°', 17)}
    ${tag(420, 108, MINT, 'la horaria avanza 0,5° por minuto')}
  </g>
</svg>`,
  },
];
