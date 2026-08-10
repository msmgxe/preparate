/**
 * Las fotos de la página de venta.
 *
 * Viven en `public/fotos/`. Ahí conviven dos cosas: los originales que bajas
 * —de varios megas— y estas versiones, redimensionadas a 900 px de ancho y
 * recomprimidas, que son las únicas que se suben al repositorio. El `.gitignore`
 * está montado justo así: ignora la carpeta entera menos los `rumbo-*.jpg`.
 *
 * Para cambiar una foto: deja el original en la carpeta, genera su versión con
 *
 *   sips --resampleWidth 900 -s format jpeg -s formatOptions 78 ORIGINAL --out rumbo-NOMBRE.jpg
 *
 * y ya está: el nombre no cambia, así que no hay que tocar código.
 *
 * Procedencia, por si algún día hay que justificarla: las cuatro `pexels-…`
 * vienen de Pexels y las tres `photo-…` de Unsplash, las dos con licencia libre
 * para uso comercial y sin atribución obligatoria. Se descartaron las de Envato
 * y las de iStock que había antes en la carpeta: las primeras traían la marca
 * de agua incrustada y las segundas eran comps de 612 px, que ni se pueden usar
 * ni tienen resolución para un hero.
 */
export const PHOTO = {
  hero: '/fotos/rumbo-hero.jpg',
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

/**
 * El retrato grande del hero, con las dos tarjetas que flotan encima.
 *
 * Las tarjetas no llevan métricas: llevan hechos del método. Un «7 días de
 * racha» o un «78 % de precisión» quedan muy bien en una maqueta y son
 * inventados, y esto es una página que la gente lee antes de pagar.
 */
export function HeroShot({
  alt,
  caption,
  cards,
}: {
  alt: string;
  caption: string;
  cards: [{ l: string; v: string }, { l: string; v: string }];
}) {
  return (
    <div className="lp-shot">
      <figure className="lp-shot-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={PHOTO.hero} alt={alt} width={900} height={1350} />
        <figcaption className="lp-shot-cap">{caption}</figcaption>
      </figure>

      <div className="lp-float lp-float-1">
        <span className="l">{cards[0].l}</span>
        <b className="v">{cards[0].v}</b>
      </div>
      <div className="lp-float lp-float-2">
        <span className="l">{cards[1].l}</span>
        <b className="v">{cards[1].v}</b>
      </div>
    </div>
  );
}
