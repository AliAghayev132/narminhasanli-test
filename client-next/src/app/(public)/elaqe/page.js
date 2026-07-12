import { BookingForm } from '@/components/BookingForm'
import { apiFetch } from '@/lib/api'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Əlaqə & Rezervasiya',
  description: 'İlk addım sadəcə bir salamdır. Formu doldur və ya birbaşa yaz — 24 saat ərzində cavab veriləcək.',
  path: '/elaqe',
})

const CHANNELS = [
  { icon: '✉', label: 'E-poçt', value: 'salam@nerminhesenli.az' },
  { icon: '☎', label: 'Telefon / WhatsApp', value: '+994 50 000 00 00' },
  { icon: '✦', label: 'Instagram', value: '@nermin.hesenli' },
  { icon: '☾', label: 'Məkan', value: 'Bakı · Onlayn seanslar' },
]

const FAQS = [
  {
    q: 'Seanslar onlayn keçirilir?',
    a: 'Bəli, seanslarımın böyük hissəsi Zoom vasitəsilə onlayn keçirilir. Bakıda üzbəüz görüş də mümkündür — formda qeyd et.',
  },
  {
    q: 'İlk görüş üçün necə hazırlaşım?',
    a: 'Heç bir hazırlıq lazım deyil. Sadəcə sakit bir yer və özünə bir az vaxt kifayətdir. Qalan hər şeyi birlikdə edəcəyik.',
  },
  {
    q: 'Ödəniş necə aparılır?',
    a: 'Görüş təsdiqləndikdən sonra kart və ya köçürmə ilə ödəniş linki göndərilir.',
  },
  {
    q: 'Fikrimi dəyişsəm, ləğv edə bilərəm?',
    a: 'Əlbəttə. Görüşdən 24 saat əvvələ qədər pulsuz ləğv və ya təxirə salma mümkündür.',
  },
]

export default async function ContactPage() {
  const res = await apiFetch('/sessions')
  const sessions = res?.data?.sessions || []
  const topics = [...sessions.map((s) => s.name), 'Kurs haqqında sual', 'Digər']

  return (
    <>
      <header className="mx-auto max-w-[760px] px-5 pt-[170px] pb-5 text-center sm:px-10">
        <p className="mb-6 text-[13px] tracking-[5px] text-gold uppercase">
          ✦ &nbsp;Əlaqə & Rezervasiya&nbsp; ✦
        </p>
        <h1 className="font-serif text-[clamp(38px,6.5vw,72px)] leading-[1.06] font-bold text-ink">
          Səyahətə bu gün başlayaq
        </h1>
        <p className="mx-auto mt-[22px] max-w-[520px] text-[clamp(16px,2.2vw,19px)] leading-[1.75] text-muted">
          İlk addım sadəcə bir salamdır. Formu doldur və ya birbaşa mənə yaz — 24 saat ərzində
          cavab verəcəyəm.
        </p>
      </header>

      <section className="mx-auto max-w-[1080px] px-5 py-8 sm:px-10 md:py-[clamp(30px,5vw,60px)]">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="relative overflow-hidden rounded-[26px] border border-gold/20 bg-linear-to-br from-white/88 to-[rgba(249,241,227,.74)] p-[clamp(28px,4vw,44px)] backdrop-blur-[10px]">
            <div
              className="pointer-events-none absolute -top-[120px] -right-20 h-[280px] w-[280px] rounded-full"
              style={{ background: 'radial-gradient(circle,rgba(160,120,56,.14),transparent 70%)' }}
            />
            <div className="relative">
              <BookingForm
                topics={topics}
                submitLabel="Göndər ✦"
                thankYouNote="Mesajın mənə çatdı. Tezliklə şəxsən cavab yazacağam. Bu vaxta qədər dərin bir nəfəs al. ✶"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {CHANNELS.map((ch) => (
              <div
                key={ch.label}
                className="flex items-center gap-4 rounded-[18px] border border-gold/16 bg-white/62 p-5"
              >
                <div className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full border border-gold/40 text-xl text-gold">
                  {ch.icon}
                </div>
                <div>
                  <p className="mb-0.5 text-xs tracking-wide text-muted-soft uppercase">{ch.label}</p>
                  <p className="text-base text-ink-soft">{ch.value}</p>
                </div>
              </div>
            ))}
            <div className="rounded-[18px] border border-gold/16 bg-white/62 p-[22px]">
              <p className="mb-2.5 text-xs tracking-wide text-muted-soft uppercase">İş saatları</p>
              <p className="text-[15px] leading-[1.8] text-[#4a4350]">
                Bazar ertəsi – Cümə: 10:00 – 19:00
                <br />
                Şənbə: 11:00 – 15:00
                <br />
                Bazar: istirahət
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[760px] px-5 py-[clamp(40px,7vw,80px)] sm:px-10">
        <div className="mb-10 text-center">
          <p className="mb-3.5 text-xs tracking-[4px] text-gold uppercase">Tez-tez verilən suallar</p>
          <h2 className="font-serif text-[clamp(28px,4.4vw,44px)] leading-[1.1] font-bold text-ink">
            Ağlında sual var?
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {FAQS.map((faq) => (
            <div
              key={faq.q}
              className="rounded-[18px] border border-gold/16 bg-white/60 px-[26px] py-6"
            >
              <h3 className="mb-2.5 font-serif text-[22px] font-bold text-ink">{faq.q}</h3>
              <p className="text-[15px] leading-[1.8] text-[#554d61]">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
