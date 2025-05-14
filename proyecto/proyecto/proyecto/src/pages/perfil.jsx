import React from "react";
import Menu from "../components/menu.jsx";
import FotoPerfil from "../components/FotoPerfil.jsx";
import PostLateral from "../components/PostLateral.jsx";
import ProfileInfo from "../components/InfoPerfil.jsx";

function Perfil({ profileImage, setProfileImage }) {  
  return (
    <div className="perfil-container">
      <Menu />
      <FotoPerfil profileImage={profileImage} />  
      <PostLateral/>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <ProfileInfo onImageUpdate={setProfileImage} />  
      </div>
    </div>
  );
}

export default Perfil;
