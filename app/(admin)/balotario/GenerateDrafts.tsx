'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

type Chapter = { id: string; title: string; areaId: string };
type Area = { id: string; name: string };

/**
 * Generación asistida. Llama a `/api/generate`, que inserta todo como
 * borrador: la revisión humana sigue siendo obligatoria.
 */
export function GenerateDrafts({ areas, chapters }: { areas: Area[]; chapters: Chapter[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: 'good' | 'bad'; text: string } | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setMessage(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapter_id: form.get('chapter_id'),
          count: Number(form.get('count') ?? 4),
          notes: String(form.get('notes') ?? ''),
        }),
      });
      const data = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) throw new Error(data.error ?? 'No se pudo generar.');

      setMessage({ kind: 'good', text: data.message ?? 'Listo.' });
      startTransition(() => router.refresh());
    } catch (error) {
      setMessage({
        kind: 'bad',
        text: error instanceof Error ? error.message : 'No se pudo generar.',
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card" style={{ padding: 20, marginTop: 13 }}>
      <span className="eyebrow">Generar borradores con la Claude API</span>
      <form onSubmit={onSubmit} style={{ marginTop: 12 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <select
            name="chapter_id"
            className="mono"
            style={{
              flex: 1,
              minWidth: 240,
              padding: '11px 14px',
              borderRadius: 10,
              border: '1px solid var(--line-strong)',
              background: 'rgba(8,21,30,.5)',
              color: 'var(--paper)',
            }}
            required
          >
            {areas.map((a) => (
              <optgroup label={a.name} key={a.id}>
                {chapters
                  .filter((c) => c.areaId === a.id)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
          <input
            name="count"
            type="number"
            min={1}
            max={8}
            defaultValue={4}
            className="mono"
            style={{
              width: 90,
              padding: '11px 14px',
              borderRadius: 10,
              border: '1px solid var(--line-strong)',
              background: 'rgba(8,21,30,.5)',
              color: 'var(--paper)',
            }}
          />
          <button className="btn" disabled={busy || pending}>
            {busy ? 'Redactando…' : 'Generar →'}
          </button>
        </div>

        <div className="field" style={{ marginTop: 12, marginBottom: 0 }}>
          <label htmlFor="notes">Indicaciones (opcional)</label>
          <input
            id="notes"
            name="notes"
            placeholder="Enfócate en descuentos sucesivos con contexto hotelero"
          />
        </div>
      </form>

      {message && <p className={`notice ${message.kind}`}>{message.text}</p>}

      <p className="hint" style={{ textAlign: 'left' }}>
        Todo entra como borrador. Revisa y corrige antes de publicar: una pregunta mal calibrada
        enseña mal.
      </p>
    </div>
  );
}
