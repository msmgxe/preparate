import type { Metadata, Viewport } from 'next';
import { Atkinson_Hyperlegible, DM_Mono, Inter, Lexend } from 'next/font/google';
import { THEME_BOOTSTRAP } from '@/components/ThemeToggle';
import './globals.css';

/**
 * Una sola familia para todo lo que se lee.
 *
 * Inter está dibujada para pantalla: altura de x grande, aperturas amplias y
 * formas que no se confunden entre sí —la I mayúscula, la l minúscula y el 1
 * son distinguibles—, que es justo lo que falla cuando alguien sigue una clase
 * proyectada o desde el móvil. Sustituye a las cuatro familias anteriores.
 *
 * `next/font` descarga de Google Fonts en tiempo de compilación y sirve el
 * archivo desde nuestro propio dominio: sin petición a un tercero al cargar la
 * página, sin salto de maquetación y sin filtrar a Google quién nos visita.
 */
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

/**
 * Alternativa de lectura. Lexend se diseñó midiendo velocidad de lectura en
 * escolares: alarga el espacio entre letras y simplifica los trazos.
 */
const reading = Lexend({
  subsets: ['latin'],
  variable: '--font-reading',
  display: 'swap',
});

/**
 * Alternativa de baja visión. Atkinson Hyperlegible viene del Braille
 * Institute y separa a propósito los pares que se confunden: 0/O, I/l/1, b/d.
 */
const hyperlegible = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-hyperlegible',
  display: 'swap',
});

/** Solo para cifras, fórmulas y micro-rótulos; nunca para texto corrido. */
const mono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RUMBO · Preparación de Admisión',
  description:
    'Preparación para exámenes de admisión en Perú: práctica por capítulo, simulacros cronometrados, resolución paso a paso y clases visuales.',
};

export const viewport: Viewport = {
  themeColor: '#08151E',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE" className={`${sans.variable} ${reading.variable} ${hyperlegible.variable} ${mono.variable}`}>
      <head>
        {/* corre antes del primer pintado, para que no parpadee el tema */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
