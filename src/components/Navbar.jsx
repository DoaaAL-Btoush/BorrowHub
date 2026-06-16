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
    localStorage.removeItem("currentUser");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm px-4 py-3">
      <div className="container-fluid">
        <div className="d-flex align-items-center">

          <div className="navbar-logo d-flex align-items-center me-4">
            <img src={logo} alt="BorrowHub Logo" />
            <h2 className="ms-2 mb-0">BorrowHub</h2>
          </div>

          <Link
            to="/home"
            className="nav-link d-flex align-items-center me-3"
          >
            <GoHome className="me-1" />
            <span>Home</span>
          </Link>

          {role === "user" && (
            <>
              <Link
                to="/add-item"
                className="nav-link d-flex align-items-center me-3"
              >
                <IoAddCircleOutline className="me-1" />
                <span>Add Item</span>
              </Link>

              <Link
                to="/requests"
                className="nav-link d-flex align-items-center"
              >
                <LuMessageSquareMore className="me-1" />
                <span>Requests</span>
              </Link>
            </>
          )}
        </div>

        <div className="d-flex align-items-center">

          {role === "admin" ? (
            <Link
              to="/admin"
              className="btn btn-success me-3"
            >
              ♻ Admin Panel
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="nav-link d-flex align-items-center me-3"
            >
              <FiUser className="me-1" />
              <span>Dashboard</span>
            </Link>
          )}

          <button
            className="btn btn-outline-danger"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;