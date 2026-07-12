import Link from 'next/link'

// Rendered for unmatched routes (/404).
export default function NotFound() {
  return (
    <div className="relative z-[2] flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="font-serif text-6xl font-bold text-gold">404</p>
      <h1 className="font-serif text-2xl font-bold text-ink">Səhifə tapılmadı</h1>
      <p className="max-w-md text-sm text-muted">
        Axtardığın səhifə mövcud deyil və ya köçürülüb.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-[#2c2530] no-underline transition-colors hover:bg-gold-light"
      >
        Ana səhifəyə qayıt
      </Link>
    </div>
  )
}
