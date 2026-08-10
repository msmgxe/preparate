/**
 * Las ilustraciones de la página de venta.
 *
 * Son SVG dibujados a mano, no fotos. Tres razones, por orden de peso:
 *
 *  1. Todo lo demás del producto está dibujado —las veinte infografías de las
 *     clases, los diagramas de la ayuda—, así que una foto de banco chirriaría
 *     al lado. Un producto con dos lenguajes visuales se ve improvisado.
 *  2. Heredan el tema: la misma ilustración funciona en claro y en oscuro sin
 *     tener que preparar dos versiones.
 *  3. Pesan unos pocos kilobytes y no hay que licenciar nada.
 *
 * El estilo es plano y geométrico a propósito. Intentar caras realistas en SVG
 * sale mal casi siempre; con formas simples y buena composición se lee igual de
 * bien y envejece mucho mejor. Los tonos de piel y de pelo cambian entre las
 * tres para que un salón peruano se reconozca en ellas.
 *
 * Si algún día quieres fotos de verdad, el sitio donde entran es este: cada
 * escena vive en su propio componente y se sustituye sin tocar el resto.
 */

const SKIN = ['#C98A5E', '#8D5A3B', '#E0A97C'];
const HAIR = ['#2B1B14', '#1A1A1A', '#3D2A1C'];

/** Fondo común: tarjeta redondeada con un halo del color de acento. */
function Scene({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 260 210" width="100%" style={{ height: 'auto', display: 'block' }} role="img">
      <rect x="0" y="0" width="260" height="210" rx="18" style={{ fill: 'var(--surface-2)' }} />
      <circle cx="200" cy="52" r="58" style={{ fill: accent, opacity: 0.14 }} />
      {children}
      {/* la mesa, común a las tres escenas */}
      <rect x="18" y="172" width="224" height="7" rx="3.5" style={{ fill: 'var(--text)', opacity: 0.18 }} />
    </svg>
  );
}

/** Cabeza, cuello y hombros. La base de las tres figuras. */
function Bust({
  x,
  skin,
  shirt,
  scale = 1,
}: {
  x: number;
  skin: string;
  shirt: string;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} 0) scale(${scale})`} transform-origin="center bottom">
      {/* torso con el uniforme */}
      <path d="M 60 172 C 60 138, 78 126, 100 126 C 122 126, 140 138, 140 172 Z" style={{ fill: shirt }} />
      {/* cuello */}
      <rect x="92" y="112" width="16" height="20" rx="7" style={{ fill: skin }} />
      {/* cabeza */}
      <circle cx="100" cy="98" r="25" style={{ fill: skin }} />
    </g>
  );
}

/** Una alumna concentrada, con el cuaderno abierto. */
export function StudentFocused() {
  return (
    <Scene accent="var(--brand)">
      {/* coleta, detrás de la cabeza */}
      <path d="M 118 92 C 138 100, 136 128, 126 140 C 132 122, 128 104, 114 98 Z" style={{ fill: HAIR[0] }} />
      <Bust x={0} skin={SKIN[0]} shirt="var(--brand)" />
      {/* flequillo */}
      <path d="M 75 92 C 78 72, 122 72, 125 92 C 118 82, 82 82, 75 92 Z" style={{ fill: HAIR[0] }} />
      <path d="M 75 96 C 70 78, 84 68, 100 68 C 116 68, 130 78, 125 96 C 122 80, 78 80, 75 96 Z" style={{ fill: HAIR[0] }} />
      {/* cuaderno sobre la mesa */}
      <g>
        <rect x="150" y="140" width="82" height="32" rx="4" style={{ fill: 'var(--surface)' }} />
        <rect x="150" y="140" width="82" height="32" rx="4" style={{ fill: 'none', stroke: 'var(--line)', strokeWidth: 1.4 }} />
        <line x1="191" y1="140" x2="191" y2="172" style={{ stroke: 'var(--line)', strokeWidth: 1.4 }} />
        <line x1="158" y1="150" x2="184" y2="150" style={{ stroke: 'var(--text)', strokeWidth: 1.6, opacity: 0.3 }} />
        <line x1="158" y1="158" x2="178" y2="158" style={{ stroke: 'var(--text)', strokeWidth: 1.6, opacity: 0.3 }} />
        <line x1="198" y1="150" x2="224" y2="150" style={{ stroke: 'var(--text)', strokeWidth: 1.6, opacity: 0.3 }} />
      </g>
      {/* la marca de acierto, que es de lo que va el producto */}
      <g>
        <circle cx="212" cy="112" r="17" style={{ fill: 'var(--lime)' }} />
        <path d="M 204 112 l 6 6 l 12 -13" style={{ fill: 'none', stroke: '#fff', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
      </g>
    </Scene>
  );
}

/** Un alumno con el celular, repasando la bitácora. */
export function StudentMobile() {
  return (
    <Scene accent="var(--accent)">
      <Bust x={-14} skin={SKIN[1]} shirt="var(--accent)" />
      {/* pelo corto */}
      <path d="M 61 84 C 64 62, 108 62, 111 84 C 108 74, 64 74, 61 84 Z" style={{ fill: HAIR[1] }} transform="translate(-14 0)" />
      <path d="M 61 88 C 56 68, 70 58, 86 58 C 102 58, 116 68, 111 88 C 106 74, 66 74, 61 88 Z" style={{ fill: HAIR[1] }} transform="translate(-14 0)" />
      {/* el teléfono, con una pregunta dentro */}
      <g>
        <rect x="162" y="88" width="62" height="100" rx="10" style={{ fill: 'var(--surface)' }} />
        <rect x="162" y="88" width="62" height="100" rx="10" style={{ fill: 'none', stroke: 'var(--line)', strokeWidth: 1.5 }} />
        <rect x="170" y="100" width="46" height="7" rx="3.5" style={{ fill: 'var(--text)', opacity: 0.22 }} />
        <rect x="170" y="112" width="34" height="7" rx="3.5" style={{ fill: 'var(--text)', opacity: 0.22 }} />
        <rect x="170" y="128" width="46" height="13" rx="5" style={{ fill: 'var(--lime)', opacity: 0.28 }} />
        <rect x="170" y="146" width="46" height="13" rx="5" style={{ fill: 'var(--text)', opacity: 0.08 }} />
        <rect x="170" y="164" width="46" height="13" rx="5" style={{ fill: 'var(--text)', opacity: 0.08 }} />
      </g>
      {/* la racha */}
      <g>
        <circle cx="60" cy="60" r="18" style={{ fill: 'var(--warn)', opacity: 0.9 }} />
        <text x="60" y="66" textAnchor="middle" style={{ fill: '#fff', fontSize: 15, fontWeight: 700 }}>
          7
        </text>
      </g>
    </Scene>
  );
}

/** Tres estudiando juntos: el caso del colegio o la academia. */
export function StudyGroup() {
  return (
    <Scene accent="var(--lime)">
      {/* de atrás hacia delante, para que se solapen bien */}
      <g transform="translate(-52 26) scale(.72)" transform-origin="center bottom">
        <path d="M 61 88 C 56 68, 70 58, 86 58 C 102 58, 116 68, 111 88 C 106 74, 66 74, 61 88 Z" style={{ fill: HAIR[2] }} />
        <Bust x={-14} skin={SKIN[2]} shirt="var(--accent)" />
        <path d="M 61 84 C 64 62, 108 62, 111 84 C 108 74, 64 74, 61 84 Z" style={{ fill: HAIR[2] }} transform="translate(-14 0)" />
      </g>
      <g transform="translate(58 26) scale(.72)" transform-origin="center bottom">
        <path d="M 118 92 C 138 100, 136 128, 126 140 C 132 122, 128 104, 114 98 Z" style={{ fill: HAIR[0] }} />
        <Bust x={0} skin={SKIN[0]} shirt="var(--lime)" />
        <path d="M 75 96 C 70 78, 84 68, 100 68 C 116 68, 130 78, 125 96 C 122 80, 78 80, 75 96 Z" style={{ fill: HAIR[0] }} />
      </g>
      <g transform="translate(0 8) scale(.86)" transform-origin="center bottom">
        <Bust x={0} skin={SKIN[1]} shirt="var(--brand)" />
        <path d="M 75 92 C 78 70, 122 70, 125 92 C 118 80, 82 80, 75 92 Z" style={{ fill: HAIR[1] }} />
        <path d="M 75 96 C 70 76, 84 66, 100 66 C 116 66, 130 76, 125 96 C 122 78, 78 78, 75 96 Z" style={{ fill: HAIR[1] }} />
      </g>
      {/* el libro compartido */}
      <g>
        <path d="M 92 158 L 130 150 L 130 174 L 92 174 Z" style={{ fill: 'var(--surface)' }} />
        <path d="M 168 158 L 130 150 L 130 174 L 168 174 Z" style={{ fill: 'var(--surface)' }} />
        <path d="M 92 158 L 130 150 L 168 158" style={{ fill: 'none', stroke: 'var(--line)', strokeWidth: 1.5 }} />
        <line x1="130" y1="150" x2="130" y2="174" style={{ stroke: 'var(--line)', strokeWidth: 1.5 }} />
      </g>
    </Scene>
  );
}
