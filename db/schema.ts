/**
 * Espejo en Drizzle de `docs/schema.sql`.
 *
 * `docs/schema.sql` es la fuente de verdad: es lo que se aplica a Neon con
 * `npm run db:setup`. Este archivo existe para consultar con tipos, no para
 * generar migraciones. Si cambias uno, cambia el otro.
 */
import { relations } from 'drizzle-orm';
import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  pgView,
  primaryKey,
  smallint,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';

export const appRole = pgEnum('app_role', ['admin', 'student', 'guardian']);
export const blockKind = pgEnum('block_kind', [
  'text',
  'viz',
  'math',
  'callout',
  'check',
  'err',
  'video',
]);
export const questionKind = pgEnum('question_kind', ['single_choice', 'reading_set', 'numeric']);

/**
 * Traducciones de una fila: `{ en: {campo: valor}, pt: {...} }`.
 * El español vive en las columnas normales y hace de respaldo.
 */
export type Translations = Record<string, Record<string, unknown>>;

/** Paso de la resolución guiada. */
export type Step = { t: string; p: string; m: string | null };

// ── catálogo ────────────────────────────────────────────────────────────────

export const areas = pgTable('areas', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  short: text('short').notNull(),
  symbol: text('symbol').notNull().default('◈'),
  accent: text('accent').notNull().default('#EFA451'),
  glow: text('glow').notNull().default('rgba(239,164,81,.14)'),
  ord: smallint('ord').notNull().default(0),
  // el área es también un producto: se vende suelta
  tagline: text('tagline'),
  blurb: text('blurb'),
  priceMonth: integer('price_month'),
  priceYear: integer('price_year'),
  freeQuestions: smallint('free_questions').notNull().default(5),
  status: text('status').notNull().default('live').$type<'live' | 'soon'>(),
  /** Idiomas en los que se ofrece el módulo. */
  locales: text('locales').array().notNull().default(['es', 'en', 'pt']),
  i18n: jsonb('i18n').notNull().default({}).$type<Translations>(),
});

// ── negocio: planes y accesos ───────────────────────────────────────────────

export const plans = pgTable('plans', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  kind: text('kind').notNull().$type<'module' | 'full' | 'family'>(),
  tagline: text('tagline'),
  audience: text('audience'),
  price: integer('price').notNull(),
  period: text('period').notNull().$type<'month' | 'year'>(),
  compareAt: integer('compare_at'),
  highlight: boolean('highlight').notNull().default(false),
  cta: text('cta').notNull().default('Elegir plan'),
  features: jsonb('features').notNull().default([]).$type<string[]>(),
  ord: smallint('ord').notNull().default(0),
  i18n: jsonb('i18n').notNull().default({}).$type<Translations>(),
});

/** Un acceso abre un módulo (`areaId`) o todos (`areaId` nulo). */
export const entitlements = pgTable(
  'entitlements',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull(),
    areaId: text('area_id'),
    planId: text('plan_id'),
    status: text('status').notNull().default('active').$type<'active' | 'expired' | 'revoked'>(),
    startsAt: timestamp('starts_at', { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp('expires_at', { withTimezone: true }),
    note: text('note'),
    grantedBy: text('granted_by'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('entitlements_user_idx').on(t.userId, t.status)],
);

/** Accesos vigentes ya resueltos: una fila por (alumno, módulo abierto). */
export const vUserModules = pgView('v_user_modules', {
  userId: text('user_id'),
  areaId: text('area_id'),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
}).existing();

export const chapters = pgTable(
  'chapters',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    areaId: text('area_id')
      .notNull()
      .references(() => areas.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    ord: smallint('ord').notNull().default(0),
    videoUrl: text('video_url'),
    /** Qué entrena el capítulo, en un párrafo. Lo lee el alumno antes de practicar. */
    blurb: text('blurb'),
    i18n: jsonb('i18n').notNull().default({}).$type<Translations>(),
  },
  (t) => [unique('chapters_area_id_title_key').on(t.areaId, t.title)],
);

export const lessons = pgTable('lessons', {
  id: uuid('id').primaryKey().defaultRandom(),
  chapterId: uuid('chapter_id')
    .notNull()
    .references(() => chapters.id, { onDelete: 'cascade' }),
  slug: text('slug').unique(),
  title: text('title').notNull(),
  hook: text('hook').notNull(),
  minutes: smallint('minutes').notNull().default(6),
  status: text('status').notNull().default('draft').$type<'draft' | 'reviewed' | 'published'>(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  i18n: jsonb('i18n').notNull().default({}).$type<Translations>(),
});

export const questions = pgTable(
  'questions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    chapterId: uuid('chapter_id')
      .notNull()
      .references(() => chapters.id, { onDelete: 'cascade' }),
    lessonId: uuid('lesson_id').references(() => lessons.id, { onDelete: 'set null' }),
    kind: questionKind('kind').notNull().default('single_choice'),
    passage: text('passage'),
    stem: text('stem').notNull(),
    options: jsonb('options').notNull().$type<string[]>(),
    /** Nunca se selecciona en consultas que alimentan al navegador. */
    answerIndex: smallint('answer_index').notNull(),
    difficulty: smallint('difficulty').notNull().default(2),
    timeTargetS: integer('time_target_s').notNull().default(90),
    steps: jsonb('steps').notNull().default([]).$type<Step[]>(),
    distractors: jsonb('distractors').notNull().default({}).$type<Record<string, string>>(),
    concept: text('concept'),
    trick: text('trick'),
    source: text('source'),
    status: text('status').notNull().default('draft').$type<'draft' | 'reviewed' | 'published'>(),
    createdBy: text('created_by'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    i18n: jsonb('i18n').notNull().default({}).$type<Translations>(),
  },
  (t) => [index('questions_chapter_idx').on(t.chapterId), index('questions_status_idx').on(t.status)],
);

export const examProfiles = pgTable('exam_profiles', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  nQuestions: smallint('n_questions').notNull().default(20),
  seconds: integer('seconds').notNull().default(600),
  mix: jsonb('mix').notNull().$type<Record<string, number>>(),
  ord: smallint('ord').notNull().default(0),
});

// ── personas ────────────────────────────────────────────────────────────────

/** `id` = id del usuario en Neon Auth. La fila la crea `ensureProfile`. */
export const profiles = pgTable('profiles', {
  id: text('id').primaryKey(),
  email: text('email'),
  displayName: text('display_name').notNull().default('Alumno'),
  role: appRole('role').notNull().default('student'),
  school: text('school'),
  targetOrg: text('target_org'),
  targetDate: date('target_date'),
  avatarHex: text('avatar_hex').default('#EFA451'),
  streak: smallint('streak').notNull().default(0),
  bestStreak: smallint('best_streak').notNull().default(0),
  miles: integer('miles').notNull().default(0),
  lastPracticeDate: date('last_practice_date'),
  locale: text('locale').notNull().default('es').$type<'es' | 'en' | 'pt'>(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const mentorships = pgTable(
  'mentorships',
  {
    mentorId: text('mentor_id').references(() => profiles.id, { onDelete: 'cascade' }),
    studentId: text('student_id').references(() => profiles.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.mentorId, t.studentId] })],
);

// ── clases visuales ─────────────────────────────────────────────────────────

export const lessonBlocks = pgTable(
  'lesson_blocks',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    lessonId: uuid('lesson_id')
      .notNull()
      .references(() => lessons.id, { onDelete: 'cascade' }),
    ord: smallint('ord').notNull(),
    kind: blockKind('kind').notNull(),
    payload: jsonb('payload').notNull(),
    i18n: jsonb('i18n').notNull().default({}).$type<Translations>(),
  },
  (t) => [unique('lesson_blocks_lesson_id_ord_key').on(t.lessonId, t.ord)],
);

export const visuals = pgTable('visuals', {
  id: text('id').primaryKey(),
  caption: text('caption'),
  svg: text('svg').notNull(),
  version: smallint('version').default(1),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  i18n: jsonb('i18n').notNull().default({}).$type<Translations>(),
});

export const lessonVideos = pgTable('lesson_videos', {
  id: uuid('id').primaryKey().defaultRandom(),
  lessonId: uuid('lesson_id').references(() => lessons.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  source: text('source'),
  url: text('url').notNull(),
  durationS: integer('duration_s'),
  ord: smallint('ord').default(0),
});

// ── sesiones ────────────────────────────────────────────────────────────────

export type AttemptMode = 'practice' | 'exam' | 'errors' | 'chapter' | 'lesson';

export const attempts = pgTable(
  'attempts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id')
      .notNull()
      .references(() => profiles.id, { onDelete: 'cascade' }),
    mode: text('mode').notNull().default('practice').$type<AttemptMode>(),
    title: text('title').notNull().default('Sesión'),
    chapterId: uuid('chapter_id').references(() => chapters.id, { onDelete: 'set null' }),
    profileId: text('profile_id').references(() => examProfiles.id, { onDelete: 'set null' }),
    limitSeconds: integer('limit_seconds').notNull().default(0),
    startedAt: timestamp('started_at', { withTimezone: true }).notNull().defaultNow(),
    finishedAt: timestamp('finished_at', { withTimezone: true }),
    scorePct: smallint('score_pct'),
  },
  (t) => [index('attempts_user_idx').on(t.userId, t.startedAt)],
);

export const attemptItems = pgTable(
  'attempt_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    attemptId: uuid('attempt_id')
      .notNull()
      .references(() => attempts.id, { onDelete: 'cascade' }),
    questionId: uuid('question_id')
      .notNull()
      .references(() => questions.id, { onDelete: 'cascade' }),
    ord: smallint('ord').notNull(),
    chosenIndex: smallint('chosen_index'),
    isCorrect: boolean('is_correct'),
    seconds: integer('seconds').notNull().default(0),
    flagged: boolean('flagged').notNull().default(false),
    viewedSolution: boolean('viewed_solution').notNull().default(false),
    answeredAt: timestamp('answered_at', { withTimezone: true }),
  },
  (t) => [
    unique('attempt_items_attempt_id_ord_key').on(t.attemptId, t.ord),
    index('attempt_items_attempt_idx').on(t.attemptId),
    index('attempt_items_question_idx').on(t.questionId),
  ],
);

export const reviewQueue = pgTable(
  'review_queue',
  {
    userId: text('user_id')
      .notNull()
      .references(() => profiles.id, { onDelete: 'cascade' }),
    questionId: uuid('question_id')
      .notNull()
      .references(() => questions.id, { onDelete: 'cascade' }),
    ease: numeric('ease', { precision: 3, scale: 2 }).notNull().default('2.50'),
    intervalD: integer('interval_d').notNull().default(1),
    reps: integer('reps').notNull().default(0),
    lapses: integer('lapses').notNull().default(0),
    dueAt: date('due_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.questionId] }),
    index('review_queue_due_idx').on(t.userId, t.dueAt),
  ],
);

export const lessonViews = pgTable(
  'lesson_views',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').references(() => profiles.id, { onDelete: 'cascade' }),
    lessonId: uuid('lesson_id').references(() => lessons.id, { onDelete: 'cascade' }),
    seconds: integer('seconds'),
    scrollPct: smallint('scroll_pct'),
    checkOk: boolean('check_ok'),
    videoClick: boolean('video_click').default(false),
    viewedAt: timestamp('viewed_at', { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index('lesson_views_lesson_idx').on(t.lessonId),
    index('lesson_views_user_idx').on(t.userId, t.viewedAt),
  ],
);

// ── gamificación ────────────────────────────────────────────────────────────

export const badges = pgTable('badges', {
  id: text('id').primaryKey(),
  label: text('label').notNull(),
  big: text('big').notNull(),
  small: text('small').notNull(),
  accent: text('accent').notNull().default('#4FD69C'),
  rule: text('rule').notNull(),
  ord: smallint('ord').default(0),
});

export const userBadges = pgTable(
  'user_badges',
  {
    userId: text('user_id').references(() => profiles.id, { onDelete: 'cascade' }),
    badgeId: text('badge_id').references(() => badges.id, { onDelete: 'cascade' }),
    earnedAt: timestamp('earned_at', { withTimezone: true }).defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.badgeId] })],
);

// ── vistas del panel ────────────────────────────────────────────────────────

export const vStudentStats = pgView('v_student_stats', {
  userId: text('user_id'),
  displayName: text('display_name'),
  avatarHex: text('avatar_hex'),
  targetOrg: text('target_org'),
  email: text('email'),
  streak: smallint('streak'),
  miles: integer('miles'),
  targetDate: date('target_date'),
  sessions: integer('sessions'),
  accuracy: numeric('accuracy'),
  minutesTotal: integer('minutes_total'),
  minutesWeek: integer('minutes_week'),
  exams: integer('exams'),
  lastActive: timestamp('last_active', { withTimezone: true }),
}).existing();

export const vAreaMastery = pgView('v_area_mastery', {
  userId: text('user_id'),
  areaId: text('area_id'),
  pct: numeric('pct'),
  n: integer('n'),
}).existing();

export const vChapterMastery = pgView('v_chapter_mastery', {
  userId: text('user_id'),
  chapterId: uuid('chapter_id'),
  title: text('title'),
  areaId: text('area_id'),
  pct: numeric('pct'),
  n: integer('n'),
}).existing();

export const vStudentWeekly = pgView('v_student_weekly', {
  userId: text('user_id'),
  week: date('week'),
  pct: numeric('pct'),
  n: integer('n'),
}).existing();

export const vQuestionCalibration = pgView('v_question_calibration', {
  id: uuid('id'),
  stem: text('stem'),
  areaId: text('area_id'),
  chapter: text('chapter'),
  timeTargetS: integer('time_target_s'),
  status: text('status'),
  timesSeen: integer('times_seen'),
  pctCorrect: numeric('pct_correct'),
  avgSeconds: numeric('avg_seconds'),
}).existing();

// ── relaciones (para `db.query.*` con `with`) ───────────────────────────────

export const areasRelations = relations(areas, ({ many }) => ({ chapters: many(chapters) }));

export const chaptersRelations = relations(chapters, ({ one, many }) => ({
  area: one(areas, { fields: [chapters.areaId], references: [areas.id] }),
  questions: many(questions),
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  chapter: one(chapters, { fields: [lessons.chapterId], references: [chapters.id] }),
  blocks: many(lessonBlocks),
  videos: many(lessonVideos),
}));

export const lessonBlocksRelations = relations(lessonBlocks, ({ one }) => ({
  lesson: one(lessons, { fields: [lessonBlocks.lessonId], references: [lessons.id] }),
}));

export const lessonVideosRelations = relations(lessonVideos, ({ one }) => ({
  lesson: one(lessons, { fields: [lessonVideos.lessonId], references: [lessons.id] }),
}));

export const questionsRelations = relations(questions, ({ one }) => ({
  chapter: one(chapters, { fields: [questions.chapterId], references: [chapters.id] }),
  lesson: one(lessons, { fields: [questions.lessonId], references: [lessons.id] }),
}));

export const attemptsRelations = relations(attempts, ({ one, many }) => ({
  profile: one(profiles, { fields: [attempts.userId], references: [profiles.id] }),
  items: many(attemptItems),
}));

export const attemptItemsRelations = relations(attemptItems, ({ one }) => ({
  attempt: one(attempts, { fields: [attemptItems.attemptId], references: [attempts.id] }),
  question: one(questions, { fields: [attemptItems.questionId], references: [questions.id] }),
}));

// ── tipos derivados ─────────────────────────────────────────────────────────

export type Area = typeof areas.$inferSelect;
export type Chapter = typeof chapters.$inferSelect;
export type Question = typeof questions.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type LessonBlock = typeof lessonBlocks.$inferSelect;
export type Visual = typeof visuals.$inferSelect;
export type LessonVideo = typeof lessonVideos.$inferSelect;
export type Attempt = typeof attempts.$inferSelect;
export type AttemptItem = typeof attemptItems.$inferSelect;
export type Badge = typeof badges.$inferSelect;
export type ExamProfile = typeof examProfiles.$inferSelect;
export type Plan = typeof plans.$inferSelect;
export type Entitlement = typeof entitlements.$inferSelect;

/**
 * Lo que el navegador puede ver de una pregunta antes de responder.
 *
 * `i18n` queda fuera además de los campos obvios: ese blob guarda también las
 * traducciones de `steps`, `concept` y `trick`. Se resuelve en el servidor.
 */
export type PublicQuestion = Omit<
  Question,
  'answerIndex' | 'steps' | 'distractors' | 'concept' | 'trick' | 'createdBy' | 'i18n'
>;
