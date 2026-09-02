import { useState, useMemo, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Download,
  Search,
  Wine,
  X,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { syrupsList, socialLinks, type SyrupCategory } from "@/data/site-data";
import { updatePageSEO } from "@/lib/seo";
import {
  SectionKicker,
  cardContainerVariants,
  cardItemVariants,
} from "@/components/common-ui";

export function ProductsPage() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    updatePageSEO({
      title: "Products | Flamingo",
      description:
        "Explore all 29 Flamingo syrup flavours, available in 750 ml professional packs for creative beverage applications.",
      canonicalUrl: "https://gagangowdap.github.io/Flamingo/products",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Flamingo 29 Syrup Collection",
          itemListElement: syrupsList.map((s, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: `Flamingo ${s.name} Syrup`,
            url: `https://gagangowdap.github.io/Flamingo/products/${s.id}`,
          })),
        },
      ],
    });
  }, []);

  const categories: SyrupCategory[] = [
    "All",
    "Fruit & Berry",
    "Citrus",
    "Herbal & Botanical",
    "Melon",
    "Tropical",
    "Classic Cocktail",
    "Creamy & Dessert",
    "Spiced",
  ];

  const categoryIcons: Record<SyrupCategory, string> = {
    All: "✨",
    "Fruit & Berry": "🍓",
    Citrus: "🍊",
    "Herbal & Botanical": "🌿",
    Melon: "🍈",
    Tropical: "🥥",
    "Classic Cocktail": "🍹",
    "Creamy & Dessert": "🍦",
    Spiced: "🌶️",
  };

  const filteredSyrups = useMemo(() => {
    return syrupsList.filter((syrup) => {
      const matchesCategory =
        selectedCategory === "All" || syrup.category === selectedCategory;
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
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(42px,5.5vw,72px)] font-normal leading-[.92] tracking-[-.02em] text-[#321e2a]">
              29 FLAVOURS.
              <br />
              <span className="italic font-normal text-[#d84f78]">
                ENDLESS POSSIBILITIES.
              </span>
            </h1>
          </div>
          <div className="flex flex-col justify-between gap-6 self-end">
            <p className="max-w-[480px] font-sans text-[15px] md:text-[16px] font-normal leading-[1.62] text-[#684454]">
              Explore the Flamingo flavour collection crafted for creative
              beverage professionals, luxury hotels, craft cocktail bars, and
              specialty menus.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`${import.meta.env.BASE_URL}catalogue/flamingo-product-catalogue.pdf`}
                download="flamingo-product-catalogue.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-xl border border-[#321e2a] bg-[#321e2a] px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[.16em] text-[#ffeaf3] shadow-sm transition-all duration-300 hover:bg-[#d84f78] hover:border-[#d84f78] hover:shadow-md hover:-translate-y-0.5"
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
              <label
                htmlFor="search-flavours-input"
                className="block text-[11px] font-semibold uppercase tracking-[.14em] text-[#b63d65] mb-2"
              >
                SEARCH FLAVOURS:
              </label>
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b63d65]"
                />
                <input
                  id="search-flavours-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by flavour name (e.g. Passion Fruit, Lavender)..."
                  className="w-full rounded-xl border-2 border-rose-300 bg-white py-3 pl-10 pr-10 text-sm font-normal text-[#321e2a] shadow-sm outline-none transition-all placeholder:text-[#996074]/60 focus:border-[#d84f78] focus:ring-2 focus:ring-[#d84f78]/30"
                  data-testid="input-search-flavours"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
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
              <label
                htmlFor="syrup-dropdown-menu"
                className="block text-[11px] font-semibold uppercase tracking-[.14em] text-[#b63d65] mb-2"
              >
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
                  className="w-full appearance-none rounded-xl border-2 border-rose-300 bg-white px-4 py-3 pr-10 text-sm font-medium text-[#321e2a] shadow-sm outline-none transition-all hover:border-[#d84f78] focus:border-[#d84f78] cursor-pointer"
                  data-testid="select-syrup-dropdown"
                >
                  <option value="" disabled>
                    Choose a Syrup...
                  </option>
                  {syrupsList.map((syrup) => (
                    <option key={syrup.id} value={syrup.id}>
                      {syrup.name} — ({syrup.category})
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#d84f78]"
                />
              </div>
            </div>
          </div>

          {/* FLAVOUR FAMILY CATEGORY FILTERS */}
          <div className="border-t border-rose-300/70 pt-6">
            <span className="block text-[11px] font-semibold uppercase tracking-[.14em] text-[#996074] mb-3">
              Filter by Category:
            </span>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter syrups by category family"
            >
              {categories.map((cat) => {
                const count =
                  cat === "All"
                    ? syrupsList.length
                    : syrupsList.filter((s) => s.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[.12em] transition-all rounded-xl flex items-center gap-1.5 ${
                      isSelected
                        ? "border-[#d84f78] bg-[#d84f78] text-white shadow-sm"
                        : "border-rose-300 bg-white text-[#593b49] hover:border-[#d84f78] hover:bg-[#fbd6e4]/40"
                    }`}
                    aria-pressed={isSelected}
                    data-testid={`filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                  >
                    <span>{categoryIcons[cat]}</span>
                    <span>{cat}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] ${isSelected ? "bg-white/30 text-white" : "bg-rose-100 text-[#b63d65]"}`}
                    >
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
            <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-normal text-[#321e2a]">
              {selectedCategory === "All"
                ? "29 Exceptional Syrups"
                : `${selectedCategory} Flavours`}
            </h2>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#b63d65]">
              Showing {filteredSyrups.length} of {syrupsList.length} Syrups
            </span>
          </div>

          {/* EMPTY SEARCH STATE */}
          {filteredSyrups.length === 0 ? (
            <div className="my-16 rounded-3xl border-2 border-dashed border-rose-300 bg-[#fff3f8] p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d84f78] text-white shadow-sm">
                <Wine size={32} />
              </div>
              <h3 className="mt-6 font-display text-4xl font-normal text-[#321e2a]">
                NO FLAVOURS FOUND
              </h3>
              <p className="mt-3 max-w-md mx-auto text-sm text-[#684454]">
                We couldn't find any syrup matching{" "}
                <span className="font-bold text-[#321e2a]">
                  "{searchQuery}"
                </span>
                . Try another flavour name or reset your search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="ink-button mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[.16em]"
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
              viewport={{ once: true, margin: "-40px" }}
            >
              {filteredSyrups.map((syrup) => {
                const profileParts = syrup.tag
                  .split(/&|&|·|\//)
                  .map((s) => s.trim())
                  .filter(Boolean);
                const profileText =
                  profileParts.length >= 2
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
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#b63d65]">
                          {syrup.category}
                        </span>
                      </div>
                      <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#7e3450] shadow-sm">
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

                        {/* PRODUCT TITLE - CORMORANT GARAMOND 500 */}
                        <h3 className="font-display text-[clamp(26px,2.5vw,34px)] font-medium leading-[1.05] text-[#321e2a] transition-colors duration-300 group-hover:text-[#d84f78]">
                          {syrup.name}
                        </h3>
                      </Link>

                      {/* SHORT DESCRIPTION - INTER 400 */}
                      <p className="mt-2 font-sans text-xs leading-[1.6] text-[#684454] line-clamp-2">
                        {syrup.description}
                      </p>

                      {/* FLAVOUR PROFILE NOTES */}
                      <div className="mt-3 rounded-lg border border-rose-300/60 bg-white/80 px-3 py-1.5 text-[11px] font-medium text-[#321e2a] tracking-[0.04em]">
                        <span className="text-[#b63d65]">PROFILE: </span>
                        <span>{profileText}</span>
                      </div>

                      {/* PACK SIZE & BEST FOR APPLICATIONS */}
                      <div className="mt-3 flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#593b49]">
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
                        className="ink-button flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[11px] font-semibold uppercase tracking-[.16em] transition-transform hover:-translate-y-0.5 shadow-sm"
                        data-testid={`button-enquire-${syrup.id}`}
                      >
                        Enquire About This Flavour <ArrowUpRight size={14} />
                      </Link>

                      {/* VIEW PRODUCT PAGE LINK */}
                      <Link
                        href={`/products/${syrup.id}`}
                        className="flex items-center justify-center gap-1 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#d84f78] hover:underline"
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
            <h2 className="mt-4 font-display text-[clamp(36px,4.5vw,60px)] font-normal leading-[.90]">
              Looking for
              <br />
              <span className="italic text-[#eaa0b7]">Something Specific?</span>
            </h2>
          </div>
          <div className="flex flex-col justify-center gap-6 text-[#e6bfce] leading-7 font-sans text-[15px]">
            <p>
              Whether you're a bar, restaurant, hotel, café or distributor, talk
              to the Flamingo team about your syrup requirements.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/enquire"
                className="ink-button inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[.18em]"
                data-testid="button-products-bottom-enquire"
              >
                Enquire Now <ArrowUpRight size={16} />
              </Link>
              <a
                href={socialLinks.whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Flamingo on WhatsApp"
                className="inline-flex items-center gap-2 rounded-xl border border-rose-300/40 bg-white/10 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[.16em] text-white transition-colors hover:bg-white/20"
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
