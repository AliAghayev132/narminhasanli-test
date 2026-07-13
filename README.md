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

`server/` və `client-next/` müstəqil paketlərdir (pnpm workspace deyil, hər birinin öz
`node_modules`/`.env`-i var). Kökdəki `package.json` sadəcə hər ikisini birlikdə işə salmaq
üçün əlverişli skriptlərdir.

### İlk quraşdırma (bir dəfə)

```bash
pnpm install                   # kök: concurrently
pnpm run install:all           # server/ + client-next/ asılılıqları
cp server/.env.example server/.env               # MONGODB_URI, secret-lər, SMTP
cp client-next/.env.example client-next/.env.local  # NEXT_PUBLIC_API_URL + NEXT_PUBLIC_SITE_URL
pnpm run seed                  # bazaya real sayt məzmununu yükləyir (blog/kurs/seans)
```

### Gündəlik işə salma

```bash
pnpm run dev                   # hər ikisini paralel işə salır: :5000 (server) + :3000 (client)
```

Yalnız birini işə salmaq istəsən: `pnpm run dev:server` / `pnpm run dev:client`.

## Deploy (CD)

`.github/workflows/deploy-server.yml` və `deploy-client.yml` push-da `main`-ə SSH ilə VPS-ə
qoşulub PM2 ilə restart edir (yalnız dəyişən paketin workflow-u işə düşür, `paths:` filtri ilə).
Server → port `3102` (`narminhasanli-server`), Client → port `3103` (`narminhasanli-client`).

**Bir dəfəlik VPS quraşdırması (workflow-lar bunu etmir):**
1. `nvm`, `pnpm`, `pm2` VPS-də qlobal quraşdırılmış olmalıdır.
2. Monorepo-nu bir dəfə klonla: `git clone ... /var/www/narminhasanli` (workflow-lardakı
   `REPO_DIR`-lə üst-üstə düşməlidir — fərqli yol istifadə edirsənsə, hər iki YAML-da dəyiş).
3. `/var/www/narminhasanli/server/.env` və `/var/www/narminhasanli/client-next/.env.local`
   (və ya `.env.production`) fayllarını **əl ilə** yarat — production `MONGODB_URI`,
   `ACCESS_SECRET_KEY`/`REFRESH_SECRET_KEY`/`ENCRYPTION_KEY` (güclü, təsadüfi dəyərlər),
   `CLIENT_URL` (client-in public URL-i, server-in CORS whitelist-i üçün), `DOMAIN`,
   `NEXT_PUBLIC_API_URL` (server-in public URL-i) və `NEXT_PUBLIC_SITE_URL` düzgün doldurulmalıdır.
   Bunlar `.gitignore`-dadır, heç vaxt commit olunmur.
4. GitHub repo → Settings → Secrets: `HOST`, `USERNAME`, `SECRET_KEY` (SSH açarı).

## Sənədlər

- [`docs/superpowers/specs/2026-07-08-fullstack-port-design.md`](./docs/superpowers/specs/2026-07-08-fullstack-port-design.md) — Faza 1 dizayn spesifikasiyası
- [`server/README.md`](./server/README.md) — backend konvensiyaları
- [`client-next/README.md`](./client-next/README.md) — frontend konvensiyaları
