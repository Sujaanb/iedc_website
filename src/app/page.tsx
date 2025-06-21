import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home', // Will be combined with template in layout.tsx
  description: 'Welcome to the Innovation and Entrepreneurship Development Center (IEDC) at IEM Salt Lake. Discover our vision, mission, startups, and more.',
};

// Placeholder for actual logo paths
// const iedcLogoPath = '/logos/iedc-logo.png'; // Replace with actual path
// const iemLogoPath = '/logos/iem-logo.png';   // Replace with actual path

interface QuickLink {
  href: string;
  label: string;
  description: string;
}

interface InceptionDateConfigValue {
  date: string;
}
interface SiteConfigResponseInception {
  configKey: string;
  configValue: InceptionDateConfigValue;
}

async function getInceptionDate(): Promise<string> {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${appUrl}/api/site-config/iedc_inception_date`, {
      next: { revalidate: 3600 * 24 }, // Revalidate daily
    });
    if (!response.ok) return "2014"; // Fallback
    const data: SiteConfigResponseInception = await response.json();
    return data.configValue?.date || "2014";
  } catch (error) {
    console.error("Failed to fetch inception date:", error);
    return "2014"; // Fallback
  }
}

const quickLinks: QuickLink[] = [
  { href: '/about/vision', label: 'Our Vision', description: 'See the future we are building.' },
  { href: '/about/mission', label: 'Our Mission', description: 'Understand our core objectives.' },
  { href: '/team', label: 'Meet the Team', description: 'Connect with our coordinators.' },
  { href: '/startups', label: 'Supported Startups', description: 'Discover ventures we foster.' },
  { href: '/gallery', label: 'Gallery', description: 'View moments from our events.' },
  { href: '/contact', label: 'Contact Us', description: 'Get in touch with the IEDC.' },
];

export default async function HomePage() {
  const inceptionDate = await getInceptionDate();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            {/*
              Actual Image components should replace these divs once logo files are added to /public/logos/
              Example:
              <Image src="/logos/iem-logo-white-bg.png" alt="IEM Logo" width={120} height={120} className="h-20 w-20 md:h-24 md:w-24 object-contain" />
              <Image src="/logos/iedc-logo-color.png" alt="IEDC Logo" width={150} height={150} className="h-24 w-24 md:h-28 md:w-28 object-contain" />
            */}
            <div className="w-24 h-24 md:w-28 md:h-28 bg-white/30 rounded-lg flex items-center justify-center p-2 shadow-md">
              <span className="text-sm text-center text-blue-900 font-semibold">IEM Logo</span>
              {/* <Image src={iemLogoPath} alt="IEM Logo" width={100} height={100} className="object-contain" /> */}
            </div>
            <div className="w-28 h-28 md:w-32 md:h-32 bg-white/30 rounded-lg flex items-center justify-center p-2 shadow-md">
              <span className="text-sm text-center text-blue-900 font-semibold">IEDC Logo</span>
              {/* <Image src={iedcLogoPath} alt="IEDC Logo" width={120} height={120} className="object-contain" /> */}
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Innovation & Entrepreneurship Development Center
          </h1>
          <p className="text-xl md:text-2xl mb-2 text-blue-200">
            IEM Salt Lake, Kolkata
          </p>
          <p className="text-lg text-orange-400 font-semibold">
            Fostering Innovation Since {inceptionDate}
          </p>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-blue-700 mb-12">
            Explore IEDC IEM
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow hover:border-orange-500 border-2 border-transparent"
              >
                <h3 className="text-xl font-semibold text-orange-600 mb-2">{link.label}</h3>
                <p className="text-gray-600 text-sm">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Optional: Call to Action or Brief About Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-blue-700 mb-6">Join Our Ecosystem</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Whether you are a student with a groundbreaking idea, an aspiring entrepreneur, or an industry expert,
            IEDC IEM provides the platform to innovate, collaborate, and grow.
          </p>
          <Link
            href="/contact"
            className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-md hover:bg-orange-600 transition-colors text-lg"
          >
            Get Involved
          </Link>
        </div>
      </section>
    </>
  );
}
