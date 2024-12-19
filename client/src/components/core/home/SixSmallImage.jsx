import { Link } from "react-router-dom";

export const SixSmallImages = ({ news, truncateContent, formatDate, titleSize }) => {
  return (
    <div className="justify-between gap-4 w-full">
      {/* First row */}
      <div className="flex flex-col md:flex-row mb-2">
        {news.slice(0, 3).map((blog, index) => (
          <Link
            to={`/blog/${blog._id}`}
            key={index}
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
            />
          </Link>
        ))}
      </div>

      <div className="border-b border-slate-500 mb-3"></div>

      {/* Second row */}
      <div className="flex flex-col md:flex-row">
        {news.slice(3, 6).map((blog, index) => (
          <Link
            to={`/blog/${blog._id}`}
            key={index}
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
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
