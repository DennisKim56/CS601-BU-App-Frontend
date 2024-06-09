import "./Header.css";

import Config from "../utility/config";

const Header = () => {
  return (
    <header>
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
