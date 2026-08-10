import Link from 'next/link';
import { whatsappLink } from '@/lib/site';
import { getI18n, fill } from '@/lib/i18n';

/**
 * Lo que ve un alumno cuando el módulo no está abierto.
 *
 * No esconde el contenido detrás de un error: dice qué falta, por qué y cómo
 * abrirlo. El pago es manual (Yape o transferencia por WhatsApp), así que el
 * botón lleva a una conversación, no a un checkout.
 */
export async function Paywall({
  areaName,
  areaAccent,
  title,
  kind,
}: {
  areaName: string;
  areaAccent: string;
  title?: string;
  kind: 'lesson' | 'exam' | 'practice';
}) {
  const { t } = await getI18n();
  const copy = {
    lesson: { head: t.app.paywallLessonHead, body: t.app.paywallLessonBody },
    exam: { head: t.app.paywallExamHead, body: t.app.paywallExamBody },
    practice: { head: t.app.paywallPracticeHead, body: t.app.paywallPracticeBody },
  }[kind];

  return (
    <>
      <Link className="back" href="/app">
        {t.common.backToItinerary}
      </Link>

      <section style={{ marginTop: 8, maxWidth: 640 }}>
        <span className="eyebrow" style={{ color: areaAccent }}>
          {areaName}
          {title ? ` · ${title}` : ''}
        </span>
        <h1 style={{ marginTop: 12, fontSize: 'clamp(26px,4.2vw,38px)' }}>{copy.head}</h1>
        <p style={{ marginTop: 14, color: 'var(--paper-dim)', fontSize: 17.5, lineHeight: 1.65 }}>
          {copy.body}
        </p>

        <div className="qnav" style={{ marginTop: 28 }}>
          <a
            className="btn solid"
            href={whatsappLink(fill(t.wa.buyModule, { module: areaName }))}
            target="_blank"
            rel="noopener noreferrer"
          >
            {fill(t.app.paywallActivate, { area: areaName })}
          </a>
          <Link className="btn sm" href="/#planes">
            {t.app.paywallAllPlans}
          </Link>
        </div>

        <p className="hint" style={{ textAlign: 'left', marginTop: 22 }}>
          {t.app.paywallPay}
        </p>
      </section>
    </>
  );
}
