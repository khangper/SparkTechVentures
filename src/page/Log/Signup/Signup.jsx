import React, { useState } from 'react';
import axios from 'axios';
import "./Signup.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://6773bdd177a26d4701c6355f.mockapi.io/Sigup', {
        firstName,
        lastName,
        birthDate,
        email,
        password
      });
      console.log(response.data);
      alert('Signup successful');
    } catch (error) {
      console.error('There was an error signing up!', error);
    }
  };

  return (
    <div className='Signup-Allcontainer'>
      <div className='Signup-header'>
        <div className='SU-Container'>
          <div className='SU-ra1'>            
            <div className="CU-frame">
              <div className="CU-frame-2">
                <div className="CU-frame-3">
                  <div className="CU-vector" />
                  <span className="CU-contact-us">Sign up</span>
                </div>
              </div>
              <div className="CU-frame-4">
                <span className="CU-lorem-ipsum">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis
                  egestas pellentesque libero dolor in diam consequat ut. Mi nibh
                  amet viverra id aliquet neque odio.
                </span>
                <button className="CU-button" onClick={handleSignup}>
                  <span className="CU-send-message">SEND A MESSAGE</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='SU-from'>
        <div className='container'>
          <div className='row'>
            <div className='col-6'>
              <div className="SU-frame-135">
                <div className="SU-personal-infor">Personal Infor</div>
                <img className="SU-vector-2" src="vector-20.svg" />
              </div>
              <div className='SU-PersonalIn4'>
                <div className="SU-frame-14">
                  <input 
                    className="SU-first-name" 
                    placeholder="First name" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="SU-frame-14">
                  <input 
                    className="SU-first-name" 
                    placeholder="Last name" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="SU-frame-14">
                  <input 
                    className="SU-first-name" 
                    placeholder="Birth day" 
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className="SU-frame-135">
                <div className="SU-personal-infor">Create Account</div>
                <img className="SU-vector-2" src="vector-20.svg" />
              </div>
              <div className='SU-PersonalIn4'>
                <div className="SU-frame-14">
                  <input 
                    className="SU-first-name" 
                    placeholder="Email/Phone" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="SU-frame-14">
                  <input 
                    type='password'  
                    className="SU-first-name" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="SU-frame-14">
                  <input 
                    type='password' 
                    className="SU-first-name" 
                    placeholder="Re-Password" 
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='SU-Button'>
              <div className="SsU-button" onClick={handleSignup}>
                <div className="SU-free-quote">Sign up</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
