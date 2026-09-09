import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { syrupsList, timeline } from "@/data/site-data";
import { updatePageSEO } from "@/lib/seo";
import { SectionKicker, FlamingoMark } from "@/components/common-ui";

const faqs = [
  {
    q: "What bottle size is available for Flamingo syrups?",
    a: "All 29 Flamingo syrup flavours are packaged in standard 750 ml professional speed-pour bottles designed for craft cocktail bars, hotels, restaurants, and cafés.",
  },
  {
    q: "How can I enquire about B2B trade supply or request samples?",
    a: "You can submit a trade request on our /enquire page or connect directly with our Master Mixologist and sales team via WhatsApp for sample specs and menu consultation.",
  },
  {
    q: "Which beverage applications are Flamingo syrups best suited for?",
    a: "Our syrup range is engineered for high versatility across craft cocktails, signature mocktails, spritzes, iced teas, coffee creations, and specialty desserts.",
  },
  {
    q: "Where can I download the complete product catalogue?",
    a: "You can download the official 29-Flavour Product Catalogue PDF directly from the website header or product catalogue page.",
  },
];

export function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    updatePageSEO({
      title: "For Business & Trade | Flamingo Premium Syrups",
      description:
        "Partner with Flamingo for professional 750ml syrup packs, custom beverage program development, and B2B trade supply for hotels, bars, and restaurants.",
      canonicalUrl: "https://gagangowdap.github.io/Flamingo/for-business",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Flamingo & Master Mixologist Manoj Alphones",
          url: "https://gagangowdap.github.io/Flamingo/about",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        },
      ],
    });
  }, []);

  return (
    <main>
      {/* SECTION 1: THE STORY HERO BANNER */}
      <section className="relative overflow-hidden border-b border-rose-300/70 bg-[#cfe7dc]">
        <div className="page-shell flex flex-col md:flex-row min-h-[360px] items-center justify-between gap-8 py-16">
          <div className="max-w-3xl">
            <SectionKicker>Our Vision</SectionKicker>
            <h1 className="mt-4 font-display text-2xl font-semibold text-[#234039] leading-tight md:text-3xl lg:text-4xl md:leading-snug">
              To explore the world of flavours, create extraordinary taste experiences and share the delight of flavour with everyone
            </h1>
            <p className="mt-4 font-display text-lg italic text-[#b63d65] leading-relaxed md:text-xl">
              Flamingo Flavours – Explore. Mix. Create. Delight
            </p>
          </div>
          <div className="flex justify-center md:justify-end shrink-0">
            <FlamingoMark compact />
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT THE FOUNDER (SELVAMANI K.) */}
      <section className="border-b border-rose-300/60 bg-[#fdfbf7] py-20 md:py-28">
        <div className="page-shell grid gap-12 md:grid-cols-[.75fr_1.25fr]">
          <div>
            <SectionKicker>About the founder</SectionKicker>
            <h2 className="mt-5 font-display text-5xl leading-[.90] md:text-7xl text-[#321e2a]">
              Selvamani
              <br />
              <span className="italic text-[#d84f78]">K.</span>
            </h2>
            <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-[.2em] text-[#996074]">
              Founder – Flamingo Flavours
            </p>
          </div>
          <div className="max-w-2xl font-sans text-base leading-8 text-[#684454] space-y-6">
            <p className="font-display text-xl md:text-2xl italic font-normal text-[#b63d65] leading-relaxed">
              Selvamani K., the founder of Flamingo Flavours, began his professional journey with a passion for hospitality and a deep curiosity for the art of flavours.
            </p>
            <p>
              After graduating in Hotel Management in 2007, he chose to specialize in the world of bar operations and mixology, where creativity, precision and flavour play a vital role.
            </p>
            <p>
              His journey from a young hospitality professional to an internationally trained bartender and mixologist was shaped by years of hands-on experience, continuous learning and a passion for creating exceptional flavour experiences. Through participation and victories in national and international competitions, he had the opportunity to explore different countries, cultures, ingredients and beverage traditions.
            </p>
            <p>
              Travelling around the world exposed him to diverse flavour profiles and innovative techniques. These experiences helped him understand how individual ingredients can be carefully balanced and transformed into memorable taste experiences.
            </p>
            <p className="font-medium text-[#321e2a] border-l-2 border-[#d84f78]/60 pl-4 py-0.5">
              With years of experience in bartending, mixology, flavour exploration, research, training and product development, Selvamani K. is now bringing his knowledge from the bar to the world of flavour creation.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE MAKER (MANOJ ALPHONES BIOGRAPHY) */}
      <section className="page-shell grid gap-12 py-24 md:grid-cols-[.75fr_1.25fr] md:py-32">
        <div>
          <SectionKicker>The maker</SectionKicker>
          <h2 className="mt-5 font-display text-6xl leading-[.84] md:text-8xl">
            Manoj
            <br />
            <span className="italic text-[#d84f78]">Alphones.</span>
          </h2>
        </div>
        <div className="max-w-2xl text-lg leading-8 text-[#684454]">
          <p>
            Flamingo is anchored to the experience of Manoj Alphones, a beverage
            professional whose work has moved between the bar, the team and the
            larger culture of hospitality.
          </p>
          <p className="mt-6">
            His practice includes time as Beverage Head & Master Mixologist at
            Phoenix with Bellona Hospitality from 2023–2024, Beverage Head at
            Gatsby from 2021–2023, and Beverage Manager and Head Mixologist
            roles.
          </p>
          <p className="mt-6">
            The brand is built with that same respect for the room: thoughtful,
            precise and featuring a {syrupsList.length}-flavour range made for
            professional bartenders and beverage buyers.
          </p>
        </div>
      </section>

      {/* SECTION 3: KEY METRICS & WORKING TIMELINE */}
      <section className="bg-[#f9d7e4]">
        <div className="page-shell py-20 md:py-28">
          {/* STATS HIGHLIGHTS */}
          <div className="grid gap-6 border-y border-[#d697ad] py-12 md:grid-cols-3">
            <div>
              <p className="font-display text-7xl text-[#d84f78]">29</p>
              <p className="eyebrow mt-2 text-[#996074]">
                exceptional syrup flavours
              </p>
            </div>
            <div>
              <p className="font-display text-7xl text-[#d84f78]">
                750<span className="text-4xl">ml</span>
              </p>
              <p className="eyebrow mt-2 text-[#996074]">
                professional pack size
              </p>
            </div>
            <div>
              <p className="font-display text-7xl text-[#d84f78]">
                300<span className="text-4xl">+</span>
              </p>
              <p className="eyebrow mt-2 text-[#996074]">
                cocktails & drinks created
              </p>
            </div>
          </div>

          {/* CHRONOLOGICAL TIMELINE */}
          <div className="mt-16 grid gap-10 md:grid-cols-[.8fr_1.2fr]">
            <div>
              <SectionKicker>A working timeline</SectionKicker>
              <p className="mt-4 max-w-xs text-[#684454]">
                A few of the chapters that inform the label.
              </p>
            </div>
            <div className="divide-y divide-[#d697ad]">
              {timeline.map((item) => (
                <div
                  key={item.year}
                  className="grid gap-2 py-6 sm:grid-cols-[120px_1fr]"
                >
                  <span className="text-sm font-bold text-[#b63d65]">
                    {item.year}
                  </span>
                  <div>
                    <p className="font-display text-3xl leading-none">
                      {item.role}
                    </p>
                    <p className="mt-2 text-sm text-[#684454]">
                      {item.context}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FREQUENTLY ASKED QUESTIONS (B2B FAQ) */}
      <section className="page-shell py-20 md:py-28 border-b border-rose-300/70">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionKicker>Trade FAQ</SectionKicker>
            <h2 className="mt-3 font-display text-4xl font-semibold text-[#321e2a] md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-sm text-[#684454] leading-relaxed">
              Common questions from hospitality buyers, master mixologists, and
              beverage managers regarding Flamingo syrup supply.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-rose-300/80 bg-[#fff3f8] overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-xl font-semibold text-[#321e2a]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[#d84f78] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 border-t border-rose-200/80">
                      <p className="mt-3 text-sm leading-relaxed text-[#684454]">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: CALL TO ACTION */}
      <section className="page-shell py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Sparkles size={20} className="mx-auto text-[#d84f78]" />
          <SectionKicker>What comes next</SectionKicker>
          <h2 className="mt-5 font-display text-6xl leading-[.85] md:text-8xl">
            Explore the
            <br />
            <span className="italic text-[#d84f78]">29 Flavour Range.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-lg leading-7 text-[#684454]">
            If you are building a beverage programme, come tell us what your
            menu needs.
          </p>
          <Link
            href="/products"
            className="ink-button mt-9 inline-flex items-center gap-3 px-5 py-4 text-[.7rem] font-bold uppercase tracking-[.16em]"
            data-testid="link-about-contact"
          >
            View Syrups Catalogue <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
