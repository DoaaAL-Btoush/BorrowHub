import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Auth.css";
import logo from "../assets/logo.png";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      full_name: fullName,
      email: email,
      password: password,
      role: "user",
      status: "active",
      joined_date: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Signup failed.");
        return;
      }

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: data.user_id,
          name: data.full_name,
          email: data.email,
          role: data.role,
        })
      );

      localStorage.setItem("role", data.role);

      navigate("/home");
    } catch (error) {
      console.log(error);
      alert("Cannot connect to the server.");
    }
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

        <p>Join our community</p>

        <form onSubmit={handleSignup}>
          <label>Full Name</label>

          <input
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

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

          <button type="submit">Create Account</button>
        </form>

        <p className="switch-text">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;