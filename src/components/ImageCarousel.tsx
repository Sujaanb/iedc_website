import type { GalleryImage } from '@/types/models';
import Image from 'next/image';

interface ImageCarouselProps {
  images: GalleryImage[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  if (!images || images.length === 0) {
    return <p className="text-center text-gray-500">No images to display.</p>;
  }

  // Placeholder for actual carousel logic and lightbox
  // For now, it will just display the first image or a message.
  // Libraries like 'react-responsive-carousel', 'swiper', or 'embla-carousel-react' can be used.
  // Lightbox functionality could be added with 'yet-another-react-lightbox' or similar.

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4">Gallery Showcase</h2>
      <div className="relative h-96 flex items-center justify-center"> {/* Adjust height as needed */}
        {/* Current Image Display (Placeholder) */}
        <Image
          src={images[0].url} // Display first image as placeholder
          alt={images[0].altText}
          layout="fill"
          objectFit="contain" // 'cover' or 'contain'
          className="rounded-md"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
          <p className="text-sm">{images[0].caption}</p>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-gray-600">Carousel controls and lightbox will be implemented here.</p>
        <p className="text-sm text-orange-500">(Showing 1 of {images.length} images as a preview)</p>
      </div>
      {/* Placeholder for navigation buttons (prev/next) and indicators */}
    </div>
  );
};

export default ImageCarousel;
