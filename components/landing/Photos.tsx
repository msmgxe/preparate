/**
 * Las fotos de la página de venta.
 *
 * Viven en `public/fotos/`. Ahí conviven los originales que descargas —de
 * varios megas— y estas versiones recortadas y recomprimidas, que son las
 * únicas que se suben: el `.gitignore` ignora la carpeta entera menos los
 * `rumbo-*.jpg`.
 *
 * Los recortes no se hacen con `object-position`. Cada foto se recorta de
 * verdad, a su formato final, con `scripts/fotos.py`; así el navegador no
 * descarga píxeles que el marco esconde. Si un recorte deja a alguien a
 * medias, se mueve el punto de interés en ese script y se vuelve a correr.
 *
 * Procedencia: `pexels-…` de Pexels y `photo-…` de Unsplash, las dos con
 * licencia libre para uso comercial y sin atribución obligatoria.
 */
export const PHOTO = {
  heroA: '/fotos/rumbo-hero-a.jpg',
  heroB: '/fotos/rumbo-hero-b.jpg',
  pasos: [
    '/fotos/rumbo-paso-clase.jpg',
    '/fotos/rumbo-paso-practica.jpg',
    '/fotos/rumbo-paso-repaso.jpg',
  ],
  casos: [
    '/fotos/rumbo-caso-asegurar.jpg',
    '/fotos/rumbo-caso-orden.jpg',
    '/fotos/rumbo-caso-grupo.jpg',
  ],
};

/** Uno de los dos retratos que flanquean el titular. */
export function Portrait({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="lp-portrait">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={1000} height={1250} loading="eager" fetchPriority="high" />
    </figure>
  );
}
