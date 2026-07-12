import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export default function PublicLayout({ children }) {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden font-sans text-ink-soft antialiased"
      style={{
        background:
          'radial-gradient(150% 125% at 50% -10%, #fdfaf3 0%, #f4ecdd 48%, #ece1cd 100%)',
      }}
    >
      <Nav />
      <main className="relative z-[2]">{children}</main>
      <Footer />
    </div>
  )
}
