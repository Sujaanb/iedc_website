'use client'; // For client-side data fetching

import { useEffect, useState } from 'react';
import type { Startup } from '@/types/models';
import StartupCard from '@/components/StartupCard';
// import { Metadata } from 'next'; // For static metadata export

// Static metadata export
export const metadata = {
  title: 'Our Startups',
  description: 'Discover the innovative startups supported by IEDC IEM Salt Lake.',
};

const StartupsPage = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStartups = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/startups');
        if (!response.ok) {
          throw new Error(`Failed to fetch startups: ${response.statusText}`);
        }
        const data: Startup[] = await response.json();
        setStartups(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStartups();
  }, []);

  // Optional: if you want to ensure title is set even if metadata export is somehow missed by older Next.js versions or specific SSR configs.
  // useEffect(() => {
  //   document.title = "Our Startups | IEDC IEM Salt Lake";
  // }, []);


  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700">Supported Startups</h1>
        <p className="text-lg text-gray-600 mt-2">Ventures nurtured at IEDC IEM.</p>
      </header>

      {isLoading && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">Loading startups...</p>
          {/* Spinner component can be added here */}
        </div>
      )}

      {error && (
        <div className="text-center py-10 bg-red-100 text-red-700 p-4 rounded-md">
          <p className="font-semibold">Error loading startups:</p>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && startups.length === 0 && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">No startups to display currently.</p>
        </div>
      )}

      {!isLoading && !error && startups.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {startups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </section>
      )}
    </div>
  );
};

export default StartupsPage;
