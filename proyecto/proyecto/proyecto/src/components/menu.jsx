import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./menu.css";
import { FaHome, FaMap, FaCrown, FaComments, FaCamera, FaSearch, FaUserCircle } from "react-icons/fa"; 

const Menu = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "menu-item active" : "menu-item";
  };

  return (
    <div className="menuPrincipal">
      <div className="menu">
        <Link to="/paginaPrincipal" className={isActive("/paginaPrincipal")}>
          <FaHome className="icon" />
          <span>Home</span>
        </Link>

        <Link to="/petMap" className={isActive("/petMap")}>
          <FaMap className="icon" />
          <span>PetMap</span>
        </Link>

        <Link to="/ranking" className={isActive("/ranking")}>
          <FaCrown className="icon" />
          <span>Ranking</span>
        </Link>

        <Link to="/chat" className={isActive("/chat")}>
          <FaComments className="icon" />
          <span>Chat</span>
        </Link>

        <Link to="/post" className={isActive("/post")}>
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