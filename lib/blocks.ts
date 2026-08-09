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

export type Block =
  | { id: string; ord: number; kind: 'text'; payload: TextPayload }
  | { id: string; ord: number; kind: 'viz'; payload: VizPayload }
  | { id: string; ord: number; kind: 'math'; payload: MathPayload }
  | { id: string; ord: number; kind: 'callout'; payload: CalloutPayload }
  | { id: string; ord: number; kind: 'check'; payload: CheckPayload }
  | { id: string; ord: number; kind: 'err'; payload: ErrPayload }
  | { id: string; ord: number; kind: 'video'; payload: VideoPayload };

export const BLOCK_KINDS: BlockKind[] = [
  'text',
  'viz',
  'math',
  'callout',
  'check',
  'err',
  'video',
];

export const BLOCK_LABEL: Record<BlockKind, string> = {
  text: 'Texto',
  viz: 'Infografía',
  math: 'Fórmula',
  callout: 'Por qué funciona',
  check: 'Checkpoint',
  err: 'Errores frecuentes',
  video: 'Videos',
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
    default:
      return null;
  }
}
