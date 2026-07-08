# Nərmin Həsənli saytının fullstack porta keçirilməsi — Faza 1 dizaynı

## Kontekst

Hazırkı sayt statik HTML-dir (dizayn alətindən ixrac olunmuş, `support.js` runtime
render edir): `index.html`, `derslar.html`, `ders.html`, `bloglar.html`, `blog.html`,
`elaqe.html`. Bunu `github.com/AliAghayev132/template` monorepo-sunun (Express 5 +
Mongoose backend, Next.js 16 App Router + Tailwind v4 frontend) üzərinə köçürürük.

Reference clone: `../template-ref` (`server/`, `client-next/`).

## Qərarlar (istifadəçi ilə razılaşdırılıb)

1. **Mərhələlilik** — Faza 1: backend + public sayt. Faza 2: admin dashboard.
2. **Məzmun mənbəyi** — MongoDB. Hazırkı statik məzmun bir seed skripti ilə bazaya
   yüklənir. Frontend SSR `fetch()` ilə API-dən oxuyur (RTK Query client-side
   qarşılıqlılıq üçün).
3. **Admin** — Faza 1-də UI-sız. Backend-də yazma endpoint-ləri
   (`authenticate` + `requireRole(['admin'])`) yazılır ki, Faza 2 birbaşa üzərinə
   qurula bilsin.
4. **Dizayn** — eyni krem/qızıl estetika, Lora+Manrope şriftləri, üzən orb-lar və
   kursor-aura effekti Tailwind + Framer Motion ilə saxlanılır (sadələşdirilmir).
5. **Route adları** — Azərbaycan dilində saxlanılır (sayt dili ilə uyğun):
   `/`, `/derslar`, `/derslar/[slug]`, `/bloglar`, `/bloglar/[slug]`, `/elaqe`.
6. **Köhnə statik fayllar** — silinmir, `legacy-static/` altına köçürülür (referans
   üçün; sonra istənilən vaxt silinə bilər).

## Repo strukturu (Faza 1 sonrası)

```
narminhasanli/
├── server/                # Express 5 + Mongoose backend
├── client-next/           # Next.js 16 + Tailwind v4 frontend
├── legacy-static/          # köhnə statik sayt (referans, canlıya getmir)
├── docs/
│   └── superpowers/specs/ # bu sənəd və gələcək spec-lər
└── README.md               # monorepo təsviri
```

`client-react` template-dən götürülmür (yalnız `server` + `client-next` istifadə
olunur).

## Backend

Template-in barrel/alias konvensiyaları (`#models`, `#controllers`, `#routes`,
`asyncHandler`, `{success,message?,data?}` cavab zərfi, `authenticate`,
`requireRole`) olduğu kimi saxlanılır. `Post` modelinin nümunə etdiyi bütün
konvensiyalar (compound index, virtual, static/instance method, pre-save hook,
soft delete) yeni modellərdə də tətbiq olunur.

### Modellər

**Blog** (`server/models/blog.model.js`)
- `title, slug (unique, auto), excerpt, content, category, coverImage, readTime,
  featured (bool), status (draft|published), publishedAt, views, author (ref User),
  isDeleted`
- Statik: `findPublished(filter)`. İnstance: `incrementViews()`.
- Index: `{status:1, publishedAt:-1}`.

**Course** (`server/models/course.model.js`) — "Dərslər" domeni
- `title, slug (unique, auto), subtitle, description, level, duration, forWhom,
  curriculum:[{week,title,text}], learnings:[String], price, format, featured,
  order, status (draft|published), isDeleted`
- Statik: `findPublished()`. Index: `{status:1, order:1}`.

**Session** (`server/models/session.model.js`) — ev səhifəsindəki "Seanslar"
- `name, description, duration, price, format, order, isActive (bool)`
- Statik: `findActive()`. Index: `{isActive:1, order:1}`.

**Booking** (`server/models/booking.model.js`) — Əlaqə forması
- `name, email, phone, message, sessionType, preferredDate, status
  (new|contacted|confirmed|cancelled, default new)`
- Statik: `findNew()`. Index: `{status:1, createdAt:-1}`.

### Endpoint-lər (Faza 1: yalnız public read + booking create işlək; yazma
endpoint-ləri qorunur amma UI-sız)

| Metod | Path | Auth | Qeyd |
|---|---|---|---|
| GET | `/api/blogs` | public | səhifələmə, `category`, `search` |
| GET | `/api/blogs/:slug` | public | görüntü sayğacını artırır |
| POST/PUT/DELETE | `/api/blogs(/:id)` | admin | Faza 2 üçün hazır |
| GET | `/api/courses` | public | |
| GET | `/api/courses/:slug` | public | |
| POST/PUT/DELETE | `/api/courses(/:id)` | admin | |
| GET | `/api/sessions` | public | aktiv seanslar, `order` sırası |
| POST/PUT/DELETE | `/api/sessions(/:id)` | admin | |
| POST | `/api/bookings` | public | rezervasiya yaradır |
| GET | `/api/bookings` | admin | Faza 2 üçün hazır |

Bütün route-lar `app.js`-ə `/api/blogs`, `/api/courses`, `/api/sessions`,
`/api/bookings` kimi qoşulur; `Post`/`postRoutes` nümunəsi tamamilə çıxarılır
(domenə aid deyil).

### Seed skripti

`server/scripts/seed.js` — hazırkı statik məzmunu (6 blog kartı + tam "Sükutun
içindəki səs" yazısı, "Öz İşığını Tap" 6-həftəlik kursu + Dərslər siyahısındakı
kurslar, ev səhifəsindəki seans tipləri) MongoDB-yə yazır. `pnpm seed` kimi
işə düşür, mövcud sənədləri təmizləyib yenidən yaradır (idempotent).

## Frontend (`client-next/`)

### Render strategiyası
Public oxu səhifələri **Server Component + `fetch(API_URL, {next:{revalidate:60}})`**
ilə SSR olunur (SEO üçün). Forma (Əlaqə) və gələcək klient qarşılıqlılığı üçün
RTK Query (`blogApi`, `courseApi`, `sessionApi`, `bookingApi` — `postApi`
nümunəsi əsasında `injectEndpoints`).

### Route xəritəsi

| Route | Səhifə | Mənbə |
|---|---|---|
| `/` | Hero, `#about`, `#sessions`, `#courses`, `#blog`, `#contact` | Ev |
| `/derslar` | Kurs siyahısı | Dərslər |
| `/derslar/[slug]` | Kurs detalı | Dərs |
| `/bloglar` | Blog siyahısı | Bloglar |
| `/bloglar/[slug]` | Blog yazısı | Blog |
| `/elaqe` | Rezervasiya forması | Əlaqə |

### Dizayn tokenləri (Tailwind v4, `@theme` `globals.css`-də)
- Rənglər: `--color-cream:#f3ede1; --color-gold:#ad8649; --color-ink:#312a38;
  --color-ink-soft:#3a3340; --color-muted:#4c4459`
- Şriftlər: `next/font/google` — Lora (serif başlıqlar), Manrope (sans body)
- `BackgroundFX` klient komponenti: üzən orb-lar (Tailwind `@keyframes`) + kursor
  aura (Framer Motion `useMotionValue`/`useSpring`, `nh-fx.js`-in JS-siz portu)

### Paylaşılan komponentlər
`Nav` (blur, N-loqo, burger menyu, aktiv link), `Footer`, `BackgroundFX`,
`SectionHeading`, `BlogCard`, `CourseCard`. Mövcud `src/components/ui/*` (Button,
Card, Badge, Input, Textarea, Modal) Əlaqə forması və kartlarda istifadə olunur.

### SEO
Hər səhifədə `buildMetadata()`; `/derslar/[slug]` və `/bloglar/[slug]`-da
`generateMetadata` + `generateStaticParams`; `JsonLd` (`Course`/`Article` sxemi);
`sitemap.js` dinamik blog/kurs slug-larını daxil edir.

## Uğur meyarları

- `pnpm dev` ilə `server/` (5000) və `client-next/` (3000) ayrıca işə düşür.
- Bütün 6 route brauzerdə render olunur, JS konsol xətası yoxdur.
- Ev səhifəsindəki Seanslar/Kurslar/Bloglar bölmələri API-dən gələn seed
  məlumatını göstərir (statik massiv deyil).
- Əlaqə forması submit olunanda `Booking` sənədi yaranır (Mongo-da yoxlanılır).
- Vizual olaraq mövcud statik saytla demək olar eynidir (rənglər, şriftlər,
  fon effektləri, layout).

## Faza 2 (bu spec-in əhatəsi xaricində)

Admin login + dashboard (blog/kurs CRUD UI, rezervasiya siyahısı, statuslar),
şəkil yükləmə, Socket.IO bildirişləri (lazım olarsa).
