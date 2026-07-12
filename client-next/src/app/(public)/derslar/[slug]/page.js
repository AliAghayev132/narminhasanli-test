import { notFound } from 'next/navigation'

import { CourseDetailContent } from './CourseDetailContent'
import { apiFetch } from '@/lib/api'
import { buildMetadata } from '@/lib/seo'

async function getCourse(slug) {
  const res = await apiFetch(`/courses/${slug}`)
  return res?.data?.course || null
}

export async function generateStaticParams() {
  const res = await apiFetch('/courses')
  const courses = res?.data?.courses || []
  return courses.map((course) => ({ slug: course.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const course = await getCourse(slug)
  if (!course) return buildMetadata({ path: `/derslar/${slug}` })

  return buildMetadata({
    title: course.title,
    description: course.description,
    path: `/derslar/${course.slug}`,
  })
}

// Fetched again here (Next dedupes identical fetch() calls within a render
// pass, so this isn't a second network round-trip) so a nonexistent slug
// gets a real 404 status -- the client component's own "not found" state
// only kicks in once RTK Query resolves, which can't affect the response.
export default async function CourseDetailPage({ params }) {
  const { slug } = await params
  const course = await getCourse(slug)
  if (!course) notFound()

  return <CourseDetailContent slug={slug} />
}
