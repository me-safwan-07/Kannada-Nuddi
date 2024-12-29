import { useEffect, useState } from "react";
import { LuTimer } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";

function CategoryPage({ news }) {
    const { category } = useParams();
    const [categoryNews, setCategoryNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const truncateContent = (content, limit = 100) => {
        const text = content.replace(/<[^>]*>/g, '');
        return text.length > limit ? `${text.substring(0, limit)}...` : text;
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    useEffect(() => {
        const fetchCategoryNews = async () => {
            try {
                setLoading(true);
                const filteredNews = news.filter(item => item.category === category);
                setCategoryNews(filteredNews);
            } catch (err) {
                toast.error('Failed to fetch news. Please try again later.');
                console.error('Error fetching category news:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryNews();
    }, [category, news]);

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
            {categoryNews.length > 0 ? (
                categoryNews.map((item) => (
                    <div className="flex flex-col md:flex-row items-start mb-4 border rounded-lg overflow-hidden shadow-md" key={item._id}>
                        <Link to={`/news/${item._id}`} className="w-full relative">
                            <div className="relative">
                                <img 
                                    className="w-full md:w-48 h-auto max-h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105" 
                                    src={item.image} 
                                    alt={item.title} 
                                />
                                {/* {item.category && 
                                    <span className="absolute top-2 right-2 inline-block bg-red-500 text-white text-xs font-bold uppercase rounded-full px-2 py-1 z-10">
                                        {item.category}
                                    </span>
                                } */}
                            </div>
                            <div className="flex-1 p-4 flex flex-col">
                                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">{item.title}</h3>
                                <p className="text-gray-700 text-sm md:text-base lg:text-lg">{truncateContent(item.content)}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-gray-500 text-xs md:text-sm flex items-center gap-2">
                                        <LuTimer className='h-4 w-4' />
                                        {formatDate(item.createdAt)}
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
