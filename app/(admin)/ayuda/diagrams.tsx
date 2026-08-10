/**
 * Las infografías de la ayuda.
 *
 * Son SVG escritos a mano, no imágenes: heredan los colores del tema, se leen
 * en modo claro y oscuro, escalan sin pixelarse y pesan nada.
 *
 * ⚠️ El relleno y el trazo van siempre por `style`, nunca como atributo: dentro
 * de un atributo SVG (`fill="var(--sky)"`) las variables CSS no se sustituyen y
 * el dibujo sale en negro.
 */

const LINE = 'rgba(var(--fg-rgb),.22)';
const DIM = 'rgba(var(--fg-rgb),.55)';

function Box({
  x,
  y,
  w = 150,
  h = 54,
  title,
  sub,
  accent = 'var(--sky)',
  dashed = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  title: string;
  sub?: string;
  accent?: string;
  dashed?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={11}
        strokeWidth={1.4}
        strokeDasharray={dashed ? '5 4' : undefined}
        style={{ fill: `color-mix(in srgb, ${accent} 12%, transparent)`, stroke: accent }}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 3 : y + h / 2 + 4}
        textAnchor="middle"
        fontSize={12.5}
        fontWeight={700}
        style={{ fill: 'currentColor' }}
      >
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" fontSize={10.5} style={{ fill: DIM }}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({
  from,
  to,
  label,
  dashed = false,
  tip,
}: {
  from: [number, number];
  to: [number, number];
  label?: string;
  dashed?: boolean;
  tip: string;
}) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        strokeWidth={1.6}
        strokeDasharray={dashed ? '4 4' : undefined}
        markerEnd={`url(#${tip})`}
        style={{ stroke: LINE }}
      />
      {label && (
        <text
          x={(x1 + x2) / 2}
          y={(y1 + y2) / 2 - 7}
          textAnchor="middle"
          fontSize={10}
          style={{ fill: DIM }}
        >
          {label}
        </text>
      )}
    </g>
  );
}

function Defs({ tip }: { tip: string }) {
  return (
    <defs>
      <marker id={tip} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" style={{ fill: LINE }} />
      </marker>
    </defs>
  );
}

/** Envoltura común: ancho fijo, escala fluida, scroll si no cabe. */
function Canvas({
  w,
  h,
  tip,
  children,
}: {
  w: number;
  h: number;
  tip: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ overflowX: 'auto', margin: '18px 0' }}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        style={{ minWidth: Math.min(w, 640), height: 'auto', color: 'var(--paper)' }}
        role="img"
      >
        <Defs tip={tip} />
        {children}
      </svg>
    </div>
  );
}

/* ══ 1 · el sistema de un vistazo ═══════════════════════════════════════ */

export function SystemMap() {
  return (
    <Canvas w={860} h={330} tip="tip-sys">
      <text x={10} y={18} fontSize={11} fontWeight={700} style={{ fill: DIM }}>
        LO PÚBLICO
      </text>
      <Box x={10} y={30} w={180} title="Landing" sub="/ · vende y capta" accent="var(--mint)" />
      <Box x={10} y={100} w={180} title="Registro / Login" sub="/registro · /login" accent="var(--mint)" />

      <text x={250} y={18} fontSize={11} fontWeight={700} style={{ fill: DIM }}>
        LO DEL ALUMNO
      </text>
      <Box x={250} y={30} w={180} title="Itinerario" sub="/app" accent="var(--sky)" />
      <Box x={250} y={100} w={180} title="Clase visual" sub="/app/clase/…" accent="var(--sky)" />
      <Box x={250} y={170} w={180} title="Práctica y simulacro" sub="/app/sesion/…" accent="var(--sky)" />
      <Box x={250} y={240} w={180} title="Resultados" sub="/app/resultados/…" accent="var(--sky)" />

      <text x={490} y={18} fontSize={11} fontWeight={700} style={{ fill: DIM }}>
        TU PANEL
      </text>
      <Box x={490} y={30} w={170} title="Torre de control" sub="/panel" accent="var(--amber)" />
      <Box x={490} y={100} w={170} title="Alumnos" sub="/alumnos · accesos" accent="var(--amber)" />
      <Box x={490} y={170} w={170} title="Balotario y Clases" sub="el contenido" accent="var(--amber)" />
      <Box x={490} y={240} w={170} title="Idiomas y Calibración" sub="ajuste fino" accent="var(--amber)" />

      <text x={710} y={18} fontSize={11} fontWeight={700} style={{ fill: DIM }}>
        DEBAJO
      </text>
      <Box x={700} y={100} w={150} h={124} title="Neon" sub="Postgres + Auth" accent="var(--coral)" />

      <Arrow from={[190, 57]} to={[248, 57]} tip="tip-sys" />
      <Arrow from={[100, 84]} to={[100, 98]} tip="tip-sys" />
      <Arrow from={[190, 127]} to={[248, 57]} label="entra" tip="tip-sys" />
      <Arrow from={[340, 84]} to={[340, 98]} tip="tip-sys" />
      <Arrow from={[340, 154]} to={[340, 168]} tip="tip-sys" />
      <Arrow from={[340, 224]} to={[340, 238]} tip="tip-sys" />
      <Arrow from={[430, 267]} to={[430, 60]} dashed label="repaso" tip="tip-sys" />
      <Arrow from={[660, 127]} to={[698, 140]} tip="tip-sys" />
      <Arrow from={[660, 197]} to={[698, 165]} tip="tip-sys" />
      <Arrow from={[430, 197]} to={[488, 197]} dashed tip="tip-sys" />
    </Canvas>
  );
}

/* ══ 2 · registro ═══════════════════════════════════════════════════════ */

export function SignupFlow() {
  return (
    <Canvas w={880} h={420} tip="tip-signup">
      <Box x={10} y={20} w={170} title="Llega a la landing" sub="lee, prueba la demo" accent="var(--mint)" />
      <Arrow from={[180, 47]} to={[238, 47]} tip="tip-signup" />
      <Box x={240} y={20} w={170} title="Pulsa «Crear cuenta»" sub="/registro" accent="var(--mint)" />
      <Arrow from={[325, 74]} to={[325, 108]} tip="tip-signup" />

      <Box x={190} y={110} w={270} h={74} title="Llena la ficha" sub="nombre · colegio · institución · fecha · correo · clave" accent="var(--sky)" />
      <Arrow from={[325, 184]} to={[325, 218]} tip="tip-signup" />

      <Box x={190} y={220} w={270} title="Neon Auth crea el usuario" sub="guarda la clave, nunca la vemos" accent="var(--coral)" />

      <Arrow from={[190, 247]} to={[130, 247]} label="sin token" tip="tip-signup" />
      <Box x={10} y={220} w={120} h={74} title="Verificar correo" sub="revisa su bandeja" accent="var(--amber)" dashed />
      <Arrow from={[70, 294]} to={[70, 330]} tip="tip-signup" />

      <Arrow from={[460, 247]} to={[520, 247]} label="con token" tip="tip-signup" />
      <Box x={520} y={220} w={180} title="Se crea su perfil" sub="tabla profiles · rol alumno" accent="var(--sky)" />
      <Arrow from={[610, 274]} to={[610, 330]} tip="tip-signup" />

      <Box x={10} y={332} w={120} h={64} title="Entra al hacer clic" sub="desde el correo" accent="var(--sky)" />
      <Box x={520} y={332} w={180} h={64} title="Aterriza en /app" sub="con el módulo de muestra" accent="var(--mint)" />
      <Arrow from={[130, 364]} to={[518, 364]} dashed tip="tip-signup" />

      <Box x={720} y={20} w={150} h={120} title="Enlace mágico" sub="alternativa sin clave: llega un correo y entra directo" accent="var(--amber)" dashed />
      <Arrow from={[720, 80]} to={[412, 47]} dashed tip="tip-signup" />
    </Canvas>
  );
}

/* ══ 3 · roles ══════════════════════════════════════════════════════════ */

export function RolesMap() {
  const rows = [
    ['Itinerario y práctica', true, true, false],
    ['Clases visuales', true, true, false],
    ['Simulacros', true, true, false],
    ['Sus propios resultados', true, true, false],
    ['Resultados de otro alumno', false, true, true],
    ['Crear y publicar preguntas', false, true, false],
    ['Abrir y cerrar módulos', false, true, false],
    ['Editar traducciones', false, true, false],
  ];
  return (
    <div style={{ overflowX: 'auto', margin: '18px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 520 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: 12.5, color: 'var(--paper-dim)' }}>
              Qué puede hacer
            </th>
            {['Alumno', 'Administrador', 'Apoderado'].map((role) => (
              <th
                key={role}
                style={{
                  padding: '10px 14px',
                  fontSize: 13,
                  borderBottom: '1px solid var(--line)',
                }}
              >
                {role}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, ...cells]) => (
            <tr key={String(label)}>
              <td
                style={{
                  padding: '10px 14px',
                  fontSize: 14,
                  color: 'var(--paper-dim)',
                  borderTop: '1px solid var(--line)',
                }}
              >
                {label}
              </td>
              {cells.map((on, i) => (
                <td
                  key={i}
                  style={{
                    padding: '10px 14px',
                    textAlign: 'center',
                    borderTop: '1px solid var(--line)',
                    color: on ? 'var(--mint)' : 'rgba(var(--fg-rgb),.3)',
                    fontWeight: 700,
                  }}
                >
                  {on ? '✓' : '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ══ 4 · acceso a un módulo ═════════════════════════════════════════════ */

export function AccessFlow() {
  return (
    <Canvas w={860} h={300} tip="tip-access">
      <Box x={10} y={30} w={165} title="Ve el candado" sub="terminó la muestra" accent="var(--coral)" />
      <Arrow from={[175, 57]} to={[233, 57]} tip="tip-access" />
      <Box x={235} y={30} w={165} title="Escribe por WhatsApp" sub="el botón lo lleva" accent="var(--mint)" />
      <Arrow from={[400, 57]} to={[458, 57]} tip="tip-access" />
      <Box x={460} y={30} w={165} title="Paga" sub="Yape · Plin · transferencia" accent="var(--mint)" />
      <Arrow from={[625, 57]} to={[683, 57]} tip="tip-access" />
      <Box x={685} y={30} w={165} title="Confirmas tú" sub="revisas el pago" accent="var(--amber)" />

      <Arrow from={[767, 84]} to={[767, 126]} tip="tip-access" />
      <Box x={600} y={128} w={250} h={64} title="/alumnos → abres el módulo" sub="un clic en «Abrir» junto al área" accent="var(--amber)" />
      <Arrow from={[600, 160]} to={[418, 160]} tip="tip-access" />
      <Box x={240} y={128} w={175} h={64} title="Se crea el permiso" sub="tabla entitlements" accent="var(--coral)" />
      <Arrow from={[327, 192]} to={[327, 230]} tip="tip-access" />
      <Box x={190} y={232} w={280} h={58} title="El alumno ve el módulo abierto" sub="sin volver a entrar: basta con recargar" accent="var(--sky)" />
    </Canvas>
  );
}

/* ══ 5 · ciclo del contenido ════════════════════════════════════════════ */

export function ContentCycle() {
  return (
    <Canvas w={860} h={250} tip="tip-content">
      <Box x={10} y={90} w={150} title="Capítulo" sub="ya existe en la base" accent="var(--amber)" />
      <Arrow from={[160, 117]} to={[218, 117]} tip="tip-content" />
      <Box x={220} y={90} w={150} title="Clase visual" sub="/clases · bloques" accent="var(--sky)" />
      <Arrow from={[370, 117]} to={[428, 117]} tip="tip-content" />
      <Box x={430} y={90} w={150} title="Preguntas" sub="/balotario" accent="var(--sky)" />
      <Arrow from={[580, 117]} to={[638, 117]} tip="tip-content" />
      <Box x={640} y={90} w={150} title="Publicar" sub="pasa a estado «published»" accent="var(--mint)" />

      <Box x={220} y={10} w={150} h={48} title="Borrador" sub="solo lo ves tú" accent="var(--coral)" dashed />
      <Arrow from={[295, 58]} to={[295, 88]} dashed tip="tip-content" />

      <Box x={430} y={180} w={150} h={48} title="Calibración" sub="qué pregunta falla todo el mundo" accent="var(--amber)" dashed />
      <Arrow from={[505, 144]} to={[505, 178]} dashed tip="tip-content" />
      <Arrow from={[430, 204]} to={[300, 204]} dashed label="corriges y vuelves" tip="tip-content" />
      <Arrow from={[295, 180]} to={[295, 146]} dashed tip="tip-content" />
    </Canvas>
  );
}

/* ══ 6 · la regla de oro ════════════════════════════════════════════════ */

export function GoldenRule() {
  return (
    <Canvas w={860} h={260} tip="tip-golden">
      <text x={10} y={16} fontSize={11} fontWeight={700} style={{ fill: DIM }}>
        NAVEGADOR DEL ALUMNO
      </text>
      <rect x={10} y={24} width={380} height={210} rx={13} strokeDasharray="6 5" style={{ fill: 'none', stroke: LINE }} />
      <Box x={30} y={44} w={160} title="Enunciado" accent="var(--sky)" />
      <Box x={210} y={44} w={160} title="Alternativas" accent="var(--sky)" />
      <Box x={30} y={120} w={340} h={44} title="Respuesta correcta · pasos · truco" accent="var(--coral)" dashed />
      <text x={200} y={190} textAnchor="middle" fontSize={11.5}  fontWeight={700} style={{ fill: 'var(--coral)' }}>
        no viajan hasta que el alumno responde
      </text>

      <Arrow from={[392, 130]} to={[452, 130]} label="POST" tip="tip-golden" />

      <text x={470} y={16} fontSize={11} fontWeight={700} style={{ fill: DIM }}>
        SERVIDOR
      </text>
      <rect x={455} y={24} width={395} height={210} rx={13} style={{ fill: 'none', stroke: LINE }} />
      <Box x={475} y={44} w={170} title="/api/answer" sub="compara y decide" accent="var(--amber)" />
      <Box x={665} y={44} w={170} title="Guarda el intento" sub="acierto · segundos" accent="var(--amber)" />
      <Box x={475} y={130} w={170} title="Programa el repaso" sub="si falló" accent="var(--mint)" />
      <Box x={665} y={130} w={170} title="Devuelve la solución" sub="ahora sí" accent="var(--mint)" />
      <Arrow from={[645, 71]} to={[663, 71]} tip="tip-golden" />
      <Arrow from={[560, 98]} to={[560, 128]} tip="tip-golden" />
      <Arrow from={[645, 157]} to={[663, 157]} tip="tip-golden" />
      <Arrow from={[750, 184]} to={[392, 184]} label="con la resolución" tip="tip-golden" />
    </Canvas>
  );
}

/* ══ 7 · repetición espaciada ═══════════════════════════════════════════ */

export function SpacedRepetition() {
  const days = [1, 3, 7, 21];
  return (
    <Canvas w={860} h={190} tip="tip-spaced">
      <line x1={40} y1={110} x2={820} y2={110} strokeWidth={1.6} style={{ stroke: LINE }} />
      <circle cx={40} cy={110} r={7} style={{ fill: 'var(--coral)' }} />
      <text x={40} y={140} textAnchor="middle" fontSize={11.5} fontWeight={700}  style={{ fill: 'var(--coral)' }}>
        falla
      </text>
      <text x={40} y={156} textAnchor="middle" fontSize={10.5} style={{ fill: DIM }}>
        hoy
      </text>
      {days.map((d, i) => {
        const x = 40 + ((i + 1) * 780) / 4;
        return (
          <g key={d}>
            <circle cx={x} cy={110} r={7} style={{ fill: 'var(--mint)' }} />
            <text x={x} y={140} textAnchor="middle" fontSize={11.5} fontWeight={700} style={{ fill: 'currentColor' }}>
              día {d}
            </text>
            <text x={x} y={156} textAnchor="middle" fontSize={10.5} style={{ fill: DIM }}>
              vuelve a salir
            </text>
            <rect
              x={x - 44}
              y={40}
              width={88}
              height={40}
              rx={9}
              strokeWidth={1.2}
              style={{
                fill: 'color-mix(in srgb, var(--mint) 12%, transparent)',
                stroke: 'var(--mint)',
              }}
            />
            <text x={x} y={65} textAnchor="middle" fontSize={11.5} style={{ fill: 'currentColor' }}>
              {i === 3 ? 'aprendida' : 'repaso'}
            </text>
          </g>
        );
      })}
      <text x={40} y={30} fontSize={11.5} style={{ fill: DIM }}>
        Si vuelve a fallar en cualquier punto, el reloj se reinicia en el día 1.
      </text>
    </Canvas>
  );
}

/* ══ 8 · idiomas ════════════════════════════════════════════════════════ */

export function LanguageFlow() {
  return (
    <Canvas w={860} h={280} tip="tip-lang">
      <Box x={10} y={20} w={190} h={60} title="Botones ES · EN · PT" sub="en la barra de arriba" accent="var(--mint)" />
      <Arrow from={[105, 80]} to={[105, 116]} tip="tip-lang" />
      <Box x={10} y={118} w={190} h={60} title="Cookie + perfil" sub="la elección se recuerda" accent="var(--coral)" />

      <Arrow from={[200, 148]} to={[258, 100]} tip="tip-lang" />
      <Arrow from={[200, 148]} to={[258, 200]} tip="tip-lang" />

      <Box x={260} y={72} w={230} h={62} title="Textos de la interfaz" sub="botones, títulos, avisos" accent="var(--sky)" />
      <Box x={260} y={172} w={230} h={62} title="Contenido de la base" sub="módulos, capítulos, clases, preguntas" accent="var(--sky)" />

      <Arrow from={[490, 103]} to={[548, 103]} tip="tip-lang" />
      <Box x={550} y={72} w={300} h={62} title="Los tres diccionarios del repositorio" sub="lib/i18n/dictionaries · se editan con código" accent="var(--amber)" />

      <Arrow from={[490, 203]} to={[548, 203]} tip="tip-lang" />
      <Box x={550} y={172} w={300} h={62} title="Columna i18n de cada tabla" sub="se edita en /traducciones, sin tocar código" accent="var(--amber)" />

      <text x={10} y={262} fontSize={11.5} style={{ fill: DIM }}>
        Si falta una traducción, el alumno ve el español. Nunca un hueco ni un texto en clave.
      </text>
    </Canvas>
  );
}
