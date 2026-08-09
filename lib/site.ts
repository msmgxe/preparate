/**
 * Datos de contacto y del negocio.
 *
 * ⚠️ Cambia `whatsapp` por tu número real antes de compartir la página: es el
 * canal por el que se cierra la venta (el padre escribe, paga con Yape o
 * transferencia y tú abres el acceso desde el panel).
 */
export const site = {
  name: 'RUMBO',
  tagline: 'Preparación de Admisión',
  /** Formato internacional sin signos: 51 + número. */
  whatsapp: '51999999999',
  email: 'hola@rumbo.pe',
  instagram: 'https://instagram.com/',
  tiktok: 'https://tiktok.com/',
};

/** Enlace de WhatsApp con el mensaje ya escrito, según lo que mire el visitante. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
