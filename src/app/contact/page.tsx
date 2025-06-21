import ContactForm from '@/components/ContactForm';
import type { Metadata } from 'next';
import Link from 'next/link'; // Import Link if not already there

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Innovation and Entrepreneurship Development Center at IEM Salt Lake.',
};

interface SocialLink {
  name: string;
  url: string;
  icon?: string; // e.g., 'linkedin', 'facebook' - for mapping to an icon component later
}

interface ContactInfo {
  addressL1: string;
  addressL2: string;
  cityStatePin: string;
  email: string;
  phone?: string;
  googleMapsEmbedUrl?: string;
  socialLinks?: SocialLink[];
}

interface SiteConfigResponse {
  configKey: string;
  configValue: ContactInfo;
}

const defaultContactDetails: ContactInfo = {
  addressL1: 'Institute of Engineering & Management (IEM)',
  addressL2: 'Salt Lake Electronics Complex, Sector V', // Default if API fails
  cityStatePin: 'Kolkata, West Bengal 700091',
  email: 'iedc.iem@iem.edu.in', // Fallback email
  phone: 'N/A',
  googleMapsEmbedUrl: '',
  socialLinks: [],
};

async function getContactInformation(): Promise<ContactInfo> {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const apiUrl = `${appUrl}/api/site-config/contact_information`;

    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Revalidate data every hour
    });

    if (!response.ok) {
      let errorDetails = "Unknown error";
      try {
        const errorData = await response.json();
        errorDetails = errorData.message || JSON.stringify(errorData);
      } catch (e) {
        errorDetails = response.statusText;
      }
      console.error(`Failed to fetch contact information from API (${apiUrl}): ${response.status} - ${errorDetails}`);
      return defaultContactDetails; // Return default on error
    }

    const data: SiteConfigResponse = await response.json();

    if (data.configValue && typeof data.configValue.email === 'string') { // Basic check
      return { ...defaultContactDetails, ...data.configValue }; // Merge with defaults to ensure all keys exist
    } else {
      console.error("Contact information is missing or not in the expected format from API:", data);
      return defaultContactDetails; // Return default on format error
    }

  } catch (error) {
    console.error('Error fetching contact information:', error);
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
        console.error(`Network error: Could not connect to the API to load contact information. Attempted URL: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/site-config/contact_information`);
    }
    return defaultContactDetails; // Return default on any other error
  }
}


export default async function ContactPage() {
  const contactDetails = await getContactInformation();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700">Contact Us</h1>
        <p className="text-lg text-slate-600 mt-2">We'd love to hear from you. Reach out with your queries or ideas.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        {/* Left Column: Contact Info & Map */}
        <div className="space-y-8">
          <section className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Our Address</h2>
            <address className="not-italic text-slate-700 space-y-1">
              <p>{contactDetails.addressL1}</p>
              <p>{contactDetails.addressL2}</p>
              <p>{contactDetails.cityStatePin}</p>
            </address>
            <div className="mt-4 space-y-1">
              <p className="text-slate-700">
                <strong>Email:</strong> <a href={`mailto:${contactDetails.email}`} className="text-blue-600 hover:text-blue-800">{contactDetails.email}</a>
              </p>
              {contactDetails.phone && contactDetails.phone !== 'N/A' && (
                <p className="text-slate-700">
                  <strong>Phone:</strong> <a href={`tel:${contactDetails.phone}`} className="text-blue-600 hover:text-blue-800">{contactDetails.phone}</a>
                </p>
              )}
            </div>
            {contactDetails.socialLinks && contactDetails.socialLinks.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-medium text-slate-800 mb-2">Follow Us:</h3>
                    <div className="flex space-x-4">
                        {contactDetails.socialLinks.map(link => (
                            <a
                              key={link.name}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-600 hover:text-orange-500 transition-colors"
                              aria-label={`Follow us on ${link.name}`}
                            >
                                {/* Placeholder for actual icon component e.g. <Icon name={link.icon} /> */}
                                <span className="text-sm font-medium">{link.name}</span>
                                {/* Add SVG or Font Icon here if available */}
                            </a>
                        ))}
                    </div>
                </div>
            )}
          </section>

          <section className="bg-white shadow-lg rounded-lg overflow-hidden">
            <h2 className="text-2xl font-semibold text-orange-600 p-6 pb-0">Find Us On Map</h2>
            <div className="w-full h-72 md:h-96 bg-slate-200 flex items-center justify-center text-slate-500">
              {contactDetails.googleMapsEmbedUrl ? (
                <iframe
                  src={contactDetails.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border:0 }}
                  allowFullScreen={false} // Use boolean false
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Google Maps Location of ${contactDetails.addressL1}`}
                ></iframe>
              ) : (
                <p>Google Map embed will appear here if configured.</p>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Contact Form */}
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
