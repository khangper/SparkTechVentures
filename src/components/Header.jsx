import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header({ isLoggedIn, onLogout }) {
  return (
    <header className="header">
      <div className="logo">SparkTech Ventures</div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/question">Question</Link>
        <Link to="/blog">Blog</Link>
        {isLoggedIn ? (
          <>
             <Link to ="/ShoppingCart"><div  className="HD-cart-icon" /></Link>
          </>
        ) : (
          <>
            
          </>
        )}
        {/* <Link to ="/ShoppingCart"><div  className="HD-cart-icon" /></Link> */}
      </nav>
      <div className="auth-links">
        {isLoggedIn ? (
          <>
            <span onClick={onLogout}>Logout</span>
          </>
        ) : (
          <>
            <Link to="/signup">Sign up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </header>
  );
}
