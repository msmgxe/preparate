'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import type { Dict } from '@/lib/i18n/dictionaries/es';

export function Faq({ items }: { items: Dict['landing']['faq'] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div style={{ display: 'grid', gap: 10, maxWidth: 820, margin: '0 auto' }}>
      {items.map((item, i) => {
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
