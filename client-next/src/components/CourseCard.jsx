import Link from 'next/link'

import { formatPrice } from '@/lib/format'

/**
 * A course preview card — used on the home page (#courses) and the
 * /derslar grid. `variant="compact"` is the smaller home-page treatment.
 */
export const CourseCard = ({ course, variant = 'full' }) => {
  const compact = variant === 'compact'

  return (
    <Link
      href={`/derslar/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-gold/16 bg-linear-to-b from-white/90 to-white/68 no-underline shadow-[0_18px_48px_rgba(120,92,50,.13)] transition-[transform,box-shadow,border-color] duration-[400ms] hover:-translate-y-2 hover:border-gold/50"
    >
      <div
        className={`relative flex items-end ${compact ? 'h-[150px]' : 'h-[180px]'} p-4`}
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg,#efe5d2 0 16px,#e7dcc6 16px 32px)',
        }}
      >
        {course.featured && (
          <span className="absolute top-4 left-4 rounded-full bg-gold px-3 py-1 text-[11px] tracking-wider text-[#2c2530] uppercase">
            Populyar
          </span>
        )}
        <span className="rounded-2xl bg-white/62 px-2.5 py-1.5 font-mono text-[11px] tracking-wide text-muted-soft">
          kurs görseli
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="mb-3 flex items-center gap-3.5">
          <span className="text-xs tracking-wider text-gold uppercase">{course.duration}</span>
          {course.level && (
            <>
              <span className="h-[3px] w-[3px] rounded-full bg-[#cdbfa8]" />
              <span className="text-xs text-muted-soft">{course.level}</span>
            </>
          )}
        </div>
        <h3 className="mb-3 font-serif text-[28px] font-bold text-ink">{course.title}</h3>
        <p className="mb-6 flex-1 text-[15px] leading-[1.75] text-[#554d61]">
          {course.description}
        </p>
        <div className="flex items-center justify-between border-t border-[rgba(70,48,30,.1)] pt-[18px]">
          <span className="font-serif text-2xl text-gold">{formatPrice(course.price)}</span>
          <span className="text-sm tracking-wide text-gold">Ətraflı bax →</span>
        </div>
      </div>
    </Link>
  )
}
