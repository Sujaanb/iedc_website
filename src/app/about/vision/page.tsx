import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Vision',
  description: 'The vision of the Innovation and Entrepreneurship Development Center at IEM Salt Lake.',
};

// Define a type for the expected structure of configValue for vision_statement
interface VisionConfigValue {
  text: string;
}

interface SiteConfigResponse {
  configKey: string;
  configValue: VisionConfigValue; // Use the specific type here
}

async function getVisionStatement(): Promise<string> {
  try {
    // It's crucial to use an absolute URL for server-side fetch in Next.js App Router
    // This should be set in your environment variables.
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    if (!appUrl) {
        console.warn("NEXT_PUBLIC_APP_URL is not set. Falling back to http://localhost:3000 for API calls.");
    }
    const apiUrl = `${appUrl}/api/site-config/vision_statement`;

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
      console.error(`Failed to fetch vision statement from API (${apiUrl}): ${response.status} - ${errorDetails}`);
      return "Our vision statement is currently unavailable. Please check back later.";
    }

    const data: SiteConfigResponse = await response.json();

    if (typeof data.configValue?.text === 'string') {
      return data.configValue.text;
    } else {
      console.error("Vision statement content is missing or not in the expected format from API:", data);
      return "Vision statement content is improperly formatted. Please contact support.";
    }

  } catch (error) {
    console.error('Error fetching vision statement:', error);
    // Check if it's a fetch error (e.g., network issue)
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
        return `Network error: Could not connect to the API to load the vision statement. Please ensure the server is running and accessible. Attempted URL: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/site-config/vision_statement`;
    }
    return "There was an issue loading our vision statement. Please try again soon.";
  }
}

export default async function VisionPage() {
  const visionStatementText = await getVisionStatement();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700">Our Vision</h1>
        <p className="text-lg text-slate-600 mt-2">Guiding our journey towards an innovative future.</p>
      </header>

      <section className="bg-white p-8 md:p-12 shadow-xl rounded-lg border-l-4 border-orange-500 min-h-[200px] flex items-center justify-center">
        {visionStatementText.includes("unavailable") ||
         visionStatementText.includes("issue loading") ||
         visionStatementText.includes("improperly formatted") ||
         visionStatementText.includes("Network error") ? (
          <p className="text-xl md:text-2xl text-red-500 leading-relaxed italic text-center">{visionStatementText}</p>
        ) : (
          <blockquote className="text-xl md:text-2xl text-slate-700 leading-relaxed italic">
            {visionStatementText.trim().split('\n').map((line, index) => (
              <p key={index} className={index > 0 ? 'mt-4' : ''}>{line.trim()}</p>
            ))}
          </blockquote>
        )}
      </section>

      <section className="mt-16 text-center">
        <p className="text-slate-700">
          This vision drives our commitment to excellence and innovation at IEDC IEM.
        </p>
        <Link href="/about/mission" className="text-orange-600 hover:text-orange-700 font-semibold mt-4 inline-block">
          Learn about Our Mission &rarr;
        </Link>
      </section>
    </div>
  );
}
