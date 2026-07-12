import { BlogsListContent } from './BlogsListContent'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Bloglar',
  description: 'Ruhun yolçuluğu haqqında yazılar — sükut, nəfəs, niyyət və gündəlik kiçik oyanışlar.',
  path: '/bloglar',
})

export default function BlogsPage() {
  return <BlogsListContent />
}
