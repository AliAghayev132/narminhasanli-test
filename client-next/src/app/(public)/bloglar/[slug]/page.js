import { BlogDetailContent } from './BlogDetailContent'
import { apiFetch } from '@/lib/api'
import { buildMetadata } from '@/lib/seo'

export async function generateStaticParams() {
  const res = await apiFetch('/blogs?limit=50')
  const blogs = res?.data?.blogs || []
  return blogs.map((blog) => ({ slug: blog.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const res = await apiFetch(`/blogs/${slug}`)
  const blog = res?.data?.blog

  if (!blog) return buildMetadata({ path: `/bloglar/${slug}` })

  return buildMetadata({
    title: blog.title,
    description: blog.excerpt,
    path: `/bloglar/${blog.slug}`,
  })
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params
  return <BlogDetailContent slug={slug} />
}
