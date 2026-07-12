import Link from 'next/link'

import { HeroGlobe } from '@/components/HeroGlobe'
import { CourseCard } from '@/components/CourseCard'
import { BlogCard } from '@/components/BlogCard'
import { BookingForm } from '@/components/BookingForm'
import { JsonLd } from '@/components/JsonLd'
import { apiFetch } from '@/lib/api'
import { formatPrice, toRoman } from '@/lib/format'
import { buildMetadata, SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION } from '@/lib/seo'

export const metadata = buildMetadata({ path: '/' })

async function getHomeData() {
  const [sessionsRes, coursesRes, blogsRes] = await Promise.all([
    apiFetch('/sessions'),
    apiFetch('/courses'),
    apiFetch('/blogs?limit=3'),
  ])

  return {
    sessions: sessionsRes?.data?.sessions || [],
    courses: (coursesRes?.data?.courses || []).slice(0, 3),
    blogs: blogsRes?.data?.blogs || [],
  }
}

export default async function HomePage() {
  const { sessions, courses, blogs } = await getHomeData()

  const topics = [...sessions.map((s) => s.name), 'Kurs haqqında sual', 'Digər']

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* HERO */}
      <header className="relative flex min-h-screen flex-col items-center justify-center px-5 pt-[120px] pb-20 text-center">
        <HeroGlobe />

        <div className="relative z-[1]">
          <p className="mb-[30px] text-[13px] tracking-[5px] text-gold uppercase">
            ✦ &nbsp;Həyat Koçu · Ruhani Bələdçi&nbsp; ✦
          </p>
          <h1 className="mx-auto max-w-[14ch] font-serif text-[clamp(40px,8vw,86px)] leading-[1.04] font-bold tracking-wide text-ink">
            İçindəki işıq heç vaxt sönmədi
          </h1>
          <p className="mx-auto mt-[30px] max-w-[540px] text-[clamp(16px,2.2vw,19px)] leading-[1.75] text-muted">
            Mən Nərmin. Səni öz ruhunun dərinliyinə, sükuta və bütövlüyə aparan yolda — şəfqətlə,
            tələsmədən — yanında olmağa gəldim.
          </p>
          <div className="mt-[42px] flex flex-wrap justify-center gap-4">
            <a
              href="#sessions"
              className="rounded-full bg-gold px-[34px] py-4 text-[15px] tracking-wide text-[#2c2530] no-underline transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-gold-light"
            >
              Səyahətə başla
            </a>
            <a
              href="#contact"
              className="rounded-full border border-gold/40 px-[34px] py-4 text-[15px] tracking-wide text-ink-soft no-underline transition-colors hover:border-gold hover:bg-gold/8"
            >
              Pulsuz tanışlıq görüşü
            </a>
          </div>
        </div>

        <div className="absolute bottom-[34px] left-1/2 z-[1] flex -translate-x-1/2 flex-col items-center gap-2.5">
          <span className="text-[11px] tracking-[3px] text-[#9389a0] uppercase">Aşağı sürüş</span>
          <div className="flex h-9 w-[22px] justify-center rounded-full border border-gold/40 pt-[7px]">
            <span className="animate-nh-scrolldot h-[7px] w-[3px] rounded-full bg-gold" />
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-[1140px] scroll-mt-24 px-5 py-[clamp(70px,11vw,130px)] sm:px-10">
        <div className="grid grid-cols-1 items-center gap-9 md:grid-cols-[1fr_1.2fr] md:gap-14">
          <div className="relative">
            <div
              className="flex aspect-[4/5] items-end justify-center rounded-[160px_160px_22px_22px] border border-gold/30 p-[18px]"
              style={{
                backgroundImage: 'repeating-linear-gradient(135deg,#efe5d2 0 14px,#e7dcc6 14px 28px)',
              }}
            >
              <span className="rounded-[20px] bg-white/74 px-3 py-1.5 font-mono text-xs tracking-wide text-muted-soft">
                Nərminin portreti
              </span>
            </div>
            <div className="pointer-events-none absolute -inset-3.5 rounded-[170px_170px_30px_30px] border border-gold/18" />
          </div>
          <div>
            <p className="mb-[18px] text-xs tracking-[4px] text-gold uppercase">Mən kiməm</p>
            <h2 className="mb-6 font-serif text-[clamp(30px,4.6vw,52px)] leading-[1.12] font-bold text-ink">
              Hər ruhun öz mövsümü var
            </h2>
            <p className="mb-[18px] text-[17px] leading-[1.85] text-muted">
              İllər boyu öz daxili qaranlığımla üz-üzə gəldim və hər dəfə işığın yenidən doğduğunu
              gördüm. Bu yol məni özümü tanımağa, sonra isə başqalarına bələdçilik etməyə apardı.
            </p>
            <p className="mb-[30px] text-[17px] leading-[1.85] text-muted">
              Bu gün bir həyat koçu və ruhani bələdçi olaraq, sənin öz cavablarını içində tapmağına
              kömək edirəm. Mən sənə yol göstərmirəm — sənin artıq bildiyini xatırlamağına yardım
              edirəm.
            </p>
            <div className="flex flex-wrap gap-9">
              <div>
                <div className="font-serif text-[42px] leading-none text-gold">8+</div>
                <div className="mt-1 text-[13px] tracking-wide text-muted-soft">il təcrübə</div>
              </div>
              <div>
                <div className="font-serif text-[42px] leading-none text-gold">600+</div>
                <div className="mt-1 text-[13px] tracking-wide text-muted-soft">aparılan seans</div>
              </div>
              <div>
                <div className="font-serif text-[42px] leading-none text-gold">∞</div>
                <div className="mt-1 text-[13px] tracking-wide text-muted-soft">sonsuz şəfqət</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SESSIONS */}
      <section
        id="sessions"
        className="mx-auto max-w-[1140px] scroll-mt-24 px-5 py-[clamp(60px,10vw,110px)] sm:px-10"
      >
        <div className="mx-auto mb-14 max-w-[620px] text-center">
          <p className="mb-[18px] text-xs tracking-[4px] text-gold uppercase">Birə-bir seanslar</p>
          <h2 className="font-serif text-[clamp(30px,5vw,54px)] leading-[1.1] font-bold text-ink">
            Sənə uyğun olan görüşü seç
          </h2>
          <p className="mt-[18px] text-[17px] leading-[1.8] text-muted">
            Hər seans tamamilə sənə həsr olunur — təhlükəsiz, qınamasız və sakit bir məkanda.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {sessions.map((session, i) => (
            <div
              key={session._id}
              className="rounded-[22px] border border-gold/16 bg-linear-to-b from-white/90 to-white/66 p-9 shadow-[0_16px_44px_rgba(120,92,50,.12)] backdrop-blur-[6px] transition-[transform,box-shadow,border-color] duration-[400ms] hover:-translate-y-2 hover:border-gold/50"
            >
              <div className="mb-[22px] flex h-[50px] w-[50px] items-center justify-center rounded-full border border-gold/40 font-serif text-[22px] text-gold">
                {toRoman(i + 1)}
              </div>
              <h3 className="mb-3 font-serif text-[26px] font-bold text-ink">{session.name}</h3>
              <p className="mb-6 text-[15px] leading-[1.7] text-[#554d61]">{session.description}</p>
              <div className="flex items-center justify-between border-t border-[rgba(70,48,30,.10)] pt-[18px]">
                <span className="text-[13px] tracking-wide text-muted-soft">
                  {session.duration} · {session.format}
                </span>
                <span className="font-serif text-2xl text-gold">{formatPrice(session.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COURSES */}
      <section
        id="courses"
        className="scroll-mt-24 bg-linear-to-b from-transparent via-white/55 to-transparent px-5 py-[clamp(60px,10vw,110px)] sm:px-10"
      >
        <div className="mx-auto max-w-[1140px]">
          <div className="mx-auto mb-14 max-w-[620px] text-center">
            <p className="mb-[18px] text-xs tracking-[4px] text-gold uppercase">Dərslər & Kurslar</p>
            <h2 className="font-serif text-[clamp(30px,5vw,54px)] leading-[1.1] font-bold text-ink">
              Daha dərin bir səyahət
            </h2>
            <p className="mt-[18px] text-[17px] leading-[1.8] text-muted">
              Öz ritmində irəlilə — addım-addım, nəfəs-nəfəs.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="mx-auto max-w-[1140px] scroll-mt-24 px-5 py-[clamp(60px,10vw,110px)] sm:px-10">
        <div className="mb-[50px] flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-[18px] text-xs tracking-[4px] text-gold uppercase">Bloglar</p>
            <h2 className="font-serif text-[clamp(30px,5vw,54px)] leading-[1.1] font-bold text-ink">
              Düşüncələrim & rituallarım
            </h2>
          </div>
          <Link
            href="/bloglar"
            className="rounded-full border border-gold/40 px-6 py-3 text-sm tracking-wide text-gold no-underline transition-colors hover:bg-gold/8"
          >
            Hamısına bax
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-24 px-5 py-[clamp(60px,10vw,120px)] sm:px-10">
        <div className="relative mx-auto max-w-[920px] overflow-hidden rounded-[30px] border border-gold/22 bg-linear-to-br from-white/82 to-[rgba(249,241,227,.72)] p-[clamp(34px,5vw,64px)] backdrop-blur-[10px]">
          <div
            className="pointer-events-none absolute -top-[120px] -right-20 h-[300px] w-[300px] rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(160,120,56,.16),transparent 70%)' }}
          />
          <div className="relative mb-10 text-center">
            <p className="mb-[18px] text-xs tracking-[4px] text-gold uppercase">Əlaqə & Rezervasiya</p>
            <h2 className="font-serif text-[clamp(28px,4.6vw,48px)] leading-[1.12] font-bold text-ink">
              Səyahətə bu gün başlayaq
            </h2>
            <p className="mx-auto mt-4 max-w-[480px] text-base leading-[1.8] text-muted">
              Formu doldur — 24 saat ərzində səninlə şəxsən əlaqə saxlayacağam.
            </p>
          </div>
          <div className="relative">
            <BookingForm topics={topics} />
          </div>
        </div>
      </section>
    </>
  )
}
