// ============ SEO CONFIG ============
// Central place for site-wide SEO defaults.
export const SITE_NAME = 'Nərmin Həsənli'
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export const DEFAULT_TITLE = 'Nərmin Həsənli — Həyat Koçu & Ruhani Bələdçi'
export const DEFAULT_DESCRIPTION =
  'İçindəki işığı yenidən kəşf et. Həyat koçluğu, ruhani bələdçilik, fərdi seanslar və kurslar.'
export const DEFAULT_IMAGE = '/og-image.png'

/**
 * Build a Next.js Metadata object for a page.
 *
 * Use it from a page's `generateMetadata()` (or assign to `export const
 * metadata`). The root layout defines the title template ("%s | Nərmin
 * Həsənli"), so pass a short `title` here and it will be composed
 * automatically.
 *
 * @param {object}  opts
 * @param {string}  [opts.title]       Short page title (composed via template).
 * @param {string}  [opts.description] Meta description.
 * @param {string}  [opts.path]        Path for the canonical URL (e.g. '/elaqe').
 * @param {string}  [opts.image]       OG/Twitter image (absolute or root-relative).
 * @param {boolean} [opts.noindex]     When true, ask crawlers not to index.
 * @returns {import('next').Metadata}
 */
export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image = DEFAULT_IMAGE,
  noindex = false,
} = {}) {
  const url = `${SITE_URL}${path}`
  const fullImage = image?.startsWith('http') ? image : `${SITE_URL}${image}`
  const composedTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE

  return {
    // A plain string is composed by the parent layout's title.template
    // ("%s | Nərmin Həsənli"). When no title is given we bypass the template
    // with `absolute` so the home page shows the full default title verbatim.
    title: title ? title : { absolute: DEFAULT_TITLE },
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: composedTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: fullImage, width: 1200, height: 630, alt: composedTitle }],
      type: 'website',
      locale: 'az_AZ',
    },
    twitter: {
      card: 'summary_large_image',
      title: composedTitle,
      description,
      images: [fullImage],
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}
