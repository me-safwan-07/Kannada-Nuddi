import axios from 'axios';
import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [recentNews, setRecentNews] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch the specific blog post
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/news/${id}`);
        setBlog(response.data);
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
    if (!blog) return; // Wait until the blog is fetched

    const fetchBlogs = async () => {
      try {
        const res = await axios.get('https://localhost:3000/api/news');
        const filteredNews = res.data.filter(news => news.category === blog.category && news._id !== id);

        // Limit to 10 items or fewer if there aren't enough
        setRecentNews(filteredNews.length >= 10 ? filteredNews.slice(0, 10) : filteredNews);
      } catch (err) {
        console.error("Error fetching related content:", err);
        setError('Failed to fetch news. Please try again later.');
      }
    };
    fetchBlogs();
  }, [blog, id]);

  // Display loading spinner
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <Spinner size='xl' />
        <p className="mt-4 text-gray-700">Loading blog content...</p>
        <ToastContainer />
      </div>
    );
  }

  // Display error page
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-gray-700">{error}</p>
        <button onClick={() => navigate('/')} className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
          Go back to Homepage
        </button>
        <ToastContainer />
      </div>
    );
  }

  // Display if no blog found
  if (!blog) {
    return (
      <div className='p-3 max-w-3xl mx-auto'>
        <ToastContainer />
      </div>
    );
  }

  // Main blog page content
  return (
    <div className='container mx-auto px-4 py-8 flex flex-col md:flex-row'>
      <div className="md:w-2/3 lg:w-3/4 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <img 
            src={blog.image} 
            alt={blog.title}  
            className="w-full h-auto rounded-lg shadow-md mb-4" 
          />
          <div dangerouslySetInnerHTML={{ __html: blog.content }} className="text-gray-700"></div>
        </div>
      </div>
      <aside className="md:w-1/3 lg:w-1/4 p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Recent News</h2>
        {recentNews.length > 0 ? (
          recentNews.map((newsItem, index) => (
            <article key={index} className='mb-4 p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200'>
              {newsItem.image && 
                <img src={newsItem.image} alt="" className="w-full h-32 object-cover rounded-md mb-2" />
              }
              <h3 className="font-bold">{newsItem.title}</h3>
              <p className="text-gray-600">{new Date(newsItem.createdAt).toLocaleDateString()}</p>
              <a href={`/blog/${newsItem._id}`} className="text-blue-600 hover:underline">Read More</a>
            </article>
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
