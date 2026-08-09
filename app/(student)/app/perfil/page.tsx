import Link from 'next/link';
import type { Metadata } from 'next';
import { requireUser } from '@/lib/auth';
import { ProfileForm } from './ProfileForm';

export const metadata: Metadata = { title: 'Mi ficha · RUMBO' };

export default async function PerfilPage() {
  const profile = await requireUser();

  return (
    <>
      <Link className="back" href="/app">
        ← Volver al itinerario
      </Link>

      <section style={{ marginTop: 8 }}>
        <span className="eyebrow">Pasaporte</span>
        <h1 style={{ marginTop: 10 }}>Tu ficha de vuelo</h1>
        <p style={{ marginTop: 14, color: '#CFC6B4', fontSize: 17, maxWidth: '58ch' }}>
          La fecha del examen es la que alimenta la cuenta regresiva del itinerario. Si aún no la
          sabes, pon la estimada: se puede cambiar cuando quieras.
        </p>
      </section>

      <section style={{ marginTop: 26 }}>
        <ProfileForm profile={profile} />
      </section>
    </>
  );
}
