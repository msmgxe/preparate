import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, DM_Mono, Newsreader } from 'next/font/google';
import './globals.css';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const mono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const serif = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
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
    <html lang="es-PE" className={`${display.variable} ${mono.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
