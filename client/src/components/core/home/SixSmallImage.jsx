import React from 'react';

export const SixSmallImages = ({ news, truncateContent, formatDate, titleSize }) => {
  return (
    <div className="md:grid md:grid-cols-3 md:grid-rows-2 flex flex-col justify-between gap-4 w-full md:ml-2 md:px-2">
      {news.map((blog, index) => (
        <div key={index} className="flex justify-center items-center">
            <div className="">
                <h3 className={`font-medium`}>{truncateContent(blog.title, 100)}</h3>
                {/* <p className="text-gray-500 text-sm md:text-base">{truncateContent(blog.content)}</p> */}
            </div>
          <img
            src={blog.image}
            alt="Blog"
            className="w-24 h-24 object-cover rounded-md"
          />
        </div>
      ))}
    </div>
  );
};

// export default SixSmallImages;
