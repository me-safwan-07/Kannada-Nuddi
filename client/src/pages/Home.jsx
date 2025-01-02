import { useEffect, useState, useCallback } from 'react';
// import { Link } from 'react-router-dom';
// import { LuTimer } from "react-icons/lu";
import 'react-toastify/dist/ReactToastify.css';
import 'react-circular-progressbar/dist/styles.css';

// Components
// import FakeAd from '../components/common/FakeAd';
import { HeroSection } from '../components/core/home/HeroSection';
import { HorizontialNews } from '../components/core/home/HorizontialNews';
// import { ThreelayoutNews } from '../components/core/home/ThreelayoutNews';
import { getAllNews } from '../services/operations/newsApi';
import { Stories } from '../components/core/Stories';
import { getAllStory } from '../services/operations/storyApi';
import { SixSmallImages } from '../components/core/home/SixSmallImage';
import Sidebar from '../components/core/home/Sidebar';

// Skeleton Loader Component
const SkeletonLoader = ({ type }) => {
  const commonSkeletonClasses = 'bg-gray-300 rounded-lg animate-pulse';

  if (type === 'news') {
    return (
      <div className="space-y-4">
        <div className={`${commonSkeletonClasses} w-full h-8`} />
        <div className={`${commonSkeletonClasses} w-3/4 h-6`} />
        <div className={`${commonSkeletonClasses} w-1/2 h-6`} />
      </div>
    );
  }

  if (type === 'image-grid') {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className={`${commonSkeletonClasses} h-40`} />
        ))}
      </div>
    );
  }

  if (type === 'stories') {
    return (
      <div className="flex gap-4 overflow-x-auto animate-pulse">
        {[...Array(6)].map((_, index) => (
          <div key={index} className={`${commonSkeletonClasses} w-1/6 h-64`} />
        ))}
      </div>
    );
  }

  return null;
};

const Home = ({news}) => {
  const [allNews, setAllNews] = useState([]);
  const [category, setCategory] = useState([]);
  const [stories, setStories] = useState([]);
  const [error, setError] = useState('');

  const [heroSectionNews, setHeroSectionNews] = useState([]);
  const [firstHorizontalNews, setFirstHorizontalNews] = useState([]);
  const [sixSmallImagesNews, setSixSmallImagesNews] = useState([]);
  const [secondHorizontalNews, setSecondHorizontalNews] = useState([]);

  const [storyLoading, setStoryLoading] = useState(false);

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

      if (!data) {
        return console.error("No data found");
      }

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

  const fetchStories = useCallback(async () => {
    try {
      setStoryLoading(true);
      const data = await getAllStory();
      if (data) {
        setStories(data);
        setStoryLoading(false);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
      setError('Failed to fetch stories. Please try again later.');
    }
  });

  useEffect(() => {
    fetchBlogs();
    fetchStories();
  }, []);

  const truncateContent = (text, limit = 100) => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="md:flex-row md:mx-auto md:p-4 space-y-6 md:space-y-0">
      {news.length > 0 ? (
        <>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="md:border-r border-slate-500 w-full md:w-4/5 space-y-4">
              {error && <div className="text-red-500">{error}</div>}

              {/* Hero Section */}
              {news.length > 0 ? (
                <div className="md:border-b border-slate-500 mx-1 md:mx-4">
                  <HeroSection
                    news={news.slice(0,7)}
                    truncateContent={truncateContent}
                    formatDate={formatDate}
                  />
                </div>
              ) : (
                <SkeletonLoader type="news" />
              )}

              {/* Horizontal News */}
              {news.length > 7 ? (
                <div className="border-b border-slate-500 mx-4">
                  <HorizontialNews
                    news={news.slice(7,11)}
                    truncateContent={truncateContent}
                    formatDate={formatDate}
                  />
                </div>
              ) : (
                <SkeletonLoader type="news" />
              )}

              {/* Six Small Images */}
              {news.length > 11 ? (
                <div className="md:pb-4 mx-4 border-slate-500">
                  <SixSmallImages
                    news={news.slice(11,17)}
                    truncateContent={truncateContent}
                    formatDate={formatDate}
                  />
                </div>
              ) : (
                <SkeletonLoader type="image-grid" />
              )}

              {/* Second Horizontal News */}
              {news.length > 17 > 0 ? (
                <div className="border-b border-slate-500 mx-4">
                  <HorizontialNews
                    news={news.slice(17,21)}
                    truncateContent={truncateContent}
                    formatDate={formatDate}
                  />
                </div>
              ) : (
                <SkeletonLoader type="news" />
              )}
            </div>

            {/* Sidebar for Ads */}
            <aside className="pl-3 w-full md:w-1/5 flex flex-col space-y-4">
              {/* <FakeAd className="w-full h-64 bg-black-100" /> */}
              <Sidebar />
            </aside>
          </div>

          {/* Stories Section */}
          {/* <div>
            {storyLoading ? (
              <SkeletonLoader type="stories" />
            ) : (
              <Stories storyData={stories} loading={storyLoading} />
            )}
          </div> */}
        </>
      ) : (
        <SkeletonLoader />
      )}
    </div>
  );
};

export default Home;
