
export const Skeleton = ({ type }) => {
  const skeletonClass = "animate-pulse bg-gray-300 rounded";

  return (
    <div>
      {/* Hero Section Skeleton */}
      {type === "hero" && (
        <div className="w-full flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/5 aspect-video bg-gray-300 animate-pulse rounded"></div>
          <div className="w-full md:w-2/5 flex flex-col gap-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-24 h-16 bg-gray-300 animate-pulse rounded"></div>
                <div className="flex-grow">
                  <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-300 animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Horizontal News Skeleton */}
      {type === "horizontal" && (
        <div className="w-full flex flex-row gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex flex-col w-1/4">
              <div className="w-full aspect-video bg-gray-300 animate-pulse rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-300 animate-pulse rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded"></div>
            </div>
          ))}
        </div>
      )}

      {/* Six Small Images Skeleton */}
      {type === "six-small" && (
        <div className="flex flex-wrap gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-1/3 p-2 flex flex-col items-center border-slate-500"
            >
              <div className="w-24 h-24 bg-gray-300 animate-pulse rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skeleton;
