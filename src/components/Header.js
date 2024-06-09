import "./Header.css";

import Config from "../utility/config";

const Header = ({ toggleNavbar }) => {
  return (
    <header className="header-super-container">
      <div className="header-menu-container" onClick={toggleNavbar}>
        <i className="fa-solid fa-bars header-menu-btn"></i>
      </div>
      <div className="header-container">
        <img
          src={Config.S3_URL_PREFIX + "bu_seal.png"}
          alt="BU Seal"
          className="logo"
        />
        <div className="header-text">BU Planning App</div>
      </div>
    </header>
  );
};

export default Header;
