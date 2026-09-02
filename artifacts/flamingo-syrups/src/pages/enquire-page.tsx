import { useState, useEffect, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "wouter";
import { brand, syrupsList, socialLinks } from "@/data/site-data";
import { updatePageSEO } from "@/lib/seo";
import { SectionKicker } from "@/components/common-ui";

type EnquireFormState = {
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  businessType: string;
  product: string;
  quantity: string;
  message: string;
};

type EnquireFormErrors = Partial<Record<keyof EnquireFormState, string>>;

export function EnquirePage() {
  const [form, setForm] = useState<EnquireFormState>({
    name: "",
    company: "",
    phone: "",
    email: "",
    city: "",
    businessType: "Restaurant",
    product: "",
    quantity: "1–5 bottles",
    message: "",
  });

  const [errors, setErrors] = useState<EnquireFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let initialProduct = "";
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const productParam = params.get("product") || params.get("syrup");
      if (productParam) {
        const match = syrupsList.find(
          (s) =>
            s.id === productParam ||
            s.name.toLowerCase().includes(productParam.toLowerCase()),
        );
        if (match) initialProduct = match.id;
      }
    }

    if (initialProduct) {
      setForm((prev) => ({ ...prev, product: initialProduct }));
    }

    updatePageSEO({
      title: "Enquire | Flamingo Premium Syrups",
      description:
        "Get in touch with Flamingo for syrup enquiries, professional 750ml packs and B2B beverage requirements.",
      canonicalUrl: "https://gagangowdap.github.io/Flamingo/enquire",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Flamingo B2B Product Enquiry",
          url: "https://gagangowdap.github.io/Flamingo/enquire",
        },
      ],
    });
  }, []);

  function updateField(field: keyof EnquireFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  function validate() {
    const next: EnquireFormErrors = {};
    if (!form.name.trim()) next.name = "Please enter your full name.";
    if (!form.phone.trim() || form.phone.trim().length < 8)
      next.phone = "Please enter a valid phone number.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email address.";
    if (!form.businessType)
      next.businessType = "Please select your business type.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  }

  const selectedSyrupObj = syrupsList.find((s) => s.id === form.product);
  const whatsappUrl = selectedSyrupObj
    ? socialLinks.getProductWhatsappUrl(selectedSyrupObj.name)
    : socialLinks.whatsappGeneralUrl;

  return (
    <main>
      {/* SECTION: HERO SECTION */}
      <section className="border-b border-rose-300/70 bg-[#f9d7e4]">
        <div className="page-shell grid gap-8 py-16 md:grid-cols-[1.1fr_.9fr] md:py-24">
          <div>
            <SectionKicker>B2B & Trade Enquiries</SectionKicker>
            <h1 className="mt-3 font-display text-[clamp(42px,5.5vw,72px)] font-normal uppercase tracking-[-.02em] text-[#321e2a] leading-[.92]">
              LET’S TALK.
              <br />
              <span className="block mt-1.5 font-display italic font-normal tracking-tight text-[#d84f78] text-[clamp(28px,3.5vw,48px)] leading-[.95]">
                Built for Beverage Professionals.
              </span>
            </h1>
          </div>
          <p className="max-w-[480px] self-end font-sans text-[15px] md:text-[17px] font-normal leading-[1.62] text-[#684454]">
            Whether you're a luxury hotel, craft cocktail bar, restaurant, café,
            mixologist, or distributor, talk to the Flamingo team about your
            syrup requirements.
          </p>
        </div>
      </section>

      {/* SECTION 2: ENQUIRY CONTENT (CONTACT INFO + B2B FORM) */}
      <section className="page-shell py-16 md:py-24">
        <div className="grid gap-16 lg:grid-cols-[.9fr_1.1fr]">
          {/* LEFT COLUMN: DIRECT CONTACT & TRADE DETAILS */}
          <div className="space-y-10">
            <div>
              <SectionKicker>Built for Hospitality</SectionKicker>
              <h2 className="mt-3 font-display text-4xl font-semibold text-[#321e2a] md:text-5xl">
                A Working Partner for the Bar
              </h2>
              <p className="mt-4 text-base leading-7 text-[#684454]">
                Flamingo is engineered specifically for high-volume hospitality,
                luxury hotels, craft cocktail bars, and specialty beverage
                menus. All 29 syrup flavours are delivered in standardized 750
                ml speed-pour bottles.
              </p>
            </div>

            {/* DIRECT TRADE LINE CARD */}
            <div className="rounded-2xl border border-rose-300/80 bg-[#fff3f8] p-8 shadow-sm space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#b63d65]">
                Direct Trade Line:
              </h3>
              <div className="space-y-4 text-sm font-semibold text-[#321e2a]">
                <a
                  href={`mailto:${brand.email}`}
                  className="flex items-center gap-3 hover:text-[#d84f78] transition-colors"
                  data-testid="link-enquire-email"
                >
                  <Mail size={18} className="text-[#d84f78]" />
                  <span>{brand.email}</span>
                </a>
                <a
                  href={`tel:${brand.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 hover:text-[#d84f78] transition-colors"
                  data-testid="link-enquire-phone"
                >
                  <Phone size={18} className="text-[#d84f78]" />
                  <span>{brand.phone} (Call / WhatsApp)</span>
                </a>
                <div className="flex items-start gap-3 text-[#684454]">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-[#d84f78]"
                  />
                  <span>{brand.address}</span>
                </div>
              </div>

              <div className="border-t border-rose-200/80 pt-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#b63d65]">
                  Master Mixologist & Creator:
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-[#321e2a]">
                  {brand.creator}
                </p>
              </div>
            </div>

            {/* INSTANT WHATSAPP CONSULTATION CARD */}
            <div className="rounded-2xl border-2 border-rose-300 bg-white p-6 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#321e2a]">
                Instant Bar Consultation:
              </h3>
              <p className="text-xs leading-5 text-[#684454]">
                Need immediate sample specs or bar menu recommendations? Message
                our team directly on WhatsApp.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-button inline-flex w-full items-center justify-center gap-2.5 rounded-xl py-3.5 text-xs font-bold uppercase tracking-[.16em]"
                data-testid="button-whatsapp-direct"
              >
                Enquire on WhatsApp <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: B2B ENQUIRY FORM / SUCCESS SCREEN */}
          <div className="rounded-3xl border-2 border-rose-300 bg-[#fff3f8] p-8 md:p-12 shadow-lg">
            {submitted ? (
              <div className="flex min-h-[480px] flex-col items-center justify-center text-center space-y-6">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d84f78] text-white shadow-md">
                  <Check size={32} />
                </span>
                <p className="eyebrow text-[#b63d65]">THANK YOU</p>
                <h3 className="font-display text-5xl font-semibold text-[#321e2a] md:text-6xl">
                  Enquiry Received
                </h3>
                <p className="max-w-md font-sans text-base text-[#684454] leading-relaxed">
                  Thank you for reaching out to Flamingo. Our beverage team will
                  review your requirements and get back to you shortly.
                </p>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/products"
                    className="ink-button inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-xs font-bold uppercase tracking-[.16em]"
                    data-testid="button-continue-exploring"
                  >
                    Continue Exploring Flavours <ArrowRight size={16} />
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-rose-300 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-[.16em] text-[#b63d65] transition-colors hover:border-[#d84f78]"
                    data-testid="button-whatsapp-after-submit"
                  >
                    Open WhatsApp Chat <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="border-b border-rose-300/80 pb-4">
                  <h3 className="font-display text-3xl font-semibold text-[#321e2a]">
                    B2B Product Enquiry Form
                  </h3>
                  <p className="mt-1 text-xs text-[#684454]">
                    Fill out your requirements below and our trade team will get
                    in touch.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* FULL NAME */}
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#593b49]">
                    Full Name <span className="text-[#d84f78]">*</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="e.g. Master Mixologist / Manager"
                      className="mt-2 w-full rounded-xl border border-rose-300/80 bg-white p-3.5 text-sm font-semibold text-[#321e2a] outline-none transition-colors focus:border-[#d84f78]"
                      data-testid="input-enquire-name"
                    />
                    {errors.name && (
                      <span className="mt-1.5 block text-xs font-normal text-[#b63d65]">
                        {errors.name}
                      </span>
                    )}
                  </label>

                  {/* COMPANY / BUSINESS NAME */}
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#593b49]">
                    Company / Business Name
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => updateField("company", e.target.value)}
                      placeholder="e.g. The Grand Hotel / Bar Lounge"
                      className="mt-2 w-full rounded-xl border border-rose-300/80 bg-white p-3.5 text-sm font-semibold text-[#321e2a] outline-none transition-colors focus:border-[#d84f78]"
                      data-testid="input-enquire-company"
                    />
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* PHONE NUMBER */}
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#593b49]">
                    Phone Number <span className="text-[#d84f78]">*</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+91 ..."
                      className="mt-2 w-full rounded-xl border border-rose-300/80 bg-white p-3.5 text-sm font-semibold text-[#321e2a] outline-none transition-colors focus:border-[#d84f78]"
                      data-testid="input-enquire-phone"
                    />
                    {errors.phone && (
                      <span className="mt-1.5 block text-xs font-normal text-[#b63d65]">
                        {errors.phone}
                      </span>
                    )}
                  </label>

                  {/* EMAIL ADDRESS */}
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#593b49]">
                    Email Address <span className="text-[#d84f78]">*</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="you@barstudio.com"
                      className="mt-2 w-full rounded-xl border border-rose-300/80 bg-white p-3.5 text-sm font-semibold text-[#321e2a] outline-none transition-colors focus:border-[#d84f78]"
                      data-testid="input-enquire-email"
                    />
                    {errors.email && (
                      <span className="mt-1.5 block text-xs font-normal text-[#b63d65]">
                        {errors.email}
                      </span>
                    )}
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* CITY / LOCATION */}
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#593b49]">
                    City / Location
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="e.g. Bengaluru, Mumbai, Delhi"
                      className="mt-2 w-full rounded-xl border border-rose-300/80 bg-white p-3.5 text-sm font-semibold text-[#321e2a] outline-none transition-colors focus:border-[#d84f78]"
                      data-testid="input-enquire-city"
                    />
                  </label>

                  {/* BUSINESS TYPE */}
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#593b49]">
                    Business Type <span className="text-[#d84f78]">*</span>
                    <select
                      value={form.businessType}
                      onChange={(e) =>
                        updateField("businessType", e.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-rose-300/80 bg-white p-3.5 text-sm font-semibold text-[#321e2a] outline-none transition-colors focus:border-[#d84f78] cursor-pointer"
                      data-testid="select-enquire-businesstype"
                    >
                      <option value="Restaurant">Restaurant</option>
                      <option value="Hotel">Hotel</option>
                      <option value="Bar">Bar / Cocktail Lounge</option>
                      <option value="Café">Café</option>
                      <option value="Catering">Catering / Events</option>
                      <option value="Distributor">
                        Distributor / Beverage Wholesale
                      </option>
                      <option value="Retailer">Retailer</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* INTERESTED PRODUCT */}
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#593b49]">
                    Interested Product
                    <select
                      value={form.product}
                      onChange={(e) => updateField("product", e.target.value)}
                      className="mt-2 w-full rounded-xl border border-rose-300/80 bg-white p-3.5 text-sm font-semibold text-[#321e2a] outline-none transition-colors focus:border-[#d84f78] cursor-pointer"
                      data-testid="select-enquire-product"
                    >
                      <option value="">Select a flavour (Optional)...</option>
                      {syrupsList.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.category})
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* QUANTITY REQUIRED */}
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#593b49]">
                    Quantity Required
                    <select
                      value={form.quantity}
                      onChange={(e) => updateField("quantity", e.target.value)}
                      className="mt-2 w-full rounded-xl border border-rose-300/80 bg-white p-3.5 text-sm font-semibold text-[#321e2a] outline-none transition-colors focus:border-[#d84f78] cursor-pointer"
                      data-testid="select-enquire-quantity"
                    >
                      <option value="1–5 bottles">
                        1–5 bottles (Sample / Trial)
                      </option>
                      <option value="6–20 bottles">
                        6–20 bottles (Standard Bar Order)
                      </option>
                      <option value="21–50 bottles">
                        21–50 bottles (High-Volume Supply)
                      </option>
                      <option value="50+ bottles">
                        50+ bottles (Bulk / Distribution)
                      </option>
                    </select>
                  </label>
                </div>

                {/* MESSAGE */}
                <label className="block text-xs font-bold uppercase tracking-wider text-[#593b49]">
                  Message / Brief
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    placeholder="Tell us what you're looking for (e.g. sample requests, beverage menu requirements, distribution inquiry)..."
                    className="mt-2 w-full rounded-xl border border-rose-300/80 bg-white p-4 text-sm font-normal text-[#321e2a] outline-none transition-colors focus:border-[#d84f78]"
                    data-testid="input-enquire-message"
                  />
                </label>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="ink-button flex w-full items-center justify-center gap-3 py-4 text-xs font-bold uppercase tracking-[.18em]"
                  data-testid="button-submit-enquiry"
                >
                  Send B2B Enquiry <ArrowRight size={16} />
                </button>

                {/* PRIVACY NOTE */}
                <p className="text-[.68rem] text-center text-[#684454]">
                  By submitting this form, you agree to be contacted regarding
                  your enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export const ContactPage = EnquirePage;
