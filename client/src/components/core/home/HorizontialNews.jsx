import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuTimer } from "react-icons/lu";
import 'react-toastify/dist/ReactToastify.css';
import 'react-circular-progressbar/dist/styles.css';

export const HorizontialNews = ({ mainNews, truncateContent, formatDate, titleSize}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 w-full md:w-full md:ml-2 md:px-2">
        {mainNews.slice(1, 5).map((blog) => (
            <div
                key={blog._id}
                className="flex flex-row-reverse md:flex-col relative md:w-1/4 mt-2 pt-2"
            >
                <Link to={`/blog/${blog._id}`} className="gap-2 mx-2 flex flex-">
                    {/* Mobile: Show image for all indexes on the right */}
                    <div className="flex flex-row-reverse md:flex-col justify-between pl-2 w-full">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="sm:w-32 aspect-video h-10 md:w-full md:h-auto object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                        />
                        <div className='flex-grow h-1/3'>
                            <h3 className="text-sm font-semibold mb-2">
                                {truncateContent(blog.title, 70)}
                            </h3>
                            <div className="flex justify-between items-center">
                                <p className="text-white-500 text-xs font-medium flex items-center gap-1">
                                    <LuTimer className="h-3 w-3" />
                                    {formatDate(blog.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        ))}
    </div>
  )
}

// export default HorizontialNews