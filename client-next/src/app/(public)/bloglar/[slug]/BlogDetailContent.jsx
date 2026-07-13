'use client'

import Link from 'next/link'

import { BlogCard } from '@/components/BlogCard'
import { PageLoader } from '@/components/Loader'
import { useGetBlogQuery, useGetBlogsQuery } from '@/store/api'
import { formatDate } from '@/lib/format'

export const BlogDetailContent = ({ slug }) => {
  const { data, isLoading, isError } = useGetBlogQuery(slug)
  const { data: relatedRes } = useGetBlogsQuery({ limit: 4 })
  const blog = data?.data?.blog

  if (isLoading) return <PageLoader />
  if (isError || !blog) {
    return (
      <div className="mx-auto max-w-[600px] px-5 py-40 text-center">
        <h1 className="mb-3 font-serif text-2xl font-bold text-ink">Yazı tapılmadı</h1>
        <Link href="/bloglar" className="text-sm text-gold no-underline">
          ← Bütün yazılar
        </Link>
      </div>
    )
  }

  const related = (relatedRes?.data?.blogs || []).filter((b) => b._id !== blog._id).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.publishedAt,
    author: { '@type': 'Person', name: 'Nərmin Həsənli' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-[760px] px-5 pt-[150px] sm:px-10">
        <div className="mb-9 text-center">
          <Link
            href="/bloglar"
            className="mb-[22px] inline-block text-[13px] tracking-wide text-muted-soft no-underline transition-colors hover:text-gold"
          >
            ← Bütün yazılar
          </Link>
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="rounded-full bg-gold px-3 py-1 text-[11px] tracking-wider text-[#2c2530] uppercase">
              {blog.category}
            </span>
            <span className="text-[13px] text-muted-soft">
              {formatDate(blog.publishedAt)} · {blog.readTime} oxu
            </span>
          </div>
          <h1 className="font-serif text-[clamp(32px,5.5vw,58px)] leading-[1.12] font-bold text-ink">
            {blog.title}
          </h1>
        </div>

        <div
          className="mb-11 flex h-[clamp(220px,38vw,380px)] items-center justify-center rounded-3xl border border-gold/20"
          style={{
            backgroundImage: 'repeating-linear-gradient(135deg,#efe5d2 0 16px,#e7dcc6 16px 32px)',
          }}
        >
          <span className="rounded-[18px] bg-white/62 px-3.5 py-1.5 font-mono text-xs tracking-wide text-muted-soft">
            yazı üçün əsas görsel
          </span>
        </div>

        <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />

        <div className="my-[50px] flex items-center gap-5 rounded-[22px] border border-gold/18 bg-linear-to-br from-white/82 to-[rgba(249,241,227,.7)] p-7">
          <div
            className="h-[70px] w-[70px] flex-shrink-0 rounded-full border border-gold/40"
            style={{
              backgroundImage: 'repeating-linear-gradient(135deg,#efe5d2 0 10px,#e7dcc6 10px 20px)',
            }}
          />
          <div>
            <p className="mb-1.5 text-xs tracking-wider text-gold uppercase">Müəllif</p>
            <h3 className="mb-1.5 font-serif text-2xl font-bold text-ink">Nərmin Həsənli</h3>
            <p className="text-[15px] leading-[1.6] text-[#554d61]">
              Həyat koçu və ruhani bələdçi. Sükut, nəfəs və özünütanıma haqqında yazır.
            </p>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1140px] px-5 pt-8 pb-[clamp(50px,8vw,90px)] sm:px-10">
          <div className="mb-10 text-center">
            <p className="mb-3.5 text-xs tracking-[4px] text-gold uppercase">Oxumağa davam et</p>
            <h2 className="font-serif text-[clamp(26px,4vw,42px)] leading-[1.1] font-bold text-ink">
              Bənzər yazılar
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {related.map((b) => (
              <BlogCard key={b._id} blog={b} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
