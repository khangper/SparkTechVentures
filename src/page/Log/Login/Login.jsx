import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../Context/api";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      const response = await api.post("auth/login", {
        username: email,
        password: password,
      });

      if (response.data.isSuccess) {
        const { id, role, accessToken, refreshToken, username, email} = response.data.data;
        dispatch(login({ token: accessToken, role, accountId: id, username, email}));
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}
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
