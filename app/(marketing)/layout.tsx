import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RUMBO · Prepárate para tu examen de admisión',
  description:
    'Clases visuales, práctica por capítulo y simulacros cronometrados para ISIL, USIL, UPC y Universidad de Lima. Compra por módulo o lleva el pase completo. Nuevo: Inglés de cero a C1.',
};

/**
 * La página de venta vive fuera de los guards: tiene que abrirse sin sesión.
 * `.lp` pinta su propio fondo por encima de los degradados oscuros del `body`.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lp">{children}</div>
  );
}
