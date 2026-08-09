import { getAuth } from '@/lib/neon-auth';

/**
 * Proxy hacia Neon Auth: registro, inicio de sesión, verificación del enlace
 * mágico y cierre de sesión.
 *
 * Los handlers se construyen en la primera petición, no al cargar el módulo:
 * Next.js evalúa el código de módulo durante `next build`, y ahí todavía no
 * existen las variables de entorno.
 */
type Handlers = ReturnType<ReturnType<typeof getAuth>['handler']>;
type Context = { params: Promise<{ path: string[] }> };

let cached: Handlers | null = null;

function handlers(): Handlers {
  if (!cached) cached = getAuth().handler();
  return cached;
}

export const GET = (request: Request, context: Context) => handlers().GET(request, context);
export const POST = (request: Request, context: Context) => handlers().POST(request, context);
export const PUT = (request: Request, context: Context) => handlers().PUT(request, context);
export const DELETE = (request: Request, context: Context) => handlers().DELETE(request, context);
export const PATCH = (request: Request, context: Context) => handlers().PATCH(request, context);
