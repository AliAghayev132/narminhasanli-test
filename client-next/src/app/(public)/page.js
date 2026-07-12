import { HomeContent } from './HomeContent'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({ path: '/' })

export default function HomePage() {
  return <HomeContent />
}
