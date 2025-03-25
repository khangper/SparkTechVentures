// import React, { useState, useEffect } from "react";
// import "./Header.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../redux/slices/authSlice";
// import { persistor } from "../redux/store";

// export default function Header() {
//   const { isLoggedIn, userRole } = useSelector((state) => state.auth);
//   console.log(isLoggedIn, userRole);

//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     dispatch(logout());
//     persistor.purge();
//   };

//   return (
//     <div>
//       <div className="Header-main-container">
//         <div className="Header-iconContainer">
//           <div className="Header-symbol-1" />
//           <div className="Header-symbol-2" />
//           <div className="Header-symbol-3" />
//           <div className="Header-symbol-4" />
//         </div>
//         <div className="Header-localtion">
//           <span className="Header-dai-hoc-fpt-quan">Đại Học FPT Quận 9</span>
//           <span className="Header-phone-number">0374277590</span>
//         </div>
//       </div>

//           <header className="header">
//       <div className="logo">SparkTech Ventures</div>
//       <nav className="nav">
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         <Link to="/contact">Contact</Link>
//         <Link to="/question">Question</Link>
//         <Link to="/blog">Blog</Link>

//         {/* Hiển thị giỏ hàng nếu là CUSTOMER */}
//         {isLoggedIn && userRole === "CUSTOMER" && (
//           <Link to="/ShoppingCart">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               fill="currentColor"
//               className="bi bi-cart-fill"
//               viewBox="0 0 16 16"
//             >
//               <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
//             </svg>
//           </Link>
//         )}
//       </nav>
//       <div className="auth-links">
//         {isLoggedIn && userRole === "CUSTOMER" && (
//          <Link to="/transaction" >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               fill="currentColor"
//               className="bi bi-basket-fill"
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
//               className="bi bi-bell-fill"
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
//             <Link to="/signup">Sign up</Link>
//           </>
//         )}
//       </div>
//          </header>
//     </div>

//   );
// }
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import logo from "../../src/assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { persistor } from "../redux/store";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username, email, picture } = useSelector((state) => state.auth);
  const imageNotSignIn =
    "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log(isLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2 backdrop-blur-md"
          : "bg-white py-3"
      }`}
    >
      <div className="container mx-auto max-w-screen-lg flex justify-between items-center px-4 transition-all">
        <Link to={"/"}>
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Logo"
              className={`w-10 h-10 rounded-full border-2 border-yellow-500 transition-all ${
                isScrolled ? "w-8 h-8" : "w-10 h-10"
              }`}
            />
            <span
              className={`text-yellow-500 font-bold transition-all ${
                isScrolled ? "text-lg" : "text-xl"
              }`}
            >
              SparkTech Ventures
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to={"/"} className="no-underline">
            <a href="#" className="text-yellow-500 font-bold no-underline">
              Trang chủ
            </a>
          </Link>
          <Link to={`about`}>
            <a
              href="#"
              className="hover:text-yellow-500 text-slate-500 transition no-underline"
            >
              Giới thiệu
            </a>
          </Link>

          {/* <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-yellow-500 transition text-slate-500">
              <span>Xây dựng</span>
              <ChevronDown size={16} />
            </button>
            <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md hidden group-hover:block">
              <a
                href="#"
                className="block px-4 py-2 hover:bg-yellow-500 hover:text-white text-slate-500 no-underline"
              >
                Cho thuê
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-yellow-500 hover:text-white text-slate-500 no-underline"
              >
                Mua bán
              </a>
            </div>
          </div> */}

          {/* <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-yellow-500 transition text-slate-500">
              <span>Trang khác</span>
              <ChevronDown size={16} />
            </button>
            <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md hidden group-hover:block ">
              <a
                href="/contact"
                className="block px-4 py-2 hover:bg-yellow-500 hover:text-white text-slate-500 no-underline"
              >
                Liên hệ
              </a>
              <a
                href="/blog"
                className="block px-4 py-2 hover:bg-yellow-500 hover:text-white text-slate-500 no-underline"
              >
                Blog
              </a>
            </div>
          </div> */}
                    <a
            href="/blog"
            className="hover:text-yellow-500 transition text-slate-500 no-underline"
          >
            Blog
          </a>

          <a
            href="/contact"
            className="hover:text-yellow-500 transition text-slate-500 no-underline"
          >
            Liên hệ
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Cart SVG Icon */}
          <Link to={"/ShoppingCart"}>
            <a
              href="/ShoppingCart"
              className="text-slate-700 hover:text-yellow-500 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-cart-fill"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            </a>
          </Link>

          <div className="relative">
            <div
              className={`cursor-pointer transition-all ${
                isScrolled ? "scale-90" : "scale-100"
              }`}
              onClick={toggleMenu}
            >
              <img
                src={picture || imageNotSignIn}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-yellow-500"
              />
            </div>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                <Link to={"profile"} className="no-underline">
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-yellow-500 hover:text-white text-slate-500 no-underline"
                  >
                    Trang cá nhân
                  </a>
                </Link>

                <Link to={`/transaction`} className="no-underline">
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-yellow-500 hover:text-white text-slate-500 no-underline"
                  >
                    Lịch sử mua
                  </a>
                </Link>

                {!isLoggedIn ? (
                  <Link to={"/login"} className="no-underline">
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-yellow-500 hover:text-white text-slate-500 no-underline border-t border-gray-200"
                    >
                      Đăng nhập
                    </a>
                  </Link>
                ) : (
                  <a
                    onClick={handleLogout}
                    href="#"
                    className="block px-4 py-2 hover:bg-yellow-500 hover:text-white text-slate-500 no-underline border-t border-gray-200"
                  >
                    Đăng xuất
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
