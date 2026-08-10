'use client';

import type { Dict } from '@/lib/i18n/dictionaries/es';
import { Pronounce, Speak } from './Speak';
import { fill } from '@/lib/i18n/fill';

import { useEffect, useRef, useState } from 'react';
import { SafeHtml } from '@/components/SafeHtml';
import type { Block } from '@/lib/blocks';

export type LessonVideo = { id: string; title: string; source: string | null; url: string };

/**
 * Renderiza los bloques de una clase.
 *
 * Dos reglas del diseño pedagógico se aplican aquí:
 *  · **Mathigon** — el bloque `check` bloquea lo que viene después hasta que se
 *    responde. Fuerza al lector a ser honesto sobre si está siendo pasivo.
 *  · **Mayer, señalización** — las infografías se revelan por partes; el botón
 *    "repetir" reinicia la animación remontando el SVG.
 *
 * Los SVG llegan ya sanitizados desde el servidor.
 */
export function LessonRenderer({
  t,
  lessonId,
  blocks,
  visuals,
  videos,
}: {
  t: Dict;
  lessonId: string;
  blocks: Block[];
  visuals: Record<string, string>;
  videos: LessonVideo[];
}) {
  const [answered, setAnswered] = useState<Record<string, number>>({});
  const [replays, setReplays] = useState<Record<string, number>>({});
  const openedAt = useRef(0);
  const maxScroll = useRef(0);
  const videoClicked = useRef(false);

  // el índice del primer checkpoint sin responder corta la lectura
  const gateIndex = blocks.findIndex((b) => b.kind === 'check' && answered[b.id] === undefined);
  const visible = gateIndex === -1 ? blocks : blocks.slice(0, gateIndex + 1);
  const gate = gateIndex === -1 ? null : blocks[gateIndex];

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  // telemetría: ¿abrió la clase y llegó al final?
  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.round((window.scrollY / total) * 100) : 100;
      maxScroll.current = Math.max(maxScroll.current, Math.min(100, pct));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const send = () => {
      const checks = blocks.filter((b) => b.kind === 'check');
      const checkOk = checks.length
        ? checks.every((b) => b.kind === 'check' && answered[b.id] === b.payload.ans)
        : null;

      navigator.sendBeacon?.(
        '/api/lesson-view',
        JSON.stringify({
          lesson_id: lessonId,
          seconds: Math.round((Date.now() - openedAt.current) / 1000),
          scroll_pct: maxScroll.current,
          check_ok: checkOk,
          video_click: videoClicked.current,
        }),
      );
    };

    window.addEventListener('pagehide', send);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pagehide', send);
      send();
    };
  }, [answered, blocks, lessonId]);

  return (
    <>
      {visible.map((block) => {
        switch (block.kind) {
          case 'text':
            return (
              <div className="lblock" key={block.id}>
                {block.payload.h && <h4>{block.payload.h}</h4>}
                <SafeHtml as="p" html={block.payload.p} />
              </div>
            );

          case 'math':
            return (
              <div className="lblock" key={block.id}>
                <div className="math" style={{ fontSize: 16, padding: '18px 20px' }}>
                  {block.payload.m}
                </div>
              </div>
            );

          case 'callout':
            return (
              <div className="callout" key={block.id}>
                <div className="eyebrow">{block.payload.t}</div>
                <SafeHtml as="p" html={block.payload.p} />
              </div>
            );

          case 'viz': {
            const svg = visuals[block.payload.viz_id];
            const nonce = replays[block.id] ?? 0;
            return (
              <div className="lblock" key={block.id}>
                <div className="viz">
                  <div className="vtop">
                    <span className="eyebrow">{t.app.lessonInfographic}</span>
                    <button
                      className="replay"
                      onClick={() =>
                        setReplays((prev) => ({ ...prev, [block.id]: (prev[block.id] ?? 0) + 1 }))
                      }
                    >
                      {t.app.lessonReplay}
                    </button>
                  </div>
                  {svg ? (
                    // el `key` cambia al repetir: React remonta el SVG y la animación arranca de cero
                    <div key={nonce} dangerouslySetInnerHTML={{ __html: svg }} />
                  ) : (
                    <p className="empty">{fill(t.app.lessonMissingViz, { id: block.payload.viz_id })}</p>
                  )}
                  {block.payload.caption && <div className="vcap">{block.payload.caption}</div>}
                </div>
              </div>
            );
          }

          case 'check': {
            const chosen = answered[block.id];
            const done = chosen !== undefined;
            const ok = chosen === block.payload.ans;
            return (
              <div className="check" key={block.id}>
                <div className="eyebrow">{t.app.lessonCheckpoint}</div>
                <div className="cq">{block.payload.q}</div>
                <div className="copts">
                  {block.payload.opts.map((option, i) => {
                    let cls = 'copt';
                    if (done) {
                      if (i === block.payload.ans) cls += ' ok';
                      else if (i === chosen) cls += ' no';
                    }
                    return (
                      <button
                        key={i}
                        className={cls}
                        disabled={done}
                        onClick={() => setAnswered((prev) => ({ ...prev, [block.id]: i }))}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div className="cfb">
                    <b style={{ color: ok ? 'var(--mint)' : 'var(--coral)' }}>{ok ? '✓ ' : '✕ '}</b>
                    {ok ? block.payload.ok : block.payload.no}
                  </div>
                )}
              </div>
            );
          }

          case 'listen':
            return (
              <div className="lblock" key={block.id}>
                {block.payload.h && <h4>{block.payload.h}</h4>}
                <div className="listenbox">
                  {block.payload.items.map((item, i) => (
                    <div className="listenrow" key={i}>
                      <Speak text={item.en} label={t.app.audioListen} big />
                      <Speak text={item.en} label={t.app.audioSlow} slow />
                      <div className="listentext">
                        <b lang="en">{item.en}</b>
                        <span>{item.es}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'pair':
            return (
              <div className="lblock" key={block.id}>
                {block.payload.h && <h4>{block.payload.h}</h4>}
                <div className="pairbox">
                  {block.payload.items.map((item, i) => (
                    <div className="pairrow" key={i}>
                      <div className="pairside a">
                        <Speak text={item.a} label={t.app.audioListen} />
                        <b lang="en">{item.a}</b>
                        <span className="mono">{item.ipaA}</span>
                        <span className="pairgloss">{item.esA}</span>
                      </div>
                      <span className="pairvs">≠</span>
                      <div className="pairside b">
                        <Speak text={item.b} label={t.app.audioListen} />
                        <b lang="en">{item.b}</b>
                        <span className="mono">{item.ipaB}</span>
                        <span className="pairgloss">{item.esB}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {block.payload.note && <p className="pairnote">{block.payload.note}</p>}
              </div>
            );

          case 'say':
            return (
              <div className="lblock" key={block.id}>
                {block.payload.h && <h4>{block.payload.h}</h4>}
                {block.payload.note && <p className="saynote">{block.payload.note}</p>}
                <div className="saybox">
                  {block.payload.items.map((item, i) => (
                    <div className="sayrow" key={i}>
                      <Speak text={item.text} label={t.app.audioListen} />
                      <b lang="en">{item.text}</b>
                      <Pronounce
                        target={item.text}
                        confusable={item.vs ?? undefined}
                        labels={t.app.pron}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'err':
            return (
              <div className="lblock" key={block.id}>
                <div className="errbox">
                  <div className="eyebrow">{t.app.lessonErrors}</div>
                  <ul className="errlist">
                    {block.payload.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );

          case 'video':
            if (!videos.length) return null;
            return (
              <div className="lblock" key={block.id}>
                <span className="eyebrow">{t.app.lessonVideos}</span>
                {videos.map((video) => (
                  <a
                    className="video"
                    key={video.id}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      videoClicked.current = true;
                    }}
                  >
                    <div className="vthumb" />
                    <div className="vinfo">
                      <b>{video.title}</b>
                      <span>{video.source}</span>
                    </div>
                  </a>
                ))}
                <p
                  className="mono"
                  style={{ fontSize: 14, color: 'var(--paper-dim)', marginTop: 8 }}
                >
                  {t.app.lessonVideoNote}
                </p>
              </div>
            );

          default:
            return null;
        }
      })}

      {gate && (
        <div className="locked-gate">
          {t.app.lessonGate}
        </div>
      )}
    </>
  );
}
