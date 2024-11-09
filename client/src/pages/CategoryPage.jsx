import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { LuTimer } from "react-icons/lu";

const useFetchNews = (category) => {
    const [newsData, setNewsData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true); // Start loading before fetching data
            try {
                // Assuming you have an API endpoint that filters news by category
                const res = await axios.get(`http://localhost:3000/api/news/category/${category}`);
                setNewsData(res.data);
            } catch (err) {
                console.error('Error fetching content:', err);
                setError('Failed to fetch blogs. Please try again later.');
            } finally {
                setLoading(false); // Stop loading once data is fetched
            }
        };

        fetchBlogs();
    }, [category]); // Re-fetch news when category changes

    return { newsData, error, loading };
};

// In your component
function CategoryPage() {
    const { category } = useParams(); // Getting the category from URL params
    const { newsData, error, loading } = useFetchNews(category);

    const truncateContent = (content, limit = 100) => {
        const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
        return text.length > limit ? `${text.substring(0, limit)}...` : text;
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    };

    if (loading) {
        return (
            <div className="text-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <h1>{category.charAt(0).toUpperCase() + category.slice(1)} News</h1>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : newsData.length > 0 ? (
                newsData.map((news) => (
                    <div className="flex flex-col md:flex-row items-start mb-4 border rounded-lg overflow-hidden shadow-md" key={news._id}>
                        <Link to={`/blog/${news._id}`} className="w-full relative">
                            <div className="relative">
                                {/* Image with max height and responsive width */}
                                <img className="w-full md:w-48 h-auto max-h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105" src={news.image} alt={news.title} />
                                {news.category && 
                                    <span className="absolute top-2 right-2 inline-block bg-red-500 text-white text-xs font-bold uppercase rounded-full px-2 py-1 z-10">
                                        {news.category}
                                    </span>
                                }
                            </div>
                            <div className="flex-1 p-4 flex flex-col">
                                {/* Blog Title with responsive text size */}
                                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">{news.title}</h3>
                                <p className="text-gray-700 text-sm md:text-base lg:text-lg">{truncateContent(news.content)}</p>
                                <div className="flex justify-between items-center mt-2">
                                    {/* Date with responsive text size */}
                                    <p className="text-gray-500 text-xs md:text-sm flex items-center gap-2">
                                        <LuTimer className='h-4 w-4' />
                                        {formatDate(news.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <p>No news available in this category.</p>
            )}
        </div>
    );
}

export default CategoryPage;
