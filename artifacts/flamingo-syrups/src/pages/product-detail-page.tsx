import { useEffect } from 'react';
import { ArrowUpRight, Download, Wine } from 'lucide-react';
import { Link, useParams } from 'wouter';
import { syrupsList } from '@/data/site-data';
import { updatePageSEO } from '@/lib/seo';
import { SectionKicker } from '@/components/common-ui';
import NotFound from '@/pages/not-found';

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
