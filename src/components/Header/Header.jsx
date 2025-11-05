import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation.jsx";

function Header({
  isloggedIn,
  currentUser,
  onLogout,
  onSignInClick,
  isAnyModalOpen,
}) {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const CloseMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogoutAndCloseMenu = () => {
    onLogout();
    CloseMobileMenu();
  };

  const handleSignInAndCloseMenu = () => {
    onSignInClick();
    CloseMobileMenu();
  };

  return (
    <header
      className={`header ${
        isSavedNewsPage ? "header_theme_dark" : "header_theme_light"
      } ${isMobileMenuOpen ? "header_mobile-menu-open" : ""}`}
    >
      <Link to="/" className="header__logo" onClick={CloseMobileMenu}>
        NewsExplorer
      </Link>

      {!isAnyModalOpen && (
        <button
          type="button"
          className={`header__menu-icon ${
            isMobileMenuOpen ? "header__menu-icon_close" : ""
          }`}
          onClick={handleToggleMobileMenu}
          aria-label={
            isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
          }
        >
          <span className="header__menu-icon_line"></span>
          <span className="header__menu-icon_line"></span>
        </button>
      )}
      {isMobileMenuOpen && !isAnyModalOpen && (
        <div className="header__mobile-overlay" onClick={CloseMobileMenu}>
          <div
            className="navigation_mobile-open"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="navigation__mobile-header">
              <span className="navigation__mobile_title">NewsExplorer</span>
              <button
                className="navigation__mobile_close"
                onClick={CloseMobileMenu}
                aria-label="Close mobile menu"
              />
            </div>
            <nav className="navigation__mobile-menu">
              <Navigation
                isloggedIn={isloggedIn}
                currentUser={currentUser}
                onLogout={handleLogoutAndCloseMenu}
                onSignInClick={handleSignInAndCloseMenu}
                isMobile={true}
                handleCloseMobileMenu={CloseMobileMenu}
                isSavedNewsPage={isSavedNewsPage}
              />
            </nav>
          </div>
        </div>
      )}
      <nav className="navigation">
        <Navigation
          isloggedIn={isloggedIn}
          currentUser={currentUser}
          onLogout={onLogout}
          onSignInClick={onSignInClick}
          isMobile={false}
          isSavedNewsPage={isSavedNewsPage}
        />
      </nav>
    </header>
  );
}

export default Header;
