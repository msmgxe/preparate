# RUMBO — puesta en marcha

Stack: **Next.js 16 (App Router) + Neon Postgres + Drizzle + Neon Auth + Vercel**.

---

## 1 · Base de datos (Neon)

1. Crea un proyecto en [Neon](https://console.neon.tech), región **São Paulo (`sa-east-1`)** —
   es la más cercana a Lima.
2. Copia la cadena de conexión **con pooling** (la que termina en `-pooler`).
3. `cp .env.local.example .env.local` y pega la cadena en `DATABASE_URL`.

Aplica el esquema y el contenido del prototipo:

```bash
npm run db:seed     # esquema + balotario + clases visuales + infografías
# o solo el esquema:
npm run db:setup
```

Los dos archivos (`docs/schema.sql`, `docs/seed.sql`) son idempotentes: puedes
reejecutarlos. Si prefieres pegarlos a mano, el editor SQL de Neon los acepta tal cual.

**Criterio de aceptación:** las tablas existen y `select count(*) from questions;`
devuelve 6.

---

## 2 · Autenticación (Neon Auth)

1. En la consola de Neon, pestaña **Auth**, habilita Neon Auth en el proyecto.
2. Copia la URL base a `NEON_AUTH_BASE_URL`.
3. Genera el secreto de cookie (mínimo 32 caracteres):

   ```bash
   openssl rand -base64 32
   ```

   y ponlo en `NEON_AUTH_COOKIE_SECRET`.
4. En `ADMIN_EMAILS` pon tu correo. Ese correo entra como **administrador** la
   primera vez que inicia sesión; todos los demás entran como **alumno**.

La identidad la administra Neon en el esquema `neon_auth`. Nuestra tabla
`profiles` guarda ese id y todo lo demás (rol, colegio, institución objetivo,
racha, millas). La fila se crea sola en el primer ingreso — no hace falta trigger.

**Criterio:** un usuario nuevo aterriza en `/`; tu cuenta aterriza en `/panel`;
entrar a `/panel` como alumno redirige a `/`.

> **Cambiar un rol a mano:**
> ```sql
> update profiles set role = 'admin' where email = 'alguien@correo.com';
> ```

---

## 3 · Arrancar

```bash
npm install
npm run dev
```

http://localhost:3000 → pantalla de acceso.

---

## 4 · Generación asistida (opcional)

`/api/generate` redacta borradores de preguntas con la Claude API. Necesita
`ANTHROPIC_API_KEY` en el entorno del servidor. Sin la llave, el resto de la app
funciona igual y el botón devuelve un aviso.

Todo lo generado entra como `draft`. Nada llega a los alumnos sin tu visto bueno.

---

## 5 · Desplegar en Vercel

```bash
npx vercel link
npx vercel env add DATABASE_URL production
npx vercel env add NEON_AUTH_BASE_URL production
npx vercel env add NEON_AUTH_COOKIE_SECRET production
npx vercel env add ADMIN_EMAILS production
npx vercel env add ANTHROPIC_API_KEY production
npx vercel deploy --prod
```

Si instalas la integración de **Neon** desde el Marketplace de Vercel,
`DATABASE_URL` se inyecta sola en los tres entornos.

> `NEON_AUTH_COOKIE_SECRET` y `ANTHROPIC_API_KEY` **jamás** llevan el prefijo
> `NEXT_PUBLIC_`: si lo llevaran, viajarían al navegador.

---

## Estructura

```
app/
├─ (auth)/           login · registro                 → sin sesión
├─ (student)/        itinerario · clase · práctica ·  → guard: sesión válida
│                    simulacro · sesión · resultados · perfil
├─ (admin)/          panel · alumnos · balotario ·    → guard: role = admin
│                    clases · calibración
└─ api/
   ├─ auth/[...path] proxy de Neon Auth
   ├─ answer         califica en el servidor
   ├─ lesson-view    telemetría de clases (sendBeacon)
   └─ generate       Claude API → borradores

db/schema.ts         espejo en Drizzle de docs/schema.sql (fuente de verdad: el SQL)
lib/queries.ts       consultas del alumno
lib/admin-queries.ts consultas del panel
docs/                schema.sql · seed.sql · este archivo
```

---

## Dónde vive la seguridad

Con Neon no hay PostgREST: **la base nunca se expone al navegador**. Todo el
acceso pasa por Server Components y Server Actions. Quien autoriza es:

- `lib/auth.ts` — `requireUser()` y `requireAdmin()` en los layouts;
- `proxy.ts` — refresca la sesión y manda a `/login` lo no autenticado;
- las consultas, que siempre filtran por el usuario de la sesión.

**La regla de oro:** `answer_index` no llega al navegador antes de responder. El
cliente manda `{ attempt_item_id, chosen_index }` a `/api/answer`, el servidor
califica contra la fila real y recién entonces devuelve el veredicto. En modo
simulacro ni eso: solo confirma que quedó registrado. Las consultas que alimentan
componentes cliente seleccionan por `publicQuestionColumns`, que no incluye
`answerIndex`, `steps`, `distractors`, `concept` ni `trick`.
