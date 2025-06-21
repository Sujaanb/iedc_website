'use client'; // For client-side data fetching and interactivity

import { useEffect, useState } from 'react';
import type { Coordinator } from '@/types/models';
import Image from 'next/image';
// import { Metadata } from 'next'; // Metadata should be exported from server components or page.tsx directly if static

// If you need dynamic metadata based on fetched data, it's more complex with client components.
// For now, we'll set static metadata via a separate export or assume it's handled if this were a server component.
// export const metadata: Metadata = {
// title: 'Our Team',
// description: 'Meet the coordinators of the IEDC at IEM Salt Lake.',
// };
// A common pattern for metadata in client components is to set it in a parent server component or use a hook if available for document.title

const TeamPage = () => {
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/team');
        if (!response.ok) {
          throw new Error(`Failed to fetch team: ${response.statusText}`);
        }
        const data: Coordinator[] = await response.json();
        setCoordinators(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeam();
  }, []);

  // It's better to handle metadata at the page or layout level if static
  // For dynamic titles based on client-fetched data, you might need to use `document.title` in useEffect
  useEffect(() => {
    document.title = "Our Team | IEDC IEM Salt Lake";
  }, []);


  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700">Meet Our Team</h1>
        <p className="text-lg text-gray-600 mt-2">The driving force behind IEDC IEM.</p>
      </header>

      {isLoading && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">Loading team members...</p>
          {/* You can add a spinner here */}
        </div>
      )}

      {error && (
        <div className="text-center py-10 bg-red-100 text-red-700 p-4 rounded-md">
          <p className="font-semibold">Error loading team members:</p>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && coordinators.length === 0 && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">No team members found.</p>
        </div>
      )}

      {!isLoading && !error && coordinators.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {coordinators.map((coordinator) => (
            <div
              key={coordinator.id}
              className="bg-white shadow-lg rounded-lg p-6 text-center transition-all hover:shadow-xl flex flex-col items-center"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 rounded-full overflow-hidden ring-4 ring-orange-500">
                {coordinator.photoUrl ? (
                  <Image
                    src={coordinator.photoUrl}
                    alt={`Photo of ${coordinator.name}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full" // Ensure image itself is rounded if not already
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Photo
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold text-blue-700">{coordinator.name}</h2>
              <p className="text-orange-600">{coordinator.title}</p>
              <p className="text-gray-600 text-sm">{coordinator.department}</p>
              <a
                href={`mailto:${coordinator.email}`}
                className="text-sm text-blue-500 hover:text-blue-700 mt-2 transition-colors"
                aria-label={`Email ${coordinator.name}`}
              >
                {coordinator.email}
              </a>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default TeamPage;

// To ensure metadata is handled correctly for Next.js App Router,
// if this page is primarily client-rendered for its main content,
// static metadata should be exported from the `page.tsx` file itself,
// not from within the client component.
// We can add a static export for metadata here.

export const metadata = {
  title: 'Our Team',
  description: 'Meet the coordinators of the IEDC at IEM Salt Lake.',
};
