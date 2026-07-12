'use client'

import Link from 'next/link'

import { CourseCard } from '@/components/CourseCard'
import { Loader, ErrorNote } from '@/components/Loader'
import { useGetCoursesQuery } from '@/store/api'

const STEPS = [
  { no: 'I', title: 'Seç', text: 'Sənə ən uyğun kursu seç — əmin deyilsənsə, mənə yaz.' },
  { no: 'II', title: 'Qoşul', text: 'Qeydiyyatdan keç və bütün materiallara dərhal çıxış qazan.' },
  { no: 'III', title: 'Dəyiş', text: 'Öz ritminlə irəlilə. Mən bütün yol boyu yanındayam.' },
]

export const CoursesListContent = () => {
  const { data, isLoading, isError } = useGetCoursesQuery()
  const courses = data?.data?.courses || []

  return (
    <>
      <header className="mx-auto max-w-[760px] px-5 pt-[170px] pb-8 text-center sm:px-10">
        <p className="mb-6 text-[13px] tracking-[5px] text-gold uppercase">
          ✦ &nbsp;Dərslər & Kurslar&nbsp; ✦
        </p>
        <h1 className="font-serif text-[clamp(38px,6.5vw,72px)] leading-[1.06] font-bold text-ink">
          Daha dərin bir səyahət
        </h1>
        <p className="mx-auto mt-[22px] max-w-[520px] text-[clamp(16px,2.2vw,19px)] leading-[1.75] text-muted">
          Öz ritmində irəlilə — addım-addım, nəfəs-nəfəs. Hər kurs səni bir az daha özünə
          yaxınlaşdırır.
        </p>
      </header>

      <section className="mx-auto max-w-[1080px] px-5 pt-8 pb-14 sm:px-10">
        {isLoading && <Loader />}
        {isError && <ErrorNote />}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-linear-to-b from-transparent via-white/55 to-transparent px-5 py-16 sm:px-10">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs tracking-[4px] text-gold uppercase">Necə işləyir</p>
            <h2 className="font-serif text-[clamp(28px,4.6vw,46px)] leading-[1.1] font-bold text-ink">
              Qeydiyyatdan ilk nəfəsə qədər
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.no} className="p-2.5 text-center">
                <div className="mx-auto mb-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-full border border-gold/40 font-serif text-[22px] text-gold">
                  {step.no}
                </div>
                <h3 className="mb-2.5 font-serif text-[22px] font-bold text-ink">{step.title}</h3>
                <p className="text-[15px] leading-[1.7] text-[#554d61]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[920px] px-5 py-[clamp(50px,8vw,100px)] sm:px-10">
        <div className="relative overflow-hidden rounded-[30px] border border-gold/22 bg-linear-to-br from-white/82 to-[rgba(249,241,227,.72)] p-[clamp(40px,6vw,70px)] text-center backdrop-blur-[10px]">
          <div
            className="pointer-events-none absolute -top-[120px] -right-20 h-[300px] w-[300px] rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(160,120,56,.16),transparent 70%)' }}
          />
          <h2 className="relative mb-4 font-serif text-[clamp(28px,4.4vw,46px)] leading-[1.12] font-bold text-ink">
            Hansı kursun sənə uyğun olduğuna əmin deyilsən?
          </h2>
          <p className="relative mx-auto mb-[30px] max-w-[480px] text-[17px] leading-[1.8] text-muted">
            Mənə yaz — birlikdə sənin anına ən uyğun olanı seçək.
          </p>
          <Link
            href="/elaqe"
            className="relative inline-block rounded-full bg-gold px-[38px] py-4 text-[15px] tracking-wide text-[#2c2530] no-underline transition-colors hover:bg-gold-light"
          >
            Mənə yaz ✦
          </Link>
        </div>
      </section>
    </>
  )
}
