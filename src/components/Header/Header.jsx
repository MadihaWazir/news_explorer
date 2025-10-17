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

  const handleToggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
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
          <span className="header__menu-icon_line" />
          <span className="header__menu-icon_line" />
        </button>
      )}
      {isMobileMenuOpen && (
        <div className="header__mobile-overlay" onClick={CloseMobileMenu}>
          <nav
            className="navigation_mobile-open"
            onClick={(e) => e.stopPropagation()}
          >
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
