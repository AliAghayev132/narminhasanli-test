import { Lora, Manrope } from 'next/font/google'

import '../styles/globals.css'

import { Providers } from './providers'
import { BackgroundFX } from '@/components/BackgroundFX'
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE,
} from '@/lib/seo'

const lora = Lora({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

// Root metadata. Child pages override/extend via `generateMetadata` or a static
// `metadata` export. The title template applies to every string title below.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: DEFAULT_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    locale: 'az_AZ',
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_IMAGE],
  },
  robots: { index: true, follow: true },
}

// Viewport is exported separately from metadata (Next.js 14+ convention).
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ad8649',
}

export default function RootLayout({ children }) {
  return (
    <html lang="az" className={`${lora.variable} ${manrope.variable}`}>
      <body>
        <Providers>
          <BackgroundFX />
          {children}
        </Providers>
      </body>
    </html>
  )
}
