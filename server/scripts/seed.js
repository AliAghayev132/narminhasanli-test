import { mongoDBService } from "#services";
import { HashService } from "#services";
import { User, Blog, Course, Session } from "#models";
import { config } from "#config";

/**
 * Seed script — loads the real Nərmin Həsənli site content (ported from the
 * static export) into MongoDB: blog posts, courses and session types.
 *
 * Idempotent: clears Blog/Course/Session collections and re-creates them.
 * Does not touch User/OTP/Booking data.
 *
 * Usage:
 *   pnpm seed   (from server/)
 */

const SESSIONS = [
  {
    name: "Ruhi Bələdçilik Seansı",
    description:
      "Daxili dünyana açılan ilk qapı. Birlikdə nəfəs alır, dinləyir və ürəyinin əsl səsini eşidirik.",
    duration: "60 dəq",
    format: "Onlayn",
    price: 120,
    order: 0,
  },
  {
    name: "Enerji Təmizlənməsi",
    description:
      "Səni ağırlaşdıran yükləri şəfqətlə buraxırıq. Bədənin və ruhun yenidən yüngülləşir.",
    duration: "75 dəq",
    format: "Onlayn",
    price: 150,
    order: 1,
  },
  {
    name: "Daxili Uşaqla Görüş",
    description:
      "Keçmişin yaralarını qucaqlayır, içindəki uşağa sevgi və təhlükəsizlik qaytarırıq.",
    duration: "90 dəq",
    format: "Onlayn",
    price: 180,
    order: 2,
  },
];

const COURSES = [
  {
    slug: "oz-isigini-tap",
    title: "Öz İşığını Tap",
    description:
      'Altı həftəlik bu səyahət səni addım-addım özünə qaytarır. Hər həftə yeni bir ritual, yeni bir oyanış — video dərslər, bələdçili meditasiyalar və şəxsi tapşırıqlarla.',
    forWhom:
      'Əgər özünü itirmiş, tükənmiş və ya sadəcə "daha çox nəsə var" hissi ilə yaşayırsansa — bu kurs sənin üçündür. Heç bir təcrübə tələb olunmur, yalnız özünə bir az vaxt ayırmaq istəyi kifayətdir. Altı həftə boyunca birlikdə yavaşlayacaq, nəfəs alacaq və içindəki o sakit, bilən səsi yenidən eşitməyi öyrənəcəyik.',
    level: "Başlanğıc",
    duration: "6 həftəlik proqram",
    format: "Onlayn",
    price: 240,
    featured: true,
    order: 0,
    learnings: [
      "Gündəlik ritual qurmağı",
      "Nəfəslə sinir sistemini sakitləşdirməyi",
      "Daxili tənqidçini şəfqətlə susdurmağı",
      'Sərhəd qoymağı və "yox" deməyi',
      "Niyyət qurmağı və izləməyi",
      "Öz intuisiyana etibar etməyi",
    ],
    curriculum: [
      { week: 1, title: "Yavaşlamaq", text: "Tələskənlikdən çıxıb bədəninə qayıdırıq. İlk sükut praktikan." },
      { week: 2, title: "Nəfəs", text: "Nəfəs texnikaları ilə narahatlığı idarə etməyi öyrənirsən." },
      { week: 3, title: "Daxili səs", text: "Tənqidçi ilə bələdçi səsi ayırd etməyi məşq edirik." },
      { week: 4, title: "Sərhədlər", text: "Enerjini qoruyan sağlam sərhədlər qurursan." },
      { week: 5, title: "Niyyət", text: "Ürəyindən gələn həqiqi niyyətləri aydınlaşdırırsan." },
      { week: 6, title: "İşığı daşımaq", text: "Öyrəndiklərini gündəlik həyatına inteqrasiya edirsən." },
    ],
    includes: [
      "6 həftəlik video dərslər",
      "12 bələdçili meditasiya (audio)",
      "Şəxsi iş dəftəri (PDF)",
      "Qapalı icmaya giriş",
    ],
    status: "published",
  },
  {
    slug: "meditasiya-seyaheti",
    title: "Meditasiya Səyahəti",
    description:
      "Gündəlik 15 dəqiqəlik bələdçili meditasiyalarla sükutu vərdişə çevir. Hər gün yeni bir mövzu və audio.",
    level: "Hər səviyyə",
    duration: "21 günlük səyahət",
    format: "Onlayn",
    price: 120,
    featured: false,
    order: 1,
    status: "published",
  },
  {
    slug: "bolluq-suuru",
    title: "Bolluq Şüuru",
    description:
      "Qıtlıq qorxusunu burax, həyatın bolluğuna açıl və layiq olduğunu xatırla. Zehni yenidən proqramlaşdıran praktikalar.",
    level: "Orta",
    duration: "4 həftəlik proqram",
    format: "Onlayn",
    price: 180,
    featured: false,
    order: 2,
    status: "published",
  },
  {
    slug: "daxili-usaq-sefasi",
    title: "Daxili Uşaq Şəfası",
    description:
      "Keçmişin yaralarını şəfqətlə qucaqla. Terapevtik yazı, meditasiya və qrup dəstəyi ilə dərin bir sağalma səyahəti.",
    level: "Dərin iş",
    duration: "8 həftəlik proqram",
    format: "Onlayn",
    price: 320,
    featured: false,
    order: 3,
    status: "published",
  },
];

// The one fully-written post; the rest are excerpt-only placeholders ported
// as-is from the blog list (real bodies to be authored later via Phase 2).
const FEATURED_BLOG = {
  slug: "sukutun-icindeki-ses",
  title: "Sükutun içindəki səs: özünlə barışığa gedən yol",
  category: "Rituallar",
  excerpt:
    "Bəzən ən güclü cavab heç bir söz deyil. Sükutda oturmağı öyrənəndə, içimizdəki dağınıqlıq yavaş-yavaş yerini aydınlığa verir.",
  readTime: "6 dəq",
  publishedAt: new Date(2026, 5, 18),
  featured: true,
  content: `<p>Bəzən ən güclü cavab heç bir söz deyil. Gündəlik həyatın səs-küyü içində biz o qədər çox danışırıq, dinləyirik, oxuyuruq ki, öz daxili səsimizi eşitməyi tamamilə unuduruq. Bu yazıda səni sükutla yenidən dostlaşmağa dəvət edirəm.</p>
<p>Sükut boşluq deyil. Əksinə, o, ən dolu andır — orada intuisiyanın, bədəninin və ruhunun sənə pıçıldadığı hər şey var. Sadəcə eşitmək üçün bir az yavaşlamaq lazımdır.</p>
<h2>Niyə sükutdan qorxuruq?</h2>
<p>Çünki sükutda ilk növbədə həll etmədiyimiz hisslər üzə çıxır. Narahatlıq, kədər, həll olunmamış suallar... Amma məhz onlara şəfqətlə baxmaq sağalmanın başlanğıcıdır. Qaçmaq yox — qucaqlamaq.</p>
<blockquote>"Sükut, ruhun öz-özünə qayıtdığı evdir."</blockquote>
<h2>Sadə bir gündəlik sükut praktikası</h2>
<p>Bu praktika cəmi 5 dəqiqə çəkir və heç bir təcrübə tələb etmir:</p>
<ul>
<li>Sakit bir yerdə otur, gözlərini yum və yalnız nəfəsini izlə.</li>
<li>Fikirlər gələndə onları qınamadan buraxıb yenidən nəfəsə qayıt.</li>
<li>Bitirməzdən əvvəl özünə bir cümlə de: "Mən buradayam və bu kifayətdir."</li>
</ul>
<p>Bunu hər gün eyni vaxtda təkrarla. Bir həftə sonra fərqi özün hiss edəcəksən — daxili səsin daha aydın, reaksiyaların daha sakit olacaq.</p>
<p>Unutma: sükut bir mənzil deyil, bir təcrübədir. Ona hər gün bir az qayıtdıqca, o sənin ən etibarlı sığınacağına çevriləcək. ✶</p>`,
};

const LIST_BLOGS = [
  {
    slug: "seher-rituallari-ruhu-oyadir",
    title: "Səhər ritualları ruhunu necə oyadır",
    category: "Rituallar",
    date: new Date(2026, 5, 12),
    excerpt:
      "Gününə niyyətlə başlamaq həyatının axarını dəyişir. Sadə üç addımla sabahını müqəddəs vaxta çevir.",
    readTime: "4 dəq",
  },
  {
    slug: "nefesin-gucu-sakitliye-gedan-yol",
    title: "Nəfəsin gücü: sakitliyə gedən yol",
    category: "Meditasiya",
    date: new Date(2026, 5, 3),
    excerpt:
      "Bir dərin nəfəs — və sinir sistemin sakitləşir. Hər an yanında olan ən güclü aləti tanı.",
    readTime: "5 dəq",
  },
  {
    slug: "ay-teqvimi-ile-niyyet-qurmaq",
    title: "Ay təqvimi ilə niyyət qurmaq",
    category: "Astrologiya",
    date: new Date(2026, 4, 24),
    excerpt:
      "Yeni ay yeni başlanğıcdır. Ayın ritmi ilə niyyətlərini necə əkəcəyini öyrən.",
    readTime: "5 dəq",
  },
  {
    slug: "daxili-usaginla-yeniden-tanis-ol",
    title: "Daxili uşağınla yenidən tanış ol",
    category: "Özünütanıma",
    date: new Date(2026, 4, 11),
    excerpt:
      "İçimizdəki kiçik uşaq hələ də sevgi və təhlükəsizlik gözləyir. Ona necə qayıdırıq?",
    readTime: "6 dəq",
  },
  {
    slug: "narahatliq-aninda-4-7-8-nefesi",
    title: "Narahatlıq anında 4-7-8 nəfəsi",
    category: "Nəfəs",
    date: new Date(2026, 3, 28),
    excerpt:
      "Panika və narahatlıq gələndə bədənini bir neçə dəqiqədə sakitləşdirən sadə texnika.",
    readTime: "4 dəq",
  },
  {
    slug: "axsam-rituali-ile-gunu-buraxmaq",
    title: "Axşam ritualı ilə günü buraxmaq",
    category: "Rituallar",
    date: new Date(2026, 3, 15),
    excerpt:
      "Yatmazdan əvvəl kiçik bir ritual zehnini boşaldır və dərin yuxuya qapı açır.",
    readTime: "4 dəq",
  },
];

/**
 * Find the admin user to attach as blog author, creating one if none exists
 * yet (mirrors BootstrapService, which normally runs first on server boot).
 */
async function getOrCreateAdmin() {
  let admin = await User.findOne({ role: "admin" });
  if (admin) return admin;

  const hashedPassword = await HashService.hashPassword(config.defaultAdmin.password);
  admin = await User.create({
    firstName: "Default",
    lastName: "Admin",
    email: config.defaultAdmin.email,
    password: hashedPassword,
    role: "admin",
    status: "active",
  });
  console.log("🚀 Default admin created:", admin.email);
  return admin;
}

const seed = async () => {
  try {
    console.log("🌱 Seeding started...\n");

    await mongoDBService.connect();

    const admin = await getOrCreateAdmin();

    await Promise.all([
      Blog.deleteMany({}),
      Course.deleteMany({}),
      Session.deleteMany({}),
    ]);
    console.log("🗑️  Cleared existing Blog/Course/Session documents\n");

    const blogDocs = [
      {
        ...FEATURED_BLOG,
        status: "published",
        author: admin._id,
      },
      ...LIST_BLOGS.map(({ date, ...blog }) => ({
        ...blog,
        content: `<p>${blog.excerpt}</p>`,
        status: "published",
        publishedAt: date,
        author: admin._id,
      })),
    ];

    const [blogs, courses, sessions] = await Promise.all([
      Blog.insertMany(blogDocs),
      Course.insertMany(COURSES),
      Session.insertMany(SESSIONS),
    ]);

    console.log(`📝 Blogs seeded: ${blogs.length}`);
    console.log(`📚 Courses seeded: ${courses.length}`);
    console.log(`🧘 Sessions seeded: ${sessions.length}`);

    console.log("\n✅ Seeding complete!");
    await mongoDBService.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    await mongoDBService.disconnect();
    process.exit(1);
  }
};

seed();
