import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("USER");
    if (user) navigate("/");
    generateCaptcha();
  }, [navigate]);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$&";
    let captchaText = "";
    for (let i = 0; i < 6; i++) {
      captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(captchaText);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput !== captcha) {
      alert("❌ Incorrect CAPTCHA!");
      generateCaptcha();
      return;
    }

    try {
      const response = await api.post("/login", { email, password });
      if (response.status === 200) {
        alert("✅ Login successful!");
        localStorage.setItem('USER', response.data.user);
        localStorage.setItem('TOKEN', response.data.token);
        localStorage.setItem('EMAIL', response.data.email);
        localStorage.setItem('Name', response.data.name);
        localStorage.setItem("Role", response.data.role);
        localStorage.setItem("userId", response.data.user);
        navigate("/");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed!");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fce4ec, #e3f2fd)",
        padding: "20px",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="shadow p-4"
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          className="text-center mb-4 fw-bold"
          style={{
            fontSize: "28px",
            background: "linear-gradient(to right, #ec407a, #64b5f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🌟 Welcome Back!
        </h2>

        <div className="mb-3">
          <label
            className="form-label fw-semibold"
            style={{ color: "#6a1b9a" }}
          >
            Email
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              borderRadius: "10px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          />
        </div>

        <div className="mb-3">
          <label
            className="form-label fw-semibold"
            style={{ color: "#6a1b9a" }}
          >
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}"
              title="8+ chars, upper, lower, number & special char"
              style={{
                borderRadius: "10px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            />
            <span
              className="input-group-text"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                cursor: "pointer",
                backgroundColor: "#ec407a",
                color: "#fff",
                border: "none",
                borderRadius: "0 10px 10px 0",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <label
          className="form-label fw-semibold"
          style={{ color: "#6a1b9a" }}
        >
          CAPTCHA
        </label>
        <div className="d-flex align-items-center mb-2">
          <div
            className="px-3 py-2"
            style={{
              background: "#f8bbd0",
              color: "#000",
              fontWeight: "bold",
              borderRadius: "8px",
              letterSpacing: "2px",
              fontSize: "18px",
              flex: 1,
            }}
          >
            {captcha}
          </div>
          <button
            type="button"
            onClick={generateCaptcha}
            className="btn btn-light ms-2"
            style={{
              fontSize: "20px",
              border: "1px solid #ec407a",
              color: "#ec407a",
              borderRadius: "10px",
              background: "#fff0f5",
            }}
            title="Refresh CAPTCHA"
          >
            🔄
          </button>
        </div>
        <input
          type="text"
          placeholder="Enter CAPTCHA"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          required
          className="form-control mb-3"
          style={{
            borderRadius: "10px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        />

        <button
          type="submit"
          className="btn w-100 fw-bold"
          style={{
            background: "linear-gradient(to right, #ec407a, #64b5f6)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "12px 0",
            fontSize: "16px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            transition: "0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          🔓 Login
        </button>

        <div className="text-center mt-3">
          <Link to="/signup" className="text-decoration-none" style={{ color: "#ec407a" }}>
            Don't have an account? <strong>Sign Up</strong>
          </Link>
        </div>
        <div className="text-center mt-2">
          <Link to="/forgotpassword" className="text-decoration-none" style={{ color: "#888" }}>
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
