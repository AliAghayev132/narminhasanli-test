# Nərmin Həsənli

Həyat koçu və ruhani bələdçi Nərmin Həsənlinin saytının layihə sənədləri və referans arxivi.

Fullstack tətbiq (Express + Mongo backend, Next.js + Tailwind frontend) iki **ayrı** repoya
köçürülüb — hər biri öz GitHub Actions CD workflow-u ilə müstəqil deploy olunur:

| Repo | Nədir | Stack | Deploy |
|---|---|---|---|
| [`narminhasanli-server`](https://github.com/AliAghayev132/narminhasanli-server) | Express.js REST API + Socket.IO | Express 5, Mongoose 9, JWT + OTP auth | PM2 `narminhasanli-server`, port `3102` |
| [`narminhasanli-client`](https://github.com/AliAghayev132/narminhasanli-client) | Next.js App Router (SSR + SEO) | Next 16, React 19, Tailwind 4, RTK Query | PM2 `narminhasanli-client`, port `3103` |

Bu repo (`narminhasanli`) artıq kod daşımır — yalnız aşağıdakılar üçün saxlanılır:

| Qovluq | Nədir |
|---|---|
| [`legacy-static/`](./legacy-static) | Fullstack porta keçməzdən əvvəlki statik HTML export (referans) |
| [`docs/`](./docs) | Dizayn spesifikasiyaları, arxitektura qeydləri |

## Domen resursları

- **Blog** — `/bloglar`, `/bloglar/[slug]`
- **Course** ("Dərslər") — `/derslar`, `/derslar/[slug]`
- **Session** — ev səhifəsindəki "Seanslar" bölməsi
- **Booking** — `/elaqe` rezervasiya forması

Faza 1: yalnız public sayt işləkdir (oxu endpoint-ləri + rezervasiya yaratma). Admin panel
(blog/kurs CRUD, rezervasiya idarəsi) Faza 2-də əlavə olunacaq — backend-də yazma endpoint-ləri
artıq mövcuddur (`authenticate` + `requireRole(['admin'])`), sadəcə UI yoxdur.

## Lokal inkişaf

Hər repo öz `README.md`-sində quraşdırma addımlarını izah edir (`pnpm install`, `.env`
konfiqurasiyası, `pnpm dev`, seed skripti). Hər ikisini eyni vaxtda inkişaf etdirmək üçün
iki repo-nu yanaşı klonla və hər birində ayrıca `pnpm dev` işə sal:

```bash
git clone https://github.com/AliAghayev132/narminhasanli-server.git
git clone https://github.com/AliAghayev132/narminhasanli-client.git
```

## Deploy (CD)

Hər repoda `.github/workflows/deploy.yml` push-da `main`-ə SSH ilə VPS-ə qoşulub PM2 ilə
restart edir.

**Bir dəfəlik VPS quraşdırması (workflow bunu etmir):**
1. `nvm`, `pnpm`, `pm2` VPS-də qlobal quraşdırılmış olmalıdır.
2. Hər repo-nu bir dəfə uyğun qovluğa klonla (workflow-lardakı `CWD` ilə üst-üstə düşməlidir):
   `/var/www/narminhasanli/server` və `/var/www/narminhasanli/client`.
3. Hər qovluqda `.env` (server) / `.env.local` və ya `.env.production` (client) fayllarını
   **əl ilə** yarat — production `MONGODB_URI`, `ACCESS_SECRET_KEY`/`REFRESH_SECRET_KEY`/
   `ENCRYPTION_KEY` (güclü, təsadüfi dəyərlər), `CLIENT_URL` (client-in public URL-i, server-in
   CORS whitelist-i üçün), `DOMAIN`, `NEXT_PUBLIC_API_URL` (server-in public URL-i) və
   `NEXT_PUBLIC_SITE_URL` düzgün doldurulmalıdır. Bunlar `.gitignore`-dadır, heç vaxt commit
   olunmur.
4. Hər iki GitHub repo → Settings → Secrets: `HOST`, `USERNAME`, `SECRET_KEY` (SSH açarı).

## Sənədlər

- [`docs/superpowers/specs/2026-07-08-fullstack-port-design.md`](./docs/superpowers/specs/2026-07-08-fullstack-port-design.md) — Faza 1 dizayn spesifikasiyası
