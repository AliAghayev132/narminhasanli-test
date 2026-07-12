import { notFound } from 'next/navigation'

import { BlogDetailContent } from './BlogDetailContent'
import { apiFetch } from '@/lib/api'
import { buildMetadata } from '@/lib/seo'

async function getBlog(slug) {
  const res = await apiFetch(`/blogs/${slug}`)
  return res?.data?.blog || null
}

export async function generateStaticParams() {
  const res = await apiFetch('/blogs?limit=50')
  const blogs = res?.data?.blogs || []
  return blogs.map((blog) => ({ slug: blog.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const blog = await getBlog(slug)
  if (!blog) return buildMetadata({ path: `/bloglar/${slug}` })

  return buildMetadata({
    title: blog.title,
    description: blog.excerpt,
    path: `/bloglar/${blog.slug}`,
  })
}

// Fetched again here (Next dedupes identical fetch() calls within a render
// pass, so this isn't a second network round-trip) so a nonexistent slug
// gets a real 404 status -- the client component's own "not found" state
// only kicks in once RTK Query resolves, which can't affect the response.
export default async function BlogDetailPage({ params }) {
  const { slug } = await params
  const blog = await getBlog(slug)
  if (!blog) notFound()

  return <BlogDetailContent slug={slug} />
}
