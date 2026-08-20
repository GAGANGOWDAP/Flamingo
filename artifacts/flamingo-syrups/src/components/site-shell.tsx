import { useEffect, useState, type ReactNode } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import logoPath from '@assets/2.jpg_1787233517766.jpeg';
import { brand } from '@/data/site-data';

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'The story' },
  { href: '/contact', label: 'Enquire' },
];

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

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-30 border-b border-rose-200/70 bg-[#fff3f8]/90 backdrop-blur-md">
      <div className="page-shell flex h-[76px] items-center justify-between">
        <Link href="/" className="group flex items-center gap-3" data-testid="link-logo">
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden border border-rose-200 bg-[#fffdfc]">
            <img src={logoPath} alt="Flamingo logo: a pink flamingo in a cocktail glass" className="h-full w-full object-contain" />
          </span>
          <span className="hidden font-display text-[1.35rem] font-semibold tracking-[.03em] text-[#321e2a] sm:block">
            {brand.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              className={`relative py-2 text-[.72rem] font-semibold uppercase tracking-[.16em] transition-colors hover:text-[#d84f78] ${location === link.href ? 'text-[#d84f78]' : 'text-[#593b49]'}`}
            >
              {link.label}
              {location === link.href && <span className="absolute -bottom-1 left-0 h-px w-full bg-[#d84f78]" />}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="ink-button hidden items-center gap-2 px-4 py-3 text-[.68rem] font-bold uppercase tracking-[.17em] transition-all hover:-translate-y-0.5 md:flex" data-testid="link-header-enquire">
          Start a conversation <ArrowUpRight size={14} strokeWidth={1.8} />
        </Link>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center border border-rose-300 text-[#321e2a] md:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
          data-testid="button-mobile-menu"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <nav id="mobile-navigation" className="border-t border-rose-200 bg-[#fff3f8] px-8 py-5 md:hidden" aria-label="Mobile navigation">
          <div className="page-shell flex flex-col">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="border-b border-rose-200/80 py-4 text-sm font-semibold uppercase tracking-[.14em] text-[#593b49]" data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s/g, '-')}`}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-[#321e2a] text-[#ffeaf3]">
      <div className="page-shell grid gap-12 py-16 md:grid-cols-[1.1fr_.8fr_.8fr] md:py-20">
        <div>
          <p className="eyebrow text-[#eaa0b7]">Flamingo</p>
          <h2 className="mt-4 max-w-sm font-display text-5xl leading-[.92] text-[#fff3f8] md:text-6xl">A little colour for the bar.</h2>
          <p className="mt-6 max-w-xs text-sm leading-6 text-[#e6bfce]">A new syrup collection is taking shape in Bengaluru. Product details will follow when they are ready to be shared.</p>
        </div>
        <div>
          <p className="eyebrow text-[#eaa0b7]">Explore</p>
          <div className="mt-5 flex flex-col items-start gap-3 text-sm text-[#ffeaf3]">
            <Link href="/" className="hover:text-[#eaa0b7]" data-testid="link-footer-home">Home</Link>
            <Link href="/products" className="hover:text-[#eaa0b7]" data-testid="link-footer-products">Products</Link>
            <Link href="/about" className="hover:text-[#eaa0b7]" data-testid="link-footer-about">The story</Link>
            <Link href="/contact" className="hover:text-[#eaa0b7]" data-testid="link-footer-contact">Enquire</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow text-[#eaa0b7]">Contact</p>
          <div className="mt-5 space-y-3 text-sm leading-6 text-[#ffeaf3]">
            <a href={`mailto:${brand.email}`} className="block break-all hover:text-[#eaa0b7]" data-testid="link-footer-email">{brand.email}</a>
            <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="block hover:text-[#eaa0b7]" data-testid="link-footer-phone">{brand.phone}</a>
            <p className="text-[#e6bfce]">{brand.address}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-[#6b4353]">
        <div className="page-shell flex flex-col gap-2 py-5 text-[.66rem] uppercase tracking-[.15em] text-[#c997a9] sm:flex-row sm:items-center sm:justify-between">
          <span>Flamingo · Bengaluru</span>
          <span>Collection in preparation</span>
        </div>
      </div>
    </footer>
  );
}

export function PageFrame({ children }: { children: ReactNode }) {
  return <div className="site-noise min-h-[100dvh] overflow-x-hidden bg-[#ffeaf3] text-[#321e2a]">{children}</div>;
}