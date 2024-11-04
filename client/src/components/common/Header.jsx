import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { IoMdSearch } from 'react-icons/io';
import { getAllCategories } from '../../services/operations/categoryApi';
import { dashboardSidebarData, WebsiteName } from '../../data';
import axios from 'axios';
import Avatar from 'react-avatar';
import { FaChevronDown } from 'react-icons/fa'; // Import dropdown icon

const Header = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [navOptions, setNavOptions] = useState([]);
    const [error, setError] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu

    useEffect(() => {
        const fetchNavOptions = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/category");
                setNavOptions(response.data); // Use response.data to access the array
            } catch (err) {
                setError('Failed to fetch categories');
            }
        };

        fetchNavOptions();
    }, []);

    const toggleSearch = () => {
        setIsSearchOpen(prev => !prev);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const performSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
        setSearchTerm('');
        setIsSearchOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    return (
        <div>
            <div className="flex items-center justify-between p-2 bg-black text-white">
                <div className="text-lg md:text-xl font-bold">
                    <Link to="/">
                        {WebsiteName.toUpperCase()}
                    </Link>
                </div>
                <nav className="hidden lg:block items-center overflow-x-auto whitespace-nowrap relative">
                    {navOptions.slice(0, 5).map((cat) => (
                        <div key={cat.id} className="relative inline-block">
                            <Link
                                to={`/category/${cat.category.toLowerCase()}`}
                                className="hover:text-gray-500 text-sm font-bold px-2 gap-2 flex items-center"
                            >
                                {cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}
                            </Link>
                        </div>
                    ))}
                    {navOptions.length > 5 && (
                        <div className="relative inline-block">
                            <button
                                className="flex items-center text-sm font-bold px-2 gap-2 hover:text-gray-500"
                                onClick={toggleDropdown}
                            >
                                More
                                <FaChevronDown className="ml-1 text-gray-500" />
                            </button>
                            
                        </div>
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
            <div className="lg:hidden bg-gray-500 text-white h-8 flex items-center justify-center">
                <nav className="flex items-center overflow-x-auto whitespace-nowrap scrollbar-visible">
                    {navOptions.map((cat) => (
                        <Link
                            key={cat.id}
                            to={`/category/${cat.category.toLowerCase()}`}
                            className="text-sm font-normal px-2 flex items-center h-full font-serif" // Use the custom serif font
                        >
                            {cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="hidden md:block">
                {isDropdownOpen && (
                    <div className="relative top-8 left-50 z-50 bg-white shadow-md rounded-md w-48 py-2">
                        {navOptions.slice(5).map((subCat) => (
                            <Link
                                key={subCat.id}
                                to={`/category/${subCat.category.toLowerCase()}`}
                                className="block text-sm font-normal px-4 py-1 hover:bg-gray-100"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                {subCat.category.charAt(0).toUpperCase() + subCat.category.slice(1)}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
};

export default Header;
