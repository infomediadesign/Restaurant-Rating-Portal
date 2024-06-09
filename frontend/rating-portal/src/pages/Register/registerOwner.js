import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./registerOwner.css";
import background from "../../images/background.jpg";

const RegisterOwner = () => {
  const [given_name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [license_no, setlicense_no] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!given_name || !surname || !email || !password || !license_no) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const username = "api_gateway";
      const userPassword = "Xe812C81M9yA";
      const token = btoa(`${username}:${userPassword}`);

      const response = await axios.post(
        "http://127.0.0.1:5000/users/register",
        { given_name, surname, email, password, license_no },
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
      className="register-owner-container"
      style={{
        background: `url(${background}) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <div className="register-owner-box">
        <h2 className="register-owner-title">Register as Owner</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={given_name}
            onChange={(e) => setName(e.target.value)}
            className="register-owner-input"
          />
          <br />
          <input
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="register-owner-input"
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-owner-input"
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-owner-input"
          />
          <br />
          <input
            type="text"
            placeholder="Business License"
            value={license_no}
            onChange={(e) => setlicense_no(e.target.value)}
            className="register-owner-input"
          />
          <br />
          <button type="submit" className="register-owner-button">
            Register
          </button>
          <div className="login-options">
            <button
              type="submit"
              className="register-user-button"
              onClick={() => navigate("/register-user")}
            >
              Register as User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterOwner;
