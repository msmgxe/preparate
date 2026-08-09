'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { grantModule, revokeModule, type EditorState } from '../../actions';

export type AccessRow = {
  id: string;
  areaId: string | null;
  planId: string | null;
  status: string;
  expiresAt: Date | null;
  note: string | null;
  createdAt: Date;
};

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="btn solid sm" disabled={pending}>
      {pending ? 'Abriendo…' : 'Abrir acceso'}
    </button>
  );
}

const fecha = (d: Date | null) =>
  d ? d.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }) : 'sin vencimiento';

/**
 * Conceder y retirar módulos a mano.
 *
 * Es la contraparte del cobro por WhatsApp: aquí queda registrado quién abrió
 * qué, cuándo vence y con qué pago, para no depender de la memoria.
 */
export function Accesses({
  userId,
  areas,
  plans,
  rows,
}: {
  userId: string;
  areas: { id: string; name: string; accent: string }[];
  plans: { id: string; name: string }[];
  rows: AccessRow[];
}) {
  const [state, action] = useActionState(grantModule, {} as EditorState);
  const areaName = (id: string | null) =>
    id === null ? 'Todos los módulos' : (areas.find((a) => a.id === id)?.name ?? id);

  const vigentes = rows.filter((r) => r.status === 'active');

  return (
    <>
      <div className="card" style={{ padding: 20 }}>
        <span className="eyebrow">Abrir un módulo</span>
        <form action={action} style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
          <input type="hidden" name="user_id" value={userId} />

          <select name="area_id" className="mono" style={SELECT} defaultValue="all">
            <option value="all">Todos los módulos</option>
            {areas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>

          <select name="plan_id" className="mono" style={SELECT} defaultValue="">
            <option value="">Sin plan asociado</option>
            {plans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <select name="months" className="mono" style={SELECT} defaultValue="12">
            <option value="1">1 mes</option>
            <option value="3">3 meses</option>
            <option value="6">6 meses</option>
            <option value="12">12 meses</option>
            <option value="never">Sin vencimiento</option>
          </select>

          <input
            name="note"
            placeholder="Yape 12/08 · S/ 590 · mamá"
            style={{ ...SELECT, flex: 1, minWidth: 200 }}
          />

          <Submit />
        </form>

        {state.error && <p className="notice bad">{state.error}</p>}
        {state.notice && <p className="notice good">{state.notice}</p>}
      </div>

      {vigentes.length === 0 ? (
        <p className="empty" style={{ marginTop: 14 }}>
          Sin accesos. El alumno solo ve la muestra gratuita de cada módulo.
        </p>
      ) : (
        <div className="tblwrap" style={{ marginTop: 14 }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Módulo</th>
                <th>Plan</th>
                <th>Vence</th>
                <th>Nota</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vigentes.map((r) => (
                <tr key={r.id}>
                  <td>
                    <b>{areaName(r.areaId)}</b>
                  </td>
                  <td className="mono" style={{ color: 'var(--paper-dim)' }}>
                    {r.planId ?? '—'}
                  </td>
                  <td className="mono">{fecha(r.expiresAt)}</td>
                  <td style={{ color: 'var(--paper-dim)', fontSize: 14 }}>{r.note ?? '—'}</td>
                  <td>
                    <form action={revokeModule}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="user_id" value={userId} />
                      <button
                        className="btn sm"
                        style={{ borderColor: 'var(--coral)', color: 'var(--coral)' }}
                      >
                        Retirar
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

const SELECT: React.CSSProperties = {
  padding: '11px 14px',
  borderRadius: 10,
  border: '1px solid var(--line-strong)',
  background: 'rgba(8,21,30,.5)',
  color: 'var(--paper)',
};
