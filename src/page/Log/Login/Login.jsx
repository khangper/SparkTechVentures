import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleEnterKey = (event) => {
      if (event.key === 'Enter') {
        handleSubmit(event);
      }
    };

    window.addEventListener('keydown', handleEnterKey);
    return () => {
      window.removeEventListener('keydown', handleEnterKey);
    };
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      alert('Please fill in both email and password fields.');
      return;
    }
  
    // Check for admin login
    if (email === 'admin@gmail.com' && password === '123') {
      onLogin(email, password);
      navigate('/admin');
    } else {
      // Check for member login
      try {
        const response = await axios.get(`https://6773bdd177a26d4701c6355f.mockapi.io/Sigup?email=${email}&password=${password}`);
        if (response.data.length > 0) {
          onLogin(email, password);
          navigate('/member');
        } else {
          alert('Invalid login credentials');
        }
      } catch (error) {
        console.error('There was an error logging in!', error);
        alert('There was an error logging in!');
      }
    }
  };
  
  return (
    <div className='LG-container'>
      <div className='Signup-header'>
        <div className='SU-Container'>
          <div className='LG-ra1'>  
            <div className='LG-ra2'>
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

              <div className='LG-input'>
                <div className="LG-frame-14">
                  <input 
                    type='email'  
                    className="SU-first-name" 
                    placeholder="Email/Phone"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="LG-frame-14">
                  <input 
                    type='password' 
                    className="SU-first-name" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='LG-forgot'>
                  Forgot Password?
                </div>
                <div className='LG-button' onClick={handleSubmit}>
                  <div className='LG-free-quote'>Enter</div>
                </div>
              </div>
            </div>          
          </div>
        </div>
      </div>
    </div>
  );
}
