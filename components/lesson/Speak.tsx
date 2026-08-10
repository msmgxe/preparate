'use client';

import { Mic, Volume2 } from 'lucide-react';
import { useCallback, useRef, useState, useSyncExternalStore } from 'react';
import { loadVoices, saveVoiceName, savedVoiceName } from '@/lib/speech';

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

/**
 * Las voces ordenadas, cargadas una sola vez para toda la página.
 *
 * Antes se pedían en cada reproducción y se tomaba la primera en inglés. En
 * macOS esa es una de las voces de juguete —Albert, Bad News, Deranged—, que
 * suenan roncas a propósito. Ahora se puntúan y el alumno puede elegir.
 */
let cache: SpeechSynthesisVoice[] | null = null;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((fn) => fn());

function subscribe(fn: () => void) {
  listeners.add(fn);
  if (cache === null) {
    cache = [];
    void loadVoices().then((voices) => {
      cache = voices;
      notify();
    });
  }
  return () => listeners.delete(fn);
}

/** La elección del alumno también se observa, para que el `select` la refleje. */
const choiceListeners = new Set<() => void>();
function subscribeChoice(fn: () => void) {
  choiceListeners.add(fn);
  return () => choiceListeners.delete(fn);
}
const notifyChoice = () => choiceListeners.forEach((fn) => fn());

/** Clave estable: el navegador recrea los objetos de voz en cada consulta. */
const snapshot = () => (cache ?? []).map((v) => v.name).join('|');
const onServer = () => '';

export function useVoices(): SpeechSynthesisVoice[] {
  useSyncExternalStore(subscribe, snapshot, onServer);
  return cache ?? [];
}

/** La voz que toca ahora: la elegida por el alumno, o la mejor puntuada. */
function currentVoice(): SpeechSynthesisVoice | undefined {
  const voices = cache ?? [];
  const chosen = savedVoiceName();
  return voices.find((v) => v.name === chosen) ?? voices[0];
}

/**
 * Deja al alumno probar las voces de su equipo y quedarse con una.
 *
 * Es necesario porque la calidad depende del sistema, no de nosotros: el mismo
 * código suena distinto en un Mac, en un Android y en un Windows. Elegir y oír
 * al momento resuelve en diez segundos lo que ninguna heurística acierta.
 */
export function VoicePicker({ labels }: { labels: { voice: string; sample: string } }) {
  const voices = useVoices();
  // se lee con `useSyncExternalStore` y no en un efecto: el primer render del
  // cliente ya trae la elección guardada, sin saltos
  const chosen = useSyncExternalStore(subscribeChoice, savedVoiceName, onServer);

  if (voices.length < 2) return null;

  const pick = (name: string) => {
    saveVoiceName(name);
    notifyChoice();
    const voice = voices.find((v) => v.name === name);
    if (!voice) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(labels.sample);
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.rate = 0.92;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <label className="voicebar">
      <span className="eyebrow">{labels.voice}</span>
      <select value={chosen || voices[0].name} onChange={(e) => pick(e.target.value)}>
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name} · {voice.lang}
          </option>
        ))}
      </select>
    </label>
  );
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
  useVoices();

  const play = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = slow ? 0.62 : 0.92;
    const voice = currentVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'en-US';
    }
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
