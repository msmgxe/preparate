import type { blockKind } from '@/db/schema';

export type BlockKind = (typeof blockKind.enumValues)[number];
export type Json = unknown;

/** Forma del `payload` de `lesson_blocks` según `kind`. */
export type TextPayload = { h?: string | null; p: string };
export type VizPayload = { viz_id: string; caption?: string | null };
export type MathPayload = { m: string };
export type CalloutPayload = { t: string; p: string };
export type CheckPayload = { q: string; opts: string[]; ans: number; ok: string; no: string };
export type ErrPayload = { items: string[] };
export type VideoPayload = Record<string, never>;

/** Una frase que se escucha, con lo que significa debajo. */
export type ListenPayload = { h?: string | null; items: { en: string; es: string }[] };
/** Dos palabras que suenan casi igual y significan cosas distintas. */
export type PairPayload = {
  h?: string | null;
  note?: string | null;
  items: { a: string; ipaA: string; esA: string; b: string; ipaB: string; esB: string }[];
};
/** Repetir en voz alta; el navegador dice si se entendió. */
export type SayPayload = { h?: string | null; note?: string | null; items: { text: string; vs?: string | null }[] };

export type Block =
  | { id: string; ord: number; kind: 'text'; payload: TextPayload }
  | { id: string; ord: number; kind: 'viz'; payload: VizPayload }
  | { id: string; ord: number; kind: 'math'; payload: MathPayload }
  | { id: string; ord: number; kind: 'callout'; payload: CalloutPayload }
  | { id: string; ord: number; kind: 'check'; payload: CheckPayload }
  | { id: string; ord: number; kind: 'err'; payload: ErrPayload }
  | { id: string; ord: number; kind: 'video'; payload: VideoPayload }
  | { id: string; ord: number; kind: 'listen'; payload: ListenPayload }
  | { id: string; ord: number; kind: 'pair'; payload: PairPayload }
  | { id: string; ord: number; kind: 'say'; payload: SayPayload };

export const BLOCK_KINDS: BlockKind[] = [
  'text',
  'viz',
  'math',
  'callout',
  'check',
  'err',
  'video',
  'listen',
  'pair',
  'say',
];

export const BLOCK_LABEL: Record<BlockKind, string> = {
  text: 'Texto',
  viz: 'Infografía',
  math: 'Fórmula',
  callout: 'Por qué funciona',
  check: 'Checkpoint',
  err: 'Errores frecuentes',
  video: 'Videos',
  listen: 'Escucha',
  pair: 'Pares mínimos',
  say: 'Dilo en voz alta',
};

/** Payload vacío por tipo, para el editor. */
export function emptyPayload(kind: BlockKind): Json {
  switch (kind) {
    case 'text':
      return { h: '', p: '' };
    case 'viz':
      return { viz_id: '', caption: '' };
    case 'math':
      return { m: '' };
    case 'callout':
      return { t: 'Por qué funciona', p: '' };
    case 'check':
      return { q: '', opts: ['', ''], ans: 0, ok: '', no: '' };
    case 'err':
      return { items: ['', '', ''] };
    case 'video':
      return {};
    case 'listen':
      return { h: '', items: [{ en: '', es: '' }] };
    case 'pair':
      return { h: '', note: '', items: [{ a: '', ipaA: '', esA: '', b: '', ipaB: '', esB: '' }] };
    case 'say':
      return { h: '', note: '', items: [{ text: '', vs: '' }] };
  }
}

/** Convierte una fila cruda en un bloque tipado, descartando lo que no cuadre. */
export function toBlock(row: { id: string; ord: number; kind: BlockKind; payload: Json }): Block | null {
  const p = (row.payload ?? {}) as Record<string, unknown>;
  const base = { id: row.id, ord: row.ord };

  switch (row.kind) {
    case 'text':
      return typeof p.p === 'string'
        ? { ...base, kind: 'text', payload: { h: (p.h as string) ?? null, p: p.p } }
        : null;
    case 'viz':
      return typeof p.viz_id === 'string'
        ? { ...base, kind: 'viz', payload: { viz_id: p.viz_id, caption: (p.caption as string) ?? null } }
        : null;
    case 'math':
      return typeof p.m === 'string' ? { ...base, kind: 'math', payload: { m: p.m } } : null;
    case 'callout':
      return typeof p.p === 'string'
        ? { ...base, kind: 'callout', payload: { t: (p.t as string) ?? '', p: p.p } }
        : null;
    case 'check':
      return typeof p.q === 'string' && Array.isArray(p.opts)
        ? {
            ...base,
            kind: 'check',
            payload: {
              q: p.q,
              opts: p.opts as string[],
              ans: Number(p.ans ?? 0),
              ok: (p.ok as string) ?? '',
              no: (p.no as string) ?? '',
            },
          }
        : null;
    case 'err':
      return Array.isArray(p.items)
        ? { ...base, kind: 'err', payload: { items: p.items as string[] } }
        : null;
    case 'video':
      return { ...base, kind: 'video', payload: {} };
    case 'listen':
      return Array.isArray(p.items)
        ? {
            ...base,
            kind: 'listen',
            payload: { h: (p.h as string) ?? null, items: p.items as ListenPayload['items'] },
          }
        : null;
    case 'pair':
      return Array.isArray(p.items)
        ? {
            ...base,
            kind: 'pair',
            payload: {
              h: (p.h as string) ?? null,
              note: (p.note as string) ?? null,
              items: p.items as PairPayload['items'],
            },
          }
        : null;
    case 'say':
      return Array.isArray(p.items)
        ? {
            ...base,
            kind: 'say',
            payload: {
              h: (p.h as string) ?? null,
              note: (p.note as string) ?? null,
              items: p.items as SayPayload['items'],
            },
          }
        : null;
    default:
      return null;
  }
}
