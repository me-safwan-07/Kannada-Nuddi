export const StorySkeleton = () => (
    <div className="w-3/4 sm:w-1/2 md:w-1/6 bg-gray-800 rounded-lg shadow-md overflow-hidden border border-slate-600 flex-shrink-0 animate-pulse">
      {/* Skeleton Image */}
      <div className="w-full h-60 bg-gray-700 animate-pulse"></div>
      {/* Skeleton Progress Bar */}
      <div className="flex gap-1 p-2">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="h-0.5 bg-gray-600 flex-1 rounded"
          />
        ))}
      </div>
      {/* Skeleton Text */}
      <div className="p-4">
        <div className="h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
        <div className="h-3 bg-gray-600 rounded animate-pulse"></div>
      </div>
    </div>
  );