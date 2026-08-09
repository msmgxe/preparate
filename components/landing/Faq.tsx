'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

/** Las dudas que frenan a un padre justo antes de pagar. */
const FAQ = [
  {
    q: '¿Cómo se paga y qué pasa después?',
    a: 'Escribes por WhatsApp, te confirmamos el plan y pagas por Yape, Plin o transferencia. En cuanto llega el pago abrimos el acceso, normalmente el mismo día. No pedimos tarjeta ni guardamos datos bancarios.',
  },
  {
    q: '¿Puedo comprar un solo curso en vez de todo?',
    a: 'Sí. Cada módulo se vende por separado desde S/ 39 al mes. Si tu hijo solo necesita reforzar Razonamiento Verbal, pagas ese. Los planes completos salen a cuenta a partir de tres módulos.',
  },
  {
    q: '¿Qué pasa si no ingresa?',
    a: 'En el plan Familiar renuevas el año siguiente sin costo, siempre que haya practicado al menos 3 horas por semana — lo verificamos con el reporte de actividad, que tú también ves. Es una garantía de acompañamiento, no de resultado: nadie puede prometerte una vacante.',
  },
  {
    q: '¿Cómo sé que está estudiando de verdad?',
    a: 'Con el plan Familiar recibes un reporte semanal por correo: minutos practicados, precisión por área y capítulos flojos. Si deja de entrar 4 días seguidos, te avisamos. Tu hijo ve exactamente los mismos números que tú.',
  },
  {
    q: '¿Sirve para ISIL, USIL, UPC o Universidad de Lima?',
    a: 'Sí. Los simulacros se arman con la mezcla real de cada institución: ISIL evalúa potencial con 50 % verbal y 50 % matemático, mientras que otras incluyen Matemática y Cultura General. Eliges la institución y el simulacro se adapta.',
  },
  {
    q: '¿Puedo cancelar?',
    a: 'El plan mensual se cancela cuando quieras y sigue activo hasta el final del mes pagado. Los planes anuales no se prorratean, pero puedes transferirlos a otro hermano dentro del mismo año.',
  },
  {
    q: '¿Cuándo estará listo el curso de Inglés?',
    a: 'La ruta completa A1 → C1 ya está diseñada y hay clases publicadas. Estamos produciendo el resto por niveles. Quien tenga el Pase de Admisión o el plan Familiar entra en la preventa sin pagar aparte.',
  },
  {
    q: '¿Desde qué edad conviene empezar?',
    a: 'Desde 4.º de secundaria. Cuanto antes se empieza, más se aprovecha la repetición espaciada: lo que se falla vuelve a aparecer a los días 1, 3, 7 y 21, y eso necesita meses para rendir de verdad.',
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div style={{ display: 'grid', gap: 10, maxWidth: 820, margin: '0 auto' }}>
      {FAQ.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="lp-card" style={{ padding: 0, overflow: 'hidden' }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '18px 22px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: 16.5,
                fontWeight: 600,
                color: 'var(--text)',
              }}
            >
              <span style={{ flex: 1 }}>{item.q}</span>
              <Plus
                size={19}
                style={{
                  flex: 'none',
                  color: 'var(--brand)',
                  transition: 'transform .22s',
                  transform: isOpen ? 'rotate(45deg)' : 'none',
                }}
              />
            </button>
            {isOpen && (
              <p
                style={{
                  padding: '0 22px 20px',
                  fontSize: 15.5,
                  lineHeight: 1.65,
                  animation: 'fade .25s ease',
                }}
              >
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
