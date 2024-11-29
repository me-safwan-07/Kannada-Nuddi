import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { LuTimer } from "react-icons/lu";
import 'react-toastify/dist/ReactToastify.css';
import 'react-circular-progressbar/dist/styles.css';

// Components
import FakeAd from '../components/common/FakeAd';
import { HeroSection } from '../components/core/home/HeroSection';
import { HorizontialNews } from '../components/core/home/HorizontialNews';
import { ThreelayoutNews } from '../components/core/home/ThreelayoutNews';
import { getAllNews } from '../services/operations/newsApi';
import { SixSmallImages } from '../components/core/home/sixSmallImage';

const Home = () => {
    const [allNews, setAllNews] = useState([]);
    const [category, setCategory] = useState([]);
    const [error, setError] = useState('');

    const [heroSectionNews, setHeroSectionNews] = useState([]);
    const [firstHorizontalNews, setFirstHorizontalNews] = useState([]);
    const [sixSmallImagesNews, setSixSmallImagesNews] = useState([]);
    const [secondHorizontalNews, setSecondHorizontalNews] = useState([]);

    const [sliceblog, setSliceblog] = useState([]);
    const [titleSize, setTitleSize] = useState(window.innerWidth <= 425 ? 75 : 150);

    const handleResize = useCallback(() => {
        setTitleSize(window.innerWidth <= 425 ? 75 : 150);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    const fetchBlogs = useCallback(async () => {
        try {
            const data = await getAllNews();
            if (data) {
                setAllNews(data);
                setHeroSectionNews(data.slice(0, 7));
                setFirstHorizontalNews(data.slice(0, 4)); // 7, 11
                setSixSmallImagesNews(data.slice(0, 6)); // 12, 18
                setSecondHorizontalNews(data.slice(0, 4)); // 18, 22

                const uniqueCategories = Array.from(new Set(data.map(blog => blog.category.toLowerCase())));
                setCategory(uniqueCategories);
            }
        } catch (err) {
            console.error('Error fetching content:', err);
            setError('Failed to fetch blogs. Please try again later.');
        }
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const truncateContent = (text, limit = 100) => {
        // const text = content.replace(/<[^>]*>/g, '');
        return text.length > limit ? `${text.substring(0, limit)}...` : text;
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className="flex flex-col md:flex-row md:mx-auto p-4 space-y-6 md:space-y-0">
            {allNews.length > 0 ? (
                <>
                    <div className="border-r border-slate-500 w-full md:w-4/5 space-y-4">
                        {error && <div className="text-red-500">{error}</div>}

                        {/* Hero Section */}
                        {heroSectionNews.length > 0 && (
                            <div className="border-b border-slate-300 mx-4">
                                <HeroSection news={heroSectionNews} truncateContent={truncateContent} formatDate={formatDate} />
                                {/* <hr className='mt-3'/> */}
                            </div>
                        )}
                        
                        {/* Horizontal News */}
                        {firstHorizontalNews.length > 0 && (
                            <div className="border-b border-slate-500 mx-4" >
                                <HorizontialNews news={firstHorizontalNews} truncateContent={truncateContent} formatDate={formatDate} />
                                {/* <hr className='mt-3'/> */}
                            </div>
                        )}
                        {sixSmallImagesNews.length > 0 && (
                            <div className="">
                                <SixSmallImages news={sixSmallImagesNews} truncateContent={truncateContent} formatDate={formatDate} />
                                <hr className='text-gray-600 mt-3'/>
                            </div>
                        )}
                        {secondHorizontalNews.length > 0 && (
                            <div className="">
                                <HorizontialNews news={secondHorizontalNews} truncateContent={truncateContent} formatDate={formatDate} />
                                <hr className='mt-3'/>
                            </div>
                        )}

                        {/* // here the web stories will be declare */}
                    </div>

                    {/* Sidebar for Ads */}
                    <aside className=" pl-3 w-full md:w-1/5 flex flex-col space-y-4">
                        <FakeAd className="w-full h-64 bg-black-100" />
                    </aside>                
                </>
                
            ) : <p>Loaidng....</p>}
            
        </div>
    );
};

export default Home;
