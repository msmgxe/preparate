import { NextResponse, type NextRequest } from 'next/server';
import { getAuth } from '@/lib/neon-auth';
import { authConfigured } from '@/lib/env';

/**
 * Next.js 16 · `proxy` (antes `middleware`).
 *
 * Refresca la sesión de Neon Auth y manda a `/login` lo que no esté autenticado.
 * Los guards de ROL viven en los layouts `(student)` y `(admin)`, que sí pueden
 * consultar `profiles`; aquí solo se decide si hay sesión o no.
 */
const guard = authConfigured ? getAuth().middleware({ loginUrl: '/login' }) : null;

export async function proxy(request: NextRequest) {
  // Sin configurar, la app arranca igual y cada página explica qué falta.
  if (!guard) return NextResponse.next({ request });

  /**
   * El guard solo tutela navegaciones.
   *
   * El middleware de Neon Auth trata como anónima cualquier petición que no
   * sea GET, así que redirigiría a `/login` las server actions y las llamadas
   * a `/api/*` — y quien las hizo recibiría el HTML del login donde esperaba
   * la respuesta de la acción («An unexpected response was received from the
   * server»). La autorización de verdad de esas rutas no está aquí: cada
   * acción abre con `requireUser()` o `requireAdmin()`, y cada handler de
   * `/api` comprueba la sesión por su cuenta.
   */
  if (request.method !== 'GET') return NextResponse.next({ request });

  return guard(request);
}

/**
 * El export tiene que llamarse `config`, no `proxyConfig`: Next lee
 * `exportedConfig.config` aunque el archivo ya se llame `proxy.ts`. Con otro
 * nombre el matcher se ignora en silencio y el guard corre en cada petición
 * —incluidos el CSS y el favicon—, que acaban redirigidos a `/login`.
 */
export const config = {
  /**
   * Solo lo privado. La raíz es la página de venta y tiene que ser pública,
   * igual que `/login`, `/registro` y los estáticos.
   */
  matcher: [
    '/app',
    '/app/:path*',
    '/panel/:path*',
    '/alumnos/:path*',
    '/balotario/:path*',
    '/clases/:path*',
    '/calibracion/:path*',
    '/traducciones/:path*',
    '/ayuda/:path*',
  ],
};
