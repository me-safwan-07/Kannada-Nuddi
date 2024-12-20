import React from "react";
import { Link } from "react-router-dom";

export const SixSmallImages = ({ news, truncateContent, formatDate }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top 3 News */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {news.slice(0, 3).map((blog, index) => (
          <Link
            to={`/blog/${blog._id}`}
            key={index}
            className="flex flex-row sm:flex-col items-center sm:items-start gap-4 border-b sm:border-b-0 sm:border-r border-slate-500 pb-3 sm:pb-0 sm:pr-3"
          >
            {/* Title Section */}
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-medium text-left">
                {truncateContent(blog.title, 75)}
              </h3>
            </div>
            {/* Image Section */}
            <img
              src={blog.image}
              alt="Blog"
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
            />
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="border-b border-slate-500 mb-3"></div>

      {/* Bottom 3 News */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {news.slice(3, 6).map((blog, index) => (
          <Link
            to={`/blog/${blog._id}`}
            key={index}
            className="flex flex-row sm:flex-col items-center sm:items-start gap-4 border-b sm:border-b-0 sm:border-r border-slate-500 pb-3 sm:pb-0 sm:pr-3"
          >
            {/* Title Section */}
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-medium text-left">
                {truncateContent(blog.title, 75)}
              </h3>
            </div>
            {/* Image Section */}
            <img
              src={blog.image}
              alt="Blog"
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
