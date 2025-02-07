// import React, { useState } from 'react';
// import axios from 'axios';
// import "./Signup.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import api from '../../../Context/api';

// export default function Signup() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [birthDate, setBirthDate] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rePassword, setRePassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [picture, setPicture] = useState(''); // Optional
//   const [role, setRole] = useState(1); // Mặc định là Customer
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if (password !== rePassword) {
//       setErrorMessage('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await api.post('auth/register', {
//         username: `${firstName}${lastName}`,
//         password,
//         email,
//         phone,
//         address,
//         dateOfBirth: birthDate,
//         picture: picture || 'default_picture', // Optional
//         role
//       });
//       console.log(response.data);
//       alert('Signup successful');
//       setErrorMessage('');
//     } catch (error) {
//       console.error('There was an error signing up!', error);
//       setErrorMessage(error.response?.data?.message || 'Signup failed. Please try again.');
//     }
//   };

//   return (
//     <div className='Signup-Allcontainer'>
//       <div className='Signup-header'>
//         <div className='SU-Container'>
//           <div className='SU-ra1'>            
//             <div className="CU-frame">
//               <div className="CU-frame-2">
//                 <div className="CU-frame-3">
//                   <div className="CU-vector" />
//                   <span className="CU-contact-us">Sign up</span>
//                 </div>
//               </div>
//               <div className="CU-frame-4">
//                 <span className="CU-lorem-ipsum">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis
//                   egestas pellentesque libero dolor in diam consequat ut. Mi nibh
//                   amet viverra id aliquet neque odio.
//                 </span>
//                 <button className="CU-button" onClick={handleSignup}>
//                   <span className="CU-send-message">SEND A MESSAGE</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='SU-from'>
//         <div className='container'>
//           <div className='row'>
//             <div className='col-6'>
//               <div className="SU-frame-135">
//                 <div className="SU-personal-infor">Personal Infor</div>
//                 <img className="SU-vector-2" src="vector-20.svg" />
//               </div>
//               <div className='SU-PersonalIn4'>
//                 <div className="SU-frame-14">
//                   <input 
//                     className="SU-first-name" 
//                     placeholder="First name" 
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                   />
//                 </div>
//                 <div className="SU-frame-14">
//                   <input 
//                     className="SU-first-name" 
//                     placeholder="Last name" 
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                   />
//                 </div>
//                 <div className="SU-frame-14">
//                   <input 
//                     className="SU-first-name" 
//                     placeholder="Birth day (YYYY-MM-DD)" 
//                     value={birthDate}
//                     onChange={(e) => setBirthDate(e.target.value)}
//                   />
//                 </div>
//                 <div className="SU-frame-14">
//                   <input 
//                     className="SU-first-name" 
//                     placeholder="Phone" 
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                   />
//                 </div>
//                 <div className="SU-frame-14">
//                   <input 
//                     className="SU-first-name" 
//                     placeholder="Address" 
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className='col-6'>
//               <div className="SU-frame-135">
//                 <div className="SU-personal-infor">Create Account</div>
//                 <img className="SU-vector-2" src="vector-20.svg" />
//               </div>
//               <div className='SU-PersonalIn4'>
//                 <div className="SU-frame-14">
//                   <input 
//                     className="SU-first-name" 
//                     placeholder="Email" 
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="SU-frame-14">
//                   <input 
//                     type='password'  
//                     className="SU-first-name" 
//                     placeholder="Password" 
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//                 <div className="SU-frame-14">
//                   <input 
//                     type='password' 
//                     className="SU-first-name" 
//                     placeholder="Re-Password" 
//                     value={rePassword}
//                     onChange={(e) => setRePassword(e.target.value)}
//                   />
//                 </div>
//                 <div className="SU-frame-14">
//                   <select 
//                     className="SU-first-name"
//                     value={role}
//                     onChange={(e) => setRole(Number(e.target.value))}
//                   >
//                     <option value={0}>Customer</option>
//                     <option value={1}>Staff</option>
//                     <option value={2}>Lessor</option>
//                   </select>
//                 </div>
//                 <div className="SU-frame-14">
//                   <input 
//                     type='texttext' 
//                     className="SU-first-name" 
//                     placeholder="Link-picturepicture" 
//                     value={picture}
//                     onChange={(e) => setPicture(e.target.value)}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className='SU-Button'>
//               <div className="SsU-button" onClick={handleSignup}>
//                 <div className="SU-free-quote">Sign up</div>
//               </div>
//             </div>
//           </div>
//           {errorMessage && (
//             <div className="alert alert-danger mt-3">
//               {errorMessage}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import axios from 'axios';
import "./Signup.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../../Context/api';

export default function Signup() {
   // Các state cho input
   const [username, setUsername] = useState('');
   const [fullName, setFullName] = useState('');
   const [gender, setGender] = useState(0); // 0: Male, 1: Female, 2: Other (tùy theo backend)
   const [dateOfBirth, setDateOfBirth] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [rePassword, setRePassword] = useState('');
   const [phone, setPhone] = useState('');
   const [address, setAddress] = useState('');
   const [picture, setPicture] = useState('');
   const [role, setRole] = useState(0); // 0: Customer, 1: Staff, 2: Lessor
   const [errorMessage, setErrorMessage] = useState('');
 
   const handleSignup = async (e) => {
     e.preventDefault();
 
     // Kiểm tra mật khẩu nhập lại có khớp không
     if (password !== rePassword) {
       setErrorMessage('Passwords do not match');
       return;
     }
 
     // Tạo object chứa dữ liệu cần gửi (theo đúng định dạng mà API mong đợi)
     const requestBody = {
       username,
       password,
       email,
       fullName,
       gender,
       phone,
       address,
       dateOfBirth,             // Chọn input type "date" để đảm bảo định dạng
       picture: picture || 'default_picture', // Nếu không có picture thì dùng giá trị mặc định
       role
     };
 
     try {
       const response = await api.post('auth/register', requestBody);
       console.log(response.data);
       alert('Signup successful');
       setErrorMessage('');
       // Bạn có thể reset các field tại đây nếu cần
     } catch (error) {
       console.error('There was an error signing up!', error);
       // Lấy message lỗi từ response (nếu có)
       setErrorMessage(error.response?.data?.message || 'Signup failed. Please try again.');
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
      {/* <div className='SU-from'>
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
                    value={username}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="SU-frame-14">
                  <input 
                    className="SU-first-name" 
                    placeholder="Last name" 
                    value={fullName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="form-group">
          <label>Gender</label>
          <select 
            className="form-control"
            value={gender}
            onChange={(e) => setGender(Number(e.target.value))}
          >
            <option value={0}>Male</option>
            <option value={1}>Female</option>
            <option value={2}>Other</option>
          </select>
        </div>
                <div className="SU-frame-14">
                  <input 
                    className="SU-first-name" 
                    placeholder="Birth day (YYYY-MM-DD)" 
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
                <div className="SU-frame-14">
                  <input 
                    className="SU-first-name" 
                    placeholder="Phone" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="SU-frame-14">
                  <input 
                    className="SU-first-name" 
                    placeholder="Address" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                    placeholder="Email" 
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
                <div className="SU-frame-14">
                  <select 
                    className="SU-first-name"
                    value={role}
                    onChange={(e) => setRole(Number(e.target.value))}
                  >
                    <option value={0}>Customer</option>
                    <option value={1}>Staff</option>
                    <option value={2}>Lessor</option>
                  </select>
                </div>
                <div className="SU-frame-14">
                  <input 
                    type='texttext' 
                    className="SU-first-name" 
                    placeholder="Link-picturepicture" 
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
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
          {errorMessage && (
            <div className="alert alert-danger mt-3">
              {errorMessage}
            </div>
          )}
        </div>
      </div> */}

<div className="container signup-container mt-5">
      <h2 className="text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className='container'>
          <div className='row'>
            <div className='col-6'>
        {/* Username */}
        <div className="form-group">
          <label>Username</label>
          <input 
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>

        {/* Full Name */}
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text"
            className="form-control"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender</label>
          <select 
            className="form-control"
            value={gender}
            onChange={(e) => setGender(Number(e.target.value))}
          >
            <option value={0}>Male</option>
            <option value={1}>Female</option>
            <option value={2}>Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label>Date of Birth</label>
          <input 
            type="date"
            className="form-control"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>

        
            </div>
            <div className='col-6'>
              {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        {/* Re-enter Password */}
        <div className="form-group">
          <label>Confirm Password</label>
          <input 
            type="password"
            className="form-control"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            placeholder="Re-enter password"
            required
          />
        </div>
        {/* Phone */}
        <div className="form-group">
          <label>Phone</label>
          <input 
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address</label>
          <input 
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
          />
        </div>

        {/* Picture */}
        <div className="form-group">
          <label>Picture URL</label>
          <input 
            type="text"
            className="form-control"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            placeholder="Enter picture URL (optional)"
          />
        </div>

        {/* Role */}
        <div className="form-group">
          <label>Role</label>
          <select 
            className="form-control"
            value={role}
            onChange={(e) => setRole(Number(e.target.value))}
          >
            <option value={0}>Customer</option>
            <option value={1}>Staff</option>
            <option value={2}>Lessor</option>
          </select>
        </div>
            </div>

          </div>

        </div>




        {errorMessage && (
          <div className="alert alert-danger mt-3">
            {errorMessage}
          </div>
        )}
            <div className='SU-Button'>

              <button type="submit" className=" HD-fix SsU-button">
          Sign Up
        </button>
       
            </div>


      </form>
    </div>
    </div>
  );
}