import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Main from './page/index.jsx';
import Footer from './components/Footer/Footer.jsx';
import HomePage from './page/HomePage/HomePage.jsx';
import AboutUS from './page/AboutUS/AboutUS.jsx';
import ContactUS from './page/ContactUS/ContactUS.jsx';
import Login from './page/Log/Login/Login.jsx';
import Signup from './page/Log/Signup/Signup.jsx';
import Question from './page/Question/Question.jsx';
import Blog from './page/Blog/Blog.jsx';
import Admin from './page/AdminPage/Admin.jsx';
import Member from './page/Member/Member.jsx';
import ShoppingCart from './page/ShoppingCart/ShoppingCart.jsx';
import CheckoutPage from './page/CheckoutPage/CheckoutPage.jsx';
import AllProduct from './page/AllProduct/AllProduct.jsx';
import ViewDetail from './page/ViewDetail/ViewDetail.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (email, password) => {
    if (email === 'admin@gmail.com' && password === '123') {
      setIsAdmin(true);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(true);
      setIsAdmin(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    window.location.href = '/'; // Chuyển hướng về trang Home
  };
  
  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/AllProduct" element={<AllProduct />} />
  <Route path="/main" element={<Main />} />
  <Route path="/about" element={<AboutUS />} />
  <Route path="/contact" element={<ContactUS />} />
  <Route path="/login" element={<Login onLogin={handleLogin} />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/question" element={<Question />} />
  <Route path="/blog" element={<Blog />} />
  <Route path="/ShoppingCart" element={isLoggedIn ? <ShoppingCart /> : <Navigate to="/login" />} />
  <Route path="/CheckoutPage" element={isLoggedIn ? <CheckoutPage /> : <Navigate to="/login" />} />
  <Route path="/ViewDetail" element={<ViewDetail />} />
  <Route path="/admin" element={isLoggedIn && isAdmin ? <Admin /> : <Navigate to="/login" />} />
  <Route path="/member" element={isLoggedIn && !isAdmin ? <Member /> : <Navigate to="/login" />} />
  <Route path="*" element={<Navigate to="/" />} />
</Routes>

      <Footer />
    </Router>
  );
}

export default App;
