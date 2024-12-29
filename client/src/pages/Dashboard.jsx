import React, { useState, useEffect } from 'react';
import { Bell, ChevronDown, Layout, List } from 'lucide-react';
import { LuTimer } from "react-icons/lu";
import { deleteNews, getAllNews } from '../services/operations/newsApi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Dashboard({ news, setNews }) {
    const [error, setError] = useState('');
    const [isBoxView, setIsBoxView] = useState(true);  // State to toggle between views

    const handleDelete = async (id) => {
        try {
            // Optimistically update the UI by filtering out the deleted news item
            const updatedNews = news.filter(newsItem => newsItem._id !== id);
            setNews(updatedNews);  // Immediately update the state to remove the item from the UI
    
            // Call the delete API
            const data = await deleteNews(id);
    
            if (!data) {
                toast.error("Couldn't delete news");
                // If the API fails, we can revert the change
                setNews(news);  // Revert to the original state if the deletion fails
            } else {
                toast.success("News deleted");
            }
        } catch (e) {
            console.error('Error deleting news:', e);
            toast.error("An error occurred while deleting news");
            setNews(news);  // Revert to the original state if an error occurs
        }
    };
    

    const truncateContent = (content, limit = 100) => {
        const text = content.replace(/<[^>]*>/g, '');
        return text.length > limit ? `${text.substring(0, limit)}...` : text;
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    };

    return (
        <div className="flex h-screen">
            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <main className="max-w-7xl mx-auto py-6 px-4">
                    {/* Trending Section */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Today Trending</h2>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setIsBoxView(!isBoxView)}  // Toggle between box and horizontal view
                                className="flex items-center bg-gray-200 p-2 rounded-lg"
                            >
                                {isBoxView ? (
                                    <List className="h-5 w-5 mr-2" />
                                ) : (
                                    <Layout className="h-5 w-5 mr-2" />
                                )}
                                {isBoxView ? 'List View' : 'Box View'}
                            </button>
                        </div>
                    </div>

                    {/* Link Buttons */}
                    <div className="flex justify-end space-x-4 mb-6">
                        <Link to="/news" className="bg-blue-500 text-white py-2 px-4 rounded-lg">News</Link>
                        <Link to="/editor" className="bg-green-500 text-white py-2 px-4 rounded-lg">Editor</Link>
                    </div>

                    {/* News Display */}
                    <div className={isBoxView ? "grid grid-cols-3 gap-6" : "space-y-6"}>
                        {news.map((newsItem) => (
                            <div className="flex flex-col" key={newsItem._id}>
                                <Link
                                    to={`/news/${newsItem._id}`}
                                    className={`bg-white p-4 rounded-lg shadow-lg ${
                                        isBoxView ? "" : "flex items-center space-x-4"
                                    }`}
                                >
                                    <img
                                        src={newsItem.image}
                                        alt={newsItem.title}
                                        className={isBoxView ? "h-32 w-full object-cover rounded-t-lg" : "h-24 w-24 object-cover rounded-lg"}
                                    />
                                    <div className={isBoxView ? "p-4" : "flex-1"}>
                                        <h3 className="font-semibold mb-2">
                                            {truncateContent(newsItem.title, 30)}
                                        </h3>
                                        <div className="text-gray-500 text-sm mb-2">
                                            <LuTimer className="inline-block h-4 w-4 mr-1" />
                                            {formatDate(newsItem.createdAt)}
                                        </div>
                                    </div>
                                </Link>

                                <div className="flex flex-row justify-between items-center">
                                    <span className="text-gray-500">{newsItem.views} views</span>
                                    
                                    {/* Edit Button */}
                                    <Link
                                        to={`/create/${newsItem._id}`}
                                        className="text-blue-500 hover:text-blue-600"
                                    >
                                        Edit
                                    </Link>

                                    {/* Delete Button */}
                                    <button 
                                        onClick={() => handleDelete(newsItem._id)} 
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
