import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BrainCircuit,
  CalendarClock,
  GraduationCap,
  MessageCircle,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
} from 'lucide-react';
import { getLandingModules, getLandingPlans } from '@/lib/landing-queries';
import { getI18n, fill } from '@/lib/i18n';
import { money } from '@/lib/money';
import { LandingNav } from '@/components/landing/Nav';
import { HeroShot, PHOTO } from '@/components/landing/Photos';
import { Road } from '@/components/Road';
import { site, whatsappLink } from '@/lib/site';
import { Counter, Reveal } from '@/components/landing/Reveal';
import { Demo } from '@/components/landing/Demo';
import { Modules } from '@/components/landing/Modules';
import { EnglishRoadmap } from '@/components/landing/EnglishRoadmap';
import { PlanPicker } from '@/components/landing/PlanPicker';
import { Faq } from '@/components/landing/Faq';

export const dynamic = 'force-dynamic';

/** Los iconos del método; el texto viene traducido del diccionario. */
const METHOD_ICONS = [BookOpenCheck, Target, BrainCircuit];

export default async function LandingPage() {
  const { locale, t } = await getI18n();
  const [modules, plans] = await Promise.all([
    getLandingModules(locale),
    getLandingPlans(locale),
  ]);
  const l = t.landing;

  const published = modules.reduce((sum, m) => sum + m.questions, 0);
  const chapters = modules.reduce((sum, m) => sum + m.chapters, 0);
  const english = modules.find((m) => m.id === 'eng');

  return (
    <>
      <LandingNav locale={locale} t={t} />

      {/* ═══ HERO ═══════════════════════════════════════════════════════
          Texto a la izquierda y una foto grande a la derecha, con dos
          tarjetas flotando encima. Las cifras que antes vivían en su propia
          tarjeta se suben aquí: decían lo mismo dos veces. */}
      <section className="lp-wrap">
        <div className="lp-hero">
          <Reveal className="lp-hero-copy">
            <span className="lp-pill">
              <GraduationCap size={14} /> {l.badge}
            </span>

            <h1 style={{ marginTop: 18 }}>
              {l.heroA}
              <br />
              {l.heroB}
              <br />
              <span style={{ color: 'var(--brand)' }}>{l.heroC}</span>
            </h1>

            <p style={{ fontSize: 18.5, marginTop: 20, maxWidth: '50ch' }}>
              {l.heroBody}
            </p>

            <div className="lp-hero-cta">
              <Link href="/registro" className="lp-btn lp-btn-primary lp-btn-lg">
                {t.common.startFree} <ArrowRight size={18} />
              </Link>
              <a href="#planes" className="lp-btn lp-btn-ghost lp-btn-lg">
                {l.heroCta2}
              </a>
            </div>

            <p className="lp-muted" style={{ fontSize: 14, marginTop: 14 }}>
              {l.heroNote}
            </p>

            <div className="lp-proof">
              {[
                { value: <Counter to={chapters} />, label: l.statChapters },
                { value: <Counter to={published} suffix="+" />, label: l.statQuestions },
                { value: <Counter to={5} />, label: l.statModules },
              ].map((stat, i) => (
                <div key={i}>
                  <b>{stat.value}</b>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <HeroShot
              alt={l.heroAlt}
              caption={l.heroShot}
              cards={[
                { l: l.heroCard1[0], v: l.heroCard1[1] },
                { l: l.heroCard2[0], v: l.heroCard2[1] },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ═══ LA MUESTRA EN VIVO ═══ */}
      <section className="lp-wrap" style={{ paddingTop: 64 }}>
        <Reveal>
          <Demo t={l} />
        </Reveal>
      </section>

      {/* ═══ MÓDULOS ═══ */}
      <section id="modulos" className="lp-wrap lp-section">
        <Reveal>
          <span className="lp-eyebrow">{l.modulesEyebrow}</span>
          <h2 style={{ marginTop: 10 }}>{l.modulesTitle}</h2>
          <p style={{ fontSize: 18, marginTop: 12, maxWidth: '62ch' }}>{l.modulesBody}</p>
          <p className="lp-muted" style={{ fontSize: 14, marginTop: 10, maxWidth: '62ch' }}>
            {l.priceNote}
          </p>
        </Reveal>

        <Reveal delay={80} className="lp-grid" >
          <div style={{ marginTop: 30 }}>
            <Modules modules={modules} t={l} locale={locale} />
          </div>
        </Reveal>
      </section>


      {/* ═══ PARA QUIÉN ES ══════════════════════════════════════════════ */}
      <section id="para-quien" className="lp-wrap lp-section">
        <Reveal>
          <span className="lp-eyebrow">{t.who.eyebrow}</span>
          <h2 style={{ marginTop: 10 }}>{t.who.title}</h2>
          <p style={{ fontSize: 18, marginTop: 12, maxWidth: '62ch' }}>{t.who.body}</p>
        </Reveal>

        <div
          className="lp-grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', marginTop: 32 }}
        >
          {t.who.cases.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <article className="lp-card lp-card-hover" style={{ padding: 0, height: '100%', overflow: 'hidden' }}>
                <div className="lp-casephoto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={PHOTO.casos[i]} alt="" width={900} height={620} loading="lazy" />
                </div>
                <div style={{ padding: 22 }}>
                  <h3>{item.title}</h3>
                  <p style={{ fontSize: 15.5, marginTop: 9, lineHeight: 1.65 }}>{item.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <p className="lp-muted" style={{ fontSize: 14.5, marginTop: 20, textAlign: 'center' }}>
            {t.who.age}
          </p>
        </Reveal>
      </section>

      {/* ═══ INGLÉS ═══ */}
      <section id="ingles" className="lp-section" style={{ background: 'var(--surface-2)' }}>
        <div className="lp-wrap">
          <Reveal>
            <div
              className="lp-card"
              style={{
                padding: '32px 30px',
                background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 14%, var(--surface)), var(--surface))',
                borderColor: 'color-mix(in srgb, var(--accent) 40%, var(--line))',
              }}
            >
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                <span className="lp-pill lp-pill-accent">
                  <Sparkles size={14} /> {l.englishBadge}
                </span>
                {english?.priceMonth && (
                  <span className="lp-muted" style={{ fontSize: 14, fontWeight: 600 }}>
                    {fill(l.englishPrice, { price: money(english.priceMonth, locale) })}
                  </span>
                )}
              </div>

              <h2 style={{ marginTop: 16 }}>
                {l.englishTitleA} <span style={{ color: 'var(--accent)' }}>C1</span>
              </h2>
              <p style={{ fontSize: 18, marginTop: 12, maxWidth: '64ch' }}>
                {l.englishBody}
              </p>

              <div style={{ marginTop: 26 }}>
                <EnglishRoadmap
                  levels={l.roadmap}
                  weeksLabel={l.englishWeeks}
                  onFinishLabel={l.englishOnFinish}
                />
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
                <a
                  href={whatsappLink(t.wa.waitlist)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lp-btn lp-btn-accent lp-btn-lg"
                >
                  {l.englishCta} <ArrowRight size={18} />
                </a>
                <a href="#planes" className="lp-btn lp-btn-ghost lp-btn-lg">
                  {l.englishCta2}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ MÉTODO ═══ */}
      <section id="metodo" className="lp-wrap lp-section">
        <Reveal>
          <span className="lp-eyebrow">{l.methodEyebrow}</span>
          <h2 style={{ marginTop: 10 }}>{l.methodTitle}</h2>
          <p style={{ fontSize: 18, marginTop: 12, maxWidth: '62ch' }}>{l.methodBody}</p>
        </Reveal>

        <div className="lp-steps">
          {l.method.map((step, i) => {
            const Icon = METHOD_ICONS[i];
            return (
              <Reveal key={step.title} delay={i * 100}>
                <article className="lp-step">
                  <div className="lp-stepimg">
                    {/* decorativa: el titular de al lado ya dice lo que hay que saber */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={PHOTO.pasos[i]} alt="" width={900} height={675} loading="lazy" />
                    <span className="lp-stepnum">{i + 1}</span>
                  </div>
                  <div className="lp-stepbody">
                    <div className="lp-stephead">
                      <span className="lp-vp-icon">
                        <Icon size={21} />
                      </span>
                      <span className="lp-vp-time">{step.time}</span>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ═══ EL CAMINO ══════════════════════════════════════════════════
          Las tres etapas por las que pasa un alumno, dibujadas como una
          carretera. El mismo componente se reutiliza en la guía de dentro. */}
      <section id="camino" className="lp-section" style={{ background: 'var(--surface-2)' }}>
        <div className="lp-wrap">
          <Reveal>
            <span className="lp-eyebrow">{t.route.eyebrow}</span>
            <h2 style={{ marginTop: 10 }}>{t.route.title}</h2>
            <p style={{ fontSize: 18, marginTop: 12, maxWidth: '64ch' }}>{t.route.body}</p>
          </Reveal>

          <Reveal delay={80}>
            <Road
              label={t.route.title}
              colors={['var(--brand)', 'var(--accent)', 'var(--lime)']}
              stops={t.route.stops.map((s, i) => ({
                tag: s.tag,
                title: s.title,
                body: s.body,
                icon: [<Target key="a" size={22} />, <BookOpenCheck key="b" size={22} />, <BadgeCheck key="c" size={22} />][i],
              }))}
            />
          </Reveal>

          <Reveal delay={160}>
            <p className="lp-muted" style={{ fontSize: 14.5, marginTop: 22, textAlign: 'center' }}>
              {t.route.note}
            </p>
          </Reveal>
        </div>
      </section>


      {/* ═══ LO QUE YA ESTÁ HECHO ═══════════════════════════════════════ */}
      <section id="metodo-detalle" className="lp-section" style={{ background: 'var(--surface-2)' }}>
        <div className="lp-wrap">
          <Reveal>
            <span className="lp-eyebrow">{t.proof.eyebrow}</span>
            <h2 style={{ marginTop: 10 }}>{t.proof.title}</h2>
            <p style={{ fontSize: 18, marginTop: 12, maxWidth: '64ch' }}>{t.proof.body}</p>
          </Reveal>

          <div
            className="lp-grid"
            style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', marginTop: 32 }}
          >
            {t.proof.items.map((item, i) => (
              <Reveal key={item.tag} delay={i * 90}>
                <article className="lp-card lp-card-hover" style={{ padding: 26, height: '100%' }}>
                  <span className="lp-pill lp-pill-accent">{item.tag}</span>
                  <h3 style={{ marginTop: 14 }}>{item.title}</h3>
                  <p style={{ fontSize: 15.5, marginTop: 10, lineHeight: 1.65 }}>{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* ── las cifras de lo construido ───────────────────────────── */}
          <Reveal delay={120}>
            <div className="lp-card" style={{ marginTop: 26, padding: '26px 24px' }}>
              <span className="lp-eyebrow">{t.proof.statsTitle}</span>
              <div
                style={{
                  display: 'grid',
                  gap: 22,
                  gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
                  marginTop: 18,
                  textAlign: 'center',
                }}
              >
                {t.proof.stats.map(([value, label]) => (
                  <div key={label}>
                    <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-.03em', color: 'var(--brand)' }}>
                      <Counter to={Number(value)} />
                    </div>
                    <div className="lp-muted" style={{ fontSize: 13.5, marginTop: 4 }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── lo que acompaña ───────────────────────────────────────── */}
          <Reveal delay={160}>
            <div style={{ marginTop: 26 }}>
              <span className="lp-eyebrow">{t.proof.extrasTitle}</span>
              <div
                className="lp-grid"
                style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', marginTop: 14 }}
              >
                {t.proof.extras.map(([head, body]) => (
                  <div key={head} className="lp-card" style={{ padding: 18 }}>
                    <b style={{ fontSize: 15, display: 'block' }}>{head}</b>
                    <p style={{ fontSize: 14, marginTop: 5, lineHeight: 1.55 }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── de dónde viene esto ───────────────────────────────────── */}
          <Reveal delay={200}>
            <div
              className="lp-card"
              style={{
                marginTop: 26,
                padding: '24px 26px',
                borderLeft: '3px solid var(--accent)',
              }}
            >
              <h3 style={{ fontSize: 18 }}>{t.proof.startupTitle}</h3>
              <p style={{ fontSize: 15.5, marginTop: 10, lineHeight: 1.7, maxWidth: '72ch' }}>
                {t.proof.startupBody}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ PLANES ═══ */}
      <section id="planes" className="lp-section" style={{ background: 'var(--surface-2)' }}>
        <div className="lp-wrap">
          <Reveal>
            <span className="lp-eyebrow">{l.plansEyebrow}</span>
            <h2 style={{ marginTop: 10 }}>{l.plansTitle}</h2>
            <p style={{ fontSize: 18, marginTop: 12, maxWidth: '62ch' }}>{l.plansBody}</p>
            <p className="lp-muted" style={{ fontSize: 14, marginTop: 10, maxWidth: '62ch' }}>
              {l.priceNote}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div style={{ marginTop: 32 }}>
              <PlanPicker plans={plans} modules={modules} t={l} locale={locale} />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              className="lp-card"
              style={{
                marginTop: 26,
                padding: '22px 24px',
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <ShieldCheck size={26} style={{ color: 'var(--lime)', flex: 'none' }} />
              <div style={{ flex: 1, minWidth: 260 }}>
                <h3 style={{ fontSize: 17 }}>{l.guaranteeTitle}</h3>
                <p style={{ fontSize: 14.5, marginTop: 4 }}>{l.guaranteeBody}</p>
              </div>
              <a
                href={whatsappLink(t.wa.plans)}
                target="_blank"
                rel="noopener noreferrer"
                className="lp-btn lp-btn-ghost"
              >
                <MessageCircle size={17} /> {l.guaranteeCta}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ TESTIMONIOS ═══ */}
      <section className="lp-wrap lp-section">
        <Reveal>
          <span className="lp-eyebrow">{l.socialEyebrow}</span>
          <h2 style={{ marginTop: 10 }}>{l.socialTitle}</h2>
        </Reveal>

        <div
          className="lp-grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', marginTop: 30 }}
        >
          {l.testimonials.map((item, i) => (
            <Reveal key={item.name} delay={i * 100}>
              <figure className="lp-card lp-card-hover" style={{ padding: 26, height: '100%', margin: 0 }}>
                <Quote size={22} style={{ color: 'var(--brand)', opacity: 0.5 }} />
                <blockquote style={{ fontSize: 16, lineHeight: 1.65, marginTop: 12, color: 'var(--text)' }}>
                  {item.quote}
                </blockquote>
                <figcaption style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 11 }}>
                  <span
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      display: 'grid',
                      placeContent: 'center',
                      background: 'var(--brand-soft)',
                      color: 'var(--brand)',
                      fontWeight: 800,
                      fontSize: 14,
                    }}
                  >
                    {item.name.slice(0, 1)}
                  </span>
                  <span>
                    <span style={{ display: 'block', fontWeight: 700, fontSize: 14.5, color: 'var(--text)' }}>
                      {item.name}
                    </span>
                    <span className="lp-muted" style={{ fontSize: 13 }}>
                      {item.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p
            className="lp-muted"
            style={{ fontSize: 13, marginTop: 20, textAlign: 'center', maxWidth: '62ch', marginInline: 'auto' }}
          >
            {l.socialNote}
          </p>
        </Reveal>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="preguntas" className="lp-section" style={{ background: 'var(--surface-2)' }}>
        <div className="lp-wrap">
          <Reveal>
            <span className="lp-eyebrow">{l.faqEyebrow}</span>
            <h2 style={{ marginTop: 10, marginBottom: 30 }}>{l.faqTitle}</h2>
          </Reveal>
          <Reveal delay={80}>
            <Faq items={l.faq} />
          </Reveal>
        </div>
      </section>

      {/* ═══ CIERRE ═══ */}
      <section className="lp-wrap lp-section">
        <Reveal>
          <div
            className="lp-card"
            style={{
              padding: '46px 34px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, var(--brand), var(--accent))',
              border: 'none',
              color: '#fff',
            }}
          >
            <h2 style={{ color: '#fff' }}>{l.closingTitle}</h2>
            <p style={{ color: 'rgba(255,255,255,.9)', fontSize: 18, marginTop: 12, maxWidth: '54ch', marginInline: 'auto' }}>
              {l.closingBody}
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 26, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/registro"
                className="lp-btn lp-btn-lg"
                style={{ background: '#fff', color: 'var(--brand)' }}
              >
                {l.closingCta} <ArrowRight size={18} />
              </Link>
              <a
                href={whatsappLink(t.wa.info)}
                target="_blank"
                rel="noopener noreferrer"
                className="lp-btn lp-btn-lg"
                style={{ background: 'rgba(255,255,255,.16)', color: '#fff', borderColor: 'rgba(255,255,255,.4)' }}
              >
                <MessageCircle size={18} /> {t.common.whatsapp}
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: '1px solid var(--line)', paddingBlock: 40 }}>
        <div
          className="lp-wrap"
          style={{ display: 'flex', gap: 30, flexWrap: 'wrap', justifyContent: 'space-between' }}
        >
          <div style={{ maxWidth: 320 }}>
            <div className="lp-logo">
              RUMBO <span>Admisión</span>
            </div>
            <p style={{ fontSize: 14, marginTop: 10 }}>
              {l.footerBlurb}
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 14, fontSize: 14 }}>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="lp-muted">
                Instagram
              </a>
              <a href={site.tiktok} target="_blank" rel="noopener noreferrer" className="lp-muted">
                TikTok
              </a>
              <a href={`mailto:${site.email}`} className="lp-muted">
                {site.email}
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 44, flexWrap: 'wrap', fontSize: 14.5 }}>
            <div style={{ display: 'grid', gap: 9 }}>
              <span style={{ fontWeight: 700 }}>{l.footerPlatform}</span>
              <a href="#modulos" className="lp-muted">{t.nav.modules}</a>
              <a href="#ingles" className="lp-muted">{t.nav.english}</a>
              <a href="#planes" className="lp-muted">{t.nav.plans}</a>
              <Link href="/login" className="lp-muted">{t.common.login}</Link>
            </div>
            <div style={{ display: 'grid', gap: 9 }}>
              <span style={{ fontWeight: 700 }}>{l.footerLegal}</span>
              <span className="lp-muted">{l.footerTerms}</span>
              <span className="lp-muted">{l.footerPrivacy}</span>
              <span className="lp-muted">{l.footerRefund}</span>
            </div>
          </div>

          <div>
            <a
              href={whatsappLink(t.wa.short)}
              target="_blank"
              rel="noopener noreferrer"
              className="lp-btn lp-btn-primary"
            >
              <MessageCircle size={17} /> {l.footerSupport}
            </a>
            <div className="lp-muted" style={{ fontSize: 13, marginTop: 10, display: 'flex', gap: 7, alignItems: 'center' }}>
              <Timer size={14} /> {l.footerHours}
            </div>
            <div className="lp-muted" style={{ fontSize: 13, marginTop: 6, display: 'flex', gap: 7, alignItems: 'center' }}>
              <BadgeCheck size={14} /> {l.footerPay}
            </div>
            <div className="lp-muted" style={{ fontSize: 13, marginTop: 6, display: 'flex', gap: 7, alignItems: 'center' }}>
              <CalendarClock size={14} /> {l.footerCalls}
            </div>
          </div>
        </div>

        <div
          className="lp-wrap lp-muted"
          style={{ fontSize: 13, marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--line)' }}
        >
          © {new Date().getFullYear()} RUMBO. {l.footerDisclaimer}
          <br />
          {l.footerAuthor} <a href={whatsappLink(t.wa.short)} target="_blank" rel="noopener noreferrer">{site.whatsappPretty}</a>
        </div>
      </footer>
    </>
  );
}
