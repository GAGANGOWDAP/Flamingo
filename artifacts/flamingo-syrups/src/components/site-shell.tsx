import { useEffect, useState, useRef, type ReactNode } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X, Wine, Download, Flame, Instagram } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import logoPath from '@assets/2.jpg_1787233517766.jpeg';
import { brand, syrupsList, socialLinks } from '@/data/site-data';
import { WhatsAppIcon } from '@/components/common-ui';

export function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location]);
  return null;
}

export function SiteHeader() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-rose-300/60 bg-[#fff3f8]/98 shadow-[0_6px_30px_rgba(153,63,98,.1)] backdrop-blur-md'
          : 'border-b border-[#e8d5dc]/80 bg-[#fff3f8]/90 backdrop-blur-md'
      }`}
    >
      <div className="page-shell flex h-[82px] items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-3.5 transition-opacity hover:opacity-95" data-testid="link-logo">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-rose-200/90 bg-[#fffdfc] shadow-sm transition-transform duration-300 group-hover:scale-105">
            <img src={logoPath} alt="Flamingo logo: a pink flamingo in a cocktail glass" className="h-full w-full object-contain p-0.5" />
          </span>
          <span className="hidden font-display text-[1.45rem] font-semibold tracking-[.04em] text-[#321e2a] sm:block">
            {brand.name}
          </span>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary navigation">
          <Link
            href="/"
            data-testid="link-nav-home"
            className={`relative py-2 text-[.74rem] font-bold uppercase tracking-[.18em] transition-colors duration-200 hover:text-[#d84f78] ${
              location === '/' ? 'text-[#d84f78]' : 'text-[#593b49]'
            }`}
          >
            Home
            {location === '/' && <span className="absolute -bottom-1.5 left-0 h-[2px] w-full rounded-full bg-[#d84f78]" />}
          </Link>

          {/* PRODUCTS DROPDOWN MENU */}
          <div className="relative" ref={dropdownRef} onMouseEnter={() => setProductsOpen(true)}>
            <button
              type="button"
              onClick={() => setProductsOpen((prev) => !prev)}
              data-testid="link-nav-products-dropdown"
              className={`flex items-center gap-1.5 py-2 text-[.74rem] font-bold uppercase tracking-[.18em] transition-colors duration-200 hover:text-[#d84f78] ${
                location.startsWith('/products') ? 'text-[#d84f78]' : 'text-[#593b49]'
              }`}
              aria-expanded={productsOpen}
            >
              Products
              <ChevronDown size={14} className={`transition-transform duration-200 ${productsOpen ? 'rotate-180 text-[#d84f78]' : ''}`} />
            </button>

            {productsOpen && (
              <div className="absolute left-0 top-full pt-2 z-50" onMouseLeave={() => setProductsOpen(false)}>
                <div className="w-[300px] rounded-2xl border border-rose-300/80 bg-[#fff3f8] p-3.5 shadow-[0_22px_60px_rgba(153,63,98,.22)] backdrop-blur-md space-y-1">
                  <Link
                    href="/products"
                    onClick={() => setProductsOpen(false)}
                    className="group flex items-center justify-between rounded-xl border border-transparent p-3 transition-all hover:border-rose-300 hover:bg-[#fbd6e4]/70"
                    data-testid="link-dropdown-syrups"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d84f78] text-white shadow-sm">
                        <Wine size={18} />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#321e2a] group-hover:text-[#d84f78]">
                          All Syrups
                        </p>
                        <p className="text-[.68rem] font-medium text-[#996074]">
                          {syrupsList.length} Exceptional Flavours
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-[#d84f78] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <Link
                    href="/products"
                    onClick={() => setProductsOpen(false)}
                    className="group flex items-center justify-between rounded-xl border border-transparent p-3 transition-all hover:border-rose-300 hover:bg-[#fbd6e4]/70"
                    data-testid="link-dropdown-bestsellers"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#b63d65] text-white shadow-sm">
                        <Flame size={18} />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#321e2a] group-hover:text-[#d84f78]">
                          Best Sellers
                        </p>
                        <p className="text-[.68rem] font-medium text-[#996074]">
                          Jamun, Limoncello, Guava Chilli
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-[#d84f78] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <a
                    href={`${import.meta.env.BASE_URL}catalogue/flamingo-product-catalogue.pdf`}
                    download="flamingo-product-catalogue.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setProductsOpen(false)}
                    className="group flex items-center justify-between rounded-xl border border-transparent p-3 transition-all hover:border-rose-300 hover:bg-[#fbd6e4]/70"
                    aria-label="Download Flamingo Product Catalogue PDF"
                    data-testid="link-dropdown-catalogue"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#321e2a] text-white shadow-sm">
                        <Download size={18} />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#321e2a] group-hover:text-[#d84f78]">
                          Download Catalogue ↓
                        </p>
                        <p className="text-[.68rem] font-medium text-[#996074]">
                          29 Syrups · 750 ml Professional Pack PDF
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-[#d84f78] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/about"
            data-testid="link-nav-the-story"
            className={`relative py-2 text-[.74rem] font-bold uppercase tracking-[.18em] transition-colors duration-200 hover:text-[#d84f78] ${
              location === '/about' ? 'text-[#d84f78]' : 'text-[#593b49]'
            }`}
          >
            The story
            {location === '/about' && <span className="absolute -bottom-1.5 left-0 h-[2px] w-full rounded-full bg-[#d84f78]" />}
          </Link>

          <Link
            href="/enquire"
            data-testid="link-nav-enquire"
            className={`relative py-2 text-[.74rem] font-bold uppercase tracking-[.18em] transition-colors duration-200 hover:text-[#d84f78] ${
              location === '/enquire' || location === '/contact' ? 'text-[#d84f78]' : 'text-[#593b49]'
            }`}
          >
            Enquire
            {(location === '/enquire' || location === '/contact') && <span className="absolute -bottom-1.5 left-0 h-[2px] w-full rounded-full bg-[#d84f78]" />}
          </Link>
        </nav>

        {/* CTA BUTTON */}
        <Link
          href="/enquire"
          className="hidden h-[44px] items-center gap-2 rounded-lg bg-[#321e2a] px-6 text-[.7rem] font-bold uppercase tracking-[.18em] text-[#ffeaf3] shadow-sm transition-all duration-300 hover:bg-[#d84f78] hover:shadow-md hover:-translate-y-0.5 md:flex"
          data-testid="link-header-enquire"
        >
          Enquire now <ArrowUpRight size={15} strokeWidth={2} />
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-rose-300 text-[#321e2a] transition-colors hover:border-[#d84f78] hover:bg-[#fbd6e4]/40 md:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
          data-testid="button-mobile-menu"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {open && (
        <nav id="mobile-navigation" className="border-t border-rose-200 bg-[#fff3f8] px-8 py-6 md:hidden shadow-lg" aria-label="Mobile navigation">
          <div className="page-shell flex flex-col space-y-2">
            <Link href="/" className="border-b border-rose-200/80 py-3.5 text-sm font-bold uppercase tracking-[.16em] text-[#593b49] hover:text-[#d84f78]">
              Home
            </Link>

            <Link href="/products" className="flex items-center justify-between border-b border-rose-200/80 py-3.5 text-sm font-bold uppercase tracking-[.16em] text-[#593b49] hover:text-[#d84f78]">
              <span>Products (Syrups)</span>
              <span className="rounded-full bg-[#d84f78] px-2.5 py-0.5 text-[.64rem] font-bold text-white shadow-sm">{syrupsList.length} Flavours</span>
            </Link>

            <Link href="/about" className="border-b border-rose-200/80 py-3.5 text-sm font-bold uppercase tracking-[.16em] text-[#593b49] hover:text-[#d84f78]">
              The story
            </Link>
            <Link href="/enquire" className="py-3.5 text-sm font-bold uppercase tracking-[.16em] text-[#593b49] hover:text-[#d84f78]">
              Enquire
            </Link>

            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/enquire"
                className="flex h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-[#321e2a] px-6 text-xs font-bold uppercase tracking-[.18em] text-[#ffeaf3] shadow-sm transition-all hover:bg-[#d84f78]"
                data-testid="link-mobile-enquire-now"
              >
                Enquire now <ArrowUpRight size={15} strokeWidth={2} />
              </Link>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Flamingo on Instagram"
                className="flex h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-rose-300/80 bg-white px-6 text-xs font-bold uppercase tracking-[.16em] text-[#321e2a]"
              >
                <Instagram size={16} className="text-[#d84f78]" /> Follow on Instagram
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export function FloatingSocials() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* FLOATING INSTAGRAM ROUND ICON BUTTON */}
      <a
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Flamingo on Instagram"
        data-testid="button-floating-instagram"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-[0_8px_22px_rgba(220,39,67,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_28px_rgba(220,39,67,0.6)] focus:outline-none focus:ring-2 focus:ring-[#dc2743] focus:ring-offset-2"
      >
        <Instagram size={22} className="transition-transform duration-300 group-hover:scale-110" />
      </a>

      {/* FLOATING WHATSAPP ROUND ICON BUTTON (NO TEXT, NO DOT) */}
      <a
        href={socialLinks.whatsappGeneralUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Flamingo on WhatsApp"
        data-testid="button-floating-whatsapp"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_22px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 hover:bg-[#20ba5a] hover:shadow-[0_12px_28px_rgba(37,211,102,0.6)] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      >
        <WhatsAppIcon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
      </a>
    </div>
  );
}

export const FloatingWhatsApp = FloatingSocials;

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-[#321e2a] text-[#ffeaf3]">
      <div className="page-shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 md:py-20">
        {/* BRAND COLUMN */}
        <div>
          <p className="eyebrow text-[#eaa0b7]">Flamingo</p>
          <h2 className="mt-4 max-w-sm font-display text-4xl leading-[.92] text-[#fff3f8] md:text-5xl">
            A little colour for the bar.
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-6 text-[#e6bfce]">
            {syrupsList.length} Exceptional Flavours. Endless Possibilities. Crafted in Bengaluru for professional mixology & craft beverages.
          </p>
        </div>

        {/* FOLLOW FLAMINGO SOCIAL COLUMN */}
        <div>
          <p className="eyebrow text-[#eaa0b7]">Follow Flamingo</p>
          <p className="mt-3 text-xs text-[#e6bfce]">
            Connect with us for menu inspiration & trade updates.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            {/* INSTAGRAM LINK */}
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Flamingo on Instagram"
              data-testid="link-footer-instagram"
              className="group inline-flex min-h-[44px] items-center gap-3 rounded-xl border border-rose-300/30 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#ffeaf3] transition-all duration-300 hover:border-[#d84f78] hover:bg-[#d84f78] hover:text-white"
            >
              <Instagram size={18} className="shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <span>Instagram</span>
              <ArrowUpRight size={14} className="ml-auto opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* WHATSAPP LINK */}
            <a
              href={socialLinks.whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Flamingo on WhatsApp"
              data-testid="link-footer-whatsapp"
              className="group inline-flex min-h-[44px] items-center gap-3 rounded-xl border border-rose-300/30 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#ffeaf3] transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
            >
              <WhatsAppIcon className="h-4.5 w-4.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <span>WhatsApp</span>
              <ArrowUpRight size={14} className="ml-auto opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* EXPLORE LINKS */}
        <div>
          <p className="eyebrow text-[#eaa0b7]">Explore</p>
          <div className="mt-5 flex flex-col items-start gap-3 text-sm text-[#ffeaf3]">
            <Link href="/" className="hover:text-[#eaa0b7] transition-colors" data-testid="link-footer-home">Home</Link>
            <Link href="/products" className="hover:text-[#eaa0b7] transition-colors" data-testid="link-footer-products">Syrups</Link>
            <Link href="/about" className="hover:text-[#eaa0b7] transition-colors" data-testid="link-footer-about">The story</Link>
            <Link href="/enquire" className="hover:text-[#eaa0b7] transition-colors" data-testid="link-footer-contact">Enquire</Link>
          </div>
        </div>

        {/* CONTACT DETAILS */}
        <div>
          <p className="eyebrow text-[#eaa0b7]">Contact</p>
          <div className="mt-5 space-y-3 text-sm leading-6 text-[#ffeaf3]">
            <a href={`mailto:${brand.email}`} className="block break-all hover:text-[#eaa0b7] transition-colors" data-testid="link-footer-email">{brand.email}</a>
            <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="block hover:text-[#eaa0b7] transition-colors" data-testid="link-footer-phone">{brand.phone}</a>
            <p className="text-[#e6bfce]">{brand.address}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#6b4353]">
        <div className="page-shell flex flex-col gap-3 py-5 text-[.66rem] uppercase tracking-[.15em] text-[#c997a9] sm:flex-row sm:items-center sm:justify-between">
          <span>Flamingo · Bengaluru</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors" data-testid="link-footer-privacy">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white transition-colors" data-testid="link-footer-terms">Terms of Service</Link>
          </div>
          <span>{syrupsList.length} Exceptional Flavours</span>
        </div>
      </div>
    </footer>
  );
}

export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="site-noise min-h-[100dvh] overflow-x-hidden bg-[#ffeaf3] text-[#321e2a]">
      {children}
      <FloatingSocials />
    </div>
  );
}