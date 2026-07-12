import Link from 'next/link'

import { formatDate } from '@/lib/format'

/**
 * A blog preview card — used on the home page (#blog) and the /bloglar grid.
 */
export const BlogCard = ({ blog }) => {
  return (
    <Link
      href={`/bloglar/${blog.slug}`}
      className="group block overflow-hidden rounded-[22px] border border-gold/14 bg-white/78 no-underline shadow-[0_16px_44px_rgba(120,92,50,.12)] transition-[transform,box-shadow,border-color] duration-[400ms] hover:-translate-y-2 hover:border-gold/45"
    >
      <div
        className="flex h-[170px] items-center justify-center"
        style={{
          backgroundImage:
            'repeating-linear-gradient(150deg,#efe5d2 0 16px,#e7dcc6 16px 32px)',
        }}
      >
        <span className="rounded-2xl bg-white/62 px-2.5 py-1.5 font-mono text-[11px] tracking-wide text-muted-soft">
          blog görseli
        </span>
      </div>
      <div className="p-6">
        <div className="mb-3.5 flex items-center gap-3">
          <span className="text-[11px] tracking-wider text-gold uppercase">{blog.category}</span>
          <span className="h-[3px] w-[3px] rounded-full bg-[#cdbfa8]" />
          <span className="text-xs text-muted-soft">{formatDate(blog.publishedAt)}</span>
        </div>
        <h3 className="mb-3 font-serif text-2xl leading-[1.25] font-bold text-ink">
          {blog.title}
        </h3>
        <p className="line-clamp-3 text-[15px] leading-[1.7] text-[#554d61]">{blog.excerpt}</p>
      </div>
    </Link>
  )
}
