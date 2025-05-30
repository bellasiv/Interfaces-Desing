import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./FotoPerfil.css";   
import defaultFoto from "../assets/postTres.jpg";

const FotoPerfil = ({ profileImage }) => {
  return (
    <div className="profile-picture">
      <img 
        src={profileImage || defaultFoto} 
        alt="Profile"  
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = defaultFoto;
        }}
      />
    </div>
  );
};

export default FotoPerfil;
 