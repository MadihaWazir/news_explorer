import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import logoutWhite from "../../images/logout-btn-white.svg";
import logoutBlack from "../../images/logout-btn-black.png";

function Navigation({
  isloggedIn,
  currentUser,
  onLogout,
  onSignInClick,
  isSavedNewsPage,
  isMobile,
  CloseMobileMenu,
}) {
  const location = useLocation();
  const currentPath = location.pathname;

  const theme = isSavedNewsPage ? "light" : "dark";

  const handleLinkClick = () => {
    if (isMobile && CloseMobileMenu) CloseMobileMenu();
  };

  const renderAuthButton = () => {
    if (isloggedIn) {
      const logoutIcon = theme === "light" ? logoutBlack : logoutWhite;

      return (
        <button
          type="button"
          className={`navigation__btn_user_${
            isMobile ? "mobile" : "desktop"
          } navigation__btn_user_theme_${theme}`}
          onClick={onLogout}
        >
          {isMobile ? "Logout" : currentUser?.name || "User"}
          <img
            src={logoutIcon}
            alt="Logout Icon"
            className="navigation__logout-icon"
          />
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className={`navigation__btn_signin_${
            isMobile ? "mobile" : "desktop"
          } navigation__btn_signin_theme_${theme}`}
          onClick={onSignInClick}
        >
          Sign In
        </button>
      );
    }
  };

  return (
    <ul
      className={`navigation__menu navigation__menu_type${
        isMobile ? "mobile" : "desktop"
      }`}
    >
      <li>
        <Link
          to="/"
          className={`navigation__link navigation__link_theme_${theme} ${
            currentPath === "/" ? "navigation__link_active" : ""
          }`}
          onClick={handleLinkClick}
        >
          Home
        </Link>
      </li>
      {isloggedIn && (
        <li>
          <Link
            to="/saved-news"
            className={`navigation__link navigation__link_theme_${theme} ${
              currentPath === "/saved-news" ? "navigation__link_active" : ""
            }`}
            onClick={handleLinkClick}
          >
            Saved Articles
          </Link>
        </li>
      )}
      <li>{renderAuthButton()}</li>
    </ul>
  );
}

export default Navigation;
