/**
 * Todo lo que hay debajo depende de la sesión: nada se prerenderiza.
 * (Los Server Components que usan Neon Auth deben renderizarse dinámicamente.)
 */
export const dynamic = 'force-dynamic';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="authshell">
      <div className="authbox">
        <div className="authlogo">
          <b>RUMBO</b>
          <span>Preparación de Admisión</span>
        </div>
        {children}
      </div>
    </div>
  );
}
