import React from "react";
import { Link } from "react-router-dom";

export const SixSmallImages = ({ news, truncateContent, formatDate }) => {
  return (
    <div className="justify-between gap-4 w-full">
      {/* First row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {news.slice(0, 3).map((blog, index) => (
          <Link
            to={`/blog/${blog._id}`}
            key={index}
            className={`flex flex-row gap-1 pb-1 border-slate-500 md:border-b`}
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
              className="w-20 h-20 object-cover rounded-md"
            />
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="border-slate-500 my-3"></div>
      {/* Bottom 3 News */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.slice(3, 6).map((blog, index) => (
          <Link
            to={`/blog/${blog._id}`}
            key={index}
            className={`flex flex-row  gap-1  pb-1 border-slate-500`}
          >
            {/* Text on the left */}
            <div className="flex-1">
              <h3 className="font-medium text-sm sm:text-base">
                {truncateContent(blog.title, 75)}
              </h3>
            </div>
            {/* Image on the right */}
            <img
              src={blog.image}
              alt="Blog"
              className="w-20 h-20 object-cover rounded-md"
            />
          </Link>
        ))}
      </div>
    </div>
  )
};