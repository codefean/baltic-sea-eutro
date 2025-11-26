import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      {/* Mobile hamburger */}
      <button
        className="menu-toggle"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? "✖" : "☰"}
      </button>

      {/* Nav links */}
      <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <NavLink
          to="/Map"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active-link" : ""}`
          }
          onClick={closeMenu}
        >
          Map
        </NavLink>
        <NavLink
          to="/CLD"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active-link" : ""}`
          }
          onClick={closeMenu}
        >
          CLD
        </NavLink>
      </nav>

      {/* Title centered */}
<div className="header-title">
  <h1>
    Baltic Sea Eutrophication Indicators <span className="beta-text">| HELCOM HEAT 3.0 </span>
  </h1>
</div>
    </header>
  );
};

export default Header;
