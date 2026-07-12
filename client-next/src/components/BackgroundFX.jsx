'use client'

import { useEffect, useRef } from 'react'

/**
 * Site-wide ambient background: a drifting gold/lavender starfield (canvas),
 * two slow floating gradient orbs (pure CSS), and a cursor-following aura
 * glow. Ported from the static export's nh-fx.js so it runs once, mounted
 * from the root layout, instead of being duplicated per page.
 */
export const BackgroundFX = () => {
  const canvasRef = useRef(null)
  const auraRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles = []
    let rafId

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(window.innerWidth / 16)
      particles = Array.from({ length: Math.max(40, Math.min(n, 110)) }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.4,
        vy: -(Math.random() * 0.22 + 0.05),
        vx: (Math.random() - 0.5) * 0.1,
        a: Math.random() * 0.55 + 0.2,
        tw: Math.random() * Math.PI * 2,
        ts: Math.random() * 0.03 + 0.005,
        gold: Math.random() > 0.4,
      }))
    }

    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (const p of particles) {
        p.y += p.vy
        p.x += p.vx
        p.tw += p.ts
        if (p.y < -5) {
          p.y = window.innerHeight + 5
          p.x = Math.random() * window.innerWidth
        }
        const alpha = p.a * (0.55 + 0.45 * Math.sin(p.tw))
        const color = p.gold ? '176,130,60' : '190,150,198'
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        gradient.addColorStop(0, `rgba(${color},${alpha})`)
        gradient.addColorStop(1, `rgba(${color},0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fill()
      }
      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('resize', resize)
    resize()
    loop()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    const aura = auraRef.current
    if (!aura) return undefined

    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let cx = tx
    let cy = ty
    let rafId

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
    }

    const follow = () => {
      cx += (tx - cx) * 0.12
      cy += (ty - cy) * 0.12
      aura.style.transform = `translate(${cx}px,${cy}px)`
      rafId = requestAnimationFrame(follow)
    }

    window.addEventListener('mousemove', onMove)
    follow()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 h-full w-full" />

      <div
        className="animate-nh-drift-a fixed -top-[180px] -left-[120px] h-[520px] w-[520px] rounded-full blur-[20px]"
        style={{
          background:
            'radial-gradient(circle, rgba(212,150,192,.30), rgba(176,146,214,.14) 45%, transparent 70%)',
        }}
      />
      <div
        className="animate-nh-drift-b fixed -right-[160px] -bottom-[220px] h-[560px] w-[560px] rounded-full blur-[20px]"
        style={{
          background:
            'radial-gradient(circle, rgba(184,142,72,.18), rgba(176,146,214,.08) 50%, transparent 70%)',
        }}
      />

      <div
        ref={auraRef}
        className="fixed top-0 left-0 h-[480px] w-[480px] rounded-full transition-transform duration-200 ease-out"
        style={{
          marginTop: -240,
          marginLeft: -240,
          background: 'radial-gradient(circle, rgba(184,142,72,.18), transparent 60%)',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  )
}
