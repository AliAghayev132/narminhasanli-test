// Route-level loading UI shown during navigation / streaming.
export default function Loading() {
  return (
    <div className="relative z-[2] flex min-h-screen items-center justify-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 font-serif text-lg text-gold">
        N
      </span>
    </div>
  )
}
