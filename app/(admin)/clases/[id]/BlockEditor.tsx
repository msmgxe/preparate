'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { deleteBlock, moveBlock, saveBlock, type EditorState } from '../../actions';
import { BLOCK_LABEL, type BlockKind } from '@/lib/blocks';

/** Forma esperada del payload, para tenerla a la vista al editar. */
const SHAPE: Record<BlockKind, string> = {
  text: '{ "h": "El método", "p": "HTML acotado" }',
  viz: '{ "viz_id": "v-suc", "caption": "…" }',
  math: '{ "m": "0,80 × 0,90 = 0,72" }',
  callout: '{ "t": "Por qué funciona", "p": "…" }',
  check: '{ "q": "…", "opts": ["a","b"], "ans": 1, "ok": "…", "no": "…" }',
  err: '{ "items": ["…", "…"] }',
  video: '{}  — los enlaces se gestionan abajo',
};

function Save() {
  const { pending } = useFormStatus();
  return (
    <button className="btn sm" disabled={pending}>
      {pending ? 'Guardando…' : 'Guardar bloque'}
    </button>
  );
}

export function BlockEditor({
  block,
  lessonId,
  isFirst,
  isLast,
}: {
  block: { id: string; ord: number; kind: BlockKind; payload: unknown };
  lessonId: string;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [state, action] = useActionState(saveBlock, {} as EditorState);

  return (
    <div className="blockrow">
      <div className="bhead">
        <span className="tagl">
          {block.ord + 1} · {BLOCK_LABEL[block.kind]}
        </span>
        <div style={{ flex: 1 }} />
        <form action={moveBlock}>
          <input type="hidden" name="id" value={block.id} />
          <input type="hidden" name="lesson_id" value={lessonId} />
          <input type="hidden" name="direction" value="up" />
          <button className="replay" disabled={isFirst} title="Subir">
            ↑
          </button>
        </form>
        <form action={moveBlock}>
          <input type="hidden" name="id" value={block.id} />
          <input type="hidden" name="lesson_id" value={lessonId} />
          <input type="hidden" name="direction" value="down" />
          <button className="replay" disabled={isLast} title="Bajar">
            ↓
          </button>
        </form>
        <form action={deleteBlock}>
          <input type="hidden" name="id" value={block.id} />
          <input type="hidden" name="lesson_id" value={lessonId} />
          <button className="replay" style={{ color: 'var(--coral)' }} title="Eliminar">
            ✕
          </button>
        </form>
      </div>

      <form action={action}>
        <input type="hidden" name="id" value={block.id} />
        <input type="hidden" name="lesson_id" value={lessonId} />
        <div className="field" style={{ marginBottom: 10 }}>
          <label htmlFor={`payload-${block.id}`}>{SHAPE[block.kind]}</label>
          <textarea
            id={`payload-${block.id}`}
            name="payload"
            rows={block.kind === 'check' || block.kind === 'err' ? 8 : 5}
            defaultValue={JSON.stringify(block.payload, null, 2)}
          />
        </div>
        <Save />
        {state.error && <p className="notice bad">{state.error}</p>}
        {state.notice && <p className="notice good">{state.notice}</p>}
      </form>
    </div>
  );
}
