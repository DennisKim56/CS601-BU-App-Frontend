import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-text">&copy; BU Planning App</div>
        <div className="footer-link-container">
          <a href="/#">About Us</a>
          &#124;
          <a href="/#">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
