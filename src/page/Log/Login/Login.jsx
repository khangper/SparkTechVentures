import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import api from '../../../Context/api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra input
    if (!email || !password) {
      setErrorMessage('Please fill in both email and password fields.');
      return;
    }

    try {
      // Gọi API đăng nhập
      const response = await api.post('auth/login', {
        username: email,
        password: password,
      });

      if (response.data.isSuccess) {
        // Giải nén dữ liệu trả về
        const { id,role, accessToken, refreshToken } = response.data.data;

        // In token ra console (để kiểm tra)
        console.log('AccessToken:', accessToken);
        console.log('RefreshToken:', refreshToken);

        // Lưu token vào localStorage (nếu cần)
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem("accountId", id);
        localStorage.setItem("role", role);

        // Gọi hàm onLogin (được truyền từ App.js) để cập nhật state toàn cục
        onLogin(email, password, role);

        // Điều hướng tuỳ theo role
        if (role === 'ADMIN') {
          navigate('/admin');
        } else if (role === 'STAFF') {
          navigate('/staff');
        } else if (role === 'CUSTOMER') {
          navigate('/member');
        } else if (role === 'LESSOR') {
          navigate('/lessor');
        }
         else {
          alert('Unknown role!');
        }
      } else {
        // Server trả về isSuccess = false
        setErrorMessage(response.data.message || 'Invalid login credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Bắt lỗi từ server
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Login failed. Please try again.');
      } else {
        setErrorMessage('Unable to reach the server. Please try again later.');
      }
    }
  };
  return (
    <div className="LG-container">
      <div className="Signup-header">
        <div className="SU-Container">
          <div className="LG-ra1">
            <div className="LG-ra2">
              <div className="LG-frame">
                <div className="CU-frame-2">
                  <div className="CU-frame-3">
                    <div className="CU-vector" />
                    <span className="CU-contact-us">Login</span>
                  </div>
                </div>
                <div className="CU-frame-4">
                  <span className="CU-lorem-ipsum">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis egestas pellentesque libero dolor in diam consequat ut.
                  </span>
                  <button className="CU-button" onClick={handleSubmit}>
                    <span className="CU-send-message">Login</span>
                  </button>
                </div>
              </div>

              <div className="LG-input">
                <div className="LG-frame-14">
                  <input
                    type="email"
                    className="SU-first-name"
                    placeholder="Email/Phone"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="LG-frame-14">
                  <input
                    type="password"
                    className="SU-first-name"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="LG-forgot">Forgot Password?</div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="LG-button" onClick={handleSubmit}>
                  <div className="LG-free-quote">Enter</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



