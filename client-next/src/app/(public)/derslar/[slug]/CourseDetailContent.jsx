'use client'

import Link from 'next/link'

import { Loader } from '@/components/Loader'
import { useGetCourseQuery } from '@/store/api'
import { formatPrice } from '@/lib/format'

export const CourseDetailContent = ({ slug }) => {
  const { data, isLoading, isError } = useGetCourseQuery(slug)
  const course = data?.data?.course

  if (isLoading) return <Loader />
  if (isError || !course) {
    return (
      <div className="mx-auto max-w-[600px] px-5 py-40 text-center">
        <h1 className="mb-3 font-serif text-2xl font-bold text-ink">Kurs tapılmadı</h1>
        <Link href="/derslar" className="text-sm text-gold no-underline">
          ← Bütün dərslər
        </Link>
      </div>
    )
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: { '@type': 'Person', name: 'Nərmin Həsənli' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mx-auto max-w-[1140px] px-5 pt-[150px] pb-5 sm:px-10">
        <Link
          href="/derslar"
          className="mb-[22px] inline-block text-[13px] tracking-wide text-muted-soft no-underline transition-colors hover:text-gold"
        >
          ← Bütün dərslər
        </Link>
        <div className="mb-[18px] flex flex-wrap items-center gap-3">
          {course.featured && (
            <span className="rounded-full bg-gold px-3 py-1 text-[11px] tracking-wider text-[#2c2530] uppercase">
              Populyar
            </span>
          )}
          <span className="text-[13px] text-muted-soft">
            {[course.duration, course.level, course.format].filter(Boolean).join(' · ')}
          </span>
        </div>
        <h1 className="max-w-[16ch] font-serif text-[clamp(36px,6vw,68px)] leading-[1.08] font-bold text-ink">
          {course.title}
        </h1>
        {course.description && (
          <p className="mt-5 max-w-[600px] text-[clamp(16px,2.2vw,19px)] leading-[1.8] text-muted">
            {course.description}
          </p>
        )}
      </header>

      <section className="mx-auto max-w-[1140px] px-5 py-[clamp(30px,5vw,50px)] sm:px-10">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* LEFT */}
          <div>
            <div
              className="mb-11 flex h-[clamp(200px,32vw,320px)] items-center justify-center rounded-3xl border border-gold/20"
              style={{
                backgroundImage: 'repeating-linear-gradient(115deg,#efe5d2 0 16px,#e7dcc6 16px 32px)',
              }}
            >
              <span className="rounded-[18px] bg-white/62 px-3.5 py-1.5 font-mono text-xs tracking-wide text-muted-soft">
                kurs təqdimat görseli
              </span>
            </div>

            {course.forWhom && (
              <div className="mb-11">
                <h2 className="mb-[18px] font-serif text-[clamp(26px,3.6vw,38px)] font-bold text-ink">
                  Bu kurs kimlər üçündür?
                </h2>
                {course.forWhom.split('\n').map((para, i) => (
                  <p key={i} className="mb-4 text-[17px] leading-[1.9] text-[#3a3446]">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {course.learnings?.length > 0 && (
              <div className="mb-11">
                <h2 className="mb-5 font-serif text-[clamp(26px,3.6vw,38px)] font-bold text-ink">
                  Nə öyrənəcəksən
                </h2>
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {course.learnings.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-2xl border border-gold/14 bg-white/60 px-[18px] py-4"
                    >
                      <span className="mt-0.5 text-gold">✦</span>
                      <span className="text-[15px] leading-[1.6] text-[#3a3446]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {course.curriculum?.length > 0 && (
              <div>
                <h2 className="mb-5 font-serif text-[clamp(26px,3.6vw,38px)] font-bold text-ink">
                  Həftəlik proqram
                </h2>
                <div className="flex flex-col">
                  {course.curriculum.map((week) => (
                    <div
                      key={week.week}
                      className="grid grid-cols-[70px_1fr] gap-5 border-b border-[rgba(70,48,30,.1)] py-5 sm:grid-cols-[90px_1fr]"
                    >
                      <div className="font-serif text-xl text-gold">{week.week}-ci həftə</div>
                      <div>
                        <h3 className="mb-1.5 font-serif text-[21px] font-bold text-ink">
                          {week.title}
                        </h3>
                        <p className="text-[15px] leading-[1.7] text-[#554d61]">{week.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT (sticky enroll) */}
          <aside className="lg:sticky lg:top-[100px]">
            <div className="rounded-3xl border border-gold/22 bg-linear-to-br from-white/90 to-[rgba(249,241,227,.78)] p-8 shadow-[0_24px_60px_rgba(120,92,50,.16)] backdrop-blur-[10px]">
              <div className="mb-1.5 flex items-baseline gap-2.5">
                <span className="font-serif text-[44px] leading-none text-gold">
                  {formatPrice(course.price)}
                </span>
                <span className="text-sm text-muted-soft">tam kurs</span>
              </div>
              <p className="mb-[22px] text-sm leading-[1.6] text-[#554d61]">
                Ömürlük giriş · Öz ritminlə keç
              </p>
              {course.includes?.length > 0 && (
                <div className="mb-6 flex flex-col gap-3">
                  {course.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[15px] text-[#3a3446]">
                      <span className="text-gold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
              <Link
                href="/elaqe"
                className="mb-3 block rounded-full bg-gold py-4 text-center text-[15px] tracking-wide text-[#2c2530] no-underline transition-colors hover:bg-gold-light"
              >
                Kursa qoşul ✦
              </Link>
              <Link
                href="/elaqe"
                className="block rounded-full border border-gold/40 py-[15px] text-center text-sm tracking-wide text-ink-soft no-underline transition-colors hover:border-gold hover:bg-gold/6"
              >
                Sual ver
              </Link>
            </div>

            <div className="mt-5 flex items-center gap-4 rounded-[20px] border border-gold/16 bg-white/60 p-5">
              <div
                className="h-14 w-14 flex-shrink-0 rounded-full border border-gold/40"
                style={{
                  backgroundImage: 'repeating-linear-gradient(135deg,#efe5d2 0 10px,#e7dcc6 10px 20px)',
                }}
              />
              <div>
                <p className="mb-1 text-xs tracking-wide text-gold uppercase">Təlimçin</p>
                <h4 className="font-serif text-xl font-bold text-ink">Nərmin Həsənli</h4>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
