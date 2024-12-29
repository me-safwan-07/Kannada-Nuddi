import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Avatar from 'react-avatar';
import { FaChevronDown } from 'react-icons/fa';
import { getAllNews } from '../../services/operations/newsApi';
import { getAllCategories } from '../../services/operations/categoryApi';

const Header = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [allNews, setAllNews] = useState([]);
    const [navOptions, setNavOptions] = useState([]);
    const [error, setError] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoryResponse, newsResponse] = await Promise.all([
                    getAllCategories(),
                    getAllNews()
                ]);
                setNavOptions(categoryResponse);
                setAllNews(newsResponse);
            } catch (err) {
                setError('Failed to fetch data');
            }
        };

        fetchData();
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    // Filter categories that have corresponding news
    const categoriesWithNews = navOptions.filter((cat) => {
        // Check if there's news in the current category
        return allNews.some((newsItem) => newsItem.category.toLowerCase() === cat.category.toLowerCase());
    });

    return (
        <div>
            <div className="flex items-center justify-between px-2 bg-black text-white h-14">
                <div className="text-xl md:text-xl font-bold">
                    <Link to="/">KANNADA NUDDI</Link>
                </div>
                <nav className="hidden lg:flex items-center overflow-x-auto whitespace-nowrap">
                    {categoriesWithNews.length > 0 && (
                        <>
                            <Link to="/" className="hover:underline hover:text-white text-gray-300 text-sm font-bold px-2">
                                Home
                            </Link>
                            {categoriesWithNews.slice(0, 9).map((cat) => (
                                cat.category && (
                                    <Link
                                        key={cat.id}
                                        to={`/categorys/${cat.category.toLowerCase()}`}
                                        className="hover:underline hover:text-white text-gray-300 text-sm font-medium px-2"
                                    >
                                        {cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}
                                    </Link>
                                )
                            ))}
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

            {categoriesWithNews && categoriesWithNews.length > 0 && (
                <div className="lg:hidden bg-black-100 text-white h-12 sm:h-10 flex items-center justify-center shadow-md scroll-container">
                    <nav className="flex items-center overflow-x-auto whitespace-nowrap">
                        {categoriesWithNews.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/categorys/${cat.category.toLowerCase()}`}
                                className="text-xs font-normal px-2"
                            >
                                {cat.category && cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Header;
