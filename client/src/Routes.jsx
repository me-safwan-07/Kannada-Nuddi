import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { Login } from './pages/Login';
import "./App.css";
// import DashboardProvider from './context/DashboardContext';
import DashboardCategory from './components/core/dashboard/DashboardCategory';
import CategoryPage from './pages/CategoryPage';
import Header from './components/common/Header';
import CreateStory from './pages/CreateStory';
import { WebStoryById } from './pages/WebStoryById';
import CreateNews from './pages/CreateNews';
import NewsPage from './pages/NewsPage';

// This component handles route-specific logic
export const RouteHandler = ({ 
  isLoggedIn,
  news,
  setNews,
  stories,
  categories,
}) => {

  return (
    <>
      {/* {!isDashboardPath && <Header />} */}
      <Header />
      {/* <DashboardProvider> */}
        <Routes>
          <Route path="/" element={<Home news={news}/>} />
          <Route path="/create" element={<CreateNews />} />
          <Route path='/news/:id' element={<NewsPage />} />
          <Route path='/categorys/:category' element={<CategoryPage news={news}/>} />
          <Route path='/login' element={<Login />} />
          
          {/* {isLoggedIn && ( */}
            <>
              <Route path='/dashboard' element={<Dashboard news={news} setNews={setNews}/>} />
              <Route path='/dashboard/category' element={<DashboardCategory />} />
              <Route path='/:category' element={<CategoryPage />} />
            </>
            
          {/* )} */}
          <Route path="/creatstory" element={<CreateStory />} />
          <Route path='/story/:storyId' element={<WebStoryById />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      {/* </DashboardProvider> */}
    </>
  );
};