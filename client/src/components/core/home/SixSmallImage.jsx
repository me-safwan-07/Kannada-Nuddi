import React from 'react';

export const SixSmallImages = ({ news, truncateContent, formatDate, titleSize }) => {
  return (
    <div className="justify-between gap-4 w-full">
      <div className="flex mb-2">
        {news.slice(0,3).map((blog, index) => (
          <div key={index} className={`w-1/3 flex justify-center items-center gap-2  px-2 pb-2 border-slate-500 ${index !== 2 ? "border-r" : ""}`}>
              <div className={`flex pr-2`}>
                  <h3 className={`font-medium`}>{truncateContent(blog.title,75)}</h3>
                  {/* <p className="text-gray-500 text-sm md:text-base">{truncateContent(blog.content)}</p> */}
                  <img
                    src={blog.image}
                    alt="Blog"
                    className="w-24 h-24 object-cover rounded-md"
                    />
              </div>
          </div>
        ))}
      </div>
      <div className="border-b border-slate-500 mb-3"></div>
      <div className="flex">
        {news.slice(3,6).map((blog, index) => (
          <div key={index} className={`w-1/3 flex justify-center items-center gap-2  px-2 pb-2 border-slate-500 ${index !== 2 ? "border-r" : ""}`}>
              <div className="flex gap-2  pr-2">
                  <h3 className={`font-medium`}>{truncateContent(blog.title,75)}</h3>
                  {/* <p className="text-gray-500 text-sm md:text-base">{truncateContent(blog.content)}</p> */}
                  <img
                    src={blog.image}
                    alt="Blog"
                    className="w-24 h-24 object-cover rounded-md"
                    />
              </div>
          </div>
        ))}

      </div>
    </div>
  );
};

// export default SixSmallImages;
