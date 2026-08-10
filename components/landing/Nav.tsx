'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { FontToggle } from '@/components/FontToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { Locale } from '@/lib/i18n/config';
import type { Dict } from '@/lib/i18n/dictionaries/es';

/**
 * La barra de la página de venta.
 *
 * Antes era una fila que nunca se plegaba: cinco enlaces y cinco controles
 * —idioma, tipografía, tema, entrar y ver planes— que a partir de cierto ancho
 * dejaban de caber. Y como no cabían, empujaban la página a lo ancho: en un
 * móvil aparecía una franja negra a la derecha, que era el fondo del documento
 * asomando por donde la landing ya no llegaba.
 *
 * La solución no es esconder el desbordamiento sino no producirlo. Por debajo
 * de 1024 px todo se recoge en un panel, y el botón de planes se queda fuera
 * porque es el único que tiene que estar siempre a un dedo de distancia.
 */
export function LandingNav({
  locale,
  t,
}: {
  locale: Locale;
  t: Dict;
}) {
  const [open, setOpen] = useState(false);

  // con el panel abierto, el fondo no debe poder desplazarse
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const links = [
    ['#modulos', t.nav.modules],
    ['#ingles', t.nav.english],
    ['#metodo', t.nav.method],
    ['#planes', t.nav.plans],
    ['#preguntas', t.nav.faq],
  ] as const;

  return (
    <header className="lp-nav">
      <div className="lp-wrap lp-navbar">
        <Link href="/" className="lp-logo" onClick={() => setOpen(false)}>
          RUMBO <span>Admisión</span>
        </Link>

        {/* ── ancho completo ───────────────────────────────────────── */}
        <nav className="lp-navlinks">
          {links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="lp-navtools">
          <LocaleSwitcher current={locale} variant="landing" label={t.common.language} />
          <FontToggle variant="landing" labels={t.common.fonts} />
          <ThemeToggle defaultDark={false} />
          <Link href="/login" className="lp-btn lp-btn-ghost">
            {t.common.login}
          </Link>
        </div>

        {/* ── siempre visible: es el botón que vende ───────────────── */}
        <a href="#planes" className="lp-btn lp-btn-primary lp-navcta" onClick={() => setOpen(false)}>
          {t.common.seePlans}
        </a>

        <button
          className="lp-burger"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? t.common.closeMenu : t.common.openMenu}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── el panel ──────────────────────────────────────────────── */}
      {open && (
        <div className="lp-panel" role="dialog" aria-label={t.common.menu}>
          <div className="lp-wrap">
            <div className="lp-panel-head">
              <span className="lp-eyebrow">{t.common.menu}</span>
              <button className="lp-burger" onClick={() => setOpen(false)} aria-label={t.common.closeMenu}>
                <X size={20} />
              </button>
            </div>

            <nav className="lp-panel-links">
              {links.map(([href, label]) => (
                <a key={href} href={href} onClick={() => setOpen(false)}>
                  {label}
                </a>
              ))}
            </nav>

            <div className="lp-panel-tools">
              <LocaleSwitcher current={locale} variant="landing" label={t.common.language} />
              <FontToggle variant="landing" labels={t.common.fonts} />
              <ThemeToggle defaultDark={false} />
            </div>

            <Link href="/login" className="lp-btn lp-btn-ghost lp-btn-block" onClick={() => setOpen(false)}>
              {t.common.login}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
