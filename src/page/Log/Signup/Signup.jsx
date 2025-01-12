// import React, { useState } from 'react';
// import axios from 'axios';
// import "./Signup.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function Signup() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [birthDate, setBirthDate] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rePassword, setRePassword] = useState('');

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if (password !== rePassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await axios.post('https://6773bdd177a26d4701c6355f.mockapi.io/Sigup', {
//         firstName,
//         lastName,
//         birthDate,
//         email,
//         password
//       });
//       console.log(response.data);
//       alert('Signup successful');
//     } catch (error) {
//       console.error('There was an error signing up!', error);
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
//                     placeholder="Birth day" 
//                     value={birthDate}
//                     onChange={(e) => setBirthDate(e.target.value)}
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
//                     placeholder="Email/Phone" 
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
//               </div>
//             </div>
//             <div className='SU-Button'>
//               <div className="SsU-button" onClick={handleSignup}>
//                 <div className="SU-free-quote">Sign up</div>
//               </div>
//             </div>
//           </div>
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [picture, setPicture] = useState(''); // Optional
  const [role, setRole] = useState(1); // Mặc định là Customer
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await api.post('auth/register', {
        username: `${firstName}${lastName}`,
        password,
        email,
        phone,
        address,
        dateOfBirth: birthDate,
        picture: picture || 'default_picture', // Optional
        role
      });
      console.log(response.data);
      alert('Signup successful');
      setErrorMessage('');
    } catch (error) {
      console.error('There was an error signing up!', error);
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
      </div>
    </div>
  );
}

