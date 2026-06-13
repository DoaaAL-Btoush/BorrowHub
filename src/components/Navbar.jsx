import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/Navbar.css";

import { GoHome } from "react-icons/go";
import { IoAddCircleOutline } from "react-icons/io5";
import { LuMessageSquareMore } from "react-icons/lu";
import { FiUser } from "react-icons/fi";

function Navbar({ role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src={logo} alt="BorrowHub Logo" />
          <h2>BorrowHub</h2>
        </div>

        <Link to="/home" className="nav-link">
          <GoHome />
          <span>Home</span>
        </Link>

        {role === "user" && (
          <>
            <Link to="/add-item" className="nav-link">
              <IoAddCircleOutline />
              <span>Add Item</span>
            </Link>

            <Link to="/requests" className="nav-link">
              <LuMessageSquareMore />
              <span>Requests</span>
            </Link>
          </>
        )}
      </div>

      <div className="navbar-right">
        {role === "admin" ? (
          <Link to="/admin" className="admin-panel-btn">
            ♻ Admin Panel
          </Link>
        ) : (
          <Link to="/dashboard" className="nav-link">
            <FiUser />
            <span>Dashboard</span>
          </Link>
        )}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;