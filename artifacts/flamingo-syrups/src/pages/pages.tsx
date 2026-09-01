import { useMemo, useState, useEffect, type FormEvent, type ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Download, Droplet, GlassWater, Mail, MapPin, Phone, Search, Sparkles, Star, Wine, X } from 'lucide-react';
import { Link, useParams, useLocation } from 'wouter';
import logoPath from '@assets/2.jpg_1787233517766.jpeg';
import { brand, syrupsList, timeline, type SyrupCategory, type SyrupItem } from '@/data/site-data';
import NotFound from '@/pages/not-found';

function SectionKicker({ children }: { children: ReactNode }) {
  return <p className="eyebrow text-[#b63d65]">{children}</p>;
}

export function updatePageSEO({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  jsonLd,
}: {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  ogType?: 'website' | 'product';
  jsonLd?: object[];
}) {
  if (typeof window === 'undefined') return;

  document.title = title;

  const setMeta = (nameAttr: string, valAttr: string, content: string) => {
    let el = document.querySelector(`meta[${nameAttr}="${valAttr}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(nameAttr, valAttr);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('name', 'description', description);
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:type', ogType);
  setMeta('property', 'og:site_name', 'Flamingo Premium Syrups');
  if (ogImage) setMeta('property', 'og:image', ogImage);

  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  if (ogImage) setMeta('name', 'twitter:image', ogImage);

  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach((s) => s.remove());

  if (jsonLd && jsonLd.length > 0) {
    jsonLd.forEach((item, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `seo-jsonld-${index}`;
      script.text = JSON.stringify(item);
      document.head.appendChild(script);
    });
  }
}

function FlamingoMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center ${compact ? 'h-36 w-36' : 'h-64 w-64 md:h-[25rem] md:w-[25rem]'}`}>
      <div className="absolute inset-[7%] rounded-[48%_52%_45%_55%] border border-[#d84f78]/40 bg-[#ffd5e5]" />
      <div className="absolute inset-[14%] rounded-full border border-dashed border-[#d84f78]/40" />
      <div className="flamingo-drift relative">
        <svg viewBox="0 0 260 300" className={compact ? 'h-24 w-24' : 'h-48 w-48 md:h-64 md:w-64'} aria-hidden="true">
          <path d="M125 266c-42 0-80-18-80-53 0-24 19-42 49-53 18-7 34-20 34-39 0-16-10-27-30-31l-29-6 4-14 38 3c38 3 64 23 64 58 0 21-10 38-32 51 37 3 69 19 69 51 0 20-19 33-49 33Z" fill="#db527b" />
          <path d="M109 101c-1-35 16-66 43-70 29-4 50 21 47 52-2 25-18 42-42 49 13-11 20-26 20-42 0-17-9-26-23-26-16 0-27 17-29 39Z" fill="#db527b" />
          <path d="M149 34c8-14 21-20 32-15 9 4 11 14 4 23-13-5-24-8-36-8Z" fill="#db527b" />
          <path d="M110 102 74 89c-8-3-13 3-12 11l35 9Z" fill="#38212d" />
          <path d="M74 89 60 94l-1 14 13-9Z" fill="#f8afc5" />
          <path d="M105 252c4 10 10 18 19 25M142 256c4 10 10 18 19 22" fill="none" stroke="#db527b" strokeWidth="7" strokeLinecap="round" />
        </svg>
      </div>
      {!compact && <span className="absolute bottom-7 right-1 font-display text-4xl italic text-[#b63d65] md:bottom-11 md:right-2 md:text-5xl">pour beautifully</span>}
    </div>
  );
}

function Marquee() {
  return (
    <div className="overflow-hidden border-y border-rose-300/70 bg-[#fbd6e4]">
      <div className="flex min-w-max animate-[marquee_24s_linear_infinite] items-center gap-8 py-3 text-[.68rem] font-bold uppercase tracking-[.22em] text-[#7e3450]">
        <span>FLAMINGO SYRUPS</span><span className="h-1 w-1 rounded-full bg-[#d84f78]" aria-hidden="true" />
        <span>29 EXCEPTIONAL FLAVOURS</span><span className="h-1 w-1 rounded-full bg-[#d84f78]" aria-hidden="true" />
        <span>750 ML PROFESSIONAL PACK</span><span className="h-1 w-1 rounded-full bg-[#d84f78]" aria-hidden="true" />
        <span>BEVERAGE CULTURE, IN PINK</span><span className="h-1 w-1 rounded-full bg-[#d84f78]" aria-hidden="true" />
        <span>ONE SYRUP. ENDLESS POSSIBILITIES.</span>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-25%) } }`}</style>
    </div>
  );
}

// Animation variants for viewport entrance & staggered cards
const cardContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09, // 90ms staggered entrance from left to right
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6, // 600ms entrance
      ease: 'easeOut',
    },
  },
};

export function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    updatePageSEO({
      title: 'Flamingo Syrups | 29 Exceptional Flavours for Cocktails & Beverages',
      description: "Explore Flamingo's collection of 29 premium syrup flavours crafted for cocktails, mocktails and creative beverage applications.",
      canonicalUrl: 'https://gagangowdap.github.io/Flamingo/',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Flamingo',
          url: 'https://gagangowdap.github.io/Flamingo/',
          logo: 'https://gagangowdap.github.io/Flamingo/assets/2.jpg_1787233517766.jpeg',
          email: 'mjsince1987@gmail.com',
          telephone: '+91 8971825137',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'No 6, RA Road, Ejipura',
            addressLocality: 'Bengaluru',
            postalCode: '560047',
            addressCountry: 'IN',
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Flamingo Premium Syrups',
          url: 'https://gagangowdap.github.io/Flamingo/',
        },
      ],
    });
  }, []);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="page-shell grid min-h-[calc(100dvh-76px)] items-center gap-10 py-16 md:grid-cols-[1.08fr_.92fr] md:py-20">
          <div className="reveal relative z-10">
            <SectionKicker>Flamingo · Bengaluru</SectionKicker>
            <h1 className="mt-6 max-w-3xl font-display text-[44px] sm:text-[62px] md:text-[84px] font-medium leading-[.90] tracking-[-.03em] text-[#321e2a]">
              29 Flavours.<br />
              <span className="italic text-[#d84f78]">Endless</span><br />
              Possibilities.
            </h1>
            <p className="mt-8 max-w-md font-sans text-[14px] md:text-[16px] font-normal leading-[1.6] tracking-normal text-[#684454]">
              A premium syrup range crafted for mixologists, beverage managers, and craft bars. Explore our complete 29 flavour collection available in 750 ml professional packs.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link href="/products" className="ink-button inline-flex items-center gap-3 px-5 py-4 font-sans text-[11px] font-semibold uppercase tracking-[.15em] transition-transform hover:-translate-y-1" data-testid="link-hero-products">
                Explore Syrups <ArrowRight size={15} />
              </Link>
              <Link href="/about" className="group inline-flex items-center gap-2 font-sans text-[12px] font-medium tracking-[.04em] text-[#593b49]" data-testid="link-hero-story">
                Meet the master mixologist <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
          <div className="reveal reveal-delay-2 relative flex min-h-[420px] items-center justify-center md:min-h-[580px]">
            <div className="absolute right-[5%] top-[8%] h-28 w-28 rounded-full bg-[#c5e2d5] md:h-40 md:w-40" />
            <div className="absolute bottom-[8%] left-[4%] h-24 w-24 rounded-[48%_52%_60%_40%] border border-[#d84f78]/50" />
            <div className="relative rounded-[50%_50%_44%_56%] bg-[#f7c4d6] p-4 shadow-[0_25px_70px_rgba(153,63,98,.16)] md:p-7">
              <div className="rounded-[50%_50%_44%_56%] border border-[#fff3f8]/70 bg-[#fbd6e4] p-8 md:p-12">
                <img src={logoPath} alt="Flamingo logo: a pink flamingo in a cocktail glass with the FLAMINGO wordmark" className="relative z-10 h-56 w-56 object-contain md:h-72 md:w-72" />
              </div>
            </div>
            <span className="absolute bottom-[7%] right-[2%] rotate-[-8deg] font-display text-3xl italic text-[#b63d65] md:text-5xl">made to be noticed</span>
          </div>
        </div>
        <div className="page-shell flex items-center justify-between pb-8 text-[.65rem] font-bold uppercase tracking-[.18em] text-[#996074]">
          <span>29 EXCEPTIONAL FLAVOURS</span>
          <span className="flex items-center gap-3">Scroll to explore <ArrowDown size={14} className="pulse-line" /></span>
        </div>
      </section>
      <Marquee />
      <section className="page-shell grid gap-12 py-24 md:grid-cols-[.75fr_1.25fr] md:py-32">
        <div>
          <SectionKicker>The Craft</SectionKicker>
          <p className="mt-5 font-display text-4xl leading-[.95] text-[#321e2a] md:text-6xl">Real ingredients. Vibrant pour.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 md:pt-10">
          <p className="text-lg leading-8 text-[#684454]">
            Flamingo syrups bring balance, theatrical colour, and rich flavour depth to every drink. From traditional Indian Jamun and Guava Chilli to European Limoncello, Blue Curaçao, and Pandan leaf.
          </p>
          <div className="border-l border-[#d84f78] pl-6">
            <p className="font-display text-3xl italic leading-tight text-[#b63d65]">“One syrup. Endless possibilities for every craft bar.”</p>
            <p className="mt-4 text-xs font-bold uppercase tracking-[.14em] text-[#996074]">29 Exceptional Flavours · 750 ml</p>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="bg-[#cfe7dc]">
        <div className="page-shell py-20 md:py-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionKicker>Complete Flavour Range</SectionKicker>
            <h2 className="mt-4 font-display text-5xl leading-[.9] text-[#234039] md:text-7xl">Designed for perfection in every drop.</h2>
          </div>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
            variants={shouldReduceMotion ? undefined : cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {[
              { title: 'Real Ingredients', desc: 'Real taste extracted from authentic fruits, herbs & botanicals.' },
              { title: 'Vibrant Colours', desc: 'Bright, appealing and consistent hue for dramatic cocktails.' },
              { title: 'Consistent Quality', desc: 'Same great taste and balance in every 750 ml bottle.' },
              { title: 'Versatile Applications', desc: 'Perfect for mocktails, cocktails, spritzes, and iced teas.' },
              { title: 'Professional Pack', desc: 'Available in standard 750 ml bar bottle format.' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={shouldReduceMotion ? undefined : cardItemVariants}
                className="group relative overflow-hidden rounded-xl border border-[#9ec8b7] bg-[#e3f2eb] p-6 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:border-[#d84f78] hover:shadow-[0_20px_45px_rgba(153,63,98,.16)]"
              >
                {/* SUBTLE PINK GRADIENT SWEEP */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-transparent via-[#ffeaf3]/70 to-transparent opacity-0 -translate-x-full transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:translate-x-full"
                />
                <div className="relative z-10">
                  <span className="inline-block font-display text-2xl font-bold text-[#b63d65] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-[#234039] transition-colors duration-300 group-hover:text-[#d84f78]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[#3d6155]">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-12 text-center">
            <Link href="/products" className="ink-button inline-flex items-center gap-3 px-6 py-4 text-[.72rem] font-bold uppercase tracking-[.16em]" data-testid="link-home-catalogue">
              Explore Syrups Catalogue <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-10 py-24 md:grid-cols-[1fr_1fr] md:py-32">
        <div className="relative min-h-[360px] overflow-hidden bg-[#e8a1ba] p-8 md:min-h-[480px]">
          <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full border-[38px] border-[#ffeaf3]/30" />
          <div className="absolute bottom-8 right-8 h-40 w-40 rounded-[50%_30%_50%_30%] border border-[#321e2a]/25" />
          <p className="relative z-10 text-[9rem] leading-[.7] text-[#fff3f8] font-display md:text-[14rem]">29</p>
          <p className="absolute bottom-8 left-8 max-w-[180px] text-xs font-bold uppercase leading-5 tracking-[.14em] text-[#6d2d45]">29 exceptional flavours for craft beverage menus</p>
        </div>
        <div className="flex flex-col justify-center">
          <SectionKicker>A Mixologist's Collection</SectionKicker>
          <h2 className="mt-5 font-display text-6xl leading-[.86] text-[#321e2a] md:text-8xl">Bold taste.<br /><span className="italic text-[#d84f78]">Unmissable pour.</span></h2>
          <p className="mt-7 max-w-md leading-7 text-[#684454]">Flamingo is anchored to the world of drinks: the anticipation before the pour, the shape of a glass, the pause before the first sip.</p>
          <Link href="/about" className="mt-8 inline-flex w-fit items-center gap-3 border-b border-[#321e2a] pb-2 text-[.7rem] font-bold uppercase tracking-[.16em]" data-testid="link-home-about">
            Read the story <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <section className="border-y border-rose-300/70 bg-[#f9d7e4]">
        <div className="page-shell flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-20">
          <div>
            <SectionKicker>For beverage buyers</SectionKicker>
            <h2 className="mt-4 max-w-2xl font-display text-5xl leading-[.9] md:text-7xl">Ready to stock your bar?</h2>
          </div>
          <Link href="/contact" className="ink-button inline-flex items-center gap-3 px-5 py-4 text-[.7rem] font-bold uppercase tracking-[.16em]" data-testid="link-home-enquire">
            Start an enquiry <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

export function ProductsPage() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    updatePageSEO({
      title: 'Flamingo Syrups | 29 Flavours',
      description: 'Explore all 29 Flamingo syrup flavours, available in 750 ml professional packs for creative beverage applications.',
      canonicalUrl: 'https://gagangowdap.github.io/Flamingo/products',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Flamingo 29 Syrup Collection',
          itemListElement: syrupsList.map((s, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: `Flamingo ${s.name} Syrup`,
            url: `https://gagangowdap.github.io/Flamingo/products/${s.id}`,
          })),
        },
      ],
    });
  }, []);

  const categories: SyrupCategory[] = [
    'All',
    'Fruit & Berry',
    'Citrus',
    'Herbal & Botanical',
    'Melon',
    'Tropical',
    'Classic Cocktail',
    'Creamy & Dessert',
    'Spiced',
  ];

  const categoryIcons: Record<SyrupCategory, string> = {
    'All': '✨',
    'Fruit & Berry': '🍓',
    'Citrus': '🍊',
    'Herbal & Botanical': '🌿',
    'Melon': '🍈',
    'Tropical': '🥥',
    'Classic Cocktail': '🍹',
    'Creamy & Dessert': '🍦',
    'Spiced': '🌶️',
  };

  const filteredSyrups = useMemo(() => {
    return syrupsList.filter((syrup) => {
      const matchesCategory = selectedCategory === 'All' || syrup.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        syrup.name.toLowerCase().includes(q) ||
        syrup.category.toLowerCase().includes(q) ||
        syrup.description.toLowerCase().includes(q) ||
        syrup.tag.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main>
      {/* HERO SECTION */}
      <section className="border-b border-rose-300/70 bg-[#f9d7e4]">
        <div className="page-shell grid gap-10 py-16 md:grid-cols-[1.1fr_.9fr] md:py-24">
          <div>
            <SectionKicker>Our Collection</SectionKicker>
            <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[.88] tracking-[-.03em] sm:text-6xl md:text-[5.5rem]">
              29 FLAVOURS.<br />
              <span className="italic text-[#d84f78]">ENDLESS POSSIBILITIES.</span>
            </h1>
          </div>
          <div className="flex flex-col justify-between gap-6 self-end">
            <p className="max-w-md text-base leading-7 text-[#684454]">
              Explore the Flamingo flavour collection crafted for creative beverage professionals, luxury hotels, craft cocktail bars, and specialty menus.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`${import.meta.env.BASE_URL}catalogue/flamingo-product-catalogue.pdf`}
                download="flamingo-product-catalogue.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-xl border border-[#321e2a] bg-[#321e2a] px-6 py-3.5 font-sans text-[11px] font-bold uppercase tracking-[.16em] text-[#ffeaf3] shadow-sm transition-all duration-300 hover:bg-[#d84f78] hover:border-[#d84f78] hover:shadow-md hover:-translate-y-0.5"
                aria-label="Download Flamingo Product Catalogue PDF"
              >
                <Download size={16} /> Download Product Catalogue ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOGUE CONTROLS & SEARCH BAR */}
      <section className="page-shell py-12 md:py-16">
        <div className="rounded-2xl border-2 border-rose-300 bg-[#fff3f8] p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* SEARCH FLAVOURS INPUT */}
            <div className="w-full lg:max-w-md">
              <label htmlFor="search-flavours-input" className="block text-xs font-bold uppercase tracking-[.14em] text-[#b63d65] mb-2">
                SEARCH FLAVOURS:
              </label>
              <div className="relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b63d65]" />
                <input
                  id="search-flavours-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by flavour name (e.g. Passion Fruit, Lavender)..."
                  className="w-full rounded-xl border-2 border-rose-300 bg-white py-3 pl-10 pr-10 text-sm font-semibold text-[#321e2a] shadow-sm outline-none transition-all placeholder:text-[#996074]/60 focus:border-[#d84f78] focus:ring-2 focus:ring-[#d84f78]/30"
                  data-testid="input-search-flavours"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-rose-200 p-1 text-[#b63d65] hover:bg-[#d84f78] hover:text-white"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* SYRUP SELECT DROPDOWN NAVIGATOR */}
            <div className="w-full lg:max-w-xs">
              <label htmlFor="syrup-dropdown-menu" className="block text-xs font-bold uppercase tracking-[.14em] text-[#b63d65] mb-2">
                QUICK JUMP TO PAGE:
              </label>
              <div className="relative">
                <select
                  id="syrup-dropdown-menu"
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) {
                      setLocation(`/products/${e.target.value}`);
                    }
                  }}
                  className="w-full appearance-none rounded-xl border-2 border-rose-300 bg-white px-4 py-3 pr-10 text-sm font-semibold text-[#321e2a] shadow-sm outline-none transition-all hover:border-[#d84f78] focus:border-[#d84f78] cursor-pointer"
                  data-testid="select-syrup-dropdown"
                >
                  <option value="" disabled>Choose a Syrup...</option>
                  {syrupsList.map((syrup) => (
                    <option key={syrup.id} value={syrup.id}>
                      {syrup.name} — ({syrup.category})
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#d84f78]" />
              </div>
            </div>
          </div>

          {/* FLAVOUR FAMILY CATEGORY FILTERS */}
          <div className="border-t border-rose-300/70 pt-6">
            <span className="block text-xs font-bold uppercase tracking-[.14em] text-[#996074] mb-3">
              Filter by Category:
            </span>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter syrups by category family">
              {categories.map((cat) => {
                const count = cat === 'All' ? syrupsList.length : syrupsList.filter(s => s.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`border px-3.5 py-2 text-[.68rem] font-bold uppercase tracking-[.12em] transition-all rounded-xl flex items-center gap-1.5 ${isSelected
                      ? 'border-[#d84f78] bg-[#d84f78] text-white shadow-sm'
                      : 'border-rose-300 bg-white text-[#593b49] hover:border-[#d84f78] hover:bg-[#fbd6e4]/40'
                      }`}
                    aria-pressed={isSelected}
                    data-testid={`filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    <span>{categoryIcons[cat]}</span>
                    <span>{cat}</span>
                    <span className={`rounded-full px-1.5 py-0.5 text-[.6rem] ${isSelected ? 'bg-white/30 text-white' : 'bg-rose-100 text-[#b63d65]'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* CATALOGUE HEADER & COUNT */}
        <div className="mt-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-rose-300 pb-4 mb-8">
            <h2 className="font-display text-3xl font-semibold text-[#321e2a]">
              {selectedCategory === 'All' ? 'Complete 29-Flavour Catalogue' : `${selectedCategory} Flavours`}
            </h2>
            <span className="text-xs font-bold uppercase tracking-wider text-[#b63d65]">
              Showing {filteredSyrups.length} of {syrupsList.length} Syrups
            </span>
          </div>

          {/* EMPTY SEARCH STATE */}
          {filteredSyrups.length === 0 ? (
            <div className="my-16 rounded-3xl border-2 border-dashed border-rose-300 bg-[#fff3f8] p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d84f78] text-white shadow-sm">
                <Wine size={32} />
              </div>
              <h3 className="mt-6 font-display text-4xl font-semibold text-[#321e2a]">
                NO FLAVOURS FOUND
              </h3>
              <p className="mt-3 max-w-md mx-auto text-sm text-[#684454]">
                We couldn't find any syrup matching <span className="font-bold text-[#321e2a]">"{searchQuery}"</span>. Try another flavour name or reset your search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="ink-button mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-xs font-bold uppercase tracking-[.16em]"
                data-testid="button-reset-search"
              >
                View All 29 Flavours <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            /* 29 FLAVOUR PRODUCT CARDS GRID */
            <motion.div
              key={selectedCategory + searchQuery}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={shouldReduceMotion ? undefined : cardContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              {filteredSyrups.map((syrup) => {
                const whatsappMessage = encodeURIComponent(`Hello Flamingo, I would like to enquire about Flamingo ${syrup.name} Syrup.`);
                const whatsappUrl = `https://wa.me/918971825137?text=${whatsappMessage}`;

                // Compute flavour profile notes
                const profileParts = syrup.tag.split(/&|&|·|\//).map((s) => s.trim()).filter(Boolean);
                const profileText = profileParts.length >= 2
                  ? `${profileParts[0]} · ${profileParts[1]} · ${syrup.category}`
                  : `${syrup.tag} · ${syrup.category}`;

                return (
                  <motion.div
                    key={syrup.id}
                    variants={shouldReduceMotion ? undefined : cardItemVariants}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-rose-300/80 bg-[#fff3f8] p-6 text-left transition-all duration-500 hover:-translate-y-2 hover:border-[#d84f78] hover:shadow-[0_22px_48px_rgba(153,63,98,.18)]"
                    data-testid={`card-syrup-${syrup.id}`}
                  >
                    {/* TOP BADGES */}
                    <div className="relative z-10 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3.5 w-3.5 rounded-full shadow-sm"
                          style={{ backgroundColor: syrup.badgeColor }}
                        />
                        <span className="text-[.68rem] font-bold uppercase tracking-widest text-[#b63d65]">
                          {syrup.category}
                        </span>
                      </div>
                      <span className="rounded-full bg-white/90 px-2.5 py-1 text-[.64rem] font-bold uppercase tracking-wider text-[#7e3450] shadow-sm">
                        {syrup.tag}
                      </span>
                    </div>

                    {/* PRODUCT BOTTLE IMAGE CONTAINER */}
                    <div className="relative z-10 my-4">
                      <Link href={`/products/${syrup.id}`} className="block">
                        <div className="mb-4 flex h-52 w-full items-center justify-center overflow-hidden rounded-xl border border-rose-300/60 bg-white p-3 shadow-sm transition-all duration-500 group-hover:border-[#d84f78]/60">
                          {syrup.image ? (
                            <img
                              src={syrup.image}
                              alt={`Flamingo ${syrup.name} Syrup 750ml`}
                              className="h-full w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                            />
                          ) : (
                            <Wine size={48} className="text-[#d84f78]" />
                          )}
                        </div>

                        {/* PRODUCT TITLE */}
                        <h3 className="font-display text-3xl font-semibold leading-tight text-[#321e2a] transition-colors duration-300 group-hover:text-[#d84f78]">
                          {syrup.name}
                        </h3>
                      </Link>

                      {/* SHORT DESCRIPTION */}
                      <p className="mt-2 font-sans text-xs leading-5 text-[#684454] line-clamp-2">
                        {syrup.description}
                      </p>

                      {/* FLAVOUR PROFILE NOTES */}
                      <div className="mt-3 rounded-lg border border-rose-300/60 bg-white/80 px-3 py-1.5 text-[.68rem] font-bold text-[#321e2a]">
                        <span className="text-[#b63d65]">PROFILE: </span>
                        <span>{profileText}</span>
                      </div>

                      {/* PACK SIZE & BEST FOR APPLICATIONS */}
                      <div className="mt-3 flex items-center justify-between gap-2 text-[.66rem] font-bold uppercase tracking-wider text-[#593b49]">
                        <span className="rounded-md bg-[#fbd6e4]/80 px-2 py-1 text-[#b63d65]">
                          750 ml Professional Pack
                        </span>
                        <span className="text-[#7e3450]">
                          BEST FOR: Cocktails · Mocktails
                        </span>
                      </div>
                    </div>

                    {/* FOOTER ACTIONS */}
                    <div className="relative z-10 flex flex-col gap-2 border-t border-rose-300/60 pt-4">
                      {/* ENQUIRE ABOUT THIS FLAVOUR CTA */}
                      <Link
                        href={`/enquire?product=${syrup.id}`}
                        className="ink-button flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[.68rem] font-bold uppercase tracking-[.16em] transition-transform hover:-translate-y-0.5 shadow-sm"
                        data-testid={`button-enquire-${syrup.id}`}
                      >
                        Enquire About This Flavour <ArrowUpRight size={14} />
                      </Link>

                      {/* VIEW PRODUCT PAGE LINK */}
                      <Link
                        href={`/products/${syrup.id}`}
                        className="flex items-center justify-center gap-1 py-1 text-[.66rem] font-bold uppercase tracking-wider text-[#d84f78] hover:underline"
                        data-testid={`link-view-page-${syrup.id}`}
                      >
                        View Details Page →
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* FOOTER HIGHLIGHT B2B BANNER */}
      <section className="bg-[#321e2a] text-[#ffeaf3]">
        <div className="page-shell grid gap-8 py-16 md:grid-cols-[1fr_1fr] md:py-24">
          <div>
            <SectionKicker>29 Exceptional Flavours</SectionKicker>
            <h2 className="mt-4 font-display text-5xl leading-[.88] md:text-7xl">
              Looking for<br />
              <span className="italic text-[#eaa0b7]">Something Specific?</span>
            </h2>
          </div>
          <div className="flex flex-col justify-center gap-6 text-[#e6bfce] leading-7">
            <p>
              Whether you're a bar, restaurant, hotel, café or distributor, talk to the Flamingo team about your syrup requirements.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/enquire"
                className="ink-button inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-xs font-bold uppercase tracking-[.18em]"
                data-testid="button-products-bottom-enquire"
              >
                Enquire Now <ArrowUpRight size={16} />
              </Link>
              <a
                href="https://wa.me/918971825137?text=Hello%20Flamingo%2C%20I%20would%20like%20to%20enquire%20about%20your%20syrup%20range."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-rose-300/40 bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-[.16em] text-white transition-colors hover:bg-white/20"
                data-testid="button-products-bottom-whatsapp"
              >
                WhatsApp Us <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function AboutPage() {
  useEffect(() => {
    updatePageSEO({
      title: 'For Business & Trade | Flamingo Premium Syrups',
      description: 'Partner with Flamingo for professional 750ml syrup packs, custom beverage program development, and B2B trade supply for hotels, bars, and restaurants.',
      canonicalUrl: 'https://gagangowdap.github.io/Flamingo/for-business',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Flamingo & Master Mixologist Manoj Alphones',
          url: 'https://gagangowdap.github.io/Flamingo/about',
        },
      ],
    });
  }, []);
  return (
    <main>
      <section className="relative overflow-hidden border-b border-rose-300/70 bg-[#cfe7dc]">
        <div className="page-shell grid min-h-[600px] items-center gap-10 py-20 md:grid-cols-[1fr_.8fr]">
          <div>
            <SectionKicker>The story</SectionKicker>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(4rem,9vw,8.4rem)] leading-[.78] tracking-[-.04em] text-[#234039]">
              A drink is<br /><span className="italic text-[#b63d65]">a feeling</span><br />before it is<br />a recipe.
            </h1>
          </div>
          <div className="flex justify-center md:justify-end">
            <FlamingoMark compact />
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-12 py-24 md:grid-cols-[.75fr_1.25fr] md:py-32">
        <div>
          <SectionKicker>The maker</SectionKicker>
          <h2 className="mt-5 font-display text-6xl leading-[.84] md:text-8xl">
            Manoj<br /><span className="italic text-[#d84f78]">Alphones.</span>
          </h2>
        </div>
        <div className="max-w-2xl text-lg leading-8 text-[#684454]">
          <p>Flamingo is anchored to the experience of Manoj Alphones, a beverage professional whose work has moved between the bar, the team and the larger culture of hospitality.</p>
          <p className="mt-6">His practice includes time as Beverage Head & Master Mixologist at Phoenix with Bellona Hospitality from 2023–2024, Beverage Head at Gatsby from 2021–2023, and Beverage Manager and Head Mixologist roles.</p>
          <p className="mt-6">The brand is built with that same respect for the room: thoughtful, precise and featuring a {syrupsList.length}-flavour range made for professional bartenders and beverage buyers.</p>
        </div>
      </section>

      <section className="bg-[#f9d7e4]">
        <div className="page-shell py-20 md:py-28">
          <div className="grid gap-6 border-y border-[#d697ad] py-12 md:grid-cols-3">
            <div>
              <p className="font-display text-7xl text-[#d84f78]">29</p>
              <p className="eyebrow mt-2 text-[#996074]">exceptional syrup flavours</p>
            </div>
            <div>
              <p className="font-display text-7xl text-[#d84f78]">750<span className="text-4xl">ml</span></p>
              <p className="eyebrow mt-2 text-[#996074]">professional pack size</p>
            </div>
            <div>
              <p className="font-display text-7xl text-[#d84f78]">300<span className="text-4xl">+</span></p>
              <p className="eyebrow mt-2 text-[#996074]">cocktails & drinks created</p>
            </div>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-[.8fr_1.2fr]">
            <div>
              <SectionKicker>A working timeline</SectionKicker>
              <p className="mt-4 max-w-xs text-[#684454]">A few of the chapters that inform the label.</p>
            </div>
            <div className="divide-y divide-[#d697ad]">
              {timeline.map((item) => (
                <div key={item.year} className="grid gap-2 py-6 sm:grid-cols-[120px_1fr]">
                  <span className="text-sm font-bold text-[#b63d65]">{item.year}</span>
                  <div>
                    <p className="font-display text-3xl leading-none">{item.role}</p>
                    <p className="mt-2 text-sm text-[#684454]">{item.context}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Sparkles size={20} className="mx-auto text-[#d84f78]" />
          <SectionKicker>What comes next</SectionKicker>
          <h2 className="mt-5 font-display text-6xl leading-[.85] md:text-8xl">
            Explore the<br /><span className="italic text-[#d84f78]">29 Flavour Range.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-lg leading-7 text-[#684454]">If you are building a beverage programme, come tell us what your menu needs.</p>
          <Link href="/products" className="ink-button mt-9 inline-flex items-center gap-3 px-5 py-4 text-[.7rem] font-bold uppercase tracking-[.16em]" data-testid="link-about-contact">
            View Syrups Catalogue <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}

type EnquireFormState = {
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  businessType: string;
  product: string;
  quantity: string;
  message: string;
};

type EnquireFormErrors = Partial<Record<keyof EnquireFormState, string>>;

export function EnquirePage() {
  const [form, setForm] = useState<EnquireFormState>({
    name: '',
    company: '',
    phone: '',
    email: '',
    city: '',
    businessType: 'Restaurant',
    product: '',
    quantity: '1–5 bottles',
    message: '',
  });

  const [errors, setErrors] = useState<EnquireFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let initialProduct = '';
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const productParam = params.get('product') || params.get('syrup');
      if (productParam) {
        const match = syrupsList.find((s) => s.id === productParam || s.name.toLowerCase().includes(productParam.toLowerCase()));
        if (match) initialProduct = match.id;
      }
    }

    if (initialProduct) {
      setForm((prev) => ({ ...prev, product: initialProduct }));
    }

    updatePageSEO({
      title: 'Enquire | Flamingo Premium Syrups',
      description: 'Get in touch with Flamingo for syrup enquiries, professional 750ml packs and B2B beverage requirements.',
      canonicalUrl: 'https://gagangowdap.github.io/Flamingo/enquire',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Flamingo B2B Product Enquiry',
          url: 'https://gagangowdap.github.io/Flamingo/enquire',
        },
      ],
    });
  }, []);

  function updateField(field: keyof EnquireFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const next: EnquireFormErrors = {};
    if (!form.name.trim()) next.name = 'Please enter your full name.';
    if (!form.phone.trim() || form.phone.trim().length < 8) next.phone = 'Please enter a valid phone number.';
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please enter a valid email address.';
    if (!form.businessType) next.businessType = 'Please select your business type.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  }

  const selectedSyrupObj = syrupsList.find((s) => s.id === form.product);
  const whatsappMsgText = selectedSyrupObj
    ? `Hello Flamingo, I would like to enquire about ${selectedSyrupObj.name}, 750 ml Professional Pack.`
    : `Hello Flamingo, I would like to enquire about your 29 syrup range.`;
  const whatsappUrl = `https://wa.me/918971825137?text=${encodeURIComponent(whatsappMsgText)}`;

  return (
    <main>
      {/* HERO BANNER */}
      <section className="border-b border-rose-300/70 bg-[#f9d7e4]">
        <div className="page-shell grid gap-8 py-16 md:grid-cols-[1.1fr_.9fr] md:py-24">
          <div>
            <p className="font-sans text-[11.5px] sm:text-[12px] font-semibold uppercase tracking-[.28em] text-[#b63d65]">
              B2B & Trade Enquiries
            </p>
            <h1 className="mt-3.5 max-w-3xl font-display text-4xl font-bold uppercase tracking-[-.03em] text-[#321e2a] sm:text-5xl md:text-[5.2rem] lg:text-[5.6rem] leading-[.86]">
              LET'S TALK.<br />
              <span className="block mt-1.5 font-display italic font-normal tracking-tight text-[#d84f78] text-3xl sm:text-4xl md:text-[4.2rem] lg:text-[4.5rem] leading-[.92]">
                Built for Beverage<br />
                Professionals.
              </span>
            </h1>
          </div>
          <p className="max-w-[450px] self-end font-sans text-[17px] font-normal leading-[1.58] text-[#684454]">
            Whether you're a luxury hotel, craft cocktail bar, restaurant, café, mixologist, or distributor, talk to the Flamingo team about your syrup requirements.
          </p>
        </div>
      </section>

      {/* ENQUIRY MAIN CONTENT SECTION */}
      <section className="page-shell py-16 md:py-24">
        <div className="grid gap-16 lg:grid-cols-[.9fr_1.1fr]">

          {/* LEFT: B2B DIRECT CONTACT INFO */}
          <div className="space-y-10">
            <div>
              <SectionKicker>Built for Hospitality</SectionKicker>
              <h2 className="mt-3 font-display text-4xl font-semibold text-[#321e2a] md:text-5xl">
                A Working Partner for the Bar
              </h2>
              <p className="mt-4 text-base leading-7 text-[#684454]">
                Flamingo is engineered specifically for high-volume hospitality, luxury hotels, craft cocktail bars, and specialty beverage menus. All 29 syrup flavours are delivered in standardized 750 ml speed-pour bottles.
              </p>
            </div>

            {/* CONTACT DETAILS CARD */}
            <div className="rounded-2xl border border-rose-300/80 bg-[#fff3f8] p-8 shadow-sm space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#b63d65]">Direct Trade Line:</h3>
              <div className="space-y-4 text-sm font-semibold text-[#321e2a]">
                <a href={`mailto:${brand.email}`} className="flex items-center gap-3 hover:text-[#d84f78] transition-colors" data-testid="link-enquire-email">
                  <Mail size={18} className="text-[#d84f78]" />
                  <span>{brand.email}</span>
                </a>
                <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-[#d84f78] transition-colors" data-testid="link-enquire-phone">
                  <Phone size={18} className="text-[#d84f78]" />
                  <span>{brand.phone} (Call / WhatsApp)</span>
                </a>
                <div className="flex items-start gap-3 text-[#684454]">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-[#d84f78]" />
                  <span>{brand.address}</span>
                </div>
              </div>

              <div className="border-t border-rose-200/80 pt-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#b63d65]">Master Mixologist & Creator:</p>
                <p className="mt-1 font-display text-2xl font-semibold text-[#321e2a]">{brand.creator}</p>
              </div>
            </div>

            {/* DIRECT WHATSAPP CTA */}
            <div className="rounded-2xl border-2 border-rose-300 bg-white p-6 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#321e2a]">Instant Bar Consultation:</h3>
              <p className="text-xs leading-5 text-[#684454]">
                Need immediate sample specs or bar menu recommendations? Message our team directly on WhatsApp.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-button inline-flex w-full items-center justify-center gap-2.5 rounded-xl py-3.5 text-xs font-bold uppercase tracking-[.16em]"
                data-testid="button-whatsapp-direct"
              >
                Enquire on WhatsApp <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* RIGHT: B2B ENQUIRY FORM */}
          <div className="rounded-3xl border-2 border-rose-300 bg-[#fff3f8] p-8 md:p-12 shadow-lg">
            {submitted ? (
              <div className="flex min-h-[480px] flex-col items-center justify-center text-center space-y-6">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d84f78] text-white shadow-md">
                  <Check size={32} />
                </span>
                <p className="eyebrow text-[#b63d65]">THANK YOU</p>
                <h3 className="font-display text-5xl font-semibold text-[#321e2a] md:text-6xl">
                  Enquiry Received
                </h3>
                <p className="max-w-md font-sans text-base text-[#684454] leading-relaxed">
                  Thank you for reaching out to Flamingo. Our beverage team will review your requirements and get back to you shortly.
                </p>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/products"
                    className="ink-button inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-xs font-bold uppercase tracking-[.16em]"
                    data-testid="button-continue-exploring"
                  >
                    Continue Exploring Flavours <ArrowRight size={16} />
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-rose-300 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-[.16em] text-[#b63d65] transition-colors hover:border-[#d84f78]"
                    data-testid="button-whatsapp-after-submit"
                  >
                    Open WhatsApp Chat <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="border-b border-rose-300/80 pb-4">
                  <h3 className="font-display text-3xl font-semibold text-[#321e2a]">B2B Product Enquiry Form</h3>
                  <p className="mt-1 text-xs text-[#684454]">Fill out your requirements below and our trade team will get in touch.</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* FULL NAME */}
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#593b49]">
                    Full Name <span className="text-[#d84f78]">*</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="e.g. Master Mixologist / Manager"
                      className="mt-2 w-full rounded-xl border border-rose-300/80 bg-white p-3.5 text-sm font-semibold text-[#321e2a] outline-none transition-colors focus:border-[#d84f78]"
                      data-testid="input-enquire-name"
                    />
                    {errors.name && <span className="mt-1.5 block text-xs font-normal text-[#b63d65]">{errors.name}</span>}
                  </label>

                  {/* COMPANY / BUSINESS NAME */}
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#593b49]">
                    Company / Business Name
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => updateField('company', e.target.value)}
                      placeholder="e.g. The Grand Hotel / Bar Lounge"
                      className="mt-2 w-full rounded-xl border border-rose-300/80 bg-white p-3.5 text-sm font-semibold text-[#321e2a] outline-none transition-colors focus:border-[#d84f78]"
                      data-testid="input-enquire-company"
                    />
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* PHONE NUMBER */}
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#593b49]">
                    Phone Number <span className="text-[#d84f78]">*</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+91 ..."
                      className="mt-2 w-full rounded-xl border border-rose-300/80 bg-white p-3.5 text-sm font-semibold text-[#321e2a] outline-none transition-colors focus:border-[#d84f78]"
                      data-testid="input-enquire-phone"
                    />
                    {errors.phone && <span className="mt-1.5 block text-xs font-normal text-[#b63d65]">{errors.phone}</span>}
                  </label>

                  {/* EMAIL ADDRESS */}
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#593b49]">
                    Email Address <span className="text-[#d84f78]">*</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="you@barstudio.com"
                      className="mt-2 w-full rounded-xl border border-rose-300/80 bg-white p-3.5 text-sm font-semibold text-[#321e2a] outline-none transition-colors focus:border-[#d84f78]"
                      data-testid="input-enquire-email"
                    />
                    {errors.email && <span className="mt-1.5 block text-xs font-normal text-[#b63d65]">{errors.email}</span>}
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* CITY / LOCATION */}
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#593b49]">
                    City / Location
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      placeholder="e.g. Bengaluru, Mumbai, Delhi"
                      className="mt-2 w-full rounded-xl border border-rose-300/80 bg-white p-3.5 text-sm font-semibold text-[#321e2a] outline-none transition-colors focus:border-[#d84f78]"
                      data-testid="input-enquire-city"
                    />
                  </label>

                  {/* BUSINESS TYPE */}
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#593b49]">
                    Business Type <span className="text-[#d84f78]">*</span>
                    <select
                      value={form.businessType}
                      onChange={(e) => updateField('businessType', e.target.value)}
                      className="mt-2 w-full rounded-xl border border-rose-300/80 bg-white p-3.5 text-sm font-semibold text-[#321e2a] outline-none transition-colors focus:border-[#d84f78] cursor-pointer"
                      data-testid="select-enquire-businesstype"
                    >
                      <option value="Restaurant">Restaurant</option>
                      <option value="Hotel">Hotel</option>
                      <option value="Bar">Bar / Cocktail Lounge</option>
                      <option value="Café">Café</option>
                      <option value="Catering">Catering / Events</option>
                      <option value="Distributor">Distributor / Beverage Wholesale</option>
                      <option value="Retailer">Retailer</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* INTERESTED PRODUCT */}
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#593b49]">
                    Interested Product
                    <select
                      value={form.product}
                      onChange={(e) => updateField('product', e.target.value)}
                      className="mt-2 w-full rounded-xl border border-rose-300/80 bg-white p-3.5 text-sm font-semibold text-[#321e2a] outline-none transition-colors focus:border-[#d84f78] cursor-pointer"
                      data-testid="select-enquire-product"
                    >
                      <option value="">Select a flavour (Optional)...</option>
                      {syrupsList.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.category})
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* QUANTITY REQUIRED */}
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#593b49]">
                    Quantity Required
                    <select
                      value={form.quantity}
                      onChange={(e) => updateField('quantity', e.target.value)}
                      className="mt-2 w-full rounded-xl border border-rose-300/80 bg-white p-3.5 text-sm font-semibold text-[#321e2a] outline-none transition-colors focus:border-[#d84f78] cursor-pointer"
                      data-testid="select-enquire-quantity"
                    >
                      <option value="1–5 bottles">1–5 bottles (Sample / Trial)</option>
                      <option value="6–20 bottles">6–20 bottles (Standard Bar Order)</option>
                      <option value="21–50 bottles">21–50 bottles (High-Volume Supply)</option>
                      <option value="50+ bottles">50+ bottles (Bulk / Distribution)</option>
                    </select>
                  </label>
                </div>

                {/* MESSAGE */}
                <label className="block text-xs font-bold uppercase tracking-wider text-[#593b49]">
                  Message / Brief
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Tell us what you're looking for (e.g. sample requests, beverage menu requirements, distribution inquiry)..."
                    className="mt-2 w-full rounded-xl border border-rose-300/80 bg-white p-4 text-sm font-normal text-[#321e2a] outline-none transition-colors focus:border-[#d84f78]"
                    data-testid="input-enquire-message"
                  />
                </label>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="ink-button flex w-full items-center justify-center gap-3 py-4 text-xs font-bold uppercase tracking-[.18em]"
                  data-testid="button-submit-enquiry"
                >
                  Send B2B Enquiry <ArrowRight size={16} />
                </button>

                {/* PRIVACY NOTE */}
                <p className="text-[.68rem] text-center text-[#684454]">
                  By submitting this form, you agree to be contacted regarding your enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export const ContactPage = EnquirePage;

export function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const syrup = syrupsList.find((s) => s.id === slug);

  useEffect(() => {
    if (syrup) {
      const canonicalUrl = `https://gagangowdap.github.io/Flamingo/products/${syrup.id}`;
      const ogImage = syrup.image ? `${window.location.origin}${syrup.image}` : undefined;

      updatePageSEO({
        title: `Flamingo ${syrup.name} Syrup | 750ml Professional Syrup`,
        description: `Explore Flamingo ${syrup.name} Syrup in a 750 ml professional pack for cocktails, mocktails and creative beverage applications.`,
        canonicalUrl,
        ogImage,
        ogType: 'product',
        jsonLd: [
          {
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: `Flamingo ${syrup.name} Syrup`,
            image: ogImage,
            description: syrup.description,
            brand: {
              '@type': 'Brand',
              name: 'Flamingo',
            },
            category: syrup.category,
            url: canonicalUrl,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://gagangowdap.github.io/Flamingo/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Products',
                item: 'https://gagangowdap.github.io/Flamingo/products',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: syrup.name,
                item: canonicalUrl,
              },
            ],
          },
        ],
      });
    }
  }, [syrup]);

  if (!syrup) {
    return <NotFound />;
  }

  const currentIndex = syrupsList.findIndex((s) => s.id === syrup.id);
  const prevSyrup = syrupsList[(currentIndex - 1 + syrupsList.length) % syrupsList.length];
  const nextSyrup = syrupsList[(currentIndex + 1) % syrupsList.length];

  const relatedSyrups = syrupsList
    .filter((s) => s.id !== syrup.id && (s.category === syrup.category || Math.abs(syrupsList.indexOf(s) - currentIndex) <= 4))
    .slice(0, 4);

  const whatsappMessage = encodeURIComponent(`Hello Flamingo, I am interested in Flamingo ${syrup.name}.`);
  const whatsappUrl = `https://wa.me/918971825137?text=${whatsappMessage}`;

  return (
    <main>
      {/* BREADCRUMB BAR */}
      <section className="border-b border-rose-300/60 bg-[#fff3f8] py-4">
        <div className="page-shell">
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-[.7rem] font-semibold uppercase tracking-[.16em] text-[#996074]">
            <Link href="/" className="hover:text-[#d84f78] transition-colors" data-testid="breadcrumb-home">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#d84f78] transition-colors" data-testid="breadcrumb-products">
              Products
            </Link>
            <span>/</span>
            <span className="text-[#321e2a] font-bold" aria-current="page">
              {syrup.name}
            </span>
          </nav>
        </div>
      </section>

      {/* PRODUCT HERO / DETAILS SECTION */}
      <section className="page-shell py-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          {/* LEFT: BOTTLE PHOTO */}
          <div className="relative flex justify-center rounded-3xl border-2 border-rose-300/80 bg-[#fff3f8] p-8 md:p-12 shadow-[0_20px_50px_rgba(153,63,98,.12)]">
            <span className="absolute left-6 top-6 rounded-full border border-rose-300 bg-white px-3 py-1 text-xs font-bold text-[#b63d65]">
              {syrup.category}
            </span>
            {syrup.image ? (
              <img
                src={syrup.image}
                alt={`Flamingo ${syrup.name} 750ml`}
                className="max-h-[480px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="flex h-80 w-full flex-col items-center justify-center rounded-2xl bg-[#fbd6e4]/60 text-center">
                <Wine size={56} className="text-[#d84f78]" />
                <p className="mt-4 font-display text-2xl font-semibold text-[#321e2a]">{syrup.name}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#b63d65]">750 ml Professional Pack</p>
              </div>
            )}
          </div>

          {/* RIGHT: DETAILS */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#d84f78] px-3 py-1 text-[.66rem] font-bold uppercase tracking-widest text-white shadow-sm">
                  {syrup.tag}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#996074]">
                  {syrup.volume} Professional Pack
                </span>
              </div>
              <h1 className="mt-4 font-display text-5xl font-semibold leading-[.92] text-[#321e2a] md:text-7xl">
                {syrup.name}
              </h1>
            </div>

            <p className="font-sans text-base leading-relaxed text-[#684454] md:text-lg">
              {syrup.description}
            </p>

            {/* PAIRING NOTES / FLAVOUR PROFILE */}
            <div className="rounded-2xl border border-rose-300/80 bg-[#fff3f8] p-5">
              <p className="text-xs font-bold uppercase tracking-[.14em] text-[#321e2a]">
                Flavour Profile & Pairings:
              </p>
              <p className="mt-2 text-sm text-[#684454] leading-relaxed">
                {syrup.pairingNotes}
              </p>
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={`/enquire?product=${syrup.id}`}
                className="ink-button inline-flex h-[48px] items-center gap-2.5 rounded-xl px-7 text-xs font-bold uppercase tracking-[.18em] transition-all hover:-translate-y-0.5 shadow-md"
                data-testid="button-enquire-this-flavour"
              >
                Enquire About This Flavour <ArrowUpRight size={16} />
              </Link>

              <a
                href={`https://wa.me/918971825137?text=${encodeURIComponent(`Hello Flamingo, I would like to enquire about ${syrup.name}, 750 ml Professional Pack.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[48px] items-center gap-2 rounded-xl border border-rose-300 bg-white px-6 text-xs font-bold uppercase tracking-[.16em] text-[#b63d65] transition-colors hover:border-[#d84f78] hover:bg-[#fff3f8]"
                data-testid="button-enquire-whatsapp-product"
              >
                Enquire on WhatsApp <ArrowUpRight size={15} />
              </a>

              <a
                href={`${import.meta.env.BASE_URL}catalogue/flamingo-product-catalogue.pdf`}
                download="flamingo-product-catalogue.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[48px] items-center gap-2 rounded-xl border border-rose-300 bg-white px-6 text-xs font-bold uppercase tracking-[.16em] text-[#593b49] transition-colors hover:border-[#d84f78]"
                data-testid="button-download-catalogue-product"
              >
                <Download size={15} /> Catalogue PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS & RECIPE */}
      <section className="border-t border-rose-200/80 bg-[#fff3f8] py-16 md:py-24">
        <div className="page-shell grid gap-12 lg:grid-cols-2">
          {/* INGREDIENTS & SPECIFICATIONS */}
          <div className="space-y-6">
            <SectionKicker>Specifications</SectionKicker>
            <h2 className="font-display text-3xl font-semibold text-[#321e2a] md:text-4xl">
              Ingredients & Quality
            </h2>
            <div className="rounded-2xl border border-rose-300/80 bg-white p-6 shadow-sm space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#321e2a]">Ingredients:</p>
                <p className="mt-1.5 text-sm text-[#684454] leading-relaxed">
                  {syrup.ingredientsList || 'Sugar, Water, Permitted Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.'}
                </p>
              </div>
              <div className="border-t border-rose-200/80 pt-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[#321e2a]">Pack Size:</p>
                <p className="mt-1 text-sm font-semibold text-[#d84f78]">
                  750 ml Professional Speed-Pour Pack
                </p>
              </div>
              <div className="border-t border-rose-200/80 pt-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[#321e2a]">Ideal Applications:</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Cocktails', 'Mocktails', 'Spritzes', 'Iced Teas', 'Craft Beverages', 'Desserts'].map((app) => (
                    <span key={app} className="rounded-lg bg-[#fbd6e4]/70 px-3 py-1.5 text-[.7rem] font-bold text-[#b63d65]">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SIGNATURE RECIPE */}
          <div className="space-y-6">
            <SectionKicker>Craft Mixology</SectionKicker>
            <h2 className="font-display text-3xl font-semibold text-[#321e2a] md:text-4xl">
              Signature Recipe
            </h2>
            <div className="rounded-2xl border-2 border-rose-300 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-rose-200/80 pb-4">
                <div>
                  <span className="text-[.68rem] font-bold uppercase tracking-widest text-[#d84f78]">Serve Suggestion</span>
                  <h3 className="font-display text-2xl font-bold text-[#321e2a]">{syrup.recipe.name}</h3>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d84f78] text-white">
                  <Wine size={20} />
                </span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#321e2a]">Recipe Ingredients:</p>
                <ul className="mt-2 space-y-1 text-sm text-[#684454]">
                  {syrup.recipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#d84f78]" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-rose-200/80 pt-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[#321e2a]">Preparation Method:</p>
                <p className="mt-1 text-sm text-[#684454] leading-relaxed">{syrup.recipe.method}</p>
              </div>
              <div className="border-t border-rose-200/80 pt-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[#321e2a]">Garnish:</p>
                <p className="mt-1 text-sm font-medium text-[#b63d65]">{syrup.recipe.garnish}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="page-shell py-16 md:py-24">
        <div className="flex items-center justify-between">
          <div>
            <SectionKicker>Explore More</SectionKicker>
            <h2 className="mt-2 font-display text-4xl font-semibold text-[#321e2a] md:text-5xl">
              Related Flavours
            </h2>
          </div>
          <Link href="/products" className="hidden text-xs font-bold uppercase tracking-widest text-[#d84f78] hover:underline sm:block">
            View All 29 Syrups →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedSyrups.map((rel) => (
            <Link
              key={rel.id}
              href={`/products/${rel.id}`}
              className="group flex flex-col justify-between rounded-2xl border border-rose-300/80 bg-[#fff3f8] p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d84f78] hover:shadow-md"
            >
              <div>
                <div className="relative flex h-48 w-full items-center justify-center rounded-xl bg-white p-4">
                  {rel.image ? (
                    <img src={rel.image} alt={`Flamingo ${rel.name}`} className="h-full w-auto object-contain transition-transform group-hover:scale-105" />
                  ) : (
                    <Wine size={40} className="text-[#d84f78]" />
                  )}
                </div>
                <p className="mt-4 text-[.66rem] font-bold uppercase tracking-widest text-[#d84f78]">{rel.category}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-[#321e2a] group-hover:text-[#d84f78]">{rel.name}</h3>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-rose-200/80 pt-3 text-[.68rem] font-bold uppercase tracking-wider text-[#593b49]">
                <span>{rel.volume}</span>
                <span className="text-[#d84f78]">View Flavour →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* PREVIOUS / NEXT NAVIGATION */}
        <div className="mt-16 flex items-center justify-between border-t border-rose-300/80 pt-8">
          <Link
            href={`/products/${prevSyrup.id}`}
            className="group flex items-center gap-3 rounded-xl border border-rose-300 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#593b49] transition-all hover:border-[#d84f78] hover:text-[#d84f78]"
            data-testid="link-prev-syrup"
          >
            <span>←</span>
            <span>Previous: {prevSyrup.name}</span>
          </Link>

          <Link
            href={`/products/${nextSyrup.id}`}
            className="group flex items-center gap-3 rounded-xl border border-rose-300 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#593b49] transition-all hover:border-[#d84f78] hover:text-[#d84f78]"
            data-testid="link-next-syrup"
          >
            <span>Next: {nextSyrup.name}</span>
            <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}