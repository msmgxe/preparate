/**
 * Datos de contacto y del negocio.
 *
 * `whatsapp` es el canal por el que se cierra la venta: el padre escribe, paga
 * con Yape o transferencia y tú abres el acceso desde el panel.
 */
export const site = {
  name: 'RUMBO',
  tagline: 'Preparación de Admisión',
  /** Formato internacional sin signos: 51 + número. */
  whatsapp: '51984368710',
  /** El mismo número, escrito para leerse. */
  whatsappPretty: '+51 984 368 710',
  email: 'hola@rumbo.pe',
  instagram: 'https://instagram.com/',
  tiktok: 'https://tiktok.com/',
};

/** Enlace de WhatsApp con el mensaje ya escrito, según lo que mire el visitante. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
