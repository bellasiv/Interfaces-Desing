import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./menu.css";
import { FaHome, FaMap, FaCrown, FaComments, FaCamera, FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa"; 

const   Menu = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? "menu-item active" : "menu-item";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="menuPrincipal">
      {/* Mobile menu toggle button */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation menu - adds 'open' class when menu is toggled on mobile */}
      <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/paginaPrincipal" className={isActive("/paginaPrincipal")} onClick={() => setIsMenuOpen(false)}>
          <FaHome className="icon" />
          <span>Home</span>
        </Link>

        <Link to="/petMap" className={isActive("/petMap")} onClick={() => setIsMenuOpen(false)}>
          <FaMap className="icon" />
          <span>PetMap</span>
        </Link>

        <Link to="/ranking" className={isActive("/ranking")} onClick={() => setIsMenuOpen(false)}>
          <FaCrown className="icon" />
          <span>Ranking</span>
        </Link>

        <Link to="/chat" className={isActive("/chat")} onClick={() => setIsMenuOpen(false)}>
          <FaComments className="icon" />
          <span>Chat</span>
        </Link>

        <Link to="/post" className={isActive("/post")} onClick={() => setIsMenuOpen(false)}>
          <FaCamera className="icon" />
          <span>Post</span>
        </Link>
      </div>

      <div className="search-container1">
        <input type="text" placeholder="Search users" className="search-input" />
        <FaSearch className="search-icon" />
      </div>

      <Link to="/perfil" className="profile">
        <FaUserCircle className="profile-icon" />
      </Link>
    </div>
  );
};

export default Menu;  