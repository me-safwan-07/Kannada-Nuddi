import React from 'react';
import { Link } from 'react-router-dom';

export const Stories = ({ storyData }) => {
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold text-white pb-2">Web Stories</h1>
      <div className="flex gap-4">
        {storyData.slice(0, 6).map((story, index) => (
          <Link
            to={`/story/${story._id}`}
            key={index}
            className="w-1/6 bg-gray-00 rounded-lg shadow-md overflow-hidden"
          >
            {/* Story Progress Bar */}
            <div className="flex gap-1">
              {story.slides.map((_, idx) => (
                <div
                  key={idx}
                  className="h-0.5  bg-gray-300 flex-1 rounded"
                  style={{ width: `${100 / story.slides.length}%` }}
                />
              ))}
            </div>
            <img
              src={story.coverImage}
              alt={story.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-white">{story.title}</h2>
              <p className="text-sm text-slate-500 mt-2">Published on: {story.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
