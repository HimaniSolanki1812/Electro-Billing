import { Link } from "react-router-dom";
import "./Footer.css";


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
      </div>
      <p>&copy; 2026 Electronic Shop. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
