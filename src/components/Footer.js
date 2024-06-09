import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-text">&copy; BU Planning App</div>
        <div className="footer-link-container">
          <Link to="/about">About</Link>
          &#124;
          <a href="mailto:dkim56@bu.edu&subject=BU Planning App">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
