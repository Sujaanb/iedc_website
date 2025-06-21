import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Mission',
  description: 'The mission of the Innovation and Entrepreneurship Development Center at IEM Salt Lake.',
};

// Define a type for the expected structure of configValue for mission_statement
interface MissionConfigValue {
  points: string[];
}

interface SiteConfigResponse {
  configKey: string;
  configValue: MissionConfigValue;
}

async function getMissionStatementPoints(): Promise<string[] | string> { // Can return string for error messages
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const apiUrl = `${appUrl}/api/site-config/mission_statement`;

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
      console.error(`Failed to fetch mission statement from API (${apiUrl}): ${response.status} - ${errorDetails}`);
      return "Our mission statement is currently unavailable. Please check back later.";
    }

    const data: SiteConfigResponse = await response.json();

    if (Array.isArray(data.configValue?.points)) {
      return data.configValue.points;
    } else {
      console.error("Mission statement content is missing or not in the expected array format from API:", data);
      return "Mission statement content is improperly formatted. Please contact support.";
    }

  } catch (error) {
    console.error('Error fetching mission statement:', error);
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
        return `Network error: Could not connect to the API to load the mission statement. Please ensure the server is running and accessible. Attempted URL: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/site-config/mission_statement`;
    }
    return "There was an issue loading our mission statement. Please try again soon.";
  }
}


export default async function MissionPage() {
  const missionContent = await getMissionStatementPoints();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700">Our Mission</h1>
        <p className="text-lg text-slate-600 mt-2">The core objectives that drive our actions.</p>
      </header>

      <section className="bg-white p-8 md:p-12 shadow-xl rounded-lg min-h-[300px]">
        <h2 className="text-2xl md:text-3xl font-semibold text-orange-600 mb-8 text-center">
          We are committed to:
        </h2>
        {typeof missionContent === 'string' ? (
          <p className="text-xl text-red-500 leading-relaxed italic text-center">{missionContent}</p>
        ) : (
          <ul className="space-y-6">
            {missionContent.map((point, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="flex-shrink-0 h-6 w-6 text-orange-500 mr-3 mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-slate-700 text-lg leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-16 text-center">
        <p className="text-slate-700">
          Our mission guides us in creating a dynamic environment for innovators.
        </p>
        <Link href="/about/vision" className="text-orange-600 hover:text-orange-700 font-semibold mt-4 inline-block">
          Discover Our Vision &rarr;
        </Link>
      </section>
    </div>
  );
}
