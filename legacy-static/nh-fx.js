// Shared ambient effects for Nərmin Həsənli pages: starfield, cursor aura, scroll-reveal.
export function initFX(root, canvas, aura) {
  // ---- starfield ----
  if (canvas) {
    try {
      const ctx = canvas.getContext('2d');
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let parts = [];
      const resize = () => {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const n = Math.round(window.innerWidth / 16);
        parts = Array.from({ length: Math.max(40, Math.min(n, 110)) }, () => ({
          x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
          r: Math.random() * 1.5 + 0.4, vy: -(Math.random() * 0.22 + 0.05), vx: (Math.random() - 0.5) * 0.1,
          a: Math.random() * 0.55 + 0.2, tw: Math.random() * Math.PI * 2, ts: Math.random() * 0.03 + 0.005,
          gold: Math.random() > 0.4
        }));
      };
      window.addEventListener('resize', resize); resize();
      const loop = () => {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (const p of parts) {
          p.y += p.vy; p.x += p.vx; p.tw += p.ts;
          if (p.y < -5) { p.y = window.innerHeight + 5; p.x = Math.random() * window.innerWidth; }
          const a = p.a * (0.55 + 0.45 * Math.sin(p.tw));
          const col = p.gold ? '176,130,60' : '190,150,198';
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          g.addColorStop(0, 'rgba(' + col + ',' + a + ')');
          g.addColorStop(1, 'rgba(' + col + ',0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill();
        }
        requestAnimationFrame(loop);
      };
      loop();
    } catch (e) { /* noop */ }
  }

  // ---- cursor aura ----
  if (aura) {
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2, cx = tx, cy = ty;
    window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
    const follow = () => {
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
      aura.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
      requestAnimationFrame(follow);
    };
    follow();
  }

  // ---- scroll reveal ----
  if (root) {
    const els = [...root.querySelectorAll('[data-reveal]')];
    const reveal = (el) => { el.classList.add('nh-shown'); el._shown = true; };
    const check = () => {
      const h = window.innerHeight;
      for (const el of els) {
        if (el._shown) continue;
        const r = el.getBoundingClientRect();
        if (r.top < h * 0.9 && r.bottom > 0) reveal(el);
      }
    };
    window.addEventListener('scroll', () => requestAnimationFrame(check), { passive: true });
    window.addEventListener('resize', () => requestAnimationFrame(check), { passive: true });
    check(); setTimeout(check, 120); setTimeout(check, 500);
    // safety: never leave content stuck hidden
    setTimeout(() => els.forEach(reveal), 1500);
  }
}
