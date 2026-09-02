import { useEffect } from 'react';
import { updatePageSEO } from '@/lib/seo';
import { SectionKicker } from '@/components/common-ui';
import { brand } from '@/data/site-data';

export function PrivacyPage() {
  useEffect(() => {
    updatePageSEO({
      title: 'Privacy Policy | Flamingo Premium Syrups',
      description: 'Privacy Policy for Flamingo Premium Syrups website and B2B trade enquiry services.',
      canonicalUrl: 'https://gagangowdap.github.io/Flamingo/privacy',
    });
  }, []);

  return (
    <main className="page-shell py-16 md:py-24">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <SectionKicker>Legal & Trust</SectionKicker>
          <h1 className="mt-3 font-display text-4xl font-semibold text-[#321e2a] md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[#996074]">
            Last Updated: 2026
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-[#684454]">
          <p>
            At {brand.name}, we value your privacy. This policy outlines how we handle information submitted through our website and B2B trade enquiry form.
          </p>

          <h2 className="font-display text-2xl font-semibold text-[#321e2a]">1. Information We Collect</h2>
          <p>
            When you submit a B2B enquiry, we collect details necessary to respond to your request, including your name, company name, phone number, email address, city, and beverage menu requirements.
          </p>

          <h2 className="font-display text-2xl font-semibold text-[#321e2a]">2. How We Use Your Information</h2>
          <p>
            Your details are used exclusively to process your syrup enquiries, provide trade product specifications, arrange sample packs, and communicate regarding business supply.
          </p>

          <h2 className="font-display text-2xl font-semibold text-[#321e2a]">3. Data Security & Sharing</h2>
          <p>
            We do not sell, rent, or trade your personal or business contact details with third-party advertisers. All contact information is handled securely for direct trade communication.
          </p>

          <h2 className="font-display text-2xl font-semibold text-[#321e2a]">4. Contact Us</h2>
          <p>
            For privacy questions or data updates, contact us at{' '}
            <a href={`mailto:${brand.email}`} className="font-bold text-[#d84f78] underline">
              {brand.email}
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
}

export function TermsPage() {
  useEffect(() => {
    updatePageSEO({
      title: 'Terms of Service | Flamingo Premium Syrups',
      description: 'Terms of Service for Flamingo Premium Syrups website.',
      canonicalUrl: 'https://gagangowdap.github.io/Flamingo/terms',
    });
  }, []);

  return (
    <main className="page-shell py-16 md:py-24">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <SectionKicker>Legal & Trust</SectionKicker>
          <h1 className="mt-3 font-display text-4xl font-semibold text-[#321e2a] md:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[#996074]">
            Last Updated: 2026
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-[#684454]">
          <p>
            Welcome to {brand.name}. By accessing or using this website, you agree to comply with these terms.
          </p>

          <h2 className="font-display text-2xl font-semibold text-[#321e2a]">1. B2B & Trade Information</h2>
          <p>
            This website presents the Flamingo 29 syrup catalogue for hotels, bars, restaurants, cafés, and beverage managers. Product descriptions, specifications, and recipe suggestions are provided for professional informational and enquiry purposes.
          </p>

          <h2 className="font-display text-2xl font-semibold text-[#321e2a]">2. Intellectual Property</h2>
          <p>
            All content, brand design, visual artwork, product images, and trademarks belong to {brand.name}. Unauthorized reproduction or commercial distribution without written consent is prohibited.
          </p>

          <h2 className="font-display text-2xl font-semibold text-[#321e2a]">3. Contact & Enquiries</h2>
          <p>
            For trade terms or supply inquiries, reach out directly at{' '}
            <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="font-bold text-[#d84f78] underline">
              {brand.phone}
            </a>{' '}
            or email{' '}
            <a href={`mailto:${brand.email}`} className="font-bold text-[#d84f78] underline">
              {brand.email}
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
}
