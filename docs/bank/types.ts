/**
 * El balotario escrito a mano.
 *
 * Cada archivo de esta carpeta cubre un área. Se siembra con
 * `npm run db:seed-bank` y es idempotente: una pregunta se reconoce por su
 * enunciado dentro del capítulo, así que volver a correrlo no duplica nada.
 *
 * Reglas al escribir una pregunta:
 *
 *  · El enunciado se lee una sola vez y no admite ambigüedad.
 *  · Cada alternativa incorrecta es un error de razonamiento concreto, no
 *    ruido. El error más común va primero, para que el alumno se reconozca.
 *  · La resolución arranca por la intuición y deja la fórmula para el final.
 *  · `concept` nombra lo que se transfiere a otras preguntas; `trick`, el
 *    atajo que ahorra tiempo cuando el reloj corre.
 */
export type Step = {
  /** La acción del paso, en imperativo. */
  t: string;
  /** Por qué se hace, en una o dos frases. */
  p: string;
  /** El cálculo, en monoespaciado. Cadena vacía si no aplica. */
  m: string;
};

export type BankQuestion = {
  /** Título exacto del capítulo en español. */
  chapter: string;
  stem: string;
  /** Texto de lectura, solo cuando la pregunta lo necesita. */
  passage?: string;
  options: string[];
  answer: number;
  /** 1 calentamiento · 2 nivel de examen · 3 exigente. */
  difficulty: 1 | 2 | 3;
  steps: Step[];
  concept: string;
  trick: string;
  /** Por qué falla cada alternativa incorrecta, por índice. */
  distractors?: Record<string, string>;
};
