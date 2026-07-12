import Link from 'next/link'

const LINKS = [
  { href: '/#about', label: 'Haqqımda' },
  { href: '/#sessions', label: 'Seanslar' },
  { href: '/derslar', label: 'Dərslər' },
  { href: '/bloglar', label: 'Bloglar' },
  { href: '/elaqe', label: 'Əlaqə' },
]

export const Footer = () => {
  return (
    <footer className="relative z-[2] border-t border-[rgba(70,48,30,.10)] px-5 pt-[54px] pb-10 text-center sm:px-8 lg:px-16">
      <div className="mb-[18px] flex items-center justify-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 font-serif text-lg text-gold">
          N
        </span>
        <span className="font-serif text-[22px] text-ink-soft">Nərmin Həsənli</span>
      </div>

      <p className="mb-6 font-serif text-[19px] text-muted italic">
        &quot;İçindəki sükuta qulaq as — bütün cavablar oradadır.&quot;
      </p>

      <div className="mb-[26px] flex flex-wrap justify-center gap-[26px]">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-muted-soft no-underline transition-colors hover:text-gold"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <p className="text-[13px] tracking-wide text-[#9a8f82]">
        © 2026 Nərmin Həsənli · Sevgi və işıqla hazırlanıb ✶
      </p>
    </footer>
  )
}
