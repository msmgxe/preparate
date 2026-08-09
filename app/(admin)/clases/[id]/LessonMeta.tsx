'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { addVideo, saveLesson, type EditorState } from '../../actions';
import type { Lesson, LessonVideo } from '@/db/schema';
import { deleteVideo } from '../../actions';

function Save({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button className="btn sm" disabled={pending}>
      {pending ? 'Guardando…' : label}
    </button>
  );
}

export function LessonMeta({ lesson, videos }: { lesson: Lesson; videos: LessonVideo[] }) {
  const [state, action] = useActionState(saveLesson, {} as EditorState);
  const [videoState, videoAction] = useActionState(addVideo, {} as EditorState);

  return (
    <>
      <form action={action} className="card">
        <input type="hidden" name="id" value={lesson.id} />

        <div className="field">
          <label htmlFor="title">Título · el punto de llegada, no la definición</label>
          <input id="title" name="title" defaultValue={lesson.title} required />
        </div>

        <div className="field">
          <label htmlFor="hook">Gancho · por qué esto importa. Sin definiciones.</label>
          <textarea id="hook" name="hook" rows={3} defaultValue={lesson.hook} required />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="field">
            <label htmlFor="minutes">Minutos · objetivo 5–7</label>
            <input
              id="minutes"
              name="minutes"
              type="number"
              min={1}
              max={30}
              defaultValue={lesson.minutes}
            />
          </div>
          <div className="field">
            <label htmlFor="slug">Slug</label>
            <input id="slug" name="slug" defaultValue={lesson.slug ?? ''} />
          </div>
        </div>

        <div className="field">
          <label htmlFor="status">Estado</label>
          <select id="status" name="status" defaultValue={lesson.status}>
            <option value="draft">Borrador</option>
            <option value="reviewed">Revisada</option>
            <option value="published">Publicada — visible para los alumnos</option>
          </select>
        </div>

        <Save label="Guardar clase" />
        {state.error && <p className="notice bad">{state.error}</p>}
        {state.notice && <p className="notice good">{state.notice}</p>}
      </form>

      <div className="card" style={{ marginTop: 16 }}>
        <span className="eyebrow">Videos · uno o dos, después del checkpoint</span>

        {videos.map((v) => (
          <div
            key={v.id}
            style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 12 }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <b style={{ fontFamily: 'var(--display)', fontSize: 15 }}>{v.title}</b>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  color: 'var(--paper-dim)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {v.source} · {v.url}
              </div>
            </div>
            <form action={deleteVideo}>
              <input type="hidden" name="id" value={v.id} />
              <input type="hidden" name="lesson_id" value={lesson.id} />
              <button className="replay" style={{ color: 'var(--coral)' }}>
                ✕
              </button>
            </form>
          </div>
        ))}

        <form action={videoAction} style={{ marginTop: 16 }}>
          <input type="hidden" name="lesson_id" value={lesson.id} />
          <div className="field">
            <label htmlFor="video_title">Título</label>
            <input id="video_title" name="title" placeholder="Sucesiones — curso completo" />
          </div>
          <div className="field">
            <label htmlFor="video_source">Fuente</label>
            <input id="video_source" name="source" placeholder="Matemóvil" />
          </div>
          <div className="field">
            <label htmlFor="video_url">Enlace · se abre en pestaña nueva</label>
            <input id="video_url" name="url" type="url" placeholder="https://matemovil.com/…" />
          </div>
          <Save label="Vincular video" />
          {videoState.error && <p className="notice bad">{videoState.error}</p>}
          {videoState.notice && <p className="notice good">{videoState.notice}</p>}
        </form>

        <p className="hint" style={{ textAlign: 'left' }}>
          No incrustes reproductores dentro de la clase: rompe el flujo, mete anuncios y contradice
          el principio de coherencia. El video es refuerzo, no la clase.
        </p>
      </div>
    </>
  );
}
