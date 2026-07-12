import { CoursesListContent } from './CoursesListContent'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Dərslər & Kurslar',
  description: 'Daha dərin bir səyahət — Nərmin Həsənli ilə dərslər, kurslar və qrup proqramları.',
  path: '/derslar',
})

export default function CoursesPage() {
  return <CoursesListContent />
}
