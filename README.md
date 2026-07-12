# Nərmin Həsənli

Həyat koçu və ruhani bələdçi Nərmin Həsənlinin fullstack saytı. `github.com/AliAghayev132/template`
monorepo-suna (Express + Mongo / Next + Tailwind) əsasən qurulub.

| Paket | Nədir | Stack |
|---|---|---|
| [`server/`](./server) | Express.js REST API + Socket.IO backend | Express 5, Mongoose 9, JWT + OTP auth |
| [`client-next/`](./client-next) | Next.js App Router (SSR + SEO) | Next 16, React 19, Tailwind 4, RTK Query |
| [`legacy-static/`](./legacy-static) | Əvvəlki statik export (referans, canlıya getmir) | — |

## Domen resursları

- **Blog** — `/bloglar`, `/bloglar/[slug]`
- **Course** ("Dərslər") — `/derslar`, `/derslar/[slug]`
- **Session** — ev səhifəsindəki "Seanslar" bölməsi
- **Booking** — `/elaqe` rezervasiya forması

Faza 1: yalnız public sayt işləkdir (oxu endpoint-ləri + rezervasiya yaratma). Admin panel
(blog/kurs CRUD, rezervasiya idarəsi) Faza 2-də əlavə olunacaq — backend-də yazma endpoint-ləri
artıq mövcuddur (`authenticate` + `requireRole(['admin'])`), sadəcə UI yoxdur.

## Quick start

### 1. Backend — `server/`

```bash
cd server
pnpm install
cp .env.example .env          # MONGODB_URI, secret-lər, SMTP
pnpm dev                       # nodemon → http://localhost:5000
pnpm seed                      # bazaya real sayt məzmununu yükləyir (blog/kurs/seans)
```

### 2. Frontend — `client-next/`

```bash
cd client-next
pnpm install
cp .env.example .env.local     # NEXT_PUBLIC_API_URL + NEXT_PUBLIC_SITE_URL
pnpm dev                       # next → http://localhost:3000
```

## Sənədlər

- [`docs/superpowers/specs/2026-07-08-fullstack-port-design.md`](./docs/superpowers/specs/2026-07-08-fullstack-port-design.md) — Faza 1 dizayn spesifikasiyası
- [`server/README.md`](./server/README.md) — backend konvensiyaları
- [`client-next/README.md`](./client-next/README.md) — frontend konvensiyaları
