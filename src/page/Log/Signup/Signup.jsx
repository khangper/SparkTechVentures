import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Signup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../../Context/api";
import toast from "react-hot-toast";
import Aos from "aos";
import "aos/dist/aos.css";
import {
  FiUser,
  FiMail,
  FiLock,
  FiCalendar,
  FiHome,
  FiPhone,
} from "react-icons/fi";
import { motion } from "framer-motion";
import logo from "../../../assets/logo.jpg";

export default function Signup() {
  // State for inputs
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState(0);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [picture, setPicture] = useState("");
  const [role, setRole] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (password !== rePassword) {
      setErrorMessage("Mật khẩu không khớp");
      setIsSubmitting(false);
      return;
    }

    const requestBody = {
      username,
      password,
      email,
      fullName,
      gender,
      phone,
      address,
      dateOfBirth,
      picture: picture || "default_picture",
      role,
    };

    try {
      const response = await api.post("auth/register", requestBody);
      setErrorMessage("");
      toast.success("Đăng ký thành công! Vui lòng xác minh email của bạn.");

      setTimeout(() => {
        window.location.href = "https://mail.google.com/";
      }, 1500);
    } catch (error) {
      console.error("There was an error signing up!", error);
      setErrorMessage(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // useEffect(() => {
  //   Aos.init({
  //     duration: 600,
  //     easing: "ease-out",
  //     once: true,
  //   });
  // }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex items-center justify-center p-4">
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
      <div className="md:flex">
        <div className="md:w-1/2 bg-gradient-to-br from-amber-500 to-yellow-600 p-8 flex flex-col justify-center">
        <div>
          <img src={logo} alt="Logo công ty" className="w-32 mb-6" />
        </div>
        <div className="text-white">
          <h2 className="text-3xl font-bold mb-6">Chào mừng đến SparkTech</h2>
          <p className="mb-6 opacity-90">
          Tạo tài khoản để bắt đầu sử dụng dịch vụ của chúng tôi. Hãy tham gia cùng hàng nghìn người dùng hài lòng khác.
          </p>
          <div className="space-y-3 mt-8">
          <div className="flex items-center">
            <div className="bg-amber-500 p-1 rounded-full">
            <div className="bg-white/20 p-1 rounded-full">
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              </svg>
            </div>
            </div>
            <span className="ml-2">Quy trình đặt hàng dễ dàng</span>
          </div>
          <div className="flex items-center">
            <div className="bg-amber-500 p-1 rounded-full">
            <div className="bg-white/20 p-1 rounded-full">
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              </svg>
            </div>
            </div>
            <span className="ml-2">Hỗ trợ khách hàng cao cấp</span>
          </div>
          <div className="flex items-center">
            <div className="bg-amber-500 p-1 rounded-full">
            <div className="bg-white/20 p-1 rounded-full">
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              </svg>
            </div>
            </div>
            <span className="ml-2">Phương thức thanh toán an toàn</span>
          </div>
          </div>
        </div>
        </div>

        <div className="md:w-1/2 p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
          Tạo tài khoản
          </h2>
          <p className="text-sm text-gray-500 mt-1">
          Đăng ký để truy cập dịch vụ của chúng tôi
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Username */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Tên đăng nhập
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-amber-400" />
                    </div>
                    <input
                      type="text"
                      className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Tên đăng nhập"
                      required
                    />
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Họ và tên"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-amber-400" />
                    </div>
                    <input
                      type="email"
                      className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="h-5 w-5 text-amber-400" />
                    </div>
                    <input
                      type="text"
                      className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Số điện thoại"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-amber-400" />
                    </div>
                    <input
                      type="password"
                      className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mật khẩu"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-amber-400" />
                    </div>
                    <input
                      type="password"
                      className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      value={rePassword}
                      onChange={(e) => setRePassword(e.target.value)}
                      placeholder="Xác nhận mật khẩu"
                      required
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Giới tính
                  </label>
                  <select
                    className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    value={gender}
                    onChange={(e) => setGender(Number(e.target.value))}
                  >
                    <option value={0}>Nam</option>
                    <option value={1}>Nữ</option>
                    <option value={2}>Khác</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Ngày sinh
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="h-5 w-5 text-amber-400" />
                    </div>
                    <input
                      type="date"
                      className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Địa chỉ
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiHome className="h-5 w-5 text-amber-400" />
                    </div>
                    <input
                      type="text"
                      className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Địa chỉ"
                    />
                  </div>
                </div>

                {/* Role */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Vai trò
                  </label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        id="customer"
                        name="role"
                        type="radio"
                        checked={role === 0}
                        onChange={() => setRole(0)}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                      />
                      <label
                        htmlFor="customer"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Khách hàng
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="lessor"
                        name="role"
                        type="radio"
                        checked={role === 2}
                        onChange={() => setRole(2)}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                      />
                      <label
                        htmlFor="lessor"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Người cho thuê
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              )}

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex justify-center"
                >
                  {isSubmitting ? "Đang đăng ký..." : "Tạo tài khoản"}
                </button>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Đã có tài khoản?{" "}
                  <a
                    href="/login"
                    className="text-amber-600 hover:text-amber-500 font-medium"
                  >
                    Đăng nhập
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

