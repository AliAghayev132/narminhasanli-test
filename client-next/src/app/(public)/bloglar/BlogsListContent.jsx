'use client'

import Link from 'next/link'

import { BlogCard } from '@/components/BlogCard'
import { CardSkeletonGrid, ErrorNote } from '@/components/Loader'
import { useGetBlogsQuery } from '@/store/api'
import { formatDate } from '@/lib/format'

export const BlogsListContent = () => {
  const { data, isLoading, isError } = useGetBlogsQuery({ limit: 50 })
  const blogs = data?.data?.blogs || []

  const featured = blogs.find((b) => b.featured) || blogs[0]
  const rest = blogs.filter((b) => b._id !== featured?._id)
  const categories = ['Hamısı', ...new Set(blogs.map((b) => b.category))]

  return (
    <>
      <header className="mx-auto max-w-[760px] px-5 pt-[170px] pb-8 text-center sm:px-10">
        <p className="mb-6 text-[13px] tracking-[5px] text-gold uppercase">✦ &nbsp;Bloglar&nbsp; ✦</p>
        <h1 className="font-serif text-[clamp(38px,6.5vw,72px)] leading-[1.06] font-bold text-ink">
          Düşüncələrim & rituallarım
        </h1>
        <p className="mx-auto mt-[22px] max-w-[520px] text-[clamp(16px,2.2vw,19px)] leading-[1.75] text-muted">
          Ruhun yolçuluğu haqqında yazılar — sükut, nəfəs, niyyət və gündəlik kiçik oyanışlar.
        </p>
      </header>

      {isLoading && (
        <div className="mx-auto max-w-[1140px] px-5 pt-2.5 pb-[clamp(50px,8vw,90px)] sm:px-10">
          <CardSkeletonGrid variant="blog" count={6} columns="sm:grid-cols-2 md:grid-cols-3" />
        </div>
      )}
      {isError && <ErrorNote />}

      {!isLoading && !isError && (
        <>
          <div className="mx-auto flex max-w-[1140px] flex-wrap justify-center gap-3 px-5 py-4 sm:px-10">
            {categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-gold/30 bg-white/50 px-5 py-2.5 text-[13px] tracking-wide text-muted"
              >
                {cat}
              </span>
            ))}
          </div>

          {featured && (
            <section className="mx-auto max-w-[1140px] px-5 py-[clamp(30px,5vw,50px)] sm:px-10">
              <Link
                href={`/bloglar/${featured.slug}`}
                className="grid grid-cols-1 overflow-hidden rounded-[26px] border border-gold/18 bg-linear-to-b from-white/90 to-white/70 no-underline shadow-[0_24px_60px_rgba(120,92,50,.14)] md:grid-cols-[1.1fr_1fr]"
              >
                <div
                  className="flex min-h-[220px] items-center justify-center md:min-h-[300px]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(135deg,#efe5d2 0 16px,#e7dcc6 16px 32px)',
                  }}
                >
                  <span className="rounded-2xl bg-white/62 px-3 py-1.5 font-mono text-[11px] tracking-wide text-muted-soft">
                    seçilmiş yazı görseli
                  </span>
                </div>
                <div className="flex flex-col justify-center p-[clamp(28px,4vw,48px)]">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-full bg-gold px-3 py-1 text-[11px] tracking-wider text-[#2c2530] uppercase">
                      Seçilmiş
                    </span>
                    <span className="text-xs text-muted-soft">
                      {formatDate(featured.publishedAt)} · {featured.readTime} oxu
                    </span>
                  </div>
                  <h2 className="mb-3.5 font-serif text-[clamp(26px,3.4vw,38px)] leading-[1.15] font-bold text-ink">
                    {featured.title}
                  </h2>
                  <p className="mb-[22px] text-base leading-[1.8] text-muted">{featured.excerpt}</p>
                  <span className="self-start border-b border-gold/40 pb-[3px] text-sm tracking-wide text-gold">
                    Yazını oxu →
                  </span>
                </div>
              </Link>
            </section>
          )}

          <section className="mx-auto max-w-[1140px] px-5 pt-2.5 pb-[clamp(50px,8vw,90px)] sm:px-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {rest.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  )
}
