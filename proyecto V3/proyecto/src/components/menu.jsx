import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import {
  FaHome,
  FaMap,
  FaCrown,
  FaComments,
  FaCamera,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";
import "./menu.css";

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const isActive = (path) => (location.pathname === path ? "menu-item active" : "menu-item");

  // Buscar usuarios al escribir
  useEffect(() => {
    const fetchUsers = async () => {
      if (!searchInput.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const usuariosRef = collection(db, "usuarios");
        const snapshot = await getDocs(usuariosRef);
        const matches = snapshot.docs
          .map((doc) => doc.data())
          .filter((user) =>
            user.username.toLowerCase().includes(searchInput.toLowerCase())
          );

        setSearchResults(matches.slice(0, 5)); // máximo 5 sugerencias
      } catch (error) {
        console.error("Error buscando usuarios:", error);
      }
    };

    fetchUsers();
  }, [searchInput]);

  // Redirigir al perfil del usuario
  const handleUserClick = (username) => {
    setSearchInput("");
    setSearchResults([]);
    navigate("/perfil", { state: { username } });
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
        <input
          type="text"
          placeholder="Search users"
          className="search-input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <FaSearch className="search-icon" />
        {searchResults.length > 0 && (
          <ul className="search-results">
            {searchResults.map((user) => (
              <li
                key={user.username}
                className="search-result-item"
                onClick={() => handleUserClick(user.username)}
              >
                @{user.username}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link to="/perfil" className="profile">
        <FaUserCircle className="profile-icon" />
      </Link>
    </div>
  );
};

export default Menu;
