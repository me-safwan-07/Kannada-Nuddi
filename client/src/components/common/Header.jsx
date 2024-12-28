import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Avatar from 'react-avatar';
import { FaChevronDown } from 'react-icons/fa';
import { getAllNews } from '../../services/operations/newsApi';

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
                // const newsResponse = await axios.get("http://localhost:3000/api/news");
                const newsResponse = await getAllNews();
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
            <div className="flex items-center justify-between px-2 bg-black text-white h-14">
                <div className="text-xl md:text-xl font-bold">
                    <Link to="/">KANNADA NUDDI</Link>
                </div>
                <nav className="hidden lg:flex items-center overflow-x-auto whitespace-nowrap">
                    {navOptions.length > 0 && (
                        <>
                            <Link to="/" className="hover:underline hover:text-white text-gray-300 text-sm font-bold px-2">
                                Home
                            </Link>
                            {navOptions.slice(0, 9).map((cat) => (
                                <Link
                                    key={cat.id}
                                    to={`/category/${cat.category.toLowerCase()}`}
                                    className="hover:underline hover:text-white text-gray-300 text-sm font-medium px-2"
                                >
                                    {cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}
                                </Link>
                            ))}
                            {/* {navOptions.length > 9 && (
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
                            )} */}
                        </>
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
            {navOptions && navOptions.length > 0 && (
                <div className="lg:hidden bg-black-100 text-white h-12 sm:h-10 flex items-center justify-center shadow-md scroll-container">
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
            )}
        </div>
    );
};

export default Header;
