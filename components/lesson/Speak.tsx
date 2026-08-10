'use client';

import { Mic, Volume2 } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

/**
 * El oído y la boca del curso de inglés.
 *
 * Un idioma no se aprende leyéndolo. Pero grabar y alojar audio para 24
 * capítulos cuesta dinero, licencias y megabytes, y además envejece: cada
 * corrección de una frase obliga a volver al estudio.
 *
 * La alternativa es la voz que ya trae el navegador. `speechSynthesis` está en
 * todos desde hace años, no pide permiso, no hace ninguna petición de red y en
 * macOS, iOS y Android suena razonablemente bien. Cuesta cero y se actualiza
 * cuando cambia el texto.
 *
 * Y el reverso: `SpeechRecognition` convierte lo que el alumno dice en texto.
 * Si pronuncia «ship» y el navegador entiende «sheep», acaba de recibir la
 * corrección más honesta posible — la misma que recibiría de un angloparlante
 * que no le entiende. No mide acento: mide si se le entiende, que es lo que
 * importa. Donde no exista, el botón simplemente no aparece.
 */

/** El reconocimiento de voz no está en los tipos del DOM en todos los navegadores. */
type RecognitionResult = { transcript: string; confidence: number };
type RecognitionEvent = { results: { [i: number]: { [j: number]: RecognitionResult } } };
type Recognition = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((e: RecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

function getRecognition(): Recognition | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => Recognition;
    webkitSpeechRecognition?: new () => Recognition;
  };
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  return Ctor ? new Ctor() : null;
}

/** Elige la voz inglesa que suene mejor de las que tenga el sistema. */
function englishVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  const english = voices.filter((v) => v.lang.startsWith('en'));
  // las locales suenan mucho mejor que las sintetizadas en servidor
  return english.find((v) => v.localService && v.lang === 'en-US') ?? english[0];
}

/** Botón de escuchar. `slow` baja el ritmo para separar los sonidos. */
export function Speak({
  text,
  label,
  slow = false,
  big = false,
}: {
  text: string;
  label: string;
  slow?: boolean;
  big?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  const play = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = slow ? 0.62 : 0.92;
    const voice = englishVoice();
    if (voice) utterance.voice = voice;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);

    setPlaying(true);
    window.speechSynthesis.speak(utterance);
  }, [text, slow]);

  return (
    <button
      className={`speak${big ? ' big' : ''}${playing ? ' on' : ''}`}
      onClick={play}
      aria-label={`${label}: ${text}`}
      title={label}
      type="button"
    >
      <Volume2 size={big ? 18 : 15} />
      {slow && <span className="speak-slow">0.5×</span>}
    </button>
  );
}

type Verdict = 'idle' | 'listening' | 'ok' | 'near' | 'off' | 'error';

/** Normaliza para comparar: sin puntuación, sin mayúsculas, sin acentos. */
function clean(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Botón de pronunciar.
 *
 * `confusable` es la palabra con la que se confunde: si el navegador entiende
 * esa, el alumno recibe el diagnóstico exacto en vez de un «inténtalo otra vez».
 */
export function Pronounce({
  target,
  confusable,
  labels,
}: {
  target: string;
  confusable?: string;
  labels: {
    say: string;
    listening: string;
    ok: string;
    near: string;
    off: string;
    confused: string;
    error: string;
  };
}) {
  const [verdict, setVerdict] = useState<Verdict>('idle');
  const [heard, setHeard] = useState('');
  const busy = useRef(false);

  const listen = useCallback(() => {
    if (busy.current) return;
    const recognition = getRecognition();
    if (!recognition) {
      setVerdict('error');
      return;
    }

    busy.current = true;
    setHeard('');
    setVerdict('listening');

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    recognition.onresult = (event) => {
      const said = clean(event.results[0][0].transcript);
      setHeard(said);
      if (said === clean(target)) setVerdict('ok');
      else if (confusable && said === clean(confusable)) setVerdict('near');
      else setVerdict('off');
    };
    recognition.onerror = () => setVerdict('error');
    recognition.onend = () => {
      busy.current = false;
      setVerdict((v) => (v === 'listening' ? 'idle' : v));
    };

    recognition.start();
  }, [target, confusable]);

  const message = {
    idle: '',
    listening: labels.listening,
    ok: labels.ok,
    near: confusable ? labels.confused.replace('{word}', confusable) : labels.near,
    off: `${labels.off}${heard ? ` «${heard}»` : ''}`,
    error: labels.error,
  }[verdict];

  return (
    <div className="pronounce">
      <button
        className={`pronbtn${verdict === 'listening' ? ' on' : ''}`}
        onClick={listen}
        type="button"
      >
        <Mic size={15} /> {labels.say}
      </button>
      {message && (
        <span className={`pronmsg ${verdict}`} role="status">
          {message}
        </span>
      )}
    </div>
  );
}
