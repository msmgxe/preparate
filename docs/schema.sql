-- ═══════════════════════════════════════════════════════════════════════════
-- RUMBO v0.2 — esquema completo (Neon Postgres)
--
-- Aplícalo con:  npm run db:setup
-- o pegándolo entero en el editor SQL de Neon. Es idempotente.
--
-- NOTA SOBRE AUTORIZACIÓN
-- Con Neon no hay PostgREST: la base nunca se expone al navegador. Todo el
-- acceso pasa por Server Components y Server Actions, y quien filtra por
-- usuario es la capa `lib/queries.ts` + los guards de `lib/auth.ts`.
-- Por eso aquí no hay policies: la autorización vive en la app.
-- La identidad la administra Neon Auth en el esquema `neon_auth`; `profiles`
-- guarda el id de ese usuario en `id` y todo lo demás cuelga de ahí.
-- ═══════════════════════════════════════════════════════════════════════════

create extension if not exists pgcrypto;

-- ══════════════════════════ 1 · CATÁLOGO DE CONTENIDO ══════════════════════

create table if not exists areas (
  id      text primary key,              -- 'rm', 'rv', 'mat', 'cg'
  name    text not null,
  short   text not null,
  symbol  text not null default '◈',
  accent  text not null default '#EFA451',
  glow    text not null default 'rgba(239,164,81,.14)',
  ord     smallint not null default 0
);

create table if not exists chapters (
  id        uuid primary key default gen_random_uuid(),
  area_id   text not null references areas(id) on delete cascade,
  title     text not null,
  ord       smallint not null default 0,
  video_url text,
  unique (area_id, title)
);

do $$ begin
  create type question_kind as enum ('single_choice','reading_set','numeric');
exception when duplicate_object then null; end $$;

create table if not exists questions (
  id            uuid primary key default gen_random_uuid(),
  chapter_id    uuid not null references chapters(id) on delete cascade,
  kind          question_kind not null default 'single_choice',
  passage       text,                               -- texto de lectura, si aplica
  stem          text not null,
  options       jsonb not null,                     -- ["36","40",…]
  answer_index  smallint not null                   -- NUNCA viaja al navegador
                check (answer_index between 0 and 4),
  difficulty    smallint not null default 2 check (difficulty between 1 and 3),
  time_target_s int not null default 90,
  steps         jsonb not null default '[]'::jsonb, -- [{t,p,m}]
  distractors   jsonb not null default '{}'::jsonb, -- {"0":"por qué está mal",…}
  concept       text,
  trick         text,
  source        text,                               -- 'ISIL 2024', 'elaboración propia'…
  status        text not null default 'draft'
                check (status in ('draft','reviewed','published')),
  created_by    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists questions_chapter_idx on questions(chapter_id);
create index if not exists questions_status_idx  on questions(status);

-- perfiles de simulacro: la mezcla real de cada institución
create table if not exists exam_profiles (
  id          text primary key,          -- 'isil'
  name        text not null,
  description text,
  n_questions smallint not null default 20,
  seconds     int not null default 600,
  mix         jsonb not null default '{"rm":50,"rv":50}'::jsonb,
  ord         smallint not null default 0
);

-- ══════════════════════════ 2 · PERFILES Y ROLES ═══════════════════════════

do $$ begin
  create type app_role as enum ('admin','student','guardian');
exception when duplicate_object then null; end $$;

-- `id` es el id del usuario en Neon Auth. La fila se crea sola la primera vez
-- que el usuario entra (`ensureProfile`), no con un trigger: así no dependemos
-- de la forma interna del esquema `neon_auth`.
create table if not exists profiles (
  id           text primary key,
  email        text,
  display_name text not null default 'Alumno',
  role         app_role not null default 'student',
  school       text,
  target_org   text,
  target_date  date,
  avatar_hex   text default '#EFA451',
  streak       smallint not null default 0,
  best_streak  smallint not null default 0,
  miles        int not null default 0,
  last_practice_date date,
  created_at   timestamptz not null default now()
);

-- vincula admin/tutor con alumnos (N:M para que un tutor tenga varios)
create table if not exists mentorships (
  mentor_id  text references profiles(id) on delete cascade,
  student_id text references profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (mentor_id, student_id)
);

-- ══════════════════════════ 3 · CLASES VISUALES ════════════════════════════

create table if not exists lessons (
  id          uuid primary key default gen_random_uuid(),
  chapter_id  uuid not null references chapters(id) on delete cascade,
  slug        text unique,
  title       text not null,
  hook        text not null,
  minutes     smallint not null default 6,
  status      text not null default 'draft'
              check (status in ('draft','reviewed','published')),
  created_at  timestamptz default now()
);

do $$ begin
  create type block_kind as enum ('text','viz','math','callout','check','err','video');
exception when duplicate_object then null; end $$;

-- bloques ordenados: text | viz | math | callout | check | err | video
create table if not exists lesson_blocks (
  id         uuid primary key default gen_random_uuid(),
  lesson_id  uuid not null references lessons(id) on delete cascade,
  ord        smallint not null,
  kind       block_kind not null,
  payload    jsonb not null,
  unique (lesson_id, ord)
);

-- SVG reutilizable, versionado, referenciado por payload->>'viz_id'
create table if not exists visuals (
  id         text primary key,           -- 'v-suc', 'v-desc'…
  caption    text,
  svg        text not null,              -- se sanitiza otra vez al renderizar
  version    smallint default 1,
  updated_at timestamptz default now()
);

-- enlaza preguntas con su clase
alter table questions add column if not exists lesson_id uuid references lessons(id) on delete set null;

create table if not exists lesson_videos (
  id         uuid primary key default gen_random_uuid(),
  lesson_id  uuid references lessons(id) on delete cascade,
  title      text not null,
  source     text,
  url        text not null,
  duration_s int,
  ord        smallint default 0
);

-- ══════════════════════════ 4 · SESIONES ═══════════════════════════════════

create table if not exists attempts (
  id            uuid primary key default gen_random_uuid(),
  user_id       text not null references profiles(id) on delete cascade,
  mode          text not null default 'practice'
                check (mode in ('practice','exam','errors','chapter','lesson')),
  title         text not null default 'Sesión',
  chapter_id    uuid references chapters(id) on delete set null,
  profile_id    text references exam_profiles(id) on delete set null,
  limit_seconds int not null default 0,
  started_at    timestamptz not null default now(),
  finished_at   timestamptz,
  score_pct     smallint
);
create index if not exists attempts_user_idx on attempts(user_id, started_at desc);

create table if not exists attempt_items (
  id              uuid primary key default gen_random_uuid(),
  attempt_id      uuid not null references attempts(id) on delete cascade,
  question_id     uuid not null references questions(id) on delete cascade,
  ord             smallint not null,
  chosen_index    smallint,                       -- null = no respondida
  is_correct      boolean,
  seconds         int not null default 0,
  flagged         boolean not null default false,
  viewed_solution boolean not null default false,
  answered_at     timestamptz,
  unique (attempt_id, ord)
);
create index if not exists attempt_items_attempt_idx  on attempt_items(attempt_id);
create index if not exists attempt_items_question_idx on attempt_items(question_id);

-- bitácora de errores: SM-2 simplificado. Lo fallado vuelve al día 1, 3, 7 y 21.
create table if not exists review_queue (
  user_id     text not null references profiles(id) on delete cascade,
  question_id uuid not null references questions(id) on delete cascade,
  ease        numeric(3,2) not null default 2.50,
  interval_d  int not null default 1,
  reps        int not null default 0,
  lapses      int not null default 0,
  due_at      date not null default current_date,
  updated_at  timestamptz not null default now(),
  primary key (user_id, question_id)
);
create index if not exists review_queue_due_idx on review_queue(user_id, due_at);

-- programa la repetición al calificar: acierto avanza 1→3→7→21, fallo reinicia
create or replace function schedule_review(p_user text, p_question uuid, p_correct boolean)
returns void language plpgsql as $$
declare
  cur review_queue%rowtype;
  next_days int;
begin
  select * into cur from review_queue where user_id = p_user and question_id = p_question;

  if not p_correct then
    insert into review_queue (user_id, question_id, ease, interval_d, reps, lapses, due_at, updated_at)
    values (p_user, p_question, 2.50, 1, 0, 1, current_date + 1, now())
    on conflict (user_id, question_id) do update set
      ease = greatest(1.30, review_queue.ease - 0.20),
      interval_d = 1, reps = 0,
      lapses = review_queue.lapses + 1,
      due_at = current_date + 1, updated_at = now();
    return;
  end if;

  if cur.user_id is null then
    return;                       -- acertó algo que nunca falló: no entra a la bitácora
  end if;

  next_days := case cur.reps when 0 then 3 when 1 then 7 when 2 then 21
                             else greatest(21, round(cur.interval_d * cur.ease)::int) end;

  update review_queue set
    reps = cur.reps + 1,
    ease = least(2.80, cur.ease + 0.10),
    interval_d = next_days,
    due_at = current_date + next_days,
    updated_at = now()
  where user_id = p_user and question_id = p_question;
end $$;

-- ══════════════════════════ 5 · TELEMETRÍA DE APRENDIZAJE ══════════════════

create table if not exists lesson_views (
  id          uuid primary key default gen_random_uuid(),
  user_id     text references profiles(id) on delete cascade,
  lesson_id   uuid references lessons(id) on delete cascade,
  seconds     int,
  scroll_pct  smallint,
  check_ok    boolean,
  video_click boolean default false,
  viewed_at   timestamptz default now()
);
create index if not exists lesson_views_lesson_idx on lesson_views(lesson_id);
create index if not exists lesson_views_user_idx   on lesson_views(user_id, viewed_at desc);

-- ══════════════════════════ 6 · GAMIFICACIÓN ═══════════════════════════════

create table if not exists badges (
  id     text primary key,
  label  text not null,
  big    text not null,          -- '7', '100', 'A+'
  small  text not null,          -- 'días\nseguidos'
  accent text not null default '#4FD69C',
  rule   text not null,          -- 'streak>=7'
  ord    smallint default 0
);

create table if not exists user_badges (
  user_id   text references profiles(id) on delete cascade,
  badge_id  text references badges(id) on delete cascade,
  earned_at timestamptz default now(),
  primary key (user_id, badge_id)
);

-- racha, millas e insignias al cerrar una sesión
create or replace function on_attempt_finished() returns trigger
language plpgsql as $$
declare
  correct_n int;
  total_n   int;
  last_day  date;
  new_streak smallint;
  p profiles%rowtype;
begin
  if new.finished_at is null or old.finished_at is not null then
    return new;
  end if;

  select count(*) filter (where is_correct), count(*)
    into correct_n, total_n
    from attempt_items where attempt_id = new.id and chosen_index is not null;

  select * into p from profiles where id = new.user_id for update;
  last_day := p.last_practice_date;

  if last_day = current_date then
    new_streak := p.streak;
  elsif last_day = current_date - 1 then
    new_streak := p.streak + 1;
  else
    new_streak := 1;
  end if;

  update profiles set
    streak             = new_streak,
    best_streak        = greatest(best_streak, new_streak),
    miles              = miles + coalesce(correct_n,0) * 40,
    last_practice_date = current_date
  where id = new.user_id;

  insert into user_badges (user_id, badge_id)
  select new.user_id, b.id from badges b
  where (b.rule = 'streak>=7'    and new_streak >= 7)
     or (b.rule = 'streak>=30'   and new_streak >= 30)
     or (b.rule = 'answers>=100' and (select count(*) from attempt_items ai
                                      join attempts a on a.id = ai.attempt_id
                                      where a.user_id = new.user_id and ai.chosen_index is not null) >= 100)
     or (b.rule = 'exam>=1'      and new.mode = 'exam')
     or (b.rule = 'exam>=90'     and new.mode = 'exam' and total_n > 0
                                 and correct_n::numeric / total_n >= 0.9)
     or (b.rule = 'perfect'      and total_n > 0 and correct_n = total_n and total_n >= 5)
  on conflict do nothing;

  return new;
end $$;

drop trigger if exists attempt_finished on attempts;
create trigger attempt_finished
  after update of finished_at on attempts
  for each row execute function on_attempt_finished();

-- ══════════════════════════ 7 · VISTAS DEL PANEL ═══════════════════════════

drop view if exists v_student_stats        cascade;
drop view if exists v_area_mastery         cascade;
drop view if exists v_chapter_mastery      cascade;
drop view if exists v_student_weekly       cascade;
drop view if exists v_question_calibration cascade;

create view v_student_stats as
select
  p.id as user_id, p.display_name, p.avatar_hex, p.target_org, p.email,
  p.streak, p.miles, p.target_date,
  count(distinct a.id)                                        as sessions,
  round(avg(case when ai.is_correct then 100.0 else 0 end),1) as accuracy,
  coalesce(sum(ai.seconds),0)/60                              as minutes_total,
  coalesce(sum(ai.seconds) filter (where a.started_at > now() - interval '7 days'),0)/60 as minutes_week,
  count(distinct a.id) filter (where a.mode = 'exam')         as exams,
  max(a.started_at)                                           as last_active
from profiles p
left join attempts a       on a.user_id = p.id
left join attempt_items ai on ai.attempt_id = a.id and ai.chosen_index is not null
where p.role = 'student'
group by p.id, p.display_name, p.avatar_hex, p.target_org, p.email,
         p.streak, p.miles, p.target_date;

create view v_area_mastery as
select a.user_id, ch.area_id,
       round(avg(case when ai.is_correct then 100.0 else 0 end),0) as pct,
       count(*) as n
from attempt_items ai
join attempts a  on a.id = ai.attempt_id
join questions q on q.id = ai.question_id
join chapters ch on ch.id = q.chapter_id
where ai.chosen_index is not null
group by a.user_id, ch.area_id;

create view v_chapter_mastery as
select a.user_id, ch.id as chapter_id, ch.title, ch.area_id,
       round(avg(case when ai.is_correct then 100.0 else 0 end),0) as pct,
       count(*) as n
from attempt_items ai
join attempts a  on a.id = ai.attempt_id
join questions q on q.id = ai.question_id
join chapters ch on ch.id = q.chapter_id
where ai.chosen_index is not null
group by a.user_id, ch.id, ch.title, ch.area_id;

-- precisión semanal, 8 semanas, para la tendencia del panel
create view v_student_weekly as
select a.user_id,
       date_trunc('week', a.started_at)::date as week,
       round(avg(case when ai.is_correct then 100.0 else 0 end),0) as pct,
       count(*) as n
from attempt_items ai
join attempts a on a.id = ai.attempt_id
where ai.chosen_index is not null
  and a.started_at > now() - interval '8 weeks'
group by a.user_id, date_trunc('week', a.started_at);

create view v_question_calibration as
select q.id, q.stem, ch.area_id, ch.title as chapter, q.time_target_s, q.status,
       count(*)                                                    as times_seen,
       round(avg(case when ai.is_correct then 100.0 else 0 end),0) as pct_correct,
       round(avg(ai.seconds))                                      as avg_seconds
from questions q
join chapters ch      on ch.id = q.chapter_id
join attempt_items ai on ai.question_id = q.id and ai.chosen_index is not null
group by q.id, q.stem, ch.area_id, ch.title, q.time_target_s, q.status
having count(*) >= 1;

-- ══════════════════════════ 8 · SEMILLA MÍNIMA ═════════════════════════════

insert into badges (id,label,big,small,accent,rule,ord) values
  ('streak7',  'Racha de 7 días',   '7',   E'días\nseguidos',      '#4FD69C','streak>=7',   1),
  ('q100',     '100 preguntas',     '100', E'preguntas\nresueltas','#66BFE8','answers>=100',2),
  ('perfect',  'Capítulo perfecto', 'A+',  E'capítulo\nperfecto',  '#EFA451','perfect',     3),
  ('exam1',    'Primer simulacro',  '1er', E'simulacro\ncompleto', '#B08BE8','exam>=1',     4),
  ('streak30', 'Racha de 30 días',  '30',  E'días\nseguidos',      '#4FD69C','streak>=30',  5),
  ('exam90',   '90 % en simulacro', '90%', E'en un\nsimulacro',    '#EFA451','exam>=90',    6)
on conflict (id) do nothing;
