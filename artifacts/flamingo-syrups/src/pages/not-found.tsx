import { useEffect } from 'react';
import { Link } from 'wouter';
import { Wine, ArrowRight } from 'lucide-react';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 Flavour Not Found | Flamingo';
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');
  }, []);

  return (
    <div className="page-shell flex min-h-[65dvh] flex-col items-center justify-center py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d84f78] text-white shadow-md">
        <Wine size={32} />
      </div>
      <p className="eyebrow mt-6 text-[#b63d65]">404 ERROR</p>
      <h1 className="mt-2 font-display text-5xl font-semibold text-[#321e2a] md:text-6xl">
        FLAVOUR NOT FOUND
      </h1>
      <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-[#684454]">
        The syrup flavour you're looking for could not be found or may have been moved.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <Link
          href="/products"
          className="ink-button inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-[.16em] transition-transform hover:-translate-y-0.5"
          data-testid="button-404-explore-all"
        >
          Explore All 29 Flavours <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
