/**
 * Elegir bien la voz del navegador.
 *
 * `speechSynthesis` no ofrece una voz: ofrece todas las que tenga instaladas el
 * sistema, en el orden en que se le ocurra. En macOS esa lista arranca por las
 * voces de juguete —Albert, Bad News, Bahh, Deranged, Trinoids—, que suenan
 * roncas y entrecortadas a propósito. Tomar «la primera en inglés» es tomar una
 * de esas.
 *
 * Aquí se puntúan y se ordenan. Arriba quedan las neuronales modernas, que
 * suenan como las de un asistente; abajo, las de juguete, que se descartan del
 * todo. Y por encima de todo manda la elección del alumno, que puede probarlas
 * y quedarse con la que mejor oiga en su equipo.
 */

export const VOICE_KEY = 'rumbo-voice';

/**
 * Voces que no deben sonar nunca. Son las de juguete y las heredadas de los
 * noventa que macOS sigue trayendo por compatibilidad.
 */
const BANNED = new Set(
  [
    'albert', 'bad news', 'bahh', 'bells', 'boing', 'bubbles', 'cellos',
    'deranged', 'good news', 'hysterical', 'jester', 'junior', 'kathy',
    'organ', 'princess', 'ralph', 'superstar', 'trinoids', 'whisper',
    'wobble', 'zarvox', 'bruce', 'agnes', 'vicki', 'victoria', 'fred',
    'grandma', 'grandpa', 'eddy', 'flo', 'reed', 'rocko', 'sandy', 'shelley',
  ].map((n) => n.toLowerCase()),
);

/** Las que de verdad suenan bien, de mejor a peor. */
const PREFERRED = [
  'google us english',
  'microsoft ava',
  'microsoft emma',
  'microsoft andrew',
  'microsoft aria',
  'microsoft guy',
  'microsoft jenny',
  'samantha',
  'ava',
  'allison',
  'nicky',
  'aaron',
  'zoe',
  'evan',
  'nathan',
  'susan',
  'tom',
  'daniel',
  'karen',
];

/**
 * Cuánto vale una voz. Más alto es mejor; negativo la descarta.
 *
 * Las palabras «Natural», «Neural», «Premium» y «Enhanced» las usan los
 * fabricantes para marcar sus modelos modernos, así que son la señal más fiable
 * que hay sin escucharlas.
 */
export function scoreVoice(voice: SpeechSynthesisVoice): number {
  const name = voice.name.toLowerCase();
  if (BANNED.has(name)) return -1;
  if (!voice.lang.toLowerCase().startsWith('en')) return -1;

  let score = 0;
  if (/natural|neural|premium|enhanced/.test(name)) score += 100;

  const rank = PREFERRED.findIndex((p) => name.startsWith(p));
  if (rank >= 0) score += 80 - rank;

  // el acento estándar del material; el británico sirve igual de bien
  if (voice.lang.toLowerCase() === 'en-us') score += 12;
  else if (voice.lang.toLowerCase() === 'en-gb') score += 8;

  // «compact» es la versión reducida que macOS instala por defecto
  if (name.includes('compact')) score -= 30;
  if (voice.default) score += 3;

  return score;
}

/** Las voces utilizables, de mejor a peor. */
export function rankVoices(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  return voices
    .map((voice) => ({ voice, score: scoreVoice(voice) }))
    .filter((v) => v.score >= 0)
    .sort((a, b) => b.score - a.score)
    .map((v) => v.voice);
}

/**
 * Las voces del sistema, esperando a que estén.
 *
 * `getVoices()` devuelve una lista vacía en la primera llamada de varios
 * navegadores: se llena de forma asíncrona y avisa con `voiceschanged`. Sin
 * esta espera, el primer «escuchar» de la sesión suena con la voz por defecto.
 */
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve([]);
      return;
    }

    const ready = window.speechSynthesis.getVoices();
    if (ready.length) {
      resolve(rankVoices(ready));
      return;
    }

    const onChange = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', onChange);
      resolve(rankVoices(window.speechSynthesis.getVoices()));
    };
    window.speechSynthesis.addEventListener('voiceschanged', onChange);
    // si el navegador nunca dispara el evento, no se queda esperando para siempre
    setTimeout(() => resolve(rankVoices(window.speechSynthesis.getVoices())), 1200);
  });
}

/** La voz elegida por el alumno, si sigue disponible. */
export function savedVoiceName(): string {
  try {
    return localStorage.getItem(VOICE_KEY) ?? '';
  } catch {
    return '';
  }
}

export function saveVoiceName(name: string): void {
  try {
    localStorage.setItem(VOICE_KEY, name);
  } catch {
    // navegación privada: vale para esta visita
  }
}
