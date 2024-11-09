import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import BlogPage from './pages/BlogPage';
import Dashboard from './pages/Dashboard';
import { AuthContext } from './context/AuthContext';
import { Login } from './pages/Login';
import "./App.css";
import DashboardProvider from './context/DashboardContext';
import AdminLogin from './pages/AdminLogin';
import DashboardCategory from './components/core/dashboard/DashboardCategory';
import CategoryPage from './pages/CategoryPage';
import Header from './components/common/Header';

const Routers = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<RouteHandler isLoggedIn={isLoggedIn} />} />
      </Routes>
    </Router>
  );
};

// This component handles route-specific logic
const RouteHandler = ({ isLoggedIn }) => {
  const location = useLocation(); // Now it's within Router context

  // Check if the current path is a dashboard-related path
  const isDashboardPath = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboardPath && <Header />}
      <DashboardProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path='/blog/:id' element={<BlogPage />} />
          <Route path='/login' element={<Login />} />
          {isLoggedIn && (
            <>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/dashboard/categorys' element={<DashboardCategory />} />
              <Route path='/:category' element={<CategoryPage />} />
            </>
            
          )}
          
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </DashboardProvider>
    </>
  );
};

export default Routers;
