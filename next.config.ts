import type { NextConfig } from 'next';

/**
 * Cabeceras de seguridad.
 *
 * Van aquí y no en el proxy porque el proxy solo corre en las rutas privadas:
 * la página de venta, que es la que verá gente de fuera, quedaría sin ellas.
 *
 * La política de contenido es deliberadamente corta. Las cuatro directivas que
 * lleva no pueden romper nada y cierran los agujeros reales de una app así:
 * que la incrusten en un iframe para robar clics, que le cambien la base de
 * las URL relativas, que le redirijan un formulario a otro dominio, o que
 * carguen un plugin. Lo que falta —`script-src` con nonce— exigiría generar
 * uno por petición en todas las rutas, y sin él `'unsafe-inline'` no protege
 * de nada: mejor no fingir que sí.
 *
 * `Permissions-Policy` merece atención: el micrófono NO se bloquea, porque es
 * lo que usa la práctica de pronunciación del módulo de Inglés. Cámara y
 * ubicación sí, que no se usan en ningún sitio.
 */
const SECURITY_HEADERS = [
  {
    key: 'Content-Security-Policy',
    value: [
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join('; '),
  },
  // por si algún navegador viejo ignora frame-ancestors
  { key: 'X-Frame-Options', value: 'DENY' },
  // impide que un archivo servido como texto se interprete como script
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // no filtra la ruta completa al salir del sitio; dentro sí, que hace falta
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'microphone=(self), camera=(), geolocation=(), payment=(), usb=()',
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
