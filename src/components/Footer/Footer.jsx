import "./Footer.css";
import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          &copy; {currentYear} Supersite, Powered by News Api
        </p>
        <div className="footer__right-section">
          {" "}
          <nav className="footer__nav-links">
            <a href="/" className="footer__link">
              Home
            </a>
            <a
              href="https://tripleten.com"
              className="footer__link"
              target="_blank"
              aria-label="TripleTen"
              rel="noopener noreferrer"
            >
              TripleTen
            </a>
          </nav>
          <nav className="footer__social-icons">
            <a
              href="https://github.com/MadihaWazir"
              className="footer__social-icon-link footer__social-icon-github"
              target="_blank"
              aria-label="GitHub"
              rel="noopener noreferrer"
            ></a>
            <a
              href="https://linkedin.com/in/madiha-wazir-390292337"
              className="footer__social-icon-link footer__social-icon-linkedin"
              target="_blank"
              aria-label="LinkedIn"
              rel="noopener noreferrer"
            ></a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
