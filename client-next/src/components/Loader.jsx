import { clsx } from 'clsx'

/**
 * Full-viewport branded loading screen — used for route-level loading.js
 * files (server-render/streaming gap between clicking a link and the new
 * route's shell appearing). Reuses the hero's breathing-circle motif.
 */
export const PageLoader = () => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-5 py-24 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="animate-nh-breathe absolute inset-0 rounded-full border border-gold/30" />
        <span
          className="animate-nh-breathe absolute inset-2 rounded-full border border-gold/25"
          style={{ animationDelay: '-2.3s' }}
        />
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 font-serif text-xl text-gold">
          N
        </span>
      </div>
      <span className="text-sm tracking-wide text-muted-soft">Yüklənir...</span>
    </div>
  )
}

/** A single shimmering line placeholder. */
const SkeletonLine = ({ width = 'w-full', height = 'h-3.5' }) => (
  <div className={clsx('nh-shimmer animate-nh-shimmer rounded-full bg-[#e7dcc6]', width, height)} />
)

const STRIPES = {
  backgroundImage: 'repeating-linear-gradient(135deg,#efe5d2 0 16px,#e7dcc6 16px 32px)',
}

/**
 * A single shimmering placeholder card, shaped to match the real
 * session/course/blog card it stands in for.
 */
export const CardSkeleton = ({ variant = 'blog' }) => {
  if (variant === 'session') {
    return (
      <div className="rounded-[22px] border border-gold/16 bg-linear-to-b from-white/90 to-white/66 p-9 shadow-[0_16px_44px_rgba(120,92,50,.12)]">
        <div className="nh-shimmer animate-nh-shimmer mb-[22px] h-[50px] w-[50px] rounded-full bg-[#e7dcc6]" />
        <div className="mb-4 space-y-2.5">
          <SkeletonLine width="w-3/4" height="h-5" />
        </div>
        <div className="mb-6 space-y-2.5">
          <SkeletonLine />
          <SkeletonLine width="w-5/6" />
        </div>
        <div className="flex items-center justify-between border-t border-[rgba(70,48,30,.10)] pt-[18px]">
          <SkeletonLine width="w-24" />
          <SkeletonLine width="w-12" />
        </div>
      </div>
    )
  }

  if (variant === 'course') {
    return (
      <div className="flex flex-col overflow-hidden rounded-3xl border border-gold/16 bg-linear-to-b from-white/90 to-white/68 shadow-[0_18px_48px_rgba(120,92,50,.13)]">
        <div className="h-[150px]" style={STRIPES} />
        <div className="flex flex-1 flex-col p-7">
          <SkeletonLine width="w-1/3" height="h-3" />
          <div className="mt-3 mb-3">
            <SkeletonLine width="w-2/3" height="h-6" />
          </div>
          <div className="mb-6 flex-1 space-y-2.5">
            <SkeletonLine />
            <SkeletonLine width="w-5/6" />
          </div>
          <div className="flex items-center justify-between border-t border-[rgba(70,48,30,.1)] pt-[18px]">
            <SkeletonLine width="w-16" height="h-6" />
            <SkeletonLine width="w-20" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-[22px] border border-gold/14 bg-white/78 shadow-[0_16px_44px_rgba(120,92,50,.12)]">
      <div className="h-[170px]" style={STRIPES} />
      <div className="p-6">
        <div className="mb-3.5">
          <SkeletonLine width="w-1/3" height="h-3" />
        </div>
        <div className="mb-3">
          <SkeletonLine width="w-4/5" height="h-6" />
        </div>
        <div className="space-y-2.5">
          <SkeletonLine />
          <SkeletonLine width="w-2/3" />
        </div>
      </div>
    </div>
  )
}

/** A grid of shimmering card placeholders, matching a real card grid's layout. */
export const CardSkeletonGrid = ({ count = 3, variant = 'blog', columns = 'md:grid-cols-3' }) => (
  <div className={clsx('grid grid-cols-1 gap-6', columns)}>
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} variant={variant} />
    ))}
  </div>
)

/** Small on-brand error note for RTK Query error states. */
export const ErrorNote = ({ label = 'Məlumat yüklənərkən xəta baş verdi.' }) => {
  return (
    <div className="py-24 text-center text-sm text-muted-soft">
      <p>{label}</p>
    </div>
  )
}
