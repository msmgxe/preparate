# RUMBO v0.2 · preparate

App web para que alumnos se preparen a un examen de admisión.

Preparación para exámenes de admisión en Perú: itinerario por áreas, práctica por
capítulo con corrección inmediata, simulacros cronometrados, resolución paso a
paso, clases visuales con infografías animadas y panel de acompañamiento.

**Puesta en marcha: [`docs/SETUP.md`](docs/SETUP.md).**

```bash
cp .env.local.example .env.local   # completa DATABASE_URL y Neon Auth
npm install
npm run db:seed                    # esquema + contenido del prototipo
npm run dev
```

## Qué hay

| Área | Rutas |
|---|---|
| Acceso | `/login`, `/registro` (contraseña o enlace mágico) |
| Alumno | `/` itinerario · `/clase/[id]` · `/practica/[capítulo]` · `/simulacro/[perfil]` · `/sesion/[intento]` · `/resultados/[intento]` · `/perfil` |
| Admin | `/panel` · `/alumnos` · `/alumnos/[id]` · `/balotario` · `/balotario/[id]` · `/clases` · `/clases/[id]` · `/calibracion` |
| API | `/api/answer` (califica) · `/api/lesson-view` (telemetría) · `/api/generate` (borradores) |

## Decisiones que conviene no deshacer

- **`answer_index` nunca viaja al navegador antes de responder.** Si se expone en
  el payload inicial, la app se rompe sola el primer día.
- **La clase se bloquea en el checkpoint.** El bloque `check` oculta lo que sigue
  hasta que el alumno responde. Fuerza a ser honesto sobre si está leyendo pasivo.
- **Los videos son enlaces externos, después del checkpoint.** Nada de
  reproductores incrustados: rompen el flujo y meten anuncios. El video es
  refuerzo, no la clase.
- **Las infografías son SVG en línea animados con CSS**, con revelación
  progresiva y botón de repetir. Nada de GIF ni video: pesan más y no escalan.
- **Nada llega a los alumnos sin revisión humana.** Lo que genera la Claude API
  entra siempre como `draft`.
- **El alumno ve los mismos indicadores que ve el admin de él.** Si hay un dato
  que no le mostrarías, probablemente no deberías recolectarlo.

## Paleta con significado fijo

ámbar = el dato · celeste = la operación · verde = el resultado ·
coral = el error o lo que se pierde · violeta = el metanivel.
