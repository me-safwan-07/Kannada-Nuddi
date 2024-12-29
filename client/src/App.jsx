import { useContext, useEffect, useState } from 'react';
import './App.css';
import GoToTop from './components/common/GoTop';
import Header from './components/common/Header';
import { RouteHandler } from './Routes';
import { Analytics } from '@vercel/analytics/react';
import { getAllNews } from './services/operations/newsApi';
import { getAllStory } from './services/operations/storyApi';
import { getAllCategories } from './services/operations/categoryApi';
import { AuthContext } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const [news, setNews] = useState([]);
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch all data concurrently
    const fetchData = async () => {
      try {
        const [newsData, storiesData, categoriesData] = await Promise.all([
          getAllNews(),
          getAllStory(),
          getAllCategories()
        ]);

        // set the fetched data to the state
        setNews(newsData);
        setStories(storiesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchData();
  }, [news, setCategories, categories]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-w-80 ">
      {/* Main content with routes */}
      <main>
        {/* <Routers
          news={news}
          stories={stories}
          categories={categories}
          loading={loading}
        /> */}
        <Router>
          <Routes>
            <Route 
              path='*' 
              element ={
                <RouteHandler 
                  isLoggedIn={isLoggedIn}
                  news={news}
                  setNews={setNews}
                  stories={stories}
                  categories={categories}
                />
              }
            />
          </Routes>
        </Router>
      </main>
        <GoToTop />
      <Analytics />
    </div>
  );
}

export default App;
