import axios from 'axios';
import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        const response = await axios.get(`http://localhost:3000/api/news/${id}`);
        setBlog(response.data.blog);
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
        const res = await axios.get(`http://localhost:3000/api/news?category=${blog.category}&exclude=${id}`);
        setRecentNews(res.data.slice(0, 10));
      } catch (err) {
        console.error('Error fetching related content:', err);
        setError('Failed to fetch news. Please try again later.');
      }
    };
    fetchBlogs();
  }, [blog, id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <Spinner size="xl" />
        <p className="mt-4 text-gray-700">Loading blog content...</p>
        <ToastContainer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
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
    <div className="container mx-auto flex flex-col md:flex-row">
      <div className="md:w-2/3 lg:w-3/4">
        <div>
          <h1 className="p-3 md:text-5xl text-xl font-bold">{blog.title}</h1>
          <img src={blog.image} alt={blog.title} className="w-full h-auto mb-4" />
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
        <div>
          {/* <h2 className="text-2xl font-semibold my-4">Related News</h2> */}
          {recentNews.length > 0 ? (
            recentNews.map((newsItem, index) => (
              <Link to={`/blog/${newsItem._id}`} key={index} className="">
                <article key={index} className="hover:shadow-lg transition-shadow duration-200 py-4">
                  {newsItem.image && (
                    <img
                      src={newsItem.image}
                      alt=""
                      className="w-full aspect-video object-cover mb-2 rounded-md"
                    />
                  )}
                  <h3 className="font-bold">{newsItem.title}</h3>
                  <p className="text-[#fa3b3bb8] font-medium text-xs py-1">
                    {newsItem.category.charAt(0).toUpperCase() + newsItem.category.slice(1)}
                  </p>
                </article>
              </Link>
            ))
          ) : (
            <p>No recent news available.</p>
          )}
        </div>
      </div>
      <aside className="md:w-1/3 lg:w-1/4 m-4">
        {/* <h2 className="text-2xl font-semibold mb-4">Recent News</h2> */}
        {recentNews.length > 0 ? (
          recentNews.map((newsItem, index) => (
            <Link to={`/blog/${newsItem._id}`} key={index} className="">
              <article key={index} className="hover:shadow-lg transition-shadow duration-200 py-4">
                {newsItem.image && (
                  <img
                    src={newsItem.image}
                    alt=""
                    className="w-full aspect-video object-cover mb-2 rounded-md"
                  />
                )}
                <h3 className="font-bold">{newsItem.title}</h3>
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
