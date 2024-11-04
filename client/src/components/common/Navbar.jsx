import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [news, setNews] = useState([]);
  const [navOptions, setNavOptions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNavOptions = async () => {
      try {
        const response = await axios.get('/api/categories/');
        const response2 = await axios.get('/api/blog/get/');
        setNavOptions(response.data);
        setNews(response2.data);
      } catch (err) {
        console.error('Error fetching navigation options:', err);
        setError('Failed to load navigation options.');
      } finally {
        setLoading(false);
      }
    };

    fetchNavOptions();
  }, []);

  return (
    <nav className="p-2 shadow-lg">
      <div className="container mx-auto flex justify-center">
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-500">Home</Link>

          {loading ? (
            <span className="text-gray-500">Loading...</span>
          ) : error ? (
            <span className="text-red-500">{error}</span>
          ) : (
            navOptions
              .filter(nav => nav.category && nav.category.length > 0) // Ensure category is valid
              .filter(nav => news.some(item => item.category === nav.category)) // Filter based on news
              .map(nav => (
                <Link key={nav.id} to={`/${nav.category.toLowerCase()}`} className="hover:text-gray-500">
                  {nav.category}
                </Link>
                
              ))
          )}

          <Link to="/dashboard" className="hover:text-gray-500">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
