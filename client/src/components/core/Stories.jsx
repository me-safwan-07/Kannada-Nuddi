import React from 'react';
import { Link } from 'react-router-dom';
import { StorySkeleton } from '../common/skeleton/StorySkeleton';

export const Stories = ({ storyData, loading }) => {
  return (
    <div className="md:m-4 m-2">
      <h1 className="text-2xl font-bold text-white pb-2">Web Stories</h1>
      <div className="flex gap-2 overflow-x-auto md:overflow-visible whitespace-nowrap">
        {/* Show Skeleton Loader while loading */}
        {loading ? (
          [...Array(6)].map((_, index) => <StorySkeleton key={index} />)
        ) : (
          // Display actual content after loading
          storyData.slice(0, 6).map((story, index) => (
            <Link
              to={`/story/${story._id}`}
              target='_blank'
              key={index}
              className="w-2/4 sm:w-1/2 md:w-1/6 bg-slate-500 text-black rounded-lg shadow-md sm:overflow-hidden border border-slate-600 flex-shrink-0"
            >
              {/* Story Image */}
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full h-60 object-cover"
                loading="lazy"
              />
              {/* Story Progress Bar */}
              <div className="flex">
                {story.slides.map((_, idx) => (
                  <div
                    key={idx}
                    className="relative bottom-2 h-0.5 bg-gray-300 flex-1 rounded"
                    style={{ width: `${100 / story.slides.length}%` }}
                  />
                ))}
              </div>

              <div className="p-2">
                <h2 className="text-sm flex flex-wrap font-semibol">{story.title}</h2>
                <p className="text-sm mt-2">Published on: {story.date}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};