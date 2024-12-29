import React, { useState, useEffect } from 'react';
import { Bell, ChevronDown, Layout, List } from 'lucide-react';
import { LuTimer } from "react-icons/lu";
import { getAllNews } from '../services/operations/newsApi';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');
    const [isBoxView, setIsBoxView] = useState(true);  // State to toggle between views

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await getAllNews()
                setBlogs(res);
            } catch (err) {
                console.error('Error fetching content:', err);
                setError('Failed to fetch blogs. Please try again later.');
            }
        };

        fetchBlogs();
    }, []);

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
        <div className="flex h-screen bg-gray-100">
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

                    {/* Blogs Display */}
                    <div className={isBoxView ? "grid grid-cols-3 gap-6" : "space-y-6"}>
                        {blogs.map((blog) => (
                            <div
                                key={blog._id}
                                className={`bg-white p-4 rounded-lg shadow-lg ${
                                    isBoxView ? "" : "flex items-center space-x-4"
                                }`}
                            >
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className={isBoxView ? "h-32 w-full object-cover rounded-t-lg" : "h-24 w-24 object-cover rounded-lg"}
                                />
                                <div className={isBoxView ? "p-4" : "flex-1"}>
                                    <h3 className="font-semibold mb-2">
                                        {truncateContent(blog.title, 30)}
                                    </h3>
                                    <div className="text-gray-500 text-sm mb-2">
                                        <LuTimer className="inline-block h-4 w-4 mr-1" />
                                        {formatDate(blog.createdAt)}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">{blog.views} views</span>
                                    </div>
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
