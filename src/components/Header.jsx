// import React from "react";
// import "./Header.css";
// import { Link, useNavigate } from "react-router-dom";

// export default function Header({ isLoggedIn, userRole }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // localStorage.removeItem("isLoggedIn");
//     // localStorage.removeItem("userRole");
//     // localStorage.removeItem("accessToken");
//     localStorage.clear();
//     console.log(isLoggedIn);

//     // setIsLoggedIn(false);
//     // setUserRole("");
//     navigate('/login')
//   };
//   return (
//     <header className="header">
//       <div className="logo">SparkTech Ventures</div>
//       <nav className="nav">
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         <Link to="/contact">Contact</Link>
//         <Link to="/question">Question</Link>
//         <Link to="/blog">Blog</Link>

//         {/* Chỉ hiển thị giỏ hàng cho MEMBER đã đăng nhập */}
//         {isLoggedIn && userRole === "CUSTOMER" && (
//           <Link to="/ShoppingCart">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               fill="currentColor"
//               class="bi bi-cart-fill"
//               viewBox="0 0 16 16"
//             >
//               <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
//             </svg>
//           </Link>
//         )}
//       </nav>

//       <div className="auth-links">
//         {isLoggedIn && userRole === "CUSTOMER" && (
//           <Link to="/transaction">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               fill="currentColor"
//               class="bi bi-basket-fill"
//               viewBox="0 0 16 16"
//             >
//               <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0z" />
//             </svg>
//           </Link>
//         )}

//         {isLoggedIn && userRole === "CUSTOMER" && (
//           <Link to="/orders">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               fill="currentColor"
//               class="bi bi-bell-fill"
//               viewBox="0 0 16 16"
//             >
//               <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
//             </svg>
//           </Link>
//         )}

//         {isLoggedIn ? (
//           <span className="bnt-logout" onClick={handleLogout}>
//             Logout
//           </span>
//         ) : (
//           <>
//             <Link to="/login">Login</Link>
//             {/* Nếu có trang đăng ký */}
//             <Link to="/signup">Sign up</Link>
//           </>
//         )}
//       </div>
//     </header>
//   );
// }
import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { persistor } from "../redux/store";


export default function Header() {
  const { isLoggedIn, userRole } = useSelector((state) => state.auth);
  console.log(isLoggedIn, userRole);
  
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
  };

  return (
    <header className="header">
      <div className="logo">SparkTech Ventures</div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/question">Question</Link>
        <Link to="/blog">Blog</Link>

        {/* Hiển thị giỏ hàng nếu là CUSTOMER */}
        {isLoggedIn && userRole === "CUSTOMER" && (
          <Link to="/ShoppingCart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
          </Link>
        )}
      </nav>

      <div className="auth-links">
        {isLoggedIn && userRole === "CUSTOMER" && (
         <Link to="/transaction" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-basket-fill"
              viewBox="0 0 16 16"
            >
              <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0z" />
            </svg>
          </Link>
        )}

        {isLoggedIn && userRole === "CUSTOMER" && (
          <Link to="/orders">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-bell-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
            </svg>
          </Link>
        )}

        {isLoggedIn ? (
          <span className="bnt-logout" onClick={handleLogout}>
            Logout
          </span>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </header>
  );
}
