import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuTimer } from "react-icons/lu";
import FakeAd from '../../common/FakeAd';

export const HeroSection = ({ news, truncateContent, formatDate, titleSize }) => {
    return (
        <div className="">
            {news.length > 0 ? (
                <div className='md:flex'>
                    {/* Main blog post with larger layout */}
                    <div className="md:pr-2 flex flex-row md:flex-row items-start md:mb-4 overflow-hidden w-full md:w-3/5 md:h-3/5">
                        <Link to={`/blog/${news[0]._id}`} className="w-full relative">
                            <img 
                                src={news[0].image} 
                                alt={news[0].title} 
                                loading="lazy" 
                                className="w-full relative aspect-video transition-transform duration-300 ease-in-out transform hover:scale-105" 
                            />
                            <div className="py-2 md:p-3 flex flex-col">
                                <h3 className="text-lg lg:text-xl font-semibold">{news[0].title}</h3>
                                {/* {news[0].title.length < 100 && (
                                    <p dangerouslySetInnerHTML={{ __html: truncateContent(news[0].content, 75) }} className="text-white-700 text-md"></p>
                                )} */}
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-gray-500 text-xs flex items-center gap-2">
                                        <LuTimer className='h-3 w-3' />
                                        {formatDate(news[0].createdAt)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/* <hr className='border border-gray-400' /> */}
                    {/* <FakeAd  className="m-2 md:hidden block h-32 my-6"/> */}
                    {/* Grid for subsequent blog posts */}
                    <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4 w-full md:ml-2">
                        <div className="md:border-x border-slate-500 py-1 md:mb-4">
                            {news.slice(1,4).map((news, index) => (
                                <Link 
                                    to={`blog/${news._id}`} 
                                    key={news._id}
                                    className=''
                                >
                                    {index < 1 && (
                                        <div className="md:w-full">
                                            <img
                                                src={news.image}
                                                alt={news.title}
                                                loading="lazy"
                                                className="hidden md:block h-1/2 w-full rounded-sm aspect-video transition-transform duration-300 ease-in-out transform "
                                            />
                                        </div>
                                    )}

                                     {/* Mobile: Show image for all indexes on the right */}
                                    <div className={`${index !== 2 ? "border-b md:border-b-0" : ""} border-slate-500 py-2  flex flex-row-reverse justify-between items-center md:flex-col pl-2 w-full gap-2`}>
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            loading="lazy"
                                            className={`block md:hidden sm:w-32 aspect-video h-10 md:w-1/5 md:h-auto object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                                            index < 2 ? 'md:hidden' : ''
                                            }`}
                                        />
                                        <div className='flex-grow'>
                                            <h3 className="text-xs md:text-sm font-semibold mb-1">
                                                {truncateContent(news.title, 90)}
                                            </h3>
                                            <p className="">
                                                {/* {news.title.length < 90 && truncateContent(news.subtitle, 50)} */}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            <div className="border-b md:border-b-0 border-slate-500 py-1 md:mb-4"></div>
                        </div>
                        <div className="pr-2 mb-4">
                            {news.slice(4,8).map((news, index) => (
                                <Link 
                                    to={`blog/${news._id}`} 
                                    key={news._id}
                                    className=''
                                >
                                    {index < 1 && (
                                        <div className="md:w-full">
                                            <img
                                                src={news.image}
                                                alt={news.title}
                                                loading="lazy"
                                                className="hidden md:block h-1/2 w-full rounded-sm aspect-video transition-transform duration-300 ease-in-out transform "
                                            />

                                        </div>
                                    )}

                                     {/* Mobile: Show image for all indexes on the right */}
                                    <div className={`${index !== 2 ? "border-b md:border-b-0" : ""} border-slate-500 py-2  flex flex-row-reverse justify-between items-center md:flex-col pl-2 w-full gap-2`}>
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            loading="lazy"
                                            className={`block md:hidden sm:w-32 aspect-video h-10 md:w-1/5 md:h-auto object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                                            index < 2 ? 'md:hidden' : ''
                                            }`}
                                        />
                                        <div className='flex-grow'>
                                            <h3 className="text-xs md:text-sm font-semibold mb-1">
                                                {truncateContent(news.title, 90)}
                                            </h3>
                                            <p className="">
                                                {/* {news.title.length < 90 && truncateContent(news.subtitle, 50)} */}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div>No blog posts found.</div>
            )}
        </div>
    );
};
