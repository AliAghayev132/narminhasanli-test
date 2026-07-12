import { CourseDetailContent } from './CourseDetailContent'
import { apiFetch } from '@/lib/api'
import { buildMetadata } from '@/lib/seo'

export async function generateStaticParams() {
  const res = await apiFetch('/courses')
  const courses = res?.data?.courses || []
  return courses.map((course) => ({ slug: course.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const res = await apiFetch(`/courses/${slug}`)
  const course = res?.data?.course

  if (!course) return buildMetadata({ path: `/derslar/${slug}` })

  return buildMetadata({
    title: course.title,
    description: course.description,
    path: `/derslar/${course.slug}`,
  })
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params
  return <CourseDetailContent slug={slug} />
}
