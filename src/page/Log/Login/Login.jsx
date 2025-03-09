import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import api from "../../../Context/api";
import { motion } from "framer-motion";
import logo from "../../../assets/logo.jpg" // Add your logo path here

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("auth/login", {
        username: email,
        password: password,
      });

      if (response.data.isSuccess) {
        const { id, role, accessToken, username, email } = response.data.data;
        
        localStorage.setItem("accessToken", accessToken);

        const userInfoResponse = await api.get("auth/user-infor");
        const picture = userInfoResponse.data.data.picture || "";

        dispatch(
          login({
            token: accessToken,
            role,
            accountId: id,
            username,
            email,
            picture,
          })
        );

        switch (role) {
          case "ADMIN":
            navigate("/admin");
            break;
          case "STAFF":
            navigate("/staff");
            break;
          case "CUSTOMER":
            navigate("/");
            break;
          case "LESSOR":
            navigate("/lessor");
            break;
          default:
            alert("Unknown role!");
        }
      } else {
        setErrorMessage(response.data.message || "Invalid login credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl"
      >
      
        <div className="w-full md:w-1/2 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-l-2xl p-10 text-white flex flex-col justify-between">
          <div>
            <img src={logo} alt="Logo Công Ty" className="w-32 mb-6" />
            <h2 className="text-3xl font-bold mb-4">SparkTech Ventures</h2>
            <p className="text-white/80 mb-6">
              Sáng Tạo. Phát Triển. Nâng Tầm. Tham gia nền tảng của chúng tôi để khám phá giải pháp công nghệ đột phá cho nhu cầu của bạn.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>Giải pháp công nghệ cao cấp</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>Hỗ trợ 24/7</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>Bảo mật hàng đầu ngành</span>
            </div>
          </div>
        </div>

        {/* Phần bên phải */}
        <div className="w-full md:w-1/2 p-10">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Chào Mừng Trở Lại</h2>
            <p className="text-gray-500 mt-2">Vui lòng đăng nhập vào tài khoản của bạn</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Email hoặc Số Điện Thoại</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="Nhập email hoặc số điện thoại"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Mật Khẩu</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-end mb-8">
              <span className="text-sm text-amber-600 hover:text-amber-800 cursor-pointer">Quên Mật Khẩu?</span>
            </div>

            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {errorMessage}
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : "Đăng Nhập"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Chưa có tài khoản? 
              <span 
                className="text-amber-600 hover:text-amber-800 ml-1 cursor-pointer"
                onClick={() => navigate('/signup')}
              >
                Đăng ký
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
