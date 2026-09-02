import { type ReactNode } from 'react';
import { type Variants } from 'framer-motion';

export function SectionKicker({ children }: { children: ReactNode }) {
  return <p className="eyebrow text-[#b63d65]">{children}</p>;
}

export function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.197 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.72 0-3.414-.46-4.9-1.332l-.352-.208-3.646.956.973-3.554-.229-.364c-.958-1.524-1.464-3.287-1.464-5.097 0-5.226 4.253-9.479 9.479-9.479 2.531 0 4.91.986 6.7 2.776 1.791 1.79 2.776 4.168 2.776 6.701 0 5.227-4.252 9.481-9.479 9.481m0-20.731C6.275 1.112.72 6.667.72 13.512c0 2.186.57 4.322 1.654 6.202L.05 25.048l5.518-1.448c1.815 1 3.882 1.527 5.98 1.527 5.753 0 10.559-4.706 10.559-10.559 0-2.822-1.099-5.474-3.094-7.469-1.996-1.995-4.648-3.094-7.47-3.094" />
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
