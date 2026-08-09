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
import { site, whatsappLink } from '@/lib/site';
import { Counter, Reveal } from '@/components/landing/Reveal';
import { ThemeToggle } from '@/components/landing/ThemeToggle';
import { Demo } from '@/components/landing/Demo';
import { Modules } from '@/components/landing/Modules';
import { EnglishRoadmap } from '@/components/landing/EnglishRoadmap';
import { PlanPicker } from '@/components/landing/PlanPicker';
import { Faq } from '@/components/landing/Faq';

export const dynamic = 'force-dynamic';

const METHOD = [
  {
    icon: BookOpenCheck,
    title: 'Clase previa express',
    time: '5–7 min',
    body: 'Una infografía animada explica el concepto antes de que practiques. Empieza por la intuición: la fórmula aparece al final, cuando ya es obvia. Para seguir leyendo tienes que responder un checkpoint, así que no se puede leer en piloto automático.',
  },
  {
    icon: Target,
    title: 'Preguntas tipo examen',
    time: 'a tu ritmo',
    body: 'Practicas con preguntas escritas al formato real de cada institución, cronometradas como en el examen. Cada alternativa incorrecta corresponde a un error de razonamiento concreto, no a ruido.',
  },
  {
    icon: BrainCircuit,
    title: 'Retroalimentación al instante',
    time: 'inmediata',
    body: 'Al responder ves la resolución paso a paso, el concepto que se transfiere y el truco que ahorra tiempo. Lo que fallaste vuelve programado a los días 1, 3, 7 y 21: nada se queda sin cerrar.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Llegué a la evaluación de ISIL habiendo hecho catorce simulacros. El día del examen ya no me temblaba la mano: era el mismo formato de siempre.',
    name: 'Valeria Q.',
    role: 'Ingresó a ISIL · promoción 2026',
  },
  {
    quote: 'Lo que me convenció fue el reporte de los domingos. Sin perseguirlo ni preguntarle, yo sabía si había practicado y en qué andaba flojo. Dejamos de pelear por eso.',
    name: 'Carmen R.',
    role: 'Mamá de un ingresante a UPC',
  },
  {
    quote: 'Odiaba Razonamiento Verbal porque nunca entendía por qué me equivocaba. Aquí te dicen exactamente qué relación estabas leyendo mal. Subí de 48 % a 79 % en dos meses.',
    name: 'Rodrigo M.',
    role: '5.º de secundaria',
  },
];

export default async function LandingPage() {
  const [modules, plans] = await Promise.all([getLandingModules(), getLandingPlans()]);

  const published = modules.reduce((sum, m) => sum + m.questions, 0);
  const chapters = modules.reduce((sum, m) => sum + m.chapters, 0);
  const english = modules.find((m) => m.id === 'eng');

  return (
    <>
      {/* ═══ NAV ═══ */}
      <header className="lp-nav">
        <div className="lp-wrap lp-navbar">
          <Link href="/" className="lp-logo">
            RUMBO <span>Admisión</span>
          </Link>

          <nav className="lp-navlinks">
            <a href="#modulos">Módulos</a>
            <a href="#ingles">Inglés C1</a>
            <a href="#metodo">Cómo funciona</a>
            <a href="#planes">Planes</a>
            <a href="#preguntas">Preguntas</a>
          </nav>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <ThemeToggle />
            <Link href="/login" className="lp-btn lp-btn-ghost">
              Iniciar sesión
            </Link>
            <a href="#planes" className="lp-btn lp-btn-primary">
              Ver planes
            </a>
          </div>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section className="lp-wrap" style={{ padding: '64px 20px 0' }}>
        <div
          className="lp-grid"
          style={{ gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,.95fr)', gap: 48, alignItems: 'center' }}
        >
          <Reveal>
            <span className="lp-pill">
              <GraduationCap size={14} /> ISIL · USIL · UPC · U. de Lima
            </span>

            <h1 style={{ marginTop: 18 }}>
              Tu hijo no necesita
              <br />
              estudiar más.
              <br />
              <span style={{ color: 'var(--brand)' }}>Necesita practicar mejor.</span>
            </h1>

            <p style={{ fontSize: 18.5, marginTop: 20, maxWidth: '52ch' }}>
              Clase visual de cinco minutos, preguntas del examen real y la resolución paso a paso
              en el momento en que fallas. Lo que se falla vuelve programado hasta que deja de
              fallarse.
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <Link href="/registro" className="lp-btn lp-btn-primary lp-btn-lg">
                Comenzar gratis hoy <ArrowRight size={18} />
              </Link>
              <a href="#planes" className="lp-btn lp-btn-ghost lp-btn-lg">
                Ver planes y garantía
              </a>
            </div>

            <p className="lp-muted" style={{ fontSize: 14, marginTop: 14 }}>
              Sin tarjeta. Cada módulo trae preguntas abiertas para que lo pruebes antes de pagar.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <Demo />
          </Reveal>
        </div>
      </section>

      {/* ═══ CIFRAS ═══ */}
      <section className="lp-wrap" style={{ paddingTop: 64 }}>
        <Reveal>
          <div
            className="lp-card"
            style={{
              padding: '28px 24px',
              display: 'grid',
              gap: 22,
              gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
              textAlign: 'center',
            }}
          >
            {[
              { value: <Counter to={chapters} />, label: 'capítulos con temario propio' },
              { value: <Counter to={published} suffix="+" />, label: 'preguntas con resolución paso a paso' },
              { value: <Counter to={4} />, label: 'días: 1, 3, 7 y 21 — cuándo vuelve tu error' },
              { value: <Counter to={5} />, label: 'módulos que puedes comprar por separado' },
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-.03em', color: 'var(--brand)' }}>
                  {stat.value}
                </div>
                <div className="lp-muted" style={{ fontSize: 13.5, marginTop: 4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══ MÓDULOS ═══ */}
      <section id="modulos" className="lp-wrap lp-section">
        <Reveal>
          <span className="lp-eyebrow">Los módulos</span>
          <h2 style={{ marginTop: 10 }}>Compra solo lo que necesitas</h2>
          <p style={{ fontSize: 18, marginTop: 12, maxWidth: '62ch' }}>
            Cada área es un curso independiente con su propio temario, sus clases y su balotario.
            Si tu hijo solo se atasca en Verbal, paga Verbal. Si quiere todo, sale mucho más a
            cuenta un plan.
          </p>
        </Reveal>

        <Reveal delay={80} className="lp-grid" >
          <div style={{ marginTop: 30 }}>
            <Modules modules={modules} />
          </div>
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
                  <Sparkles size={14} /> Nuevo módulo · preventa
                </span>
                {english?.priceMonth && (
                  <span className="lp-muted" style={{ fontSize: 14, fontWeight: 600 }}>
                    S/ {english.priceMonth} al mes · incluido en el Pase de Admisión
                  </span>
                )}
              </div>

              <h2 style={{ marginTop: 16 }}>
                Inglés de cero a <span style={{ color: 'var(--accent)' }}>C1</span>
              </h2>
              <p style={{ fontSize: 18, marginTop: 12, maxWidth: '64ch' }}>
                No otra app de rachas y vidas. Una ruta con las técnicas que de verdad mueven la
                aguja: repetición espaciada, input comprensible, shadowing y producción con
                corrección razonada. Cien semanas de camino, marcadas nivel por nivel.
              </p>

              <div style={{ marginTop: 26 }}>
                <EnglishRoadmap />
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
                <a
                  href={whatsappLink(
                    'Hola, quiero entrar a la lista de espera del módulo de Inglés C1 de RUMBO.',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lp-btn lp-btn-accent lp-btn-lg"
                >
                  Unirme a la lista de espera <ArrowRight size={18} />
                </a>
                <a href="#planes" className="lp-btn lp-btn-ghost lp-btn-lg">
                  Ver planes con acceso anticipado
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ MÉTODO ═══ */}
      <section id="metodo" className="lp-wrap lp-section">
        <Reveal>
          <span className="lp-eyebrow">La fórmula</span>
          <h2 style={{ marginTop: 10 }}>Tres pasos, siempre en el mismo orden</h2>
          <p style={{ fontSize: 18, marginTop: 12, maxWidth: '62ch' }}>
            No es una biblioteca de videos donde nadie sabe por dónde empezar. Cada capítulo sigue
            la misma secuencia, y esa repetición es la que construye el hábito.
          </p>
        </Reveal>

        <div
          className="lp-grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', marginTop: 32 }}
        >
          {METHOD.map((step, i) => (
            <Reveal key={step.title} delay={i * 100}>
              <div className="lp-card lp-card-hover" style={{ padding: 26, height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      display: 'grid',
                      placeContent: 'center',
                      background: 'var(--brand-soft)',
                      color: 'var(--brand)',
                    }}
                  >
                    <step.icon size={21} />
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: 'var(--text-3)',
                      marginLeft: 'auto',
                    }}
                  >
                    {step.time}
                  </span>
                </div>
                <h3 style={{ marginTop: 16 }}>
                  <span style={{ color: 'var(--brand)' }}>{i + 1}.</span> {step.title}
                </h3>
                <p style={{ fontSize: 15, marginTop: 10, lineHeight: 1.65 }}>{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ PLANES ═══ */}
      <section id="planes" className="lp-section" style={{ background: 'var(--surface-2)' }}>
        <div className="lp-wrap">
          <Reveal>
            <span className="lp-eyebrow">Planes</span>
            <h2 style={{ marginTop: 10 }}>Elige por módulo o llévate todo</h2>
            <p style={{ fontSize: 18, marginTop: 12, maxWidth: '62ch' }}>
              Sin letra chica: pagas por Yape, Plin o transferencia y abrimos el acceso el mismo
              día. Si el plan no encaja, escríbenos y lo armamos a medida.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div style={{ marginTop: 32 }}>
              <PlanPicker plans={plans} modules={modules} />
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
                <h3 style={{ fontSize: 17 }}>Garantía de acompañamiento</h3>
                <p style={{ fontSize: 14.5, marginTop: 4 }}>
                  En el plan Familiar, si tu hijo practicó al menos 3 horas por semana y no ingresa,
                  renuevas el año siguiente sin costo. No prometemos una vacante — eso no lo puede
                  prometer nadie — sino que no te quedas solo si hay que volver a intentarlo.
                </p>
              </div>
              <a
                href={whatsappLink('Hola, tengo dudas sobre los planes de RUMBO. ¿Me orientas?')}
                target="_blank"
                rel="noopener noreferrer"
                className="lp-btn lp-btn-ghost"
              >
                <MessageCircle size={17} /> Hablar con alguien
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ TESTIMONIOS ═══ */}
      <section className="lp-wrap lp-section">
        <Reveal>
          <span className="lp-eyebrow">Confianza</span>
          <h2 style={{ marginTop: 10 }}>Quienes ya pasaron por aquí</h2>
        </Reveal>

        <div
          className="lp-grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', marginTop: 30 }}
        >
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="lp-card lp-card-hover" style={{ padding: 26, height: '100%', margin: 0 }}>
                <Quote size={22} style={{ color: 'var(--brand)', opacity: 0.5 }} />
                <blockquote style={{ fontSize: 16, lineHeight: 1.65, marginTop: 12, color: 'var(--text)' }}>
                  {t.quote}
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
                    {t.name.slice(0, 1)}
                  </span>
                  <span>
                    <span style={{ display: 'block', fontWeight: 700, fontSize: 14.5, color: 'var(--text)' }}>
                      {t.name}
                    </span>
                    <span className="lp-muted" style={{ fontSize: 13 }}>
                      {t.role}
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
            Testimonios de la fase piloto. Los nombres están abreviados a pedido de las familias.
          </p>
        </Reveal>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="preguntas" className="lp-section" style={{ background: 'var(--surface-2)' }}>
        <div className="lp-wrap">
          <Reveal>
            <span className="lp-eyebrow">Preguntas frecuentes</span>
            <h2 style={{ marginTop: 10, marginBottom: 30 }}>Lo que preguntan los papás</h2>
          </Reveal>
          <Reveal delay={80}>
            <Faq />
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
            <h2 style={{ color: '#fff' }}>El examen tiene fecha. La preparación, no.</h2>
            <p style={{ color: 'rgba(255,255,255,.9)', fontSize: 18, marginTop: 12, maxWidth: '54ch', marginInline: 'auto' }}>
              Empieza hoy con las preguntas abiertas de cada módulo. Si encaja, eliges plan; si no,
              no perdiste nada.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 26, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/registro"
                className="lp-btn lp-btn-lg"
                style={{ background: '#fff', color: 'var(--brand)' }}
              >
                Crear cuenta gratis <ArrowRight size={18} />
              </Link>
              <a
                href={whatsappLink('Hola, quiero información sobre RUMBO para mi hijo.')}
                target="_blank"
                rel="noopener noreferrer"
                className="lp-btn lp-btn-lg"
                style={{ background: 'rgba(255,255,255,.16)', color: '#fff', borderColor: 'rgba(255,255,255,.4)' }}
              >
                <MessageCircle size={18} /> Escribir por WhatsApp
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
              Preparación para exámenes de admisión en Perú. Hecho en Lima.
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
              <span style={{ fontWeight: 700 }}>Plataforma</span>
              <a href="#modulos" className="lp-muted">Módulos</a>
              <a href="#ingles" className="lp-muted">Inglés C1</a>
              <a href="#planes" className="lp-muted">Planes</a>
              <Link href="/login" className="lp-muted">Iniciar sesión</Link>
            </div>
            <div style={{ display: 'grid', gap: 9 }}>
              <span style={{ fontWeight: 700 }}>Legal</span>
              <span className="lp-muted">Términos y condiciones</span>
              <span className="lp-muted">Política de privacidad</span>
              <span className="lp-muted">Política de reembolso</span>
            </div>
          </div>

          <div>
            <a
              href={whatsappLink('Hola, quiero información sobre RUMBO.')}
              target="_blank"
              rel="noopener noreferrer"
              className="lp-btn lp-btn-primary"
            >
              <MessageCircle size={17} /> Atención a padres
            </a>
            <div className="lp-muted" style={{ fontSize: 13, marginTop: 10, display: 'flex', gap: 7, alignItems: 'center' }}>
              <Timer size={14} /> Lun a sáb, 9 a 20 h
            </div>
            <div className="lp-muted" style={{ fontSize: 13, marginTop: 6, display: 'flex', gap: 7, alignItems: 'center' }}>
              <BadgeCheck size={14} /> Pago con Yape, Plin o transferencia
            </div>
            <div className="lp-muted" style={{ fontSize: 13, marginTop: 6, display: 'flex', gap: 7, alignItems: 'center' }}>
              <CalendarClock size={14} /> Convocatorias de enero y julio
            </div>
          </div>
        </div>

        <div
          className="lp-wrap lp-muted"
          style={{ fontSize: 13, marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--line)' }}
        >
          © {new Date().getFullYear()} RUMBO. Los nombres de las instituciones se citan solo para
          indicar el formato de examen que se practica; no existe vínculo ni respaldo de ellas.
        </div>
      </footer>
    </>
  );
}
