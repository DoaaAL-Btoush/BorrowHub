import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Auth.css";
import logo from "../assets/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });

    if (email.toLowerCase().includes("admin")) {
      localStorage.setItem("role", "admin");

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          name: "Admin",
          email,
          role: "admin",
        })
      );

      navigate("/admin");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      alert("Invalid email or password.");
      return;
    }

    if (user.status === "Suspended") {
      alert("Your account has been suspended. Please contact the administrator.");
      return;
    }

    localStorage.setItem("role", "user");

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: user.fullName,
        email: user.email,
        role: user.role || "user",
      })
    );

    navigate("/home");
  };

  return (
    <div className="auth-page">
      <div className="auth-info-card">
        <div className="recycle-icon">♻️</div>

        <h1>Borrow, Share, Connect</h1>

        <p>Access what you need without buying</p>

        <div className="features">
          <div>
            <span>🤝</span>
            <p>Share</p>
          </div>

          <div>
            <span>🌱</span>
            <p>Sustain</p>
          </div>

          <div>
            <span>💚</span>
            <p>Connect</p>
          </div>
        </div>
      </div>

      <div className="auth-form-card">
        <div className="logo">
          <img src={logo} alt="BorrowHub Logo" />
        </div>

        <h2>BorrowHub</h2>

        <p>Welcome back!</p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign In</button>
        </form>

        <p className="switch-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;