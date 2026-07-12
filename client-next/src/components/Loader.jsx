/** Small on-brand loading indicator for RTK Query pending states. */
export const Loader = ({ label = 'Yüklənir...' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 font-serif text-lg text-gold">
        N
      </span>
      <span className="text-sm tracking-wide text-muted-soft">{label}</span>
    </div>
  )
}

/** Small on-brand error note for RTK Query error states. */
export const ErrorNote = ({ label = 'Məlumat yüklənərkən xəta baş verdi.' }) => {
  return (
    <div className="py-24 text-center text-sm text-muted-soft">
      <p>{label}</p>
    </div>
  )
}
