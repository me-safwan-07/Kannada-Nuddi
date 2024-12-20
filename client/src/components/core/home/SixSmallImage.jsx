<<<<<<< HEAD
import React from "react";
=======
>>>>>>> adc90515664823387418a71f452d4feedb26138f
import { Link } from "react-router-dom";

export const SixSmallImages = ({ news, truncateContent, formatDate }) => {
  return (
<<<<<<< HEAD
    <div className="flex flex-col gap-4 w-full">
      {/* Top 3 News */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
=======
    <div className="justify-between gap-4 w-full">
      {/* First row */}
      <div className="flex flex-col md:flex-row mb-2">
>>>>>>> adc90515664823387418a71f452d4feedb26138f
        {news.slice(0, 3).map((blog, index) => (
          <Link
            to={`/blog/${blog._id}`}
            key={index}
<<<<<<< HEAD
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
=======
            className={`flex flex-row items-center gap-2 px-2 pb-2 border-slate-500 md:w-1/3 ${
              index !== 2 ? "md:border-r" : ""
            }`}
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
>>>>>>> adc90515664823387418a71f452d4feedb26138f
            />
          </Link>
        ))}
      </div>

<<<<<<< HEAD
      {/* Divider */}
      <div className="border-b border-slate-500 mb-3"></div>

      {/* Bottom 3 News */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
=======
      <div className="border-b border-slate-500 mb-3"></div>

      {/* Second row */}
      <div className="flex flex-col md:flex-row">
>>>>>>> adc90515664823387418a71f452d4feedb26138f
        {news.slice(3, 6).map((blog, index) => (
          <Link
            to={`/blog/${blog._id}`}
            key={index}
<<<<<<< HEAD
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
=======
            className={`flex flex-row items-center gap-2 px-2 pb-2 border-slate-500 md:w-1/3 ${
              index !== 2 ? "md:border-r" : ""
            }`}
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
>>>>>>> adc90515664823387418a71f452d4feedb26138f
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
