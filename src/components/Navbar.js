import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = ({ toggleNavbar, user }) => {
  return (
    <aside className="sidenav-container">
      <div className="close-btn-container" onClick={toggleNavbar}>
        <i className="fa-solid fa-xmark close-btn"></i>
      </div>
      {user && user.name ? (
        <div className="user-icon-container">
          <div className="user-icon-frame">
            <i className="user-icon fa-solid fa-user"></i>
          </div>
        </div>
      ) : (
        <Link to="/login" onClick={toggleNavbar}>
          Login
        </Link>
      )}
    </aside>
  );
};

export default Navbar;
