import { type ReactNode } from 'react';
import { type Variants } from 'framer-motion';

export function SectionKicker({ children }: { children: ReactNode }) {
  return <p className="eyebrow text-[#b63d65]">{children}</p>;
}

export function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.486 1.332 5.001L2 22l5.127-1.343c1.464.799 3.111 1.22 4.88 1.22h.005c5.505 0 9.989-4.478 9.99-9.984A9.923 9.923 0 0019.08 5.1 9.926 9.926 0 0012.012 2zm.005 18.318h-.004a8.28 8.28 0 01-4.225-1.162l-.303-.18-3.14.823.837-3.061-.198-.315a8.277 8.277 0 01-1.267-4.437c.001-4.577 3.729-8.303 8.307-8.303 2.217 0 4.301.864 5.868 2.433 1.567 1.569 2.429 3.655 2.428 5.873-.001 4.578-3.728 8.304-8.303 8.304zm4.555-6.223c-.25-.125-1.478-.729-1.707-.812-.229-.083-.396-.125-.562.125-.167.25-.646.812-.792.979-.146.167-.292.188-.542.063-.25-.125-1.056-.39-2.012-1.242-.744-.663-1.246-1.482-1.392-1.732-.146-.25-.015-.385.11-.509.112-.112.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.021-.438-.063-.125-.562-1.354-.771-1.854-.204-.488-.412-.422-.562-.43-.146-.008-.313-.008-.479-.008s-.438.063-.667.313c-.229.25-.875.854-.875 2.083 0 1.229.896 2.417 1.021 2.583.125.167 1.764 2.694 4.274 3.778.597.257 1.063.411 1.426.527.599.19 1.144.163 1.575.099.481-.072 1.478-.604 1.687-1.188.208-.583.208-1.083.146-1.188-.063-.105-.229-.167-.479-.292z" />
    </svg>
  );
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
