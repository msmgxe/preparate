'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Revelado al entrar en pantalla y contador animado.
 *
 * Con IntersectionObserver y CSS, sin librería de animación: son ~40 líneas
 * frente a los ~50 KB que pesaría traer una, y el efecto es el mismo. Ambos
 * respetan `prefers-reduced-motion` desde el CSS.
 */
function useInView<T extends HTMLElement>(once = true) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return { ref, inView };
}

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`lp-reveal${inView ? ' is-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Cuenta hasta `to` cuando el número entra en pantalla. */
export function Counter({
  to,
  suffix = '',
  prefix = '',
  duration = 1400,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      raf = requestAnimationFrame(() => setValue(to));
      return () => cancelAnimationFrame(raf);
    }

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo: arranca rápido y frena, que es como se lee un contador
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString('es-PE')}
      {suffix}
    </span>
  );
}
