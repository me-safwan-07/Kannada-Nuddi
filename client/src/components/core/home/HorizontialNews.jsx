import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuTimer } from "react-icons/lu";
import 'react-toastify/dist/ReactToastify.css';
import 'react-circular-progressbar/dist/styles.css';

export const HorizontialNews = ({ news, truncateContent, formatDate }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:flex md:flex-row gap-1 md:gap-4 w-full">
      {news.map((news) => (
        <div
          key={news._id}
          className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col mb-3"
        >
          <Link to={`/news/${news._id}`} className="group flex flex-col h-full">
            {/* Image Section */}
            <div className="relative">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
              />
            </div>

            {/* Text Section */}
            <div className="p-3 flex flex-col justify-between flex-grow">
              <h3 className="text-xs sm:text-sm font-semibold text-white mb-2">
                {truncateContent(news.title, 50)}
              </h3>
              {/* <div className="flex items-center text-xs text-gray-400 gap-1">
                <LuTimer className="h-4 w-4" />
                <p>{formatDate(news.createdAt)}</p>
              </div> */}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
