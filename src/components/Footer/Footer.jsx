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
              rel="noreferrer"
            >
              TripleTen
            </a>
          </nav>
          <nav className="footer__social-icons">
            <a
              href="https://github.com"
              className="footer__social-icon-link footer__social-icon-github"
              target="_blank"
              rel="noreferrer"
            ></a>
            <a
              href="https://facebook.com"
              className="footer__social-icon-link footer__social-icon-facebook"
              target="_blank"
              rel="noreferrer"
            ></a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
