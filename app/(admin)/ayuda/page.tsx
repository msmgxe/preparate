import Link from 'next/link';
import type { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth';
import {
  AccessFlow,
  ContentCycle,
  GoldenRule,
  LanguageFlow,
  RolesMap,
  SignupFlow,
  SpacedRepetition,
  SystemMap,
} from './diagrams';

export const metadata: Metadata = { title: 'Ayuda · RUMBO' };
export const dynamic = 'force-dynamic';

/** Índice lateral: los mismos títulos que las secciones de abajo. */
const INDEX = [
  ['sistema', 'El sistema de un vistazo'],
  ['registro', 'Cómo se registra un alumno'],
  ['roles', 'Quién puede hacer qué'],
  ['acceso', 'Cómo se abre un módulo pagado'],
  ['contenido', 'El ciclo del contenido'],
  ['correccion', 'Cómo se corrige (y por qué no se puede hacer trampa)'],
  ['bitacora', 'La bitácora de errores'],
  ['idiomas', 'Los tres idiomas'],
  ['recetas', 'Recetas: las tareas de cada día'],
  ['problemas', 'Cuando algo no cuadra'],
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} style={{ scrollMarginTop: 90 }}>
      <div className="shead">
        <h2>{title}</h2>
        <div className="rule" />
      </div>
      {children}
    </section>
  );
}

/** Un paso numerado dentro de una receta. */
function Steps({ items }: { items: React.ReactNode[] }) {
  return (
    <ol style={{ display: 'grid', gap: 10, margin: '14px 0 0', paddingLeft: 0, listStyle: 'none' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span
            style={{
              flex: 'none',
              width: 23,
              height: 23,
              borderRadius: 7,
              display: 'grid',
              placeContent: 'center',
              background: 'rgba(var(--fg-rgb),.07)',
              border: '1px solid var(--line)',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {i + 1}
          </span>
          <span style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--paper-dim)' }}>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        marginTop: 16,
        padding: '15px 18px',
        borderRadius: 12,
        borderLeft: '3px solid var(--amber)',
        background: 'rgba(var(--fg-rgb),.04)',
      }}
    >
      <div className="eyebrow" style={{ color: 'var(--amber)' }}>
        {title}
      </div>
      <p style={{ fontSize: 14.5, marginTop: 7, lineHeight: 1.6, color: 'var(--paper-dim)' }}>
        {children}
      </p>
    </div>
  );
}

const P: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.7,
  marginTop: 14,
  color: 'var(--paper-dim)',
  maxWidth: '72ch',
};

export default async function AyudaPage() {
  await requireAdmin();

  return (
    <>
      <section style={{ marginTop: 26 }}>
        <span className="eyebrow">Manual</span>
        <h1 style={{ marginTop: 10 }}>Cómo funciona RUMBO por dentro</h1>
        <p style={{ ...P, fontSize: 18 }}>
          Esta página es el mapa completo: qué le pasa a un alumno desde que llega a la página de
          venta hasta que rinde un simulacro, y qué haces tú en cada punto. Está pensada para
          leerse una vez de corrido y volver luego a la receta que haga falta.
        </p>
      </section>

      {/* ── índice ─────────────────────────────────────────────────────── */}
      <nav
        style={{
          marginTop: 26,
          padding: '18px 22px',
          borderRadius: 14,
          border: '1px solid var(--line)',
          background: 'rgba(var(--fg-rgb),.03)',
        }}
      >
        <div className="eyebrow">En esta página</div>
        <ol
          style={{
            marginTop: 12,
            display: 'grid',
            gap: 8,
            gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
            paddingLeft: 18,
            fontSize: 14.5,
          }}
        >
          {INDEX.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} style={{ color: 'var(--sky)' }}>
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* ══ 1 ══════════════════════════════════════════════════════════ */}
      <Section id="sistema" title="El sistema de un vistazo">
        <p style={P}>
          RUMBO son cuatro piezas. La <b>landing</b> es pública y vende. La <b>app del alumno</b>{' '}
          vive detrás del acceso y es donde se estudia. Tu <b>panel</b> es donde se crea el
          contenido y se abren los accesos. Y debajo de todo está <b>Neon</b>, que guarda tanto los
          datos como las cuentas.
        </p>
        <SystemMap />
        <p style={P}>
          Nada de lo que hay en tu panel es visible para un alumno, ni siquiera cambiando la
          dirección a mano: cada página vuelve a comprobar el rol en el servidor antes de responder.
        </p>
      </Section>

      {/* ══ 2 ══════════════════════════════════════════════════════════ */}
      <Section id="registro" title="Cómo se registra un alumno">
        <p style={P}>
          El registro tiene un solo formulario y no pide nada que no se use. El nombre y el colegio
          aparecen en su pasaporte; la institución objetivo y la fecha del examen alimentan la
          cuenta regresiva del itinerario.
        </p>
        <SignupFlow />
        <p style={P}>
          El detalle que más confunde es la bifurcación del centro. Neon Auth puede pedir que
          verifique el correo antes de dejarlo entrar. Si lo pide, no hay sesión todavía y el alumno
          ve un aviso de «revisa tu correo»; su perfil se crea cuando hace clic en ese enlace. Si no
          lo pide, entra directo y el perfil se crea en el acto.
        </p>
        <Note title="Si el correo no llega">
          Casi siempre está en spam o en «Promociones». Como alternativa, en la misma pantalla hay
          un enlace mágico: se escribe el correo, llega un enlace y entra sin contraseña. Es la
          salida rápida cuando alguien te escribe por WhatsApp diciendo que no puede entrar.
        </Note>
        <p style={P}>
          Todo alumno nuevo entra con el <b>modo muestra</b>: puede practicar unas pocas preguntas
          de cada módulo y leer la primera clase. Es a propósito — es lo que le deja comprobar si el
          método le sirve antes de que nadie pague.
        </p>
      </Section>

      {/* ══ 3 ══════════════════════════════════════════════════════════ */}
      <Section id="roles" title="Quién puede hacer qué">
        <p style={P}>
          Hay tres roles. <b>Alumno</b> es el que se asigna solo al registrarse. <b>Administrador</b>{' '}
          eres tú. <b>Apoderado</b> es un padre que solo mira el avance de su hijo, sin poder tocar
          contenido.
        </p>
        <RolesMap />
        <Note title="Para hacer administrador a alguien">
          Se cambia el rol en la base de datos, no desde la interfaz. Es deliberado: un botón de
          «hazme administrador» es exactamente la clase de cosa que no conviene tener a mano.
        </Note>
      </Section>

      {/* ══ 4 ══════════════════════════════════════════════════════════ */}
      <Section id="acceso" title="Cómo se abre un módulo pagado">
        <p style={P}>
          El cobro es manual y por WhatsApp, así que el sistema no sabe si alguien pagó: se lo dices
          tú. El circuito completo es este.
        </p>
        <AccessFlow />
        <Steps
          items={[
            <>
              Entra en <Link href="/alumnos">Alumnos</Link> y abre la ficha del alumno.
            </>,
            'Busca el bloque de accesos: hay una fila por módulo, con su estado.',
            'Pulsa «Abrir» en el módulo que pagó. Si compró un plan completo, ábrelos todos.',
            'Avísale por WhatsApp. Le basta con recargar: no tiene que volver a entrar.',
          ]}
        />
        <p style={P}>
          Cerrar un módulo es el mismo botón al revés. El alumno no pierde nada de lo que ya hizo:
          sus intentos, su racha y su bitácora siguen intactos; solo deja de ver el contenido nuevo.
        </p>
      </Section>

      {/* ══ 5 ══════════════════════════════════════════════════════════ */}
      <Section id="contenido" title="El ciclo del contenido">
        <p style={P}>
          Cada capítulo sigue siempre la misma secuencia: primero la clase visual, después las
          preguntas. Esa repetición es parte del método, no una casualidad de cómo está montado.
        </p>
        <ContentCycle />
        <p style={P}>
          Todo nace en estado <b>borrador</b>, que solo ves tú. Un borrador es invisible para los
          alumnos aunque conozcan la dirección exacta. Solo cuando lo pasas a <b>publicado</b>{' '}
          aparece en el itinerario y entra en el sorteo de las sesiones de práctica.
        </p>
        <Steps
          items={[
            <>
              En <Link href="/clases">Clases</Link>, crea la clase del capítulo y arma sus bloques:
              texto, infografía, fórmula, checkpoint y errores frecuentes.
            </>,
            <>
              En <Link href="/balotario">Balotario</Link>, escribe las preguntas de ese capítulo.
              Cada alternativa incorrecta debe corresponder a un error de razonamiento concreto.
            </>,
            'Rellena siempre los pasos de la resolución, el concepto clave y el truco: es lo que el alumno ve al fallar, y es la mitad del valor del producto.',
            'Publica. Revisa el itinerario como alumno para comprobar que aparece donde esperabas.',
          ]}
        />
        <Note title="El generador con IA">
          En el balotario hay un botón para redactar borradores automáticamente. Salen borradores,
          nunca publicados: la idea es que te ahorre el folio en blanco, no que publique por ti.
          Léelos siempre antes de publicar.
        </Note>
      </Section>

      {/* ══ 6 ══════════════════════════════════════════════════════════ */}
      <Section id="correccion" title="Cómo se corrige (y por qué no se puede hacer trampa)">
        <p style={P}>
          Esta es la decisión técnica más importante de todo el producto, y conviene que la
          entiendas porque condiciona lo demás: <b>la respuesta correcta nunca llega al navegador
          del alumno antes de que responda</b>. No está escondida en el código de la página, no
          viaja en un campo oculto. Sencillamente no se envía.
        </p>
        <GoldenRule />
        <p style={P}>
          Cuando el alumno elige una alternativa, su navegador manda solo el número que eligió. El
          servidor compara, guarda el intento con los segundos que tardó, programa el repaso si
          falló y recién entonces devuelve la resolución. Un alumno que abra las herramientas del
          navegador y mire el código no encontrará nada.
        </p>
        <p style={P}>
          En modo simulacro ni siquiera eso: no hay corrección hasta entregar, igual que en el
          examen real.
        </p>
      </Section>

      {/* ══ 7 ══════════════════════════════════════════════════════════ */}
      <Section id="bitacora" title="La bitácora de errores">
        <p style={P}>
          Lo que el alumno falla no se pierde: vuelve programado. El sistema lo reprograma solo,
          siguiendo los intervalos que mejor funcionan para memorizar a largo plazo.
        </p>
        <SpacedRepetition />
        <p style={P}>
          En el itinerario, la tarjeta «Repaso inteligente» le dice cuántas preguntas le tocan hoy.
          Es la parte del producto que más resultados da y la que menos se nota: no hay nada que
          configurar.
        </p>
      </Section>

      {/* ══ 8 ══════════════════════════════════════════════════════════ */}
      <Section id="idiomas" title="Los tres idiomas">
        <p style={P}>
          La plataforma habla español, inglés y portugués. El alumno cambia con los botones de la
          barra de arriba y la elección se recuerda tanto en su navegador como en su perfil.
        </p>
        <LanguageFlow />
        <p style={P}>
          Hay dos clases de texto y se editan en sitios distintos. Los <b>rótulos de la interfaz</b>{' '}
          —botones, títulos, avisos— viven en el repositorio y se cambian con código. El{' '}
          <b>contenido</b> —módulos, capítulos, clases, preguntas, planes— vive en la base y se
          traduce desde <Link href="/traducciones">Idiomas</Link>, sin tocar nada.
        </p>
        <p style={P}>
          El español es el original y hace de red de seguridad: si un campo no está traducido, el
          alumno ve el español. Nunca verá un hueco ni un texto en clave.
        </p>
        <Note title="Los pasos y los bloques de clase">
          Los pasos de una resolución y los bloques de una clase son estructuras anidadas, y
          traducirlas en un formulario genérico se rompe con facilidad. Esas viven en{' '}
          <code>docs/i18n-content.ts</code> y se aplican con <code>npm run db:i18n</code>.
        </Note>
        <p style={P}>
          Los <b>precios</b> también cambian de aspecto: en inglés se ven en dólares y en
          portugués en reales, redondeados. Es solo la etiqueta — el cobro siempre se hace en
          soles, porque es la cuenta a la que llega el Yape, y la propia página lo dice donde se
          muestran los precios. Los tipos de cambio están fijos en{' '}
          <code>lib/money.ts</code> y conviene revisarlos cada cierto tiempo; están puestos con
          holgura a la baja, así que si el sol se aprecia cobras un poco más de lo anunciado, no
          menos.
        </p>
        <p style={P}>
          El módulo de Inglés se ofrece solo en español: sus explicaciones están escritas para
          alguien que piensa en español. Por eso desaparece del itinerario y de la página de venta
          cuando el idioma elegido es otro.
        </p>
      </Section>

      {/* ══ 9 ══════════════════════════════════════════════════════════ */}
      <Section id="recetas" title="Recetas: las tareas de cada día">
        <div className="lp-grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', marginTop: 18, gap: 16 }}>
          {[
            {
              t: 'Alguien pagó y quiere entrar',
              s: [
                'Confirma el pago en tu Yape o tu cuenta.',
                'Alumnos → su ficha → «Abrir» en los módulos que compró.',
                'Avísale que recargue la página.',
              ],
            },
            {
              t: 'Un alumno no puede entrar',
              s: [
                'Pídele que revise spam y «Promociones».',
                'Si no aparece, que use el enlace mágico de la pantalla de acceso.',
                'Comprueba en Alumnos que su correo está bien escrito.',
              ],
            },
            {
              t: 'Publicar un capítulo nuevo',
              s: [
                'Clases → crea la clase y sus bloques.',
                'Balotario → escribe las preguntas con su resolución completa.',
                'Publica ambas cosas y revisa el itinerario como alumno.',
              ],
            },
            {
              t: 'Una pregunta está mal',
              s: [
                'Calibración te muestra las que casi nadie acierta.',
                'Ábrela en Balotario y corrígela, o pásala a borrador.',
                'Un borrador deja de salir en sesiones nuevas al instante.',
              ],
            },
            {
              t: 'Traducir contenido nuevo',
              s: [
                'Idiomas → elige inglés o portugués.',
                'Elige el grupo (módulos, capítulos, clases, preguntas, planes).',
                'Los que llevan un punto en vez de un check están sin traducir.',
              ],
            },
            {
              t: 'Cambiar precios o planes',
              s: [
                'Los planes viven en la tabla plans de la base, siempre en soles.',
                'La landing los lee en vivo: no hay que volver a desplegar.',
                'El dólar y el real salen de un tipo de cambio fijo en lib/money.ts.',
                'Acuérdate de traducir el plan nuevo en Idiomas.',
              ],
            },
          ].map((card) => (
            <div key={card.t} className="qcard" style={{ padding: 20 }}>
              <b style={{ fontSize: 16 }}>{card.t}</b>
              <ol style={{ marginTop: 12, paddingLeft: 18, display: 'grid', gap: 7 }}>
                {card.s.map((step, i) => (
                  <li key={i} style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--paper-dim)' }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ 10 ═════════════════════════════════════════════════════════ */}
      <Section id="problemas" title="Cuando algo no cuadra">
        <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
          {[
            [
              'Publiqué una pregunta y no sale en la práctica',
              'Comprueba que el estado sea «publicado» y que esté en el capítulo correcto. Una sesión toma hasta 10 preguntas al azar del capítulo: si hay muchas, puede tocar en la siguiente.',
            ],
            [
              'El alumno dice que no ve el módulo que pagó',
              'Mira su ficha en Alumnos. Si el acceso figura abierto, pídele que recargue. Si sigue igual, que cierre sesión y vuelva a entrar.',
            ],
            [
              'La cuenta regresiva del itinerario dice que no hay fecha',
              'El alumno no puso la fecha del examen al registrarse. Puede ponerla en «Editar mi ficha», dentro de su perfil.',
            ],
            [
              'Cambié un texto en Idiomas y no se ve',
              'Recarga la página del alumno. Si sigue en español, es que ese campo quedó vacío al guardar: el español es el respaldo, así que un campo vacío se ve como el original.',
            ],
            [
              'Una infografía no aparece en la clase',
              'El bloque apunta a un identificador de dibujo que no existe. El propio bloque te lo dice con el nombre que falta.',
            ],
          ].map(([q, a]) => (
            <details key={q} className="qcardbox" style={{ padding: 0 }}>
              <summary
                style={{
                  cursor: 'pointer',
                  listStyle: 'none',
                  padding: '15px 20px',
                  fontSize: 15.5,
                  fontWeight: 600,
                }}
              >
                {q}
              </summary>
              <p
                style={{
                  padding: '0 20px 18px',
                  fontSize: 14.5,
                  lineHeight: 1.65,
                  color: 'var(--paper-dim)',
                }}
              >
                {a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <footer style={{ marginTop: 40 }}>
        <span>RUMBO · manual del administrador</span>
        <span>·</span>
        <span>se actualiza con el producto</span>
        <Link href="/panel" style={{ marginLeft: 'auto' }}>
          Volver a la torre de control
        </Link>
      </footer>
    </>
  );
}
