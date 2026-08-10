/**
 * El contrato de una pregunta generada.
 *
 * Vive aparte de la ruta de API porque lo usan dos sitios: el botón del panel,
 * que redacta borradores de uno en uno, y el script de siembra, que llena el
 * balotario entero. Una sola definición evita que se separen con el tiempo.
 */
export const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['questions'],
  properties: {
    questions: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['stem', 'options', 'answer_index', 'difficulty', 'steps', 'concept', 'trick'],
        properties: {
          stem: { type: 'string' },
          passage: { type: 'string' },
          options: { type: 'array', items: { type: 'string' } },
          answer_index: { type: 'integer', enum: [0, 1, 2, 3, 4] },
          difficulty: { type: 'integer', enum: [1, 2, 3] },
          steps: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['t', 'p', 'm'],
              properties: {
                t: { type: 'string' },
                p: { type: 'string' },
                m: { type: 'string' },
              },
            },
          },
          concept: { type: 'string' },
          trick: { type: 'string' },
        },
      },
    },
  },
} as const;

export const SYSTEM = `Eres un redactor de exámenes de admisión peruanos (ISIL, USIL, UPC, U. de Lima).
Escribes en español del Perú, con contexto local cuando ayuda (soles, distritos de Lima, turismo, hotelería).

Reglas de redacción:
- El enunciado se lee una sola vez y no admite ambigüedad.
- Entre 3 y 5 alternativas. Exactamente una correcta.
- Los distractores representan errores reales de razonamiento, no ruido. El error más común va primero.
- La resolución tiene entre 3 y 5 pasos. Cada paso: "t" es la acción, "p" explica el porqué en una o dos frases, "m" es el bloque de cálculo en monoespaciado (cadena vacía si no aplica).
- "concept" nombra la idea general que se transfiere a otras preguntas.
- "trick" es el atajo que ahorra tiempo en el examen.
- Nunca empieces la explicación por la definición formal: primero la intuición, la fórmula al final.
- HTML permitido en el enunciado solo para <b>, <br> y <span class="math">.`;

/** El encargo concreto para un capítulo. */
export function buildPrompt(opts: {
  areaName: string;
  chapterTitle: string;
  count: number;
  notes?: string | null;
}): string {
  return [
    `Área: ${opts.areaName}`,
    `Capítulo: ${opts.chapterTitle}`,
    `Escribe ${opts.count} preguntas nuevas de opción múltiple para este capítulo.`,
    opts.notes ? `Indicaciones adicionales: ${opts.notes}` : '',
    'Varía la dificultad: al menos una de nivel 1 y una de nivel 3.',
    'Usa "passage" solo si la pregunta requiere un texto de lectura.',
  ]
    .filter(Boolean)
    .join('\n');
}
