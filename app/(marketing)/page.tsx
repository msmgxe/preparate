import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BrainCircuit,
  CalendarClock,
  GraduationCap,
  MessageCircle,
  Sparkles,
  Target,
} from 'lucide-react';
import { getLandingModules, getLandingPlans } from '@/lib/landing-queries';
import { getI18n, fill } from '@/lib/i18n';
import { money } from '@/lib/money';
import { LandingNav } from '@/components/landing/Nav';
import { PHOTO, Portrait } from '@/components/landing/Photos';
import { PROOF_SPOTS, SpotStartup } from '@/components/landing/Spots';
import { Road } from '@/components/Road';
import { SectionHead } from '@/components/landing/SectionHead';
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
          Retrato · titular · retrato, con las cifras en un panel debajo que
          cruza las tres columnas. */}
      <section className="lp-wrap">
        <div className="lp-hero">
          <Reveal>
            <Portrait src={PHOTO.heroA} alt={l.heroAlt} />
          </Reveal>

          <Reveal className="lp-hero-copy" delay={60}>
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

            <p style={{ fontSize: 18, marginTop: 20, maxWidth: '46ch' }}>{l.heroBody}</p>

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
          </Reveal>

          <Reveal delay={120}>
            <Portrait src={PHOTO.heroB} alt={l.heroAltB} />
          </Reveal>
        </div>

        <Reveal delay={180}>
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
      </section>

      {/* ═══ LA MUESTRA EN VIVO ═══ */}
      <section className="lp-wrap" style={{ paddingTop: 64 }}>
        <Reveal>
          <Demo t={l} />
        </Reveal>
      </section>

      {/* ═══ MÓDULOS ═══ */}
      <section id="modulos" className="lp-wrap lp-section">
        <SectionHead
          eyebrow={l.modulesEyebrow}
          title={l.modulesTitle}
          body={l.modulesBody}
          note={l.priceNote}
        />

        <Reveal delay={40}>
          <div className="lp-offer">
            <span className="lp-offer-tag">
              <Sparkles size={14} /> {l.offerBadge}
            </span>
            <div className="lp-offer-txt">
              <b>{l.offerTitle}</b>
              <p>{l.offerBody}</p>
            </div>
            <span className="lp-offer-until">{l.offerUntil}</span>
          </div>
        </Reveal>

        <Reveal delay={80} className="lp-grid" >
          <div style={{ marginTop: 30 }}>
            <Modules modules={modules} t={l} locale={locale} />
          </div>
        </Reveal>
      </section>


      {/* ═══ PARA QUIÉN ES ══════════════════════════════════════════════ */}
      <section id="para-quien" className="lp-wrap lp-section">
        <SectionHead eyebrow={t.who.eyebrow} title={t.who.title} body={t.who.body} />

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
                  className="lp-btn lp-btn-wa lp-btn-lg"
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
        <SectionHead eyebrow={l.methodEyebrow} title={l.methodTitle} body={l.methodBody} />

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
          <SectionHead eyebrow={t.route.eyebrow} title={t.route.title} body={t.route.body} />

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
          <SectionHead eyebrow={t.proof.eyebrow} title={t.proof.title} body={t.proof.body} />

          {/* Dos columnas y no cuatro: cada tarjeta lleva dibujo y cinco líneas
              de texto, y a cuatro por fila quedarían en 260 px —una palabra por
              renglón—. En dos filas de dos, además, las cuatro se ven a la vez
              sin el huérfano que dejaba el auto-fit. */}
          <div className="lp-grid lp-proofgrid">
            {t.proof.items.map((item, i) => {
              const Spot = PROOF_SPOTS[i];
              return (
                <Reveal key={item.tag} delay={i * 90}>
                  <article className="lp-card lp-card-hover lp-proofcard">
                    <div className="lp-spot">{Spot && <Spot />}</div>
                    <div className="lp-proofcard-txt">
                      <span className="lp-pill lp-pill-accent">{item.tag}</span>
                      <h3 style={{ marginTop: 14 }}>{item.title}</h3>
                      <p style={{ fontSize: 15.5, marginTop: 10, lineHeight: 1.65 }}>{item.body}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
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
            <div className="lp-card lp-startup">
              <div>
                <h3 style={{ fontSize: 18 }}>{t.proof.startupTitle}</h3>
                <p style={{ fontSize: 15.5, marginTop: 10, lineHeight: 1.7 }}>
                  {t.proof.startupBody}
                </p>
              </div>
              <div className="lp-startup-art">
                <SpotStartup />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ PLANES ═══ */}
      <section id="planes" className="lp-section" style={{ background: 'var(--surface-2)' }}>
        <div className="lp-wrap">
          <SectionHead
            eyebrow={l.plansEyebrow}
            title={l.plansTitle}
            body={l.plansBody}
            note={l.priceNote}
          />


          <Reveal delay={40}>
            <div className="lp-offer">
              <span className="lp-offer-tag">
                <Sparkles size={14} /> {l.offerBadge}
              </span>
              <div className="lp-offer-txt">
                <b>{l.offerTitle}</b>
                <p>{l.offerBody}</p>
              </div>
              <span className="lp-offer-until">{l.offerUntil}</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div style={{ marginTop: 32 }}>
              <PlanPicker plans={plans} modules={modules} t={l} locale={locale} />
            </div>
          </Reveal>

        </div>
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
                className="lp-btn lp-btn-wa lp-btn-lg"
              >
                <MessageCircle size={18} /> {t.common.whatsapp}
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="lp-foot">
        <div
          className="lp-wrap"
          style={{ display: 'flex', gap: 30, flexWrap: 'wrap', justifyContent: 'space-between' }}
        >
          <div style={{ maxWidth: 320 }}>
            <div className="lp-logo lp-foot-logo">
              RUMBO <span>Admisión</span>
            </div>
            <p style={{ fontSize: 14, marginTop: 10 }}>
              {l.footerBlurb}
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 14, fontSize: 14 }}>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href={site.tiktok} target="_blank" rel="noopener noreferrer">
                TikTok
              </a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 44, flexWrap: 'wrap', fontSize: 14.5 }}>
            <div style={{ display: 'grid', gap: 9 }}>
              <span style={{ fontWeight: 700 }}>{l.footerPlatform}</span>
              <a href="#modulos">{t.nav.modules}</a>
              <a href="#ingles">{t.nav.english}</a>
              <a href="#planes">{t.nav.plans}</a>
              <Link href="/login">{t.common.login}</Link>
            </div>
            <div style={{ display: 'grid', gap: 9 }}>
              <span style={{ fontWeight: 700 }}>{l.footerLegal}</span>
              <span>{l.footerTerms}</span>
              <span>{l.footerPrivacy}</span>
              <span>{l.footerRefund}</span>
            </div>
          </div>

          <div>
            <a
              href={whatsappLink(t.wa.short)}
              target="_blank"
              rel="noopener noreferrer"
              className="lp-btn lp-btn-wa"
            >
              <MessageCircle size={17} /> {l.footerSupport}
            </a>
            <div className="lp-foot-note">
              <BadgeCheck size={14} /> {l.footerPay}
            </div>
            <div className="lp-foot-note">
              <CalendarClock size={14} /> {l.footerCalls}
            </div>
          </div>
        </div>

        <div className="lp-wrap lp-foot-legal">
          © {new Date().getFullYear()} RUMBO. {l.footerDisclaimer}
          <br />
          {l.footerAuthor} <a href={whatsappLink(t.wa.short)} target="_blank" rel="noopener noreferrer">{site.whatsappPretty}</a>
        </div>
      </footer>
    </>
  );
}
