import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import api from "../../../Context/api";
import { motion } from "framer-motion";
import logo from "../../../assets/logo.jpg";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gọi API login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setErrorMessage("Vui lòng nhập email và mật khẩu.");
      setIsLoading(false);
      return;
    }

    try {
      // Gọi API đăng nhập
      const response = await api.post("auth/login", {
        username: formData.email,
        password: formData.password,
      });

      if (response.data.isSuccess) {
        const { id, role, accessToken, username, email } = response.data.data;
        localStorage.setItem("accessToken", accessToken);

        // Lấy thông tin user
        const userInfoResponse = await api.get("auth/user-infor");
        const userData = userInfoResponse.data.data;

        dispatch(
          login({
            token: accessToken,
            role,
            accountId: id,
            username,
            fullName: userData.fullName,
            gender: userData.gender,
            email,
            phone: userData.phone,
            address: userData.address,
            dateOfBirth: userData.dateOfBirth,
            picture: userData.picture || "",
            storeId: userData.storeId,
            storeName: userData.storeName,
          })
        );

        // Điều hướng theo vai trò
        navigate(
          role === "ADMIN"
            ? "/admin"
            : role === "STAFF"
            ? "/staff"
            : role === "LESSOR"
            ? "/lessor"
            : "/"
        );
      } else {
        setErrorMessage(response.data.message || "Thông tin đăng nhập không hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      setErrorMessage(error.response?.data?.message || "Đăng nhập thất bại, vui lòng thử lại.");
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
        {/* Phần giới thiệu */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-l-2xl p-10 text-white flex flex-col justify-between">
          <div>
            <img src={logo} alt="Logo" className="w-32 mb-6" />
            <h2 className="text-3xl font-bold mb-4">SparkTech Ventures</h2>
            <p className="text-white/80 mb-6">
              Sáng Tạo. Phát Triển. Nâng Tầm. Tham gia nền tảng của chúng tôi để khám phá giải pháp công nghệ đột phá.
            </p>
          </div>
          <ul className="space-y-4">
            {["Giải pháp công nghệ cao cấp", "Hỗ trợ 24/7", "Bảo mật hàng đầu"].map((text, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="bg-white/20 p-1 rounded-full">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Phần đăng nhập */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-800">Chào Mừng Trở Lại</h2>
          <p className="text-gray-500 mt-2">Vui lòng đăng nhập vào tài khoản của bạn</p>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Email hoặc Số Điện Thoại</label>
              <input
                type="text"
                name="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="Nhập email hoặc số điện thoại"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Mật Khẩu</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end mb-8">
              <span className="text-sm text-amber-600 hover:text-amber-800 cursor-pointer">Quên Mật Khẩu?</span>
            </div>

            {errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{errorMessage}</div>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex justify-center"
              disabled={isLoading}
            >
              {isLoading ? <span className="animate-spin">🔄</span> : "Đăng Nhập"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Chưa có tài khoản?
              <span className="text-amber-600 hover:text-amber-800 ml-1 cursor-pointer" onClick={() => navigate("/signup")}>
                Đăng ký
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
