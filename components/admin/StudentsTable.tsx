import Link from 'next/link';
import { initials } from '@/lib/auth';
import type { StudentRow } from '@/lib/admin-queries';

function lastActiveLabel(s: StudentRow): string {
  if (!s.lastActive) return 'nunca';
  if (s.daysIdle === 0) {
    return `Hoy, ${s.lastActive.toLocaleTimeString('es-PE', { hour: 'numeric', minute: '2-digit' })}`;
  }
  if (s.daysIdle === 1) return 'Ayer';
  return `Hace ${s.daysIdle} días`;
}

const STATUS_LABEL: Record<StudentRow['status'], string> = {
  g: 'En ruta',
  y: 'Atención',
  r: 'Riesgo',
};

export function StudentsTable({ students }: { students: StudentRow[] }) {
  if (!students.length) {
    return <p className="empty">Sin alumnos registrados todavía.</p>;
  }

  return (
    <div className="tblwrap">
      <table className="tbl">
        <thead>
          <tr>
            <th>Alumno</th>
            <th>Racha</th>
            <th>Última actividad</th>
            <th>Precisión</th>
            <th>Min. semana</th>
            <th>Tendencia</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.userId}>
              <td>
                <Link className="who" href={`/alumnos/${s.userId}`}>
                  <div className="av" style={{ background: s.color }}>
                    {initials(s.name)}
                  </div>
                  <div>
                    <b>{s.name}</b>
                    <span>{s.targetOrg ?? 'sin destino'}</span>
                  </div>
                </Link>
              </td>
              <td>
                <span className={`pill ${s.streak > 6 ? 'g' : s.streak > 0 ? 'y' : 'r'}`}>
                  {s.streak} días
                </span>
              </td>
              <td className="mono" style={{ color: 'var(--paper-dim)', fontSize: 13 }}>
                {lastActiveLabel(s)}
              </td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <b style={{ fontFamily: 'var(--display)', fontSize: 16 }}>
                    {s.accuracy === null ? '—' : `${s.accuracy}%`}
                  </b>
                  <div className="bar" style={{ width: 60 }}>
                    <i style={{ width: `${s.accuracy ?? 0}%`, background: s.color }} />
                  </div>
                </div>
              </td>
              <td className="mono">{s.minutesWeek}</td>
              <td
                className={`mono ${s.trend === null ? 'flat' : s.trend > 0 ? 'up' : s.trend < 0 ? 'down' : 'flat'}`}
                style={{ fontSize: 13 }}
              >
                {s.trend === null
                  ? '—'
                  : `${s.trend > 0 ? '▲ +' : s.trend < 0 ? '▼ ' : '– '}${Math.abs(s.trend)}`}
              </td>
              <td>
                <span className={`pill ${s.status}`}>{STATUS_LABEL[s.status]}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
