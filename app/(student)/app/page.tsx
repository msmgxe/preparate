import Link from 'next/link';
import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { examProfiles, vStudentStats } from '@/db/schema';
import { requireUser } from '@/lib/auth';
import { daysUntil, getDueReviews, getItinerary, getStamps } from '@/lib/queries';
import { Itinerary } from '@/components/Itinerary';
import { startErrors, startQuick } from '@/app/(student)/actions';
import { getI18n, fill } from '@/lib/i18n';
import { site, whatsappLink } from '@/lib/site';
import { INTL_LOCALE } from '@/lib/i18n/config';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: `${t.titles.itinerary} · RUMBO` };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ vacio?: string }>;
}) {
  const profile = await requireUser();
  const { locale, t } = await getI18n();
  const a = t.app;
  const { vacio } = await searchParams;
  const db = getDb();

  const [areas, stamps, due, [stats], [exam]] = await Promise.all([
    getItinerary(profile.id, locale),
    getStamps(profile.id),
    getDueReviews(profile.id),
    db.select().from(vStudentStats).where(eq(vStudentStats.userId, profile.id)).limit(1),
    db.select({ id: examProfiles.id }).from(examProfiles).orderBy(examProfiles.ord).limit(1),
  ]);

  const left = daysUntil(profile.targetDate);
  const keyAreas = areas
    .filter((a) => a.published > 0)
    .slice(0, 2)
    .map((a) => a.short)
    .join(' · ');

  const today = new Date().toLocaleDateString(INTL_LOCALE[locale], {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <>
      <section style={{ marginTop: 34 }}>
        <span className="eyebrow">{a.checkIn} · {today}</span>
        <h1 style={{ marginTop: 12 }}>
          {left === null ? (
            <>
              {a.countdownNone} <em>{a.countdownNoneEm}</em>
            </>
          ) : left > 0 ? (
            <>
              {a.countdownLeft} <em>{left} {a.countdownLeftEm}</em>{a.countdownLeftTail}
            </>
          ) : (
            <>
              <em>{a.countdownToday}</em> {a.countdownTodayTail}
            </>
          )}
        </h1>
      </section>

      {vacio && (
        <p className="notice bad" style={{ marginTop: 20 }}>
          {a.emptyChapter}
        </p>
      )}

      <div className="pass">
        <div className="pass-main">
          <div className="pf">
            <div className="l">{a.passenger}</div>
            <div className="v">{profile.displayName}</div>
          </div>
          <div className="route">
            <div className="pf">
              <div className="l">{a.from}</div>
              <div className="v">{profile.school ?? '—'}</div>
            </div>
            <div className="arrow" />
            <div className="pf" style={{ textAlign: 'right' }}>
              <div className="l">{a.to}</div>
              <div className="v">{profile.targetOrg ?? a.undecided}</div>
            </div>
          </div>
          <div className="pass-row">
            <div className="pf">
              <div className="l">{a.sessions}</div>
              <div className="v sm">{Number(stats?.sessions ?? 0)}</div>
            </div>
            <div className="pf">
              <div className="l">{a.keyAreas}</div>
              <div className="v sm">{keyAreas || '—'}</div>
            </div>
            <div className="pf">
              <div className="l">{a.exams}</div>
              <div className="v sm">{Number(stats?.exams ?? 0)} {a.examsTaken}</div>
            </div>
            <div className="pf">
              <div className="l">{a.accuracy}</div>
              <div className="v sm" style={{ color: '#1E7A55' }}>
                {stats?.accuracy == null ? '—' : `${Number(stats.accuracy)} %`}
              </div>
            </div>
          </div>
        </div>
        <div className="pass-stub">
          <div>
            <div className="stub-l">{a.streak}</div>
            <div className="stub-v">{profile.streak}</div>
            <div className="stub-n">
              {profile.miles.toLocaleString(INTL_LOCALE[locale])} {a.miles}
              <br />
              {a.bestStreak}: {profile.bestStreak} {t.common.days}
            </div>
          </div>
          <div className="barcode" />
        </div>
      </div>

      <section>
        <div className="shead">
          <h2>{a.stagesTitle}</h2>
          <div className="rule" />
          <span className="eyebrow">{a.stagesHint}</span>
        </div>
        <Itinerary areas={areas} t={t} />
      </section>

      <section>
        <div className="shead">
          <h2>{a.quickTitle}</h2>
          <div className="rule" />
        </div>
        <div className="quick">
          <div className="qcard">
            <span className="eyebrow" style={{ color: 'var(--amber)' }}>
              {a.quickExamEyebrow}
            </span>
            <b>{a.quickExamTitle}</b>
            <p>{a.quickExamBody}</p>
            <Link className="btn solid" href={`/app/simulacro/${exam?.id ?? 'isil'}`}>
              {a.quickExamCta}
            </Link>
          </div>

          <div className="qcard">
            <span className="eyebrow" style={{ color: 'var(--mint)' }}>
              {a.quickPracticeEyebrow}
            </span>
            <b>{a.quickPracticeTitle}</b>
            <p>{a.quickPracticeBody}</p>
            <form action={startQuick}>
              <button className="btn mint">{a.quickPracticeCta}</button>
            </form>
          </div>

          <div className="qcard">
            <span className="eyebrow" style={{ color: 'var(--coral)' }}>
              {a.quickErrorsEyebrow}
            </span>
            <b>{a.quickErrorsTitle}</b>
            <p>{a.quickErrorsBody}</p>
            <form action={startErrors}>
              <button className="btn" disabled={due.length === 0}>
                {due.length === 0 ? a.quickErrorsNone : fill(a.quickErrorsCta, { n: due.length })}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section>
        <div className="shead">
          <h2>{a.stampsTitle}</h2>
          <div className="rule" />
          <span className="eyebrow">
            {stamps.filter((b) => b.earned).length} {a.stampsOf} {stamps.length}
          </span>
        </div>
        <div className="stamps">
          {stamps.map((badge, i) => (
            <div
              key={badge.id}
              className={`stamp${badge.earned ? '' : ' locked'}`}
              title={badge.label}
              style={
                {
                  '--accent': badge.accent,
                  '--rot': `${[-7, 5, -3, 8, -5, 4][i % 6]}deg`,
                } as React.CSSProperties
              }
            >
              <b>{badge.big}</b>
              {badge.small.split('\n').map((line, k) => (
                <span key={k}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <footer>
        <span>RUMBO v0.2</span>
        <span>·</span>
        <span>
          {t.landing.footerAuthor}{' '}
          <a href={whatsappLink(t.wa.short)} target="_blank" rel="noopener noreferrer">
            {site.whatsappPretty}
          </a>
        </span>
        <Link href="/app/perfil" style={{ marginLeft: 'auto' }}>
          {a.editProfile}
        </Link>
      </footer>
    </>
  );
}
