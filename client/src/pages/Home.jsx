import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuTimer } from "react-icons/lu";
import 'react-toastify/dist/ReactToastify.css';
import 'react-circular-progressbar/dist/styles.css';

// components
import FakeAd from '../components/common/FakeAd';
import {HeroSection} from '../components/core/home/HeroSection';
import { HorizontialNews } from '../components/core/home/HorizontialNews';
import { getAllNews } from '../services/operations/newsApi';
import DashboardCategory from '../components/core/dashboard/DashboardCategory';
const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');
    const [mainNews, setMainNews] = useState([]);
    const [sliceblog, setSliceblog] = useState([]);
    const [category, setCategory] = useState([]);
    const [titleSize, setTitleSize] = useState(55);

    useEffect(() => {
        const handleResize = () => {
            setTitleSize(window.innerWidth <= 425 ? 75 : 150);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchBlogs = async () => {
        const data = await getAllNews();
        if (data) {
            setBlogs(data);
            setMainNews(data.slice(0, 7));
            setSliceblog(data.slice(5));
            const uniqueCategories = Array.from(new Set(data.map(blog => blog.category.toLowerCase())));
            setCategory(uniqueCategories);
        }
    }

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/news');
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setBlogs(data);
                setMainNews(data.slice(0, 7));
                // const allIds = data.map(blog => blog._id);
                setSliceblog(data.slice(5));
                const uniqueCategories = Array.from(new Set(data.map(blog => blog.category.toLowerCase())));
                setCategory(uniqueCategories);
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
        <div className="flex flex-wrap">
            <div className="w-full md:w-3/4 md:mx-auto md:p-4">
                {error && <div className="text-red-500 mb-4">{error}</div>}

                {/* Hero Section */}
                <HeroSection mainNews={mainNews} truncateContent={truncateContent} formatDate={formatDate} />
                <hr />
                {/* <HorizontialNews mainNews={mainNews} truncateContent={truncateContent} formatDate={formatDate}/> */}
            </div>
            
            <div className="w-full md:w-1/4 borde">
                <aside className='w-full h-full'>
                    <FakeAd className={"flex w-full h-64 bg-black-100"} />
                </aside>
            </div>
            {/* <DashboardCategory /> */}
        </div>

    );
};

export default Home;
