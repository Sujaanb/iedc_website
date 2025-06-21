'use client'; // For client-side data fetching for the carousel

import { useEffect, useState } from 'react';
import type { GalleryImage } from '@/types/models';
import ImageCarousel from '@/components/ImageCarousel'; // Assuming this component is ready
// import { Metadata } from 'next'; // For static metadata export

// Static metadata export
export const metadata = {
  title: 'Gallery',
  description: 'Moments and events from IEDC IEM Salt Lake.',
};

const GalleryPage = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/gallery');
        if (!response.ok) {
          throw new Error(`Failed to fetch gallery images: ${response.statusText}`);
        }
        const data: GalleryImage[] = await response.json();
        setImages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  // useEffect(() => {
  //   document.title = "Gallery | IEDC IEM Salt Lake";
  // }, []);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700">Gallery</h1>
        <p className="text-lg text-gray-600 mt-2">A glimpse into our vibrant community and events.</p>
      </header>

      {isLoading && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">Loading gallery...</p>
          {/* Spinner can be added */}
        </div>
      )}

      {error && (
        <div className="text-center py-10 bg-red-100 text-red-700 p-4 rounded-md">
          <p className="font-semibold">Error loading gallery:</p>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && images.length === 0 && (
         <div className="text-center py-10">
          <p className="text-lg text-gray-500">No images in the gallery yet. Check back soon!</p>
        </div>
      )}

      {!isLoading && !error && images.length > 0 && (
        <section className="flex justify-center">
          {/* The ImageCarousel component will handle the display logic */}
          <ImageCarousel images={images} />
        </section>
      )}
    </div>
  );
};

export default GalleryPage;
