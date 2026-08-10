/**
 * Las infografías del módulo de Inglés.
 *
 * Cada una dibuja algo que el texto explica peor: una pieza que se mueve, una
 * escala de certeza, un orden obligatorio. Si el dibujo solo repite la frase de
 * al lado, no vale la pena y no está aquí.
 *
 * Reglas técnicas, aprendidas a base de romperlas:
 *
 *  · El texto va con `fill="currentColor"`; los acentos, con su hex. Nada de
 *    `var()`: dentro de un atributo SVG no se sustituye.
 *  · La revelación progresiva usa las clases `grow` y `an` con
 *    `animation-delay`. Son las únicas propiedades de `style` que el
 *    saneador deja pasar, así que cualquier otra se pierde en silencio.
 *  · Ancho fijo de 640; el alto se ajusta al contenido.
 */
export type Visual = { id: string; svg: string };

const OPEN = '<svg viewBox="0 0 640 %H%" xmlns="http://www.w3.org/2000/svg" font-family="DM Mono, monospace">';

/** Caja con texto centrado, del color que se le pase. */
function box(x: number, y: number, w: number, h: number, color: string, label: string, size = 15) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${color}22" stroke="${color}" stroke-width="1.3"/><text x="${x + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle" fill="currentColor" font-size="${size}">${label}</text>`;
}

/** Rótulo pequeño, en el color del acento. */
function tag(x: number, y: number, color: string, label: string, anchor = 'middle') {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-size="11.5">${label}</text>`;
}

const AMBER = '#EFA451';
const SKY = '#66BFE8';
const MINT = '#4FD69C';
const CORAL = '#FF5F57';
const VIOLET = '#B08BE8';

export const ENG_VISUALS: Visual[] = [
  // ── La -s que cambia de sitio ───────────────────────────────────────────
  {
    id: 'v-eng-presente',
    svg: `${OPEN.replace('%H%', '210')}
  <g class="grow" style="animation-delay:0s">
    ${box(40, 22, 250, 42, MINT, 'She like')}
    <circle cx="300" cy="43" r="15" fill="${MINT}33" stroke="${MINT}" stroke-width="1.5"/>
    <text x="300" y="49" text-anchor="middle" fill="${MINT}" font-size="16" font-weight="700">s</text>
    ${tag(430, 48, MINT, 'sin auxiliar: la lleva el verbo', 'start')}
  </g>
  <g class="an" style="animation-delay:.6s">
    <path d="M 300 66 C 300 92, 150 92, 150 112" fill="none" stroke="${AMBER}" stroke-width="1.6" stroke-dasharray="5 4"/>
    ${tag(230, 96, AMBER, 'la -s se muda')}
  </g>
  <g class="grow" style="animation-delay:1s">
    <circle cx="150" cy="132" r="15" fill="${AMBER}33" stroke="${AMBER}" stroke-width="1.5"/>
    <text x="150" y="138" text-anchor="middle" fill="${AMBER}" font-size="16" font-weight="700">s</text>
    ${box(170, 111, 300, 42, AMBER, "doe   n't like")}
    ${tag(490, 137, AMBER, 'con auxiliar: la lleva él', 'start')}
  </g>
  <g class="an" style="animation-delay:1.5s">
    <text x="320" y="188" text-anchor="middle" fill="${CORAL}" font-size="14">✕  she doesn't likes  —  la -s no puede estar dos veces</text>
  </g>
</svg>`,
  },

  // ── Preguntar es mover piezas ───────────────────────────────────────────
  {
    id: 'v-eng-preguntas',
    svg: `${OPEN.replace('%H%', '230')}
  <g class="grow" style="animation-delay:0s">
    ${box(150, 20, 110, 40, SKY, 'You')}
    ${box(268, 20, 110, 40, SKY, 'live')}
    ${box(386, 20, 110, 40, SKY, 'here')}
    ${tag(75, 45, SKY, 'afirmación', 'start')}
  </g>
  <g class="an" style="animation-delay:.6s">
    ${box(28, 88, 110, 40, AMBER, 'Do')}
    <path d="M 83 132 L 83 150" fill="none" stroke="${AMBER}" stroke-width="1.6"/>
    ${tag(83, 82, AMBER, 'entra el auxiliar')}
  </g>
  <g class="grow" style="animation-delay:1s">
    ${box(28, 156, 110, 40, AMBER, 'Do')}
    ${box(146, 156, 110, 40, SKY, 'you')}
    ${box(264, 156, 110, 40, SKY, 'live')}
    ${box(382, 156, 110, 40, SKY, 'here')}
    <text x="510" y="182" fill="currentColor" font-size="22">?</text>
  </g>
  <g class="an" style="animation-delay:1.6s">
    ${tag(575, 182, MINT, 'el verbo', 'middle')}
    ${tag(575, 196, MINT, 'no se mueve', 'middle')}
  </g>
</svg>`,
  },

  // ── La trampa de did ────────────────────────────────────────────────────
  {
    id: 'v-eng-pasado',
    svg: `${OPEN.replace('%H%', '215')}
  <g class="grow" style="animation-delay:0s">
    ${box(60, 22, 130, 42, MINT, 'You')}
    ${box(200, 22, 150, 42, MINT, 'went')}
    ${box(360, 22, 130, 42, MINT, 'home')}
    ${tag(275, 84, MINT, 'el pasado está en el verbo')}
  </g>
  <g class="an" style="animation-delay:.7s">
    <path d="M 275 96 C 275 118, 130 118, 130 134" fill="none" stroke="${AMBER}" stroke-width="1.6" stroke-dasharray="5 4"/>
  </g>
  <g class="grow" style="animation-delay:1.1s">
    ${box(60, 140, 130, 42, AMBER, 'Did')}
    ${box(200, 140, 150, 42, SKY, 'go')}
    ${box(360, 140, 130, 42, SKY, 'home')}
    <text x="505" y="167" fill="currentColor" font-size="22">?</text>
    ${tag(560, 148, AMBER, 'lo carga did', 'middle')}
    ${tag(560, 176, SKY, 'el verbo, desnudo', 'middle')}
  </g>
  <g class="an" style="animation-delay:1.7s">
    <text x="275" y="207" text-anchor="middle" fill="${CORAL}" font-size="14">✕  did you went  —  el pasado no va dos veces</text>
  </g>
</svg>`,
  },

  // ── Los tres futuros, según cuándo lo decidiste ─────────────────────────
  {
    id: 'v-eng-futuro',
    svg: `${OPEN.replace('%H%', '230')}
  <g class="grow" style="animation-delay:0s">
    <line x1="40" y1="120" x2="600" y2="120" stroke="currentColor" stroke-opacity=".22" stroke-width="1.6"/>
    <circle cx="320" cy="120" r="7" fill="${AMBER}"/>
    <text x="320" y="146" text-anchor="middle" fill="${AMBER}" font-size="12">hablas AHORA</text>
  </g>
  <g class="grow" style="animation-delay:.5s">
    ${box(60, 46, 190, 44, VIOLET, "I'm going to…")}
    ${tag(155, 106, VIOLET, 'lo decidiste antes')}
    <path d="M 155 90 L 155 112" fill="none" stroke="${VIOLET}" stroke-width="1.4" stroke-dasharray="4 3"/>
  </g>
  <g class="grow" style="animation-delay:1s">
    ${box(240, 168, 165, 44, AMBER, "I'll help you")}
    <path d="M 320 128 L 320 166" fill="none" stroke="${AMBER}" stroke-width="1.4"/>
  </g>
  <g class="grow" style="animation-delay:1.5s">
    ${box(400, 46, 190, 44, SKY, "I'm seeing him at 4")}
    ${tag(495, 106, SKY, 'ya está en la agenda')}
    <path d="M 495 90 L 495 112" fill="none" stroke="${SKY}" stroke-width="1.4" stroke-dasharray="4 3"/>
  </g>
</svg>`,
  },

  // ── Contar sílabas antes de comparar ────────────────────────────────────
  {
    id: 'v-eng-comparar',
    svg: `${OPEN.replace('%H%', '220')}
  <g class="grow" style="animation-delay:0s">
    ${box(40, 26, 250, 40, MINT, '1 sílaba  ·  o 2 en -y')}
    ${box(40, 78, 250, 44, MINT, 'cheap → cheaper', 16)}
    ${box(40, 132, 250, 44, MINT, 'happy → happier', 16)}
    ${tag(165, 200, MINT, 'se le pega  -er')}
  </g>
  <g class="grow" style="animation-delay:.7s">
    ${box(350, 26, 250, 40, VIOLET, '2 sílabas o más')}
    ${box(350, 78, 250, 44, VIOLET, 'more expensive', 16)}
    ${box(350, 132, 250, 44, VIOLET, 'more difficult', 16)}
    ${tag(475, 200, VIOLET, 'se le antepone  more')}
  </g>
  <g class="an" style="animation-delay:1.3s">
    <text x="320" y="106" text-anchor="middle" fill="${CORAL}" font-size="20">✕</text>
    <text x="320" y="60" text-anchor="middle" fill="currentColor" font-opacity=".5" font-size="12">nunca</text>
    <text x="320" y="150" text-anchor="middle" fill="${CORAL}" font-size="11">more cheaper</text>
  </g>
</svg>`,
  },

  // ── El orden fijo de los adjetivos ──────────────────────────────────────
  {
    id: 'v-eng-describir',
    svg: `${OPEN.replace('%H%', '190')}
  <g class="grow" style="animation-delay:0s">
    ${box(20, 30, 88, 38, SKY, 'opinión', 12)}
    ${box(114, 30, 88, 38, SKY, 'tamaño', 12)}
    ${box(208, 30, 88, 38, AMBER, 'edad', 12)}
    ${box(302, 30, 88, 38, SKY, 'forma', 12)}
    ${box(396, 30, 88, 38, AMBER, 'color', 12)}
    ${box(490, 30, 88, 38, AMBER, 'origen', 12)}
  </g>
  <g class="an" style="animation-delay:.7s">
    <path d="M 252 72 L 252 92" fill="none" stroke="${AMBER}" stroke-width="1.4"/>
    <path d="M 440 72 L 440 92" fill="none" stroke="${AMBER}" stroke-width="1.4"/>
    <path d="M 534 72 L 534 92" fill="none" stroke="${AMBER}" stroke-width="1.4"/>
  </g>
  <g class="grow" style="animation-delay:1s">
    ${box(208, 98, 88, 42, AMBER, 'new', 16)}
    ${box(396, 98, 88, 42, AMBER, 'red', 16)}
    ${box(490, 98, 88, 42, AMBER, 'Japanese', 12)}
    <text x="120" y="125" text-anchor="middle" fill="currentColor" font-size="16">a</text>
    <text x="600" y="125" text-anchor="middle" fill="currentColor" font-size="16">car</text>
  </g>
  <g class="an" style="animation-delay:1.5s">
    <text x="320" y="172" text-anchor="middle" fill="${CORAL}" font-size="13">✕  a red new Japanese car  —  el color nunca va antes que la edad</text>
  </g>
</svg>`,
  },

  // ── Activa y pasiva: las piezas se cruzan ───────────────────────────────
  {
    id: 'v-eng-pasiva',
    svg: `${OPEN.replace('%H%', '210')}
  <g class="grow" style="animation-delay:0s">
    ${box(50, 24, 160, 42, SKY, 'Someone')}
    ${box(220, 24, 120, 42, AMBER, 'stole')}
    ${box(350, 24, 160, 42, MINT, 'my bike')}
    ${tag(560, 50, SKY, 'activa', 'middle')}
  </g>
  <g class="an" style="animation-delay:.7s">
    <path d="M 430 70 C 430 100, 130 100, 130 128" fill="none" stroke="${MINT}" stroke-width="1.6" stroke-dasharray="5 4"/>
    ${tag(280, 96, MINT, 'lo que recibe la acción pasa al frente')}
  </g>
  <g class="grow" style="animation-delay:1.2s">
    ${box(50, 134, 160, 42, MINT, 'My bike')}
    ${box(220, 134, 110, 42, AMBER, 'was')}
    ${box(340, 134, 150, 42, AMBER, 'stolen')}
    ${tag(560, 160, AMBER, 'pasiva', 'middle')}
  </g>
  <g class="an" style="animation-delay:1.7s">
    <text x="275" y="200" text-anchor="middle" fill="currentColor" font-opacity=".62" font-size="13">be conjugado  +  participio  ·  el agente se dice solo si aporta</text>
  </g>
</svg>`,
  },

  // ── La escala de certeza de los modales ─────────────────────────────────
  {
    id: 'v-eng-modales',
    svg: `${OPEN.replace('%H%', '195')}
  <g class="grow" style="animation-delay:0s">
    <rect x="40" y="88" width="560" height="14" rx="7" fill="currentColor" fill-opacity=".08"/>
    <text x="40" y="132" fill="${CORAL}" font-size="12">seguro que NO</text>
    <text x="600" y="132" text-anchor="end" fill="${MINT}" font-size="12">seguro que SÍ</text>
  </g>
  <g class="grow" style="animation-delay:.5s">
    <circle cx="95" cy="95" r="9" fill="${CORAL}"/>
    ${box(30, 26, 140, 42, CORAL, "can't have", 15)}
    <path d="M 100 68 L 96 84" fill="none" stroke="${CORAL}" stroke-width="1.4"/>
  </g>
  <g class="grow" style="animation-delay:1s">
    <circle cx="320" cy="95" r="9" fill="${AMBER}"/>
    ${box(250, 26, 150, 42, AMBER, 'might have', 15)}
    <path d="M 322 68 L 321 84" fill="none" stroke="${AMBER}" stroke-width="1.4"/>
  </g>
  <g class="grow" style="animation-delay:1.5s">
    <circle cx="545" cy="95" r="9" fill="${MINT}"/>
    ${box(470, 26, 140, 42, MINT, 'must have', 15)}
    <path d="M 540 68 L 544 84" fill="none" stroke="${MINT}" stroke-width="1.4"/>
  </g>
  <g class="an" style="animation-delay:2s">
    <text x="320" y="168" text-anchor="middle" fill="currentColor" font-opacity=".62" font-size="13">la negativa de «must have» no es «mustn't have»: es «can't have»</text>
  </g>
</svg>`,
  },

  // ── Reportar: todo baja un escalón ──────────────────────────────────────
  {
    id: 'v-eng-reported',
    svg: `${OPEN.replace('%H%', '215')}
  <g class="grow" style="animation-delay:0s">
    ${box(60, 20, 190, 40, MINT, 'presente')}
    <text x="270" y="46" fill="currentColor" font-opacity=".5" font-size="16">→</text>
    ${box(300, 20, 190, 40, AMBER, 'pasado')}
  </g>
  <g class="grow" style="animation-delay:.5s">
    ${box(60, 74, 190, 40, MINT, 'pasado')}
    <text x="270" y="100" fill="currentColor" font-opacity=".5" font-size="16">→</text>
    ${box(300, 74, 190, 40, AMBER, 'pasado perfecto')}
  </g>
  <g class="grow" style="animation-delay:1s">
    ${box(60, 128, 190, 40, MINT, 'will')}
    <text x="270" y="154" fill="currentColor" font-opacity=".5" font-size="16">→</text>
    ${box(300, 128, 190, 40, AMBER, 'would')}
  </g>
  <g class="an" style="animation-delay:1.5s">
    <path d="M 520 30 L 520 158" fill="none" stroke="${AMBER}" stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="560" y="80" text-anchor="middle" fill="${AMBER}" font-size="12">un</text>
    <text x="560" y="96" text-anchor="middle" fill="${AMBER}" font-size="12">escalón</text>
    <text x="560" y="112" text-anchor="middle" fill="${AMBER}" font-size="12">atrás</text>
  </g>
  <g class="an" style="animation-delay:2s">
    <text x="275" y="200" text-anchor="middle" fill="currentColor" font-opacity=".62" font-size="13">salvo si lo dicho sigue siendo verdad: entonces se queda</text>
  </g>
</svg>`,
  },

  // ── Escrito frente a hablado ────────────────────────────────────────────
  {
    id: 'v-eng-velocidad',
    svg: `${OPEN.replace('%H%', '200')}
  <g class="grow" style="animation-delay:0s">
    ${box(40, 26, 120, 42, SKY, 'What')}
    ${box(172, 26, 100, 42, SKY, 'do')}
    ${box(284, 26, 100, 42, SKY, 'you')}
    ${box(396, 26, 120, 42, SKY, 'want')}
    ${tag(575, 52, SKY, 'escrito', 'middle')}
  </g>
  <g class="an" style="animation-delay:.7s">
    <path d="M 100 72 C 100 96, 260 96, 260 112" fill="none" stroke="${AMBER}" stroke-width="1.4" stroke-dasharray="4 3"/>
    <path d="M 222 72 C 222 96, 270 96, 270 112" fill="none" stroke="${AMBER}" stroke-width="1.4" stroke-dasharray="4 3"/>
    <path d="M 334 72 C 334 96, 285 96, 285 112" fill="none" stroke="${AMBER}" stroke-width="1.4" stroke-dasharray="4 3"/>
    <path d="M 456 72 C 456 96, 300 96, 300 112" fill="none" stroke="${AMBER}" stroke-width="1.4" stroke-dasharray="4 3"/>
  </g>
  <g class="grow" style="animation-delay:1.2s">
    ${box(120, 118, 360, 46, AMBER, 'whaddaya wanna', 18)}
    ${tag(575, 145, AMBER, 'hablado', 'middle')}
  </g>
  <g class="an" style="animation-delay:1.7s">
    <text x="300" y="190" text-anchor="middle" fill="currentColor" font-opacity=".62" font-size="13">no hablan rápido: pegan las palabras y borran las átonas</text>
  </g>
</svg>`,
  },

  // ── Poner el foco: la pieza se adelanta ─────────────────────────────────
  {
    id: 'v-eng-foco',
    svg: `${OPEN.replace('%H%', '215')}
  <g class="grow" style="animation-delay:0s">
    ${box(140, 22, 130, 42, SKY, 'Ana')}
    ${box(280, 22, 130, 42, SKY, 'called')}
    ${box(420, 22, 150, 42, SKY, 'yesterday')}
    ${tag(70, 48, SKY, 'neutra', 'start')}
  </g>
  <g class="an" style="animation-delay:.7s">
    <path d="M 205 68 C 205 92, 230 92, 230 108" fill="none" stroke="${MINT}" stroke-width="1.5" stroke-dasharray="5 4"/>
  </g>
  <g class="grow" style="animation-delay:1s">
    ${box(40, 114, 120, 40, MINT, 'It was')}
    ${box(170, 114, 120, 40, MINT, 'Ana')}
    ${box(300, 114, 110, 40, MINT, 'who')}
    ${box(420, 114, 150, 40, SKY, 'called')}
    ${tag(600, 140, MINT, '↑ quién', 'end')}
  </g>
  <g class="grow" style="animation-delay:1.6s">
    ${box(40, 162, 120, 40, VIOLET, 'It was')}
    ${box(170, 162, 150, 40, VIOLET, 'yesterday')}
    ${box(330, 162, 110, 40, VIOLET, 'that')}
    ${box(450, 162, 120, 40, SKY, 'Ana…')}
    ${tag(600, 188, VIOLET, '↑ cuándo', 'end')}
  </g>
</svg>`,
  },
];
