import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase-config';
import { FaSearch } from 'react-icons/fa';
import './UserSearch.css';

const UserSearch = ({ onUserSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null); // 👈 manejamos esto como estado seguro

  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioLogueado");
    if (storedUser) {
      setLoggedUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchTerm.trim() === '' || !loggedUser) {
        setSearchResults([]);
        return;
      }

      const usersRef = collection(db, "usuarios");
      const q = query(
        usersRef,
        where("name", ">=", searchTerm),
        where("name", "<=", searchTerm + '\uf8ff')
      );

      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.id !== loggedUser.id); // 👈 aquí filtramos correctamente

      setSearchResults(users);
    };

    fetchUsers();
  }, [searchTerm, loggedUser]);

  return (
    <div className="user-search-container">
      <div className="user-search-input-wrapper">
        <FaSearch className="search-icon" />
        <input 
          type="text" 
          placeholder="Search users" 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="user-search-input"
        />
      </div>
      <ul className="user-search-results">
        {searchResults.map(user => (
          <li key={user.id} onClick={() => onUserSelect(user)} className="user-search-result-item">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;