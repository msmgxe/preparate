import type { Visual } from './eng-visuals';

/**
 * Las infografías de Cultura General.
 *
 * Este curso se estudia mal porque se estudia como una lista. Los dibujos van
 * todos contra eso: una línea de tiempo en la que las cosas se colocan unas
 * respecto de otras, un corte del territorio en el que las regiones dejan de
 * ser nombres sueltos, un organigrama donde se ve por qué tres siglas
 * parecidas hacen tres trabajos distintos. Memorizar sobre un mapa cuesta
 * mucho menos que memorizar sobre una lista.
 *
 * Mismas reglas técnicas que el resto: `currentColor`, acentos en hex, solo
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
/** Hito de línea de tiempo: punto, año arriba y rótulo abajo. */
function hito(x: number, y: number, c: string, year: string, name: string) {
  return `<circle cx="${x}" cy="${y}" r="8" fill="${c}" /><text x="${x}" y="${y - 18}" text-anchor="middle" fill="${c}" font-size="12.5" font-weight="700">${year}</text><text x="${x}" y="${y + 28}" text-anchor="middle" fill="currentColor" font-size="13">${name}</text>`;
}
const open = (h: number) =>
  `<svg viewBox="0 0 640 ${h}" xmlns="http://www.w3.org/2000/svg" font-family="DM Mono, monospace">`;

export const CG_VISUALS: Visual[] = [
  // ── La historia del Perú en cinco bloques ───────────────────────────────
  {
    id: 'v-cg-historia',
    svg: `${open(216)}
  <g class="grow" style="animation-delay:0s">
    <line x1="40" y1="110" x2="600" y2="110" stroke="currentColor" stroke-opacity=".28" stroke-width="2"/>
    ${tag(320, 28, SKY, 'PRIMERO EL BLOQUE, DESPUÉS LA FECHA')}
  </g>
  <g class="grow" style="animation-delay:.4s">
    ${hito(80, 110, SKY, '3000 a.C.', 'Caral')}
  </g>
  <g class="grow" style="animation-delay:.8s">
    ${hito(215, 110, SKY, 's. XV', 'Tahuantinsuyo')}
  </g>
  <g class="grow" style="animation-delay:1.2s">
    ${hito(340, 110, AMBER, '1532', 'Cajamarca')}
  </g>
  <g class="grow" style="animation-delay:1.6s">
    ${hito(460, 110, MINT, '1821', 'Independencia')}
  </g>
  <g class="grow" style="animation-delay:2s">
    ${hito(578, 110, VIOLET, '1879', 'Guerra del Pacífico')}
  </g>
  <g class="an" style="animation-delay:2.4s">
    ${tag(150, 178, SKY, 'PREHISPÁNICO')}
    ${tag(400, 178, AMBER, 'VIRREINATO')}
    ${tag(560, 178, MINT, 'REPÚBLICA')}
    ${tag(320, 206, CORAL, 'si sabes en qué bloque cae, la mitad de las alternativas se caen solas')}
  </g>
</svg>`,
  },

  // ── El país visto de perfil ─────────────────────────────────────────────
  {
    id: 'v-cg-geografia',
    svg: `${open(238)}
  <g class="grow" style="animation-delay:0s">
    <rect x="30" y="168" width="120" height="34" fill="${SKY}33"/>
    <path d="M 150 202 L 200 190 L 300 58 L 360 96 L 430 132 L 610 176 L 610 202 Z" fill="${AMBER}22" stroke="${AMBER}" stroke-width="1.8"/>
    <line x1="30" y1="202" x2="610" y2="202" stroke="currentColor" stroke-opacity=".3" stroke-width="1.6"/>
  </g>
  <g class="grow" style="animation-delay:.6s">
    ${tag(90, 158, SKY, 'océano')}
    ${tag(175, 224, SKY, 'COSTA · 0 a 500 m')}
    ${tag(320, 224, AMBER, 'SIERRA · hasta 6768 m')}
    ${tag(520, 224, MINT, 'SELVA · alta y baja')}
  </g>
  <g class="an" style="animation-delay:1.2s">
    <line x1="300" y1="58" x2="300" y2="30" stroke="${VIOLET}" stroke-width="1.6"/>
    ${tag(300, 22, VIOLET, 'Huascarán · el punto más alto')}
  </g>
  <g class="an" style="animation-delay:1.7s">
    ${box(400, 30, 210, 38, MINT, 'y 8 regiones naturales', 14)}
    ${tag(505, 84, MINT, 'las tres de siempre no se van:')}
    ${tag(505, 100, MINT, 'las ocho las subdividen por altura')}
  </g>
</svg>`,
  },

  // ── Qué mide cada indicador ─────────────────────────────────────────────
  {
    id: 'v-cg-economia',
    svg: `${open(240)}
  <g class="grow" style="animation-delay:0s">
    ${box(24, 30, 186, 46, MINT, 'PBI', 18)}
    ${tag(117, 96, MINT, 'cuánto se produce')}
    ${tag(117, 114, MINT, 'en un año')}
    <rect x="40" y="130" width="30" height="24" fill="${MINT}44" stroke="${MINT}" stroke-width="1.2"/>
    <rect x="80" y="120" width="30" height="34" fill="${MINT}44" stroke="${MINT}" stroke-width="1.2"/>
    <rect x="120" y="104" width="30" height="50" fill="${MINT}44" stroke="${MINT}" stroke-width="1.2"/>
    <rect x="160" y="92" width="30" height="62" fill="${MINT}" stroke="${MINT}" stroke-width="1.2"/>
  </g>
  <g class="grow" style="animation-delay:.7s">
    ${box(226, 30, 186, 46, CORAL, 'INFLACIÓN', 18)}
    ${tag(319, 96, CORAL, 'cuánto suben')}
    ${tag(319, 114, CORAL, 'los precios')}
    <circle cx="270" cy="132" r="24" fill="${CORAL}33" stroke="${CORAL}" stroke-width="1.4"/>
    <text x="270" y="139" text-anchor="middle" fill="currentColor" font-size="15">S/</text>
    <path d="M 304 132 L 336 132 M 326 124 L 336 132 L 326 140" fill="none" stroke="${CORAL}" stroke-width="1.8"/>
    <circle cx="374" cy="132" r="15" fill="${CORAL}33" stroke="${CORAL}" stroke-width="1.4"/>
    <text x="374" y="137" text-anchor="middle" fill="currentColor" font-size="11">S/</text>
  </g>
  <g class="grow" style="animation-delay:1.4s">
    ${box(428, 30, 186, 46, SKY, 'TIPO DE CAMBIO', 14)}
    ${tag(521, 96, SKY, 'cuántos soles')}
    ${tag(521, 114, SKY, 'cuesta un dólar')}
    <path d="M 448 148 C 478 118, 508 156, 538 126 C 558 106, 578 132, 598 122" fill="none" stroke="${SKY}" stroke-width="2.2"/>
  </g>
  <g class="an" style="animation-delay:2s">
    ${tag(320, 194, AMBER, 'tres cosas distintas: un país puede crecer con los precios disparados,')}
    ${tag(320, 212, AMBER, 'y el dólar puede subir sin que haya inflación')}
    ${tag(320, 234, VIOLET, 'quien las mezcla falla las tres preguntas')}
  </g>
</svg>`,
  },

  // ── La espina dorsal de la literatura peruana ───────────────────────────
  {
    id: 'v-cg-literatura',
    svg: `${open(232)}
  <g class="grow" style="animation-delay:0s">
    <line x1="40" y1="118" x2="600" y2="118" stroke="currentColor" stroke-opacity=".28" stroke-width="2"/>
    ${tag(320, 26, SKY, 'AUTOR · OBRA · POR QUÉ IMPORTA')}
  </g>
  <g class="grow" style="animation-delay:.5s">
    <circle cx="90" cy="118" r="8" fill="${SKY}"/>
    ${tag(90, 96, SKY, '1609')}
    <text x="90" y="146" text-anchor="middle" fill="currentColor" font-size="12.5">Garcilaso</text>
    ${tag(90, 166, SKY, 'la primera')}
    ${tag(90, 182, SKY, 'mirada mestiza')}
  </g>
  <g class="grow" style="animation-delay:.9s">
    <circle cx="218" cy="118" r="8" fill="${AMBER}"/>
    ${tag(218, 96, AMBER, 's. XIX')}
    <text x="218" y="146" text-anchor="middle" fill="currentColor" font-size="12.5">Palma</text>
    ${tag(218, 166, AMBER, 'inventa un género:')}
    ${tag(218, 182, AMBER, 'la tradición')}
  </g>
  <g class="grow" style="animation-delay:1.3s">
    <circle cx="346" cy="118" r="8" fill="${CORAL}"/>
    ${tag(346, 96, CORAL, '1922')}
    <text x="346" y="146" text-anchor="middle" fill="currentColor" font-size="12.5">Vallejo</text>
    ${tag(346, 166, CORAL, 'rompe el idioma')}
    ${tag(346, 182, CORAL, 'para que quepa el dolor')}
  </g>
  <g class="grow" style="animation-delay:1.7s">
    <circle cx="472" cy="118" r="8" fill="${MINT}"/>
    ${tag(472, 96, MINT, '1958')}
    <text x="472" y="146" text-anchor="middle" fill="currentColor" font-size="12.5">Arguedas</text>
    ${tag(472, 166, MINT, 'el mundo andino')}
    ${tag(472, 182, MINT, 'contado desde dentro')}
  </g>
  <g class="grow" style="animation-delay:2.1s">
    <circle cx="586" cy="118" r="8" fill="${VIOLET}"/>
    ${tag(586, 96, VIOLET, '1963')}
    <text x="586" y="146" text-anchor="middle" fill="currentColor" font-size="12.5">Vargas Llosa</text>
    ${tag(586, 166, VIOLET, 'la novela peruana')}
    ${tag(586, 182, VIOLET, 'sale al mundo')}
  </g>
  <g class="an" style="animation-delay:2.5s">
    ${tag(320, 216, AMBER, 'el examen casi nunca pide una fecha: pide unir el autor con su obra')}
  </g>
</svg>`,
  },

  // ── Quién hace qué en el Estado ─────────────────────────────────────────
  {
    id: 'v-cg-civica',
    svg: `${open(250)}
  <g class="grow" style="animation-delay:0s">
    <path d="M 130 34 L 200 78 L 60 78 Z" fill="${VIOLET}33" stroke="${VIOLET}" stroke-width="1.4"/>
    ${tag(130, 66, VIOLET, 'Constitución')}
    <rect x="46" y="86" width="168" height="30" rx="6" fill="${SKY}22" stroke="${SKY}" stroke-width="1.3"/>
    <text x="130" y="106" text-anchor="middle" fill="currentColor" font-size="13">leyes</text>
    <rect x="34" y="124" width="192" height="30" rx="6" fill="${MINT}22" stroke="${MINT}" stroke-width="1.3"/>
    <text x="130" y="144" text-anchor="middle" fill="currentColor" font-size="13">reglamentos</text>
    ${tag(130, 182, VIOLET, 'ninguna norma puede')}
    ${tag(130, 198, VIOLET, 'contradecir a la de arriba')}
  </g>
  <g class="grow" style="animation-delay:.8s">
    ${box(268, 34, 172, 42, SKY, 'EJECUTIVO', 13)}
    ${tag(354, 92, SKY, 'gobierna y administra')}
    ${box(268, 106, 172, 42, AMBER, 'LEGISLATIVO', 13)}
    ${tag(354, 164, AMBER, 'hace las leyes y fiscaliza')}
  </g>
  <g class="grow" style="animation-delay:1.3s">
    ${box(268, 178, 172, 42, MINT, 'JUDICIAL', 13)}
    ${tag(354, 236, MINT, 'aplica la ley a los casos')}
  </g>
  <g class="grow" style="animation-delay:1.8s">
    ${box(466, 34, 150, 34, CORAL, 'RENIEC', 12)}
    ${tag(541, 84, CORAL, 'el padrón: quién')}
    ${tag(541, 100, CORAL, 'puede votar')}
    ${box(466, 114, 150, 34, CORAL, 'ONPE', 12)}
    ${tag(541, 164, CORAL, 'organiza la elección')}
    ${box(466, 178, 150, 34, CORAL, 'JNE', 12)}
    ${tag(541, 228, CORAL, 'juzga y proclama')}
  </g>
</svg>`,
  },
];
