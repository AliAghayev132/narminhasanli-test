'use client'

import { useEffect } from 'react'

// Global error boundary for the route segment. Must be a Client Component.
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log to your monitoring service here.
    console.error(error)
  }, [error])

  return (
    <div className="relative z-[2] flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="font-serif text-2xl font-bold text-ink">Nəsə səhv getdi</h1>
      <p className="max-w-md text-sm text-muted">
        Gözlənilməz bir xəta baş verdi. Yenidən cəhd edə və ya ana səhifəyə qayıda bilərsən.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-[#2c2530] transition-colors hover:bg-gold-light"
      >
        Yenidən cəhd et
      </button>
    </div>
  )
}
