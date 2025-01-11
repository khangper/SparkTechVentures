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
import StaffPage from './page/StaffPage/StaffPage.jsx';
import LessorPage from './page/LessorPage/LessorPage.jsx';
import TransactionHistory from './page/TransactionHistoryPage/TransactionHistory.jsx';
import OrderDetailsPage from './page/OrderDetailsPage/OrderDetailsPage.jsx';
import OrderListPage from './page/OrderListPage/OrderListPage.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  // Hàm này sẽ được gọi khi người dùng đăng nhập thành công
  const handleLogin = (email, password, role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  // Hàm logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    // Tùy chọn chuyển hướng về home
    window.location.href = '/';
  };
  return (
    <Router>
      <Header
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        onLogout={handleLogout}
      />
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
  <Route path="/ViewDetail" element={<ViewDetail />} /> 
  <Route path="/CheckoutPage" element={<CheckoutPage />} />  
  <Route path="/transaction" element={<TransactionHistory />} />
  <Route path="/order/:orderId" element={<OrderDetailsPage />} />
  <Route
          path="/orders"
          element={
            
              <OrderListPage />
        
          }
        />

   {/* Chỉ cho MEMBER */}
   <Route
          path="/member"
          element={
            isLoggedIn && userRole === 'CUSTOMER' ? (
              <Member />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Giỏ hàng: chỉ cho MEMBER */}
        <Route
          path="/ShoppingCart"
          element={
            isLoggedIn && userRole === 'CUSTOMER' ? (
              <ShoppingCart />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            isLoggedIn && userRole === 'ADMIN' ? (
              <Admin />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Staff */}
        <Route
          path="/staff"
          element={
            isLoggedIn && userRole === 'STAFF' ? (
              <StaffPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

         {/* LESSOR */}
         <Route
          path="/lessor"
          element={
            isLoggedIn && userRole === 'LESSOR' ? (
              <LessorPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
  <Route path="*" element={<Navigate to="/" />} />
</Routes>

      <Footer />
    </Router>
  );
}

export default App;



