import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = ({ logout, toggleNavbar, user }) => {
  return (
    <aside className="sidenav-container">
      <div className="close-btn-container" onClick={toggleNavbar}>
        <i className="fa-solid fa-xmark close-btn"></i>
      </div>
      {user && user.name ? (
        <>
          <div className="user-icon-container">
            <div className="user-icon-frame">
              <i className="user-icon fa-solid fa-user"></i>
            </div>
          </div>
          <div className="user-detail-grid">
            <div className="user-detail-label">Username:</div>
            <div className="user-detail-info">{user.username}</div>
            <div className="user-detail-label">Name:</div>
            <div className="user-detail-info">{user.name}</div>
          </div>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-link" onClick={toggleNavbar}>
            Login
          </Link>
          <Link to="/signup" className="navbar-link" onClick={toggleNavbar}>
            Create Account
          </Link>
        </>
      )}
      <Link to="/" className="navbar-link" onClick={toggleNavbar}>
        Home
      </Link>
      <Link to="/about" className="navbar-link" onClick={toggleNavbar}>
        About
      </Link>
      <Link to="/programs" className="navbar-link" onClick={toggleNavbar}>
        Programs
      </Link>
      <Link to="/courses" className="navbar-link" onClick={toggleNavbar}>
        Courses
      </Link>
      {user && (
        <>
          <Link
            to="/plan/create"
            className="navbar-link"
            onClick={toggleNavbar}
          >
            Create Plan
          </Link>
          <Link to="/plan/view" className="navbar-link" onClick={toggleNavbar}>
            View Plan
          </Link>
          <Link to="/finances" className="navbar-link" onClick={toggleNavbar}>
            View Finances
          </Link>
          <Link
            to="/login"
            className="navbar-link"
            onClick={() => {
              logout();
              toggleNavbar();
            }}
          >
            Logout
          </Link>
        </>
      )}
    </aside>
  );
};

export default Navbar;
