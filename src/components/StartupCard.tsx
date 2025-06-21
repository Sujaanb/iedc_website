import type { Startup } from '@/types/models';
import Image from 'next/image'; // If you plan to add logos

interface StartupCardProps {
  startup: Startup;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full">
      {startup.logoUrl && (
        <div className="w-full h-40 relative bg-gray-100"> {/* Added bg for consistency */}
          <Image
            src={startup.logoUrl}
            alt={`${startup.name} logo`}
            layout="fill"
            objectFit="contain"
            className="p-4"
          />
        </div>
      )}
      {!startup.logoUrl && (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
          <span>No Logo</span>
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-blue-700 mb-2 truncate" title={startup.name}>{startup.name}</h3>
        <p className="text-gray-700 text-sm mb-4 flex-grow line-clamp-3">
          {/* Using line-clamp for multi-line truncation (requires @tailwindcss/line-clamp plugin or manual CSS) */}
          {/* For now, this is a conceptual application. If plugin not installed, it won't work. */}
          {/* Fallback: h-20 overflow-y-auto if no line-clamp */}
          <strong>Objective:</strong> {startup.objective}
        </p>
        <div className="mt-auto pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            <strong>License:</strong> {startup.tradeLicense || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartupCard;
