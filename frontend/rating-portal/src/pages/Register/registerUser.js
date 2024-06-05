import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./registerUser.css";
import background from "../../images/background.jpg";

const RegisterUser = () => {
  const [given_name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!given_name || !surname || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const username = "api_gateway";
      const userPassword = "Xe812C81M9yA";
      const token = btoa(`${username}:${userPassword}`);

      const response = await axios.post(
        "http://127.0.0.1:5000/users/register",
        { given_name, surname, email, password },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again later.");
    }
  };

  return (
    <div
      className="register-user-container"
      style={{
        background: `url(${background}) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <div className="register-user-box">
        <h2 className="register-user-title">Register as User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={given_name}
            onChange={(e) => setName(e.target.value)}
            className="register-user-input"
          />
          <br />
          <input
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="register-user-input"
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-user-input"
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-user-input"
          />
          <br />
          <button type="submit" className="register-user-button">
            Register
          </button>
          <div className="login-options">
            <button
              onClick={() => navigate("/register-owner")}
              className="login-button"
            >
              Register as Owner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
