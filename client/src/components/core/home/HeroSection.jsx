import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuTimer } from "react-icons/lu";

export const HeroSection = ({ mainNews, truncateContent, formatDate, titleSize }) => {
    return (
        <div className="">
            {mainNews.length > 0 ? (
                <div className='md:flex'>
                    {/* Main blog post with larger layout */}
                    <div className="flex flex-row md:flex-row items-start mb-4 overflow-hidden w-full md:w-3/5 md:h-3/5">
                        <Link to={`/blog/${mainNews[0]._id}`} className="w-full relative">
                            <img className="relative aspect-video transition-transform duration-300 ease-in-out transform hover:scale-105" src={mainNews[0].image} alt={mainNews[0].title} />
                            <div className="p-3 flex flex-col">
                                <h3 className="text-lg lg:text-xl font-semibold">{mainNews[0].title}</h3>
                                {mainNews[0].title.length < 100 && (
                                    <p className="text-gray-700 text-md">{truncateContent(mainNews[0].content, 100)}</p>
                                )}
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-gray-500 text-xs flex items-center gap-2">
                                        <LuTimer className='h-3 w-3' />
                                        {formatDate(mainNews[0].createdAt)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <hr className='' />
                    {/* Grid for subsequent blog posts */}
                    <div className="flex flex-col md:grid md:grid-cols-2 gap-2 w-full md:w-2/3 md:ml-2">
                        {mainNews.slice(1, 7).map((blog, index) => (
                            <div
                                key={blog._id}
                                className={`flex flex-row-reverse md:flex-col `}
                            >
                            <Link to={`/blog/${blog._id}`} className="">
                                {/* Desktop: Show image for index 0 and 1 */}
                                {index < 2 && (
                                    <div className="md:w-full">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="hidden md:block h-1/2 w-full rounded-sm aspect-video transition-transform duration-300 ease-in-out transform "
                                        />

                                    </div>
                                )}

                                {/* Mobile: Show image for all indexes on the right */}
                                <div className="flex flex-row-reverse flex-grow md:flex-col pl-2 w-full gap-2">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className={`block md:hidden sm:w-32 aspect-video h-10 md:w-1/5 md:h-auto object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                                        index < 2 ? 'md:hidden' : ''
                                        }`}
                                    />
                                    <div className='flex-grow'>
                                        <h3 className="text-xs md:text-sm font-semibold mb-1">
                                            {truncateContent(blog.title, 90)}
                                        </h3>
                                        {/* <div className="flex justify-between items-center">
                                            <p className="text-gray-500 text-xs flex items-center gap-1">
                                                <LuTimer className="h-3 w-3" />
                                                {formatDate(blog.createdAt)}
                                            </p>
                                        </div> */}
                                    </div>
                                </div>
                            </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>No blog posts found.</div>
            )}
        </div>
    );
};
