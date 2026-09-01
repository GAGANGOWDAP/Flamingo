import { type ReactNode } from 'react';
import { type Variants } from 'framer-motion';

export function SectionKicker({ children }: { children: ReactNode }) {
  return <p className="eyebrow text-[#b63d65]">{children}</p>;
}

export function FlamingoMark({ compact = false }: { compact?: boolean }) {
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

export function Marquee() {
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

export const cardContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
    },
  },
};

export const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};
