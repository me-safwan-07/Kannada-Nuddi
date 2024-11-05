import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Avatar from 'react-avatar';
import { FaChevronDown } from 'react-icons/fa';

const Header = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [allNews, setAllNews] = useState([]);
    const [navOptions, setNavOptions] = useState([]);
    const [error, setError] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await axios.get("http://localhost:3000/api/category");
                const newsResponse = await axios.get("http://localhost:3000/api/news");
                setNavOptions(categoryResponse.data);
                setAllNews(newsResponse.data);
            } catch (err) {
                setError('Failed to fetch data');
            }
        };

        fetchData();
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    return (
        <div>
            <div className="flex items-center justify-between p-2 bg-black text-white">
                <div className="text-lg md:text-xl font-bold">
                    <Link to="/">WEBSITE NAME</Link>
                </div>
                <nav className="hidden lg:flex items-center overflow-x-auto whitespace-nowrap">
                    {navOptions.length > 0 ? (
                        <>
                            <Link to="/" className="hover:text-gray-500 text-sm font-bold px-2">
                                Home
                            </Link>
                            {navOptions.slice(0, 9).map((cat) => (
                                <Link
                                    key={cat.id}
                                    to={`/category/${cat.category.toLowerCase()}`}
                                    className="hover:text-gray-400 text-sm font-bold px-2"
                                >
                                    {cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}
                                </Link>
                            ))}
                            {navOptions.length > 9 && (
                                <div className="relative inline-block">
                                    <button
                                        className="flex items-center text-sm font-bold px-2 hover:text-gray-500"
                                        onClick={toggleDropdown}
                                    >
                                        More
                                        <FaChevronDown className="ml-1 text-gray-500" />
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute top-full mt-2 bg-white shadow-md rounded-md w-48 py-2">
                                            {navOptions.slice(9).map((subCat) => (
                                                <Link
                                                    key={subCat.id}
                                                    to={`/category/${subCat.category.toLowerCase()}`}
                                                    className="block text-sm px-4 py-1 hover:bg-gray-100"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                >
                                                    {subCat.category.charAt(0).toUpperCase() + subCat.category.slice(1)}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <p>No categories available</p>
                    )}
                </nav>
                <div>
                    {!isLoggedIn ? (
                        <Link to="/login">
                            <span className='flex flex-row items-center'>
                                <Avatar facebookId="100008343750912" size={30} round={true} />
                                <span className="hidden md:block ml-2 text-sm">Login</span>
                            </span>
                        </Link>
                    ) : (
                        <Avatar facebookId="100008343750912" size={30} round={true} />
                    )}
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="lg:hidden bg-gray-500 text-white h-5 flex items-center justify-center">
                <nav className="flex items-center overflow-x-auto whitespace-nowrap">
                    {navOptions.map((cat) => (
                        <Link
                            key={cat.id}
                            to={`/category/${cat.category.toLowerCase()}`}
                            className="text-xs font-normal px-2"
                        >
                            {cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Header;
