import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getNewsById } from '../services/operations/newsApi';
import { newsEndpoints } from '../services/apis'

const {
    GET_ALL_NEWS,
} = newsEndpoints;

function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [recentNews, setRecentNews] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [readMore, setReadMore] = useState(false);

  // Fetch the specific blog post
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getNewsById(id);
        setBlog(response);
        setLoading(false);
      } catch (err) {
        toast.error('Failed to fetch blog');
        console.error('Error:', err.message);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Fetch related or recent news posts
  useEffect(() => {
    if (!blog) return;
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${GET_ALL_NEWS}?category=${blog.category}&exclude=${id}`);
        setRecentNews(res?.data?.slice(0, 10));
      } catch (err) {
        console.error('Error fetching related content:', err);
        setError('Failed to fetch news. Please try again later.');
      }
    };
    fetchBlogs();
  }, [blog, id]);


  if (loading) {
    return (
      <div className="container mx-auto flex flex-col lg:flex-row gap-4 text-white">
        {/* Left Sidebar Skeleton */}
        <aside className="lg:w-1/4 p-4 rounded-md">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
          </div>
        </aside>

        {/* Main Content Skeleton */}
        <div className="lg:w-1/2 p-4 rounded-md shadow">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded"></div>
            <div className="h-56 bg-gray-300 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Skeleton */}
        <aside className="lg:w-1/4 p-4 rounded-md">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-300 rounded"></div>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-24 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-gray-700">{error}</p>
        <button onClick={() => navigate('/')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Go back to Homepage
        </button>
        <ToastContainer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-3 max-w-3xl mx-auto">
        <ToastContainer />
      </div>
    );
  }

  const toggleReadMore = () => setReadMore(!readMore);

  return (
    <div className="container mx-auto flex flex-col lg:flex-row gap-4 text-white">
      {/* Left Sidebar */}
      <aside className="lg:w-1/4 p-4 rounded-md">
        {/* add the title of recent news */}
        <h2 className="text-xl font-bold mb-4">Recent News</h2>
        {recentNews.map((newsItem, index) => (
          <Link to={`/blog/${newsItem._id}`} key={index} className="md:block hidden mb-4"> 
            {newsItem.title}
          </Link>
        ))}
      </aside>

      {/* Main Content */}
      <div className="lg:w-1/2 p-4 rounded-md shadow">
        <div>
          <h1 className="p-3 text-2xl font-bold">{blog.title}</h1>
          <img src={blog.image} alt={blog.title} className="w-full h-auto mb-4 rounded-md" />
          <div className="text-sm">
            {blog.content.length > 500 && !readMore ? (
              <>
                <div dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 500) }} />
                <div className="text-center my-4">
                  <button
                    onClick={toggleReadMore}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Read More
                  </button>
                </div>
              </>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            )}
          </div>
        </div>
        <div className="">
          // add the 2 col and 5 row for the recent news 
          <div className="grid grid-cols-2 gap-4">
            {recentNews.map((newsItem, index) => (
              <Link to={`/blog/${newsItem._id}`} key={index} className="md:block hidden mb-4">
                <article className="hover:shadow-lg transition-shadow duration-200">
                  {newsItem.image && (
                    <img
                      src={newsItem.image}
                      alt=""
                      className="w-full aspect-video object-cover mb-2 rounded-md"
                    />
                  )}
                  <h3 className="font-bold text-sm">{newsItem.title}</h3>
                  <p className="text-[#fa3b3bb8] font-medium text-xs py-1">
                    {newsItem.category.charAt(0).toUpperCase() + newsItem.category.slice(1)}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="lg:w-1/4 p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">Recent News</h2>
        {recentNews.length > 0 ? (
          recentNews.map((newsItem, index) => (
            <Link to={`/blog/${newsItem._id}`} key={index} className="block mb-4">
              <article className="hover:shadow-lg transition-shadow duration-200">
                {newsItem.image && (
                  <img
                    src={newsItem.image}
                    alt=""
                    className="w-full aspect-video object-cover mb-2 rounded-md"
                  />
                )}
                <h3 className="font-bold text-sm">{newsItem.title}</h3>
                <p className="text-[#fa3b3bb8] font-medium text-xs py-1">
                  {newsItem.category.charAt(0).toUpperCase() + newsItem.category.slice(1)}
                </p>
              </article>
            </Link>
          ))
        ) : (
          <p>No recent news available.</p>
        )}
      </aside>

      <ToastContainer />
    </div>
  );
}

export default BlogPage;
