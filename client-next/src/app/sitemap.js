import { apiFetch } from '@/lib/api'
import { SITE_URL } from '@/lib/seo'

// Generates /sitemap.xml, including every published blog post and course.
export default async function sitemap() {
  const now = new Date()

  const staticRoutes = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/derslar`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/bloglar`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/elaqe`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const [coursesRes, blogsRes] = await Promise.all([
    apiFetch('/courses'),
    apiFetch('/blogs?limit=100'),
  ])

  const courseRoutes = (coursesRes?.data?.courses || []).map((course) => ({
    url: `${SITE_URL}/derslar/${course.slug}`,
    lastModified: course.updatedAt ? new Date(course.updatedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const blogRoutes = (blogsRes?.data?.blogs || []).map((blog) => ({
    url: `${SITE_URL}/bloglar/${blog.slug}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...courseRoutes, ...blogRoutes]
}
