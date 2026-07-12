'use client'

import { useState } from 'react'
import Link from 'next/link'

const LINKS = [
  { href: '/#about', label: 'Haqqımda' },
  { href: '/#sessions', label: 'Seanslar' },
  { href: '/derslar', label: 'Dərslər' },
  { href: '/bloglar', label: 'Bloglar' },
]

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 backdrop-blur-md sm:px-8 lg:px-16"
        style={{
          background:
            'linear-gradient(to bottom, rgba(247,240,224,.9), rgba(247,240,224,0))',
        }}
      >
        <Link href="/" className="flex items-center gap-3 text-ink-soft no-underline">
          <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-gold/50 font-serif text-xl tracking-wide text-gold">
            N
          </span>
          <span className="font-serif text-[22px] tracking-wide">Nərmin Həsənli</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] tracking-wide text-muted-soft no-underline transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/elaqe"
            className="rounded-full bg-gold px-[22px] py-2.5 text-sm tracking-wide text-[#2c2530] no-underline transition-colors hover:bg-gold-light"
          >
            Rezervasiya
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Menyu"
          className="flex flex-col gap-1.5 p-1.5 md:hidden"
        >
          <span className="block h-[1.5px] w-6 bg-gold" />
          <span className="block h-[1.5px] w-6 bg-gold" />
          <span className="block h-[1.5px] w-6 bg-gold" />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed top-[78px] right-4 left-4 z-[29] flex flex-col gap-1.5 rounded-2xl border border-gold/20 bg-[rgba(252,247,237,.97)] p-[18px] backdrop-blur-lg md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-[rgba(70,48,30,.09)] px-2 py-3 text-[17px] text-ink-soft no-underline"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/elaqe"
            onClick={() => setMenuOpen(false)}
            className="px-2 py-3 text-[17px] text-gold no-underline"
          >
            Rezervasiya
          </Link>
        </div>
      )}
    </>
  )
}
