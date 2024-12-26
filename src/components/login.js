import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";
import "../css/Signin.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/profile";
      toast.success("User logged in Successfully", {
        position: "top-right",
      });
      window.location.href = "/profile";
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signin-form">
      <h2 className="signin-title">Welcome Back</h2>
      <p className="signin-subtitle">Sign in to your account</p>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          className="form-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="form-input"
            placeholder="Enter your password"
            value={password}
            style={{ borderRadius: " 8px 0 0 8px " }}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
                color="#1abc9c"
              >
                <path d="M12 4.5C7.305 4.5 3.52 7.272 2 12c1.52 4.728 5.305 7.5 10 7.5s8.48-2.772 10-7.5c-1.52-4.728-5.305-7.5-10-7.5zM12 17c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm0-8.5A3.5 3.5 0 1 0 12 15a3.5 3.5 0 1 0 0-7z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <defs>
                  <linearGradient
                    id="eyeClosedGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stop-color="#ff9a9e" />
                    <stop offset="100%" stop-color="#fad0c4" />
                  </linearGradient>
                </defs>
                <path
                  d="M2 12c1.52-4.728 5.305-7.5 10-7.5s8.48 2.772 10 7.5c-1.52 4.728-5.305 7.5-10 7.5S3.52 16.728 2 12z"
                  fill="url(#eyeClosedGradient)"
                />
                <line
                  x1="3"
                  y1="3"
                  x2="21"
                  y2="21"
                  stroke="#ff6f91"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M6 12c1.5 3 4.5 5 6 5s4.5-2 6-5"
                  stroke="#ff6f91"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-dasharray="5,3"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <button type="submit" className="btn-primary">
        Sign In
      </button>

      <p className="forgot-password">
        New user? <a href="/register">Register Here</a>
      </p>

      <div className="social-signin">
        <SignInwithGoogle />
      </div>
    </form>
  );
}

export default Login;
