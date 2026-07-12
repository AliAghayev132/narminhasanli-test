import { ContactContent } from './ContactContent'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Əlaqə & Rezervasiya',
  description: 'İlk addım sadəcə bir salamdır. Formu doldur və ya birbaşa yaz — 24 saat ərzində cavab veriləcək.',
  path: '/elaqe',
})

export default function ContactPage() {
  return <ContactContent />
}
