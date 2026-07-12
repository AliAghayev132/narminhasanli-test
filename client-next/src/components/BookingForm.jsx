'use client'

import { useState } from 'react'

import { useCreateBookingMutation } from '@/store/api'

const fieldClass =
  'rounded-xl border border-gold/20 bg-white/70 px-4 py-3.5 font-sans text-[15px] text-ink-soft outline-none transition-colors focus:border-gold/50'

/**
 * The reservation/contact form — POSTs to /api/bookings. Used both on the
 * home page (#contact) and the standalone /elaqe page.
 */
export const BookingForm = ({
  topics,
  submitLabel = 'Rezervasiya et ✦',
  thankYouNote = 'Mesajın mənə çatdı. Tezliklə şəxsən cavab yazacağam. Bu vaxta qədər dərin bir nəfəs al. ✶',
}) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    sessionType: topics[0],
    message: '',
  })
  const [sent, setSent] = useState(false)
  const [sentName, setSentName] = useState('')
  const [createBooking, { isLoading, isError }] = useCreateBookingMutation()

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await createBooking(form).unwrap()
      setSentName(form.name.trim() || 'əziz ruh')
      setSent(true)
    } catch {
      // isError renders an inline message below; the form stays filled in.
    }
  }

  if (sent) {
    return (
      <div className="px-5 py-10 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 text-[28px] text-gold">
          ✦
        </div>
        <h3 className="mb-2.5 font-serif text-[30px] text-ink">Təşəkkür edirəm, {sentName}</h3>
        <p className="mx-auto max-w-[380px] text-base leading-[1.7] text-muted">{thankYouNote}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <label className="text-[13px] tracking-wide text-muted-soft">Adın</label>
        <input
          required
          value={form.name}
          onChange={set('name')}
          placeholder="Adını yaz"
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[13px] tracking-wide text-muted-soft">E-poçt</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={set('email')}
          placeholder="sen@numune.az"
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label className="text-[13px] tracking-wide text-muted-soft">Mövzu</label>
        <select value={form.sessionType} onChange={set('sessionType')} className={fieldClass}>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label className="text-[13px] tracking-wide text-muted-soft">Mesajın</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={set('message')}
          placeholder="Ürəyindən keçəni paylaş..."
          className={`${fieldClass} resize-y`}
        />
      </div>

      {isError && (
        <p className="text-sm text-red-600 sm:col-span-2">
          Nəsə səhv getdi, zəhmət olmasa bir az sonra yenidən cəhd et.
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 justify-self-center rounded-full bg-gold px-11 py-4 text-[15px] tracking-wide text-[#2c2530] transition-colors hover:bg-gold-light disabled:opacity-60 sm:col-span-2"
      >
        {isLoading ? 'Göndərilir...' : submitLabel}
      </button>
    </form>
  )
}
