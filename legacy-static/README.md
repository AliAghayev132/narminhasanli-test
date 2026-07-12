# Nərmin Həsənli — şəxsi sayt

Həyat koçu və ruhani bələdçi Nərmin Həsənlinin çox-səhifəli statik saytı.
Səhifələr `support.js` runtime-ı ilə render olunur (dizayn alətindən ixrac).

## Struktur

| Fayl | Səhifə |
|------|--------|
| `index.html` | Ana səhifə (hero, haqqında `#about`, seanslar `#sessions`, kurslar `#courses`, bloglar `#blog`, əlaqə `#contact`) |
| `derslar.html` | Dərslər & Kurslar (siyahı) |
| `ders.html` | "Öz İşığını Tap" — kurs detalı |
| `bloglar.html` | Bloglar (siyahı) |
| `blog.html` | Blog yazısı — "Sükutun içindəki səs" |
| `elaqe.html` | Əlaqə & Rezervasiya |
| `support.js` | Səhifələri render edən runtime |
| `nh-fx.js` | Fon/kursor effektləri (dinamik import olunur) |
| `design/` | Dizayn referansları — **canlı saytın hissəsi deyil**, istənilən vaxt silinə bilər |

## Lokal işə salmaq

Səhifələr ES-modul (`import('./nh-fx.js')`) istifadə etdiyi üçün birbaşa `file://`
ilə yox, kiçik bir HTTP server ilə açılmalıdır:

```bash
npx serve .
# və ya
python -m http.server 8000
```

Sonra brauzerdə `http://localhost:8000` ünvanını aç.

## Deploy (GitHub Pages)

Repo `Settings → Pages` bölməsindən `main` branch / root qovluğu seçilərək
yayımlana bilər. `.nojekyll` faylı Jekyll emalını söndürür.
