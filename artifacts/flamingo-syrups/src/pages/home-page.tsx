import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import logoPath from '@assets/2.jpg_1787233517766.jpeg';
import { updatePageSEO } from '@/lib/seo';
import { SectionKicker, Marquee, cardContainerVariants, cardItemVariants } from '@/components/common-ui';

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
          <Link href="/enquire" className="ink-button inline-flex items-center gap-3 px-5 py-4 text-[.7rem] font-bold uppercase tracking-[.16em]" data-testid="link-home-enquire">
            Start an enquiry <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
