import { Reveal } from './Reveal';

/**
 * La cabecera de una sección: rótulo y título a la izquierda, texto a la
 * derecha.
 *
 * Antes cada sección era un título y debajo un párrafo limitado a 62
 * caracteres. En una pantalla de escritorio eso dejaba la mitad derecha vacía
 * y la página parecía a medio maquetar. Repartirlo en dos columnas llena el
 * ancho sin caer en el otro extremo —una línea de 130 caracteres, que nadie
 * puede seguir con la vista—, porque cada columna conserva su medida corta.
 *
 * Por debajo de 900 px vuelve a ser una sola columna: ahí el ancho ya no sobra.
 */
export function SectionHead({
  eyebrow,
  title,
  body,
  note,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  note?: string;
}) {
  return (
    <Reveal className="lp-shead">
      <div>
        <span className="lp-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {(body || note) && (
        <div className="lp-shead-body">
          {body && <p>{body}</p>}
          {note && <p className="lp-muted lp-shead-note">{note}</p>}
        </div>
      )}
    </Reveal>
  );
}
