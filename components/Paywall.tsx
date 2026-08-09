import Link from 'next/link';
import { whatsappLink } from '@/lib/site';

/**
 * Lo que ve un alumno cuando el módulo no está abierto.
 *
 * No esconde el contenido detrás de un error: dice qué falta, por qué y cómo
 * abrirlo. El pago es manual (Yape o transferencia por WhatsApp), así que el
 * botón lleva a una conversación, no a un checkout.
 */
export function Paywall({
  areaName,
  areaAccent,
  title,
  kind,
}: {
  areaName: string;
  areaAccent: string;
  title?: string;
  kind: 'lesson' | 'exam' | 'practice';
}) {
  const copy = {
    lesson: {
      head: 'Esta clase es parte del módulo completo',
      body: 'Ya leíste la clase de muestra de este módulo. El resto —con sus infografías, checkpoints y errores frecuentes— se abre al activarlo.',
    },
    exam: {
      head: 'Los simulacros necesitan el módulo completo',
      body: 'Un simulacro con solo las preguntas de muestra daría un puntaje que no significa nada. Se abre con el módulo activo.',
    },
    practice: {
      head: 'Has terminado la muestra de este módulo',
      body: 'Las preguntas abiertas están para que compruebes si el método te sirve. El balotario completo se abre al activar el módulo.',
    },
  }[kind];

  return (
    <>
      <Link className="back" href="/app">
        ← Volver al itinerario
      </Link>

      <section style={{ marginTop: 8, maxWidth: 640 }}>
        <span className="eyebrow" style={{ color: areaAccent }}>
          {areaName}
          {title ? ` · ${title}` : ''}
        </span>
        <h1 style={{ marginTop: 12, fontSize: 'clamp(26px,4.2vw,38px)' }}>{copy.head}</h1>
        <p style={{ marginTop: 14, color: '#CFC6B4', fontSize: 17.5, lineHeight: 1.65 }}>
          {copy.body}
        </p>

        <div className="qnav" style={{ marginTop: 28 }}>
          <a
            className="btn solid"
            href={whatsappLink(`Hola, quiero activar el módulo de ${areaName} en RUMBO.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Activar {areaName} →
          </a>
          <Link className="btn sm" href="/#planes">
            Ver todos los planes
          </Link>
        </div>

        <p className="hint" style={{ textAlign: 'left', marginTop: 22 }}>
          Se paga por Yape, Plin o transferencia. El acceso se abre el mismo día.
        </p>
      </section>
    </>
  );
}
