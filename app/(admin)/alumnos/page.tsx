import type { Metadata } from 'next';
import { StudentsTable } from '@/components/admin/StudentsTable';
import { getStudents } from '@/lib/admin-queries';

export const metadata: Metadata = { title: 'Alumnos · RUMBO' };

export default async function AlumnosPage() {
  const students = await getStudents();

  return (
    <>
      <section style={{ marginTop: 32 }}>
        <span className="eyebrow">Pasajeros</span>
        <h1 style={{ marginTop: 10, fontSize: 'clamp(28px,4.6vw,42px)' }}>
          {students.length} {students.length === 1 ? 'alumno' : 'alumnos'}
        </h1>
      </section>

      <section style={{ marginTop: 26 }}>
        <StudentsTable students={students} />
      </section>

      <p className="hint" style={{ textAlign: 'left', marginTop: 22 }}>
        Cada alumno ve exactamente los mismos indicadores que ves tú de él. Si hay un dato que no le
        mostrarías, probablemente no deberías recolectarlo.
      </p>
    </>
  );
}
