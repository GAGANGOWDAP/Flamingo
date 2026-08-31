import { useMemo, useState, useEffect, type FormEvent, type ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowDown, ArrowRight, Check, ChevronDown, Droplet, GlassWater, Mail, MapPin, Phone, Sparkles, Star, Wine } from 'lucide-react';
import { Link } from 'wouter';
import logoPath from '@assets/2.jpg_1787233517766.jpeg';
import { brand, syrupsList, timeline, type SyrupCategory, type SyrupItem } from '@/data/site-data';

function SectionKicker({ children }: { children: ReactNode }) {
  return <p className="eyebrow text-[#b63d65]">{children}</p>;
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
        <span>21 EXCEPTIONAL FLAVOURS</span><span className="h-1 w-1 rounded-full bg-[#d84f78]" aria-hidden="true" />
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

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="page-shell grid min-h-[calc(100dvh-76px)] items-center gap-10 py-16 md:grid-cols-[1.08fr_.92fr] md:py-20">
          <div className="reveal relative z-10">
            <SectionKicker>Flamingo · Bengaluru</SectionKicker>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(3.8rem,9vw,8.5rem)] font-medium leading-[.79] tracking-[-.04em] text-[#321e2a]">
              21 Flavours.<br /><span className="ml-[.2em] italic text-[#d84f78]">Endless</span><br />Possibilities.
            </h1>
            <p className="mt-8 max-w-md text-base leading-7 text-[#684454] md:text-lg">
              A premium syrup range crafted for mixologists, beverage managers, and craft bars. Explore our complete 21 flavour collection available in 750 ml professional packs.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link href="/products" className="ink-button inline-flex items-center gap-3 px-5 py-4 text-[.7rem] font-bold uppercase tracking-[.16em] transition-transform hover:-translate-y-1" data-testid="link-hero-products">
                Explore Syrups <ArrowRight size={16} />
              </Link>
              <Link href="/about" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#593b49]" data-testid="link-hero-story">
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
          <span>21 EXCEPTIONAL FLAVOURS</span>
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
            <p className="mt-4 text-xs font-bold uppercase tracking-[.14em] text-[#996074]">21 Exceptional Flavours · 750 ml</p>
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
          <p className="relative z-10 text-[9rem] leading-[.7] text-[#fff3f8] font-display md:text-[14rem]">21</p>
          <p className="absolute bottom-8 left-8 max-w-[180px] text-xs font-bold uppercase leading-5 tracking-[.14em] text-[#6d2d45]">21 exceptional flavours for craft beverage menus</p>
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
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<SyrupCategory>('Berry & Fruit');
  const [selectedId, setSelectedId] = useState<string>(syrupsList[0].id);
  const [showAllGrid, setShowAllGrid] = useState<boolean>(false);

  // Read URL query parameter e.g. /products?syrup=jamun
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const syrupParam = params.get('syrup');
      if (syrupParam && syrupsList.some((s) => s.id === syrupParam)) {
        setSelectedId(syrupParam);
        const match = syrupsList.find((s) => s.id === syrupParam);
        if (match) setSelectedCategory(match.category);
      }
    }
  }, []);

  const selectedSyrup = useMemo(() => {
    return syrupsList.find((s) => s.id === selectedId) ?? syrupsList[0];
  }, [selectedId]);

  const displayedSyrups = useMemo(() => {
    if (showAllGrid) return syrupsList;
    return syrupsList.filter((s) => s.category === selectedCategory);
  }, [selectedCategory, showAllGrid]);

  const categories: Array<Exclude<SyrupCategory, 'All'>> = [
    'Berry & Fruit',
    'Citrus & Tropical',
    'Spiced & Botanical',
    'Confection & Classic',
  ];

  return (
    <main>
      <section className="border-b border-rose-300/70 bg-[#f9d7e4]">
        <div className="page-shell grid gap-10 py-16 md:grid-cols-[1fr_.8fr] md:py-24">
          <div>
            <SectionKicker>Flamingo Syrups Collection</SectionKicker>
            <h1 className="mt-5 max-w-3xl font-display text-6xl leading-[.82] tracking-[-.04em] md:text-[8rem]">
              21 Exceptional<br /><span className="italic text-[#d84f78]">Flavours.</span>
            </h1>
          </div>
          <div className="flex flex-col justify-between gap-6 self-end">
            <p className="max-w-md text-base leading-7 text-[#684454]">
              Select any syrup flavour from the dropdown menu below or browse by category. Crafted for professional mixology with real ingredients in 750 ml bottles.
            </p>
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#b63d65]">
              <Wine size={16} /> 21 Syrups · 750 ml Professional Pack
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-12 md:py-20">
        {/* INTERACTIVE SYRUP DROPDOWN SELECT MENU CONTROL */}
        <div className="rounded-2xl border-2 border-rose-300 bg-[#fff3f8] p-6 md:p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* SYRUP SELECT DROPDOWN MENU */}
            <div className="w-full lg:max-w-lg">
              <label htmlFor="syrup-dropdown-menu" className="block text-xs font-bold uppercase tracking-[.14em] text-[#b63d65] mb-2">
                SELECT SYRUPS:
              </label>
              <div className="relative">
                <select
                  id="syrup-dropdown-menu"
                  value={selectedId}
                  onChange={(e) => {
                    const chosenId = e.target.value;
                    setSelectedId(chosenId);
                    const match = syrupsList.find((s) => s.id === chosenId);
                    if (match) setSelectedCategory(match.category);
                  }}
                  className="w-full appearance-none rounded-xl border-2 border-[#d84f78] bg-[#fffdfc] px-4 py-3.5 pr-10 text-base font-semibold text-[#321e2a] shadow-sm outline-none transition-all hover:border-[#b63d65] focus:border-[#b63d65] focus:ring-2 focus:ring-[#d84f78]/30 cursor-pointer"
                  data-testid="select-syrup-dropdown"
                >
                  {syrupsList.map((syrup) => (
                    <option key={syrup.id} value={syrup.id}>
                      {syrup.name} — ({syrup.category})
                    </option>
                  ))}
                </select>
                <ChevronDown size={20} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#d84f78]" />
              </div>
            </div>

            {/* CATEGORY SELECTOR TABS */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-[.14em] text-[#996074]">
                Filter by Flavour Family:
              </span>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter syrups by category">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowAllGrid(false);
                    }}
                    className={`border px-3.5 py-2 text-[.66rem] font-bold uppercase tracking-[.14em] transition-colors rounded-lg ${!showAllGrid && selectedCategory === cat
                        ? 'border-[#321e2a] bg-[#321e2a] text-[#fff3f8]'
                        : 'border-rose-300 bg-white text-[#684454] hover:border-[#d84f78] hover:bg-[#fbd6e4]/40'
                      }`}
                    aria-pressed={!showAllGrid && selectedCategory === cat}
                    data-testid={`filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    {cat}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setShowAllGrid((prev) => !prev)}
                  className={`border px-3.5 py-2 text-[.66rem] font-bold uppercase tracking-[.14em] transition-colors rounded-lg ${showAllGrid
                      ? 'border-[#d84f78] bg-[#d84f78] text-white'
                      : 'border-rose-300 bg-white text-[#b63d65] hover:border-[#d84f78]'
                    }`}
                  data-testid="button-toggle-all-21"
                >
                  {showAllGrid ? 'Showing All 21 ✓' : 'View All 21 Varieties'}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* SELECTED SYRUP DETAILED FOCUS CARD */}
        <div className="mt-10 rounded-2xl border-2 border-[#d84f78] bg-[#fff3f8] p-8 shadow-lg md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="h-3.5 w-3.5 rounded-full shadow-sm shrink-0"
                  style={{ backgroundColor: selectedSyrup.badgeColor }}
                />
                <div>
                  <SectionKicker>Selected Syrup Flavour</SectionKicker>
                  <span className="text-xs font-bold text-[#7e3450] uppercase tracking-wider">
                    Category: {selectedSyrup.category}
                  </span>
                </div>
              </div>

              <h2 className="mt-4 font-display text-5xl font-semibold text-[#321e2a] md:text-6xl">
                {selectedSyrup.name}
              </h2>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#d84f78] px-3 py-1 text-xs font-bold text-white">
                  {selectedSyrup.tag}
                </span>
                <span className="rounded-full border border-rose-300 bg-white px-3 py-1 text-xs font-bold text-[#593b49]">
                  Standard Bottle Pack: {selectedSyrup.volume}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6 border-t border-rose-300/80 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#b63d65]">Profile & Taste Notes:</h4>
                <p className="mt-2 text-base leading-7 text-[#684454]">
                  {selectedSyrup.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#b63d65]">Mixology & Recommended Pairings:</h4>
                <p className="mt-2 text-sm leading-6 font-medium text-[#321e2a]">
                  {selectedSyrup.pairingNotes}
                </p>
              </div>

              {/* SIGNATURE COCKTAIL RECIPE BOX */}
              <div className="rounded-xl border border-rose-300 bg-[#fbd6e4]/50 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Wine size={18} className="text-[#d84f78]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#b63d65]">
                    Signature Cocktail Recipe: <span className="text-[#321e2a] font-display text-lg font-semibold ml-1.5">{selectedSyrup.recipe.name}</span>
                  </h4>
                </div>

                <div className="space-y-2.5 text-xs text-[#593b49]">
                  <div>
                    <span className="font-bold text-[#b63d65] uppercase tracking-wider block mb-1.5">Ingredients:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSyrup.recipe.ingredients.map((ing) => (
                        <span key={ing} className="rounded-md border border-rose-300/80 bg-white px-2.5 py-1 text-xs font-semibold text-[#321e2a]">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-rose-200">
                    <span className="font-bold text-[#b63d65] uppercase tracking-wider">Method: </span>
                    <span className="text-[#321e2a] font-medium">{selectedSyrup.recipe.method}</span>
                  </div>

                  <div>
                    <span className="font-bold text-[#b63d65] uppercase tracking-wider">Garnish: </span>
                    <span className="text-[#321e2a] font-medium">{selectedSyrup.recipe.garnish}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/contact?syrup=${encodeURIComponent(selectedSyrup.name)}`}
                  className="ink-button inline-flex items-center gap-3 px-6 py-3.5 text-xs font-bold uppercase tracking-[.16em]"
                  data-testid="link-selected-syrup-enquire"
                >
                  Enquire About {selectedSyrup.name} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FLAVOUR CARDS GRID WITH VIEWPORT STAGGER & PREMUM INTERACTION SYSTEM */}
        <div className="mt-12">
          <div className="flex items-center justify-between border-b border-rose-300 pb-4 mb-8">
            <h3 className="font-display text-3xl font-semibold text-[#321e2a]">
              {showAllGrid ? 'All 21 Varieties Catalogue' : `${selectedCategory} Flavours`}
            </h3>
            <span className="text-xs font-bold uppercase tracking-wider text-[#996074]">
              {displayedSyrups.length} {displayedSyrups.length === 1 ? 'Syrup' : 'Syrups'}
            </span>
          </div>

          <motion.div
            key={selectedCategory + String(showAllGrid)}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={shouldReduceMotion ? undefined : cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {displayedSyrups.map((syrup) => {
              const isSelected = selectedId === syrup.id;
              return (
                <motion.button
                  type="button"
                  key={syrup.id}
                  variants={shouldReduceMotion ? undefined : cardItemVariants}
                  onClick={() => setSelectedId(syrup.id)}
                  className={`group relative flex flex-col justify-between min-h-[300px] overflow-hidden rounded-xl border p-6 text-left transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:border-[#d84f78] hover:shadow-[0_22px_48px_rgba(153,63,98,.18)] ${isSelected
                      ? 'border-2 border-[#d84f78] bg-[#fff3f8] shadow-md ring-2 ring-[#d84f78]/20'
                      : 'border-rose-300/80 bg-[#fbd6e4]/70 hover:bg-[#fbd6e4]'
                    }`}
                  data-testid={`card-syrup-${syrup.id}`}
                  aria-pressed={isSelected}
                >
                  {/* 3. SUBTLE PINK GRADIENT SWEEP OVERLAY */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-transparent via-[#ffeaf3]/70 to-transparent opacity-0 -translate-x-full transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:translate-x-full"
                  />

                  {/* CARD CONTENT WITH z-10 LAYER FOR MAXIMUM READABILITY */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-125"
                        style={{ backgroundColor: syrup.badgeColor }}
                      />
                      <span className="text-[.68rem] font-bold uppercase tracking-widest text-[#b63d65]">
                        {syrup.category}
                      </span>
                    </div>
                    <span className="rounded-full bg-white/80 px-2.5 py-1 text-[.64rem] font-bold uppercase tracking-wider text-[#7e3450] transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                      {syrup.tag}
                    </span>
                  </div>

                  <div className="relative z-10 my-4">
                    <h4 className="mt-1 font-display text-3xl font-semibold leading-tight text-[#321e2a] transition-colors duration-300 group-hover:text-[#d84f78]">
                      {syrup.name}
                    </h4>
                    <p className="mt-2 text-xs leading-5 text-[#684454] line-clamp-2">
                      {syrup.description}
                    </p>
                    <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-md border border-rose-300/80 bg-white/80 px-2 py-1 text-[.64rem] font-bold text-[#b63d65]">
                      <Wine size={11} className="text-[#d84f78]" />
                      <span>Recipe: {syrup.recipe.name}</span>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between border-t border-rose-300/60 pt-3 text-[.68rem] font-bold uppercase tracking-wider text-[#593b49]">
                    <span>Pack: {syrup.volume}</span>
                    <span className="flex items-center gap-1 text-[#d84f78] transition-transform duration-300 group-hover:translate-x-1.5">
                      {isSelected ? 'Selected ✓' : 'Select Flavour →'}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#d84f78] text-white shadow-sm">
                      <Check size={14} />
                    </span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FOOTER HIGHLIGHT BANNER */}
      <section className="bg-[#321e2a] text-[#ffeaf3]">
        <div className="page-shell grid gap-8 py-16 md:grid-cols-[1fr_1fr] md:py-24">
          <div>
            <SectionKicker>21 Exceptional Flavours</SectionKicker>
            <h2 className="mt-4 font-display text-5xl leading-[.88] md:text-7xl">
              One Syrup.<br />
              <span className="italic text-[#eaa0b7]">Endless Possibilities.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-center gap-4 text-[#e6bfce] leading-7">
            <p>
              All 21 flavours in the Flamingo range are crafted with premium taste standards, optimal sweet-to-acid balance, and high concentration for professional bar output.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#eaa0b7]">
              <Sparkles size={16} /> Available in 750 ml bottles for hospitality & craft bars
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function AboutPage() {
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
          <p className="mt-6">The brand is built with that same respect for the room: thoughtful, precise and featuring a 21-flavour range made for professional bartenders and beverage buyers.</p>
        </div>
      </section>

      <section className="bg-[#f9d7e4]">
        <div className="page-shell py-20 md:py-28">
          <div className="grid gap-6 border-y border-[#d697ad] py-12 md:grid-cols-3">
            <div>
              <p className="font-display text-7xl text-[#d84f78]">21</p>
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
            Explore the<br /><span className="italic text-[#d84f78]">21 Flavour Range.</span>
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

type FormState = { name: string; email: string; phone: string; message: string };
type FormErrors = Partial<Record<keyof FormState, string>>;

export function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const syrup = params.get('syrup');
      if (syrup) {
        setForm((prev) => ({
          ...prev,
          message: `Hi, I would like to enquire about ordering ${syrup} for our bar menu.`,
        }));
      }
    }
  }, []);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = 'Please add your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please enter a valid email.';
    if (form.message.trim().length < 12) next.message = 'Tell us a little more about the brief.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validate()) setSubmitted(true);
  }

  return (
    <main>
      <section className="border-b border-rose-300/70 bg-[#f9d7e4]">
        <div className="page-shell grid gap-10 py-20 md:grid-cols-[1fr_.7fr] md:py-28">
          <div>
            <SectionKicker>Say hello</SectionKicker>
            <h1 className="mt-5 max-w-3xl font-display text-7xl leading-[.8] tracking-[-.04em] md:text-[9rem]">
              Let’s make<br /><span className="italic text-[#d84f78]">a moment.</span>
            </h1>
          </div>
          <p className="max-w-sm self-end text-lg leading-7 text-[#684454]">
            For beverage buyers, bar teams and curious collaborators. Enquire about our 21 flavour syrup collection.
          </p>
        </div>
      </section>

      <section className="page-shell grid gap-14 py-20 md:grid-cols-[.65fr_1.35fr] md:py-28">
        <div className="space-y-10">
          <div>
            <SectionKicker>Direct line</SectionKicker>
            <div className="mt-5 space-y-4">
              <a href={`mailto:${brand.email}`} className="flex items-start gap-3 text-[#684454] hover:text-[#d84f78]" data-testid="link-contact-email">
                <Mail size={17} className="mt-1 shrink-0 text-[#d84f78]" />
                {brand.email}
              </a>
              <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="flex items-start gap-3 text-[#684454] hover:text-[#d84f78]" data-testid="link-contact-phone">
                <Phone size={17} className="mt-1 shrink-0 text-[#d84f78]" />
                {brand.phone}
              </a>
              <p className="flex items-start gap-3 leading-6 text-[#684454]">
                <MapPin size={17} className="mt-1 shrink-0 text-[#d84f78]" />
                {brand.address}
              </p>
            </div>
          </div>
          <div className="border-l border-[#d84f78] pl-5">
            <p className="font-display text-3xl italic leading-tight text-[#b63d65]">No polished pitch required.</p>
            <p className="mt-3 text-sm leading-6 text-[#684454]">A useful brief, a sample request, or a hello is enough.</p>
          </div>
        </div>

        <div className="border border-rose-300 bg-[#fff3f8] p-6 shadow-[0_18px_50px_rgba(153,63,98,.08)] md:p-10">
          {submitted ? (
            <div className="flex min-h-[460px] flex-col items-start justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#cfe7dc] text-[#234039]">
                <Check size={20} />
              </span>
              <SectionKicker>Message received</SectionKicker>
              <h2 className="mt-4 max-w-md font-display text-6xl leading-[.85]">
                Thank you,<br /><span className="italic text-[#d84f78]">{form.name || 'friend'}.</span>
              </h2>
              <p className="mt-6 max-w-md leading-7 text-[#684454]">Your enquiry is ready to be picked up. We will reply through the contact details you shared.</p>
              <button
                type="button"
                className="mt-8 border-b border-[#321e2a] pb-2 text-[.7rem] font-bold uppercase tracking-[.14em]"
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
                data-testid="button-send-another"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="mb-9">
                <SectionKicker>Enquiry form</SectionKicker>
                <h2 className="mt-3 font-display text-5xl leading-none">Start here.</h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-[#593b49]">
                  Name<span className="text-[#d84f78]"> *</span>
                  <input
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className="mt-2 w-full border-0 border-b border-[#d697ad] bg-transparent px-0 py-3 text-base text-[#321e2a] outline-none transition-colors placeholder:text-[#bd879d] focus:border-[#d84f78]"
                    placeholder="Your name"
                    data-testid="input-name"
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && <span className="mt-1 block text-xs font-normal text-[#b63d65]">{errors.name}</span>}
                </label>
                <label className="block text-sm font-semibold text-[#593b49]">
                  Email<span className="text-[#d84f78]"> *</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className="mt-2 w-full border-0 border-b border-[#d697ad] bg-transparent px-0 py-3 text-base text-[#321e2a] outline-none transition-colors placeholder:text-[#bd879d] focus:border-[#d84f78]"
                    placeholder="you@studio.com"
                    data-testid="input-email"
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <span className="mt-1 block text-xs font-normal text-[#b63d65]">{errors.email}</span>}
                </label>
              </div>
              <label className="mt-6 block text-sm font-semibold text-[#593b49]">
                Phone <span className="font-normal text-[#996074]">(optional)</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  className="mt-2 w-full border-0 border-b border-[#d697ad] bg-transparent px-0 py-3 text-base text-[#321e2a] outline-none transition-colors placeholder:text-[#bd879d] focus:border-[#d84f78]"
                  placeholder="+91 ..."
                  data-testid="input-phone"
                />
              </label>
              <label className="mt-6 block text-sm font-semibold text-[#593b49]">
                Tell us about the brief / syrup requirements<span className="text-[#d84f78]"> *</span>
                <textarea
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  rows={5}
                  className="mt-2 w-full resize-y border border-[#d697ad] bg-[#fbd6e4]/40 p-4 text-base font-normal text-[#321e2a] outline-none transition-colors placeholder:text-[#bd879d] focus:border-[#d84f78]"
                  placeholder="Which syrups are you interested in for your bar menu?"
                  data-testid="input-message"
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && <span className="mt-1 block text-xs font-normal text-[#b63d65]">{errors.message}</span>}
              </label>
              <button
                type="submit"
                className="ink-button mt-8 inline-flex w-fit items-center gap-3 px-5 py-4 text-[.7rem] font-bold uppercase tracking-[.16em] transition-transform hover:-translate-y-1"
                data-testid="button-submit-enquiry"
              >
                Send enquiry <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}