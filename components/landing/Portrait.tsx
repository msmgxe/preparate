import { StudentFocused, StudentMobile, StudyGroup } from './Figures';

/**
 * Los retratos verticales del hero.
 *
 * La composición que pediste —foto, titular, foto— necesita imágenes en
 * formato vertical, y las tres escenas que ya teníamos son apaisadas. Así que
 * aquí hay dos escenas nuevas dibujadas en 4:5, con la misma pose de las fotos
 * que mandaste: alguien escribiendo en un cuaderno y alguien frente a una
 * laptop.
 *
 * ── Cómo poner tus fotos de verdad ───────────────────────────────────────
 *
 * Yo no puedo descargar imágenes, así que el hueco está preparado y vacío.
 * Cuando quieras cambiarlas:
 *
 *   1. Guarda los archivos en `public/fotos/` —por ejemplo `alumna.jpg` y
 *      `alumno.jpg`—. Verticales y de al menos 800 px de ancho.
 *   2. Escribe la ruta en PHOTOS, aquí abajo. Nada más.
 *
 * Mientras las rutas estén en `null` se dibujan las ilustraciones, así que la
 * página nunca queda con un hueco roto. Un aviso sobre las fotos de banco: si
 * las bajas de un buscador de imágenes, casi seguro tienen dueño. Para algo
 * que vas a cobrar conviene una licencia limpia —Pexels o Unsplash son
 * gratuitas y sirven— o, mejor todavía, fotos de alumnos reales con permiso
 * firmado de los padres, que además venden muchísimo más.
 */
export const PHOTOS: { left: string | null; right: string | null } = {
  left: null,
  right: null,
};

const SKIN = ['#C98A5E', '#8D5A3B', '#E0A97C'];
const HAIR = ['#2B1B14', '#1A1A1A', '#3D2A1C'];

/** Marco común: recorta, redondea y sombrea igual sea foto o dibujo. */
export function Portrait({
  src,
  alt,
  children,
}: {
  src: string | null;
  alt: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="lp-portrait">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="lp-portrait-img" loading="eager" />
      ) : (
        children
      )}
    </figure>
  );
}

/** Fondo común de las dos escenas verticales. */
function Vertical({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 320 400" width="100%" style={{ height: 'auto', display: 'block' }} role="img">
      <rect x="0" y="0" width="320" height="400" style={{ fill: 'var(--surface-2)' }} />
      <circle cx="246" cy="96" r="128" style={{ fill: accent, opacity: 0.13 }} />
      {children}
      {/* la mesa, que cierra la composición por abajo */}
      <rect x="0" y="338" width="320" height="62" style={{ fill: 'var(--text)', opacity: 0.07 }} />
      <rect x="0" y="338" width="320" height="2" style={{ fill: 'var(--text)', opacity: 0.14 }} />
    </svg>
  );
}

/** Alumna escribiendo, con el cuaderno delante. */
export function PortraitWriting() {
  return (
    <Vertical accent="var(--brand)">
      <defs>
        <clipPath id="lp-shirt-a">
          <path d="M 88 344 C 88 272, 116 248, 160 248 C 204 248, 232 272, 232 344 Z" />
        </clipPath>
      </defs>

      {/* melena, por detrás de todo */}
      <path d="M 112 168 C 100 250, 104 312, 112 344 L 208 344 C 216 312, 220 250, 208 168 Z" style={{ fill: HAIR[0] }} />

      {/* torso: polo blanco y camisa encima */}
      <path d="M 88 344 C 88 272, 116 248, 160 248 C 204 248, 232 272, 232 344 Z" style={{ fill: 'var(--surface)' }} />
      <g clipPath="url(#lp-shirt-a)">
        <path d="M 88 344 C 88 274, 112 250, 140 248 L 146 344 Z" style={{ fill: 'var(--brand)', opacity: 0.34 }} />
        <path d="M 232 344 C 232 274, 208 250, 180 248 L 174 344 Z" style={{ fill: 'var(--brand)', opacity: 0.34 }} />
        {/* las rayas de la camisa */}
        {[96, 108, 120, 132, 188, 200, 212, 224].map((x) => (
          <rect key={x} x={x} y="246" width="3" height="100" style={{ fill: 'var(--brand)', opacity: 0.5 }} />
        ))}
      </g>

      {/* cuello y cabeza */}
      <rect x="146" y="196" width="28" height="36" rx="12" style={{ fill: SKIN[2] }} />
      <circle cx="160" cy="162" r="44" style={{ fill: SKIN[2] }} />
      {/* el pelo por delante: flequillo y raya al medio */}
      <path d="M 116 164 C 110 120, 130 108, 160 108 C 190 108, 210 120, 204 164 C 198 130, 176 124, 160 132 C 144 124, 122 130, 116 164 Z" style={{ fill: HAIR[0] }} />

      {/* el brazo que escribe */}
      <path d="M 206 300 C 226 306, 236 322, 232 344 L 196 344 Z" style={{ fill: 'var(--brand)', opacity: 0.34 }} />
      <circle cx="196" cy="332" r="13" style={{ fill: SKIN[2] }} />

      {/* cuaderno y lápiz */}
      <g transform="rotate(-4 160 356)">
        <rect x="74" y="330" width="172" height="54" rx="6" style={{ fill: 'var(--surface)' }} />
        <rect x="74" y="330" width="172" height="54" rx="6" style={{ fill: 'none', stroke: 'var(--line)', strokeWidth: 1.6 }} />
        <line x1="86" y1="346" x2="150" y2="346" style={{ stroke: 'var(--text)', strokeWidth: 2, opacity: 0.26 }} />
        <line x1="86" y1="358" x2="132" y2="358" style={{ stroke: 'var(--text)', strokeWidth: 2, opacity: 0.26 }} />
        <line x1="86" y1="370" x2="144" y2="370" style={{ stroke: 'var(--text)', strokeWidth: 2, opacity: 0.26 }} />
      </g>
      <line x1="190" y1="336" x2="206" y2="300" style={{ stroke: 'var(--warn)', strokeWidth: 5, strokeLinecap: 'round' }} />
    </Vertical>
  );
}

/** Alumno frente a la laptop, con la ventana detrás. */
export function PortraitLaptop() {
  return (
    <Vertical accent="var(--accent)">
      <defs>
        <clipPath id="lp-shirt-b">
          <path d="M 84 344 C 84 270, 114 244, 158 244 C 202 244, 232 270, 232 344 Z" />
        </clipPath>
      </defs>

      {/* la ventana del fondo */}
      <rect x="180" y="28" width="132" height="188" rx="10" style={{ fill: 'var(--surface)', opacity: 0.75 }} />
      <line x1="246" y1="28" x2="246" y2="216" style={{ stroke: 'var(--text)', strokeWidth: 1.6, opacity: 0.12 }} />
      <line x1="180" y1="120" x2="312" y2="120" style={{ stroke: 'var(--text)', strokeWidth: 1.6, opacity: 0.12 }} />

      {/* torso: polo y camisa a cuadros encima */}
      <path d="M 84 344 C 84 270, 114 244, 158 244 C 202 244, 232 270, 232 344 Z" style={{ fill: 'var(--surface)' }} />
      <g clipPath="url(#lp-shirt-b)">
        <path d="M 84 344 C 84 272, 110 246, 138 244 L 144 344 Z" style={{ fill: 'var(--accent)', opacity: 0.42 }} />
        <path d="M 232 344 C 232 272, 206 246, 178 244 L 172 344 Z" style={{ fill: 'var(--accent)', opacity: 0.42 }} />
        {/* los cuadros */}
        {[92, 116, 186, 210].map((x) => (
          <rect key={`v${x}`} x={x} y="242" width="4" height="104" style={{ fill: 'var(--text)', opacity: 0.16 }} />
        ))}
        {[262, 292, 322].map((y) => (
          <rect key={`h${y}`} x="80" y={y} width="156" height="4" style={{ fill: 'var(--text)', opacity: 0.16 }} />
        ))}
      </g>

      {/* cuello y cabeza */}
      <rect x="144" y="192" width="28" height="36" rx="12" style={{ fill: SKIN[0] }} />
      <circle cx="158" cy="158" r="45" style={{ fill: SKIN[0] }} />
      {/* pelo corto, con volumen arriba */}
      <path d="M 114 156 C 106 108, 130 96, 158 96 C 186 96, 210 108, 202 156 C 194 124, 172 118, 156 124 C 140 118, 122 126, 114 156 Z" style={{ fill: HAIR[0] }} />

      {/* la laptop, por delante */}
      <path d="M 96 320 L 108 268 L 236 268 L 250 320 Z" style={{ fill: 'var(--text)', opacity: 0.13 }} />
      <path d="M 96 320 L 108 268 L 236 268 L 250 320 Z" style={{ fill: 'none', stroke: 'var(--text)', strokeWidth: 1.8, opacity: 0.3 }} />
      <rect x="76" y="320" width="194" height="12" rx="5" style={{ fill: 'var(--text)', opacity: 0.22 }} />
      {/* la manzana de la tapa, que aquí es una R */}
      <text x="173" y="302" textAnchor="middle" style={{ fill: 'var(--text)', opacity: 0.26, fontSize: 22, fontWeight: 800 }}>
        R
      </text>
    </Vertical>
  );
}

export { StudentFocused, StudentMobile, StudyGroup };
