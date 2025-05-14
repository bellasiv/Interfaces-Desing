import React, { useState } from "react";
import "./InfoPerfil.css";
import EditProfileModal from "./EditProfileModal";
import fotoUno from "../assets/perfilCinco.jpg";
import fotoDos from "../assets/fotoUno.jpg";
import fotoTres from "../assets/perfilSeis.jpg";

const ProfileInfo = ({ profileImage, onImageUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("@user_1234");

  const handleProfileUpdate = (newUsername, newImage) => {
    if (newUsername) setUsername(newUsername);
    if (newImage) onImageUpdate(newImage); // Se actualiza la imagen de perfil globalmente
    setShowModal(false);
  };

  return (
    <div className="profile-info">
      {showModal && (
        <EditProfileModal
          currentUsername={username}
          onClose={() => setShowModal(false)}
          onSave={handleProfileUpdate}
        />
      )}

      <h2 className="username">
        {username}{" "}
        <span
          className="dropdown-icon"
          onClick={() => setShowModal(true)}
          style={{ cursor: "pointer" }}
        >
          ▼
        </span>
      </h2>
      <p className="followers">
        <b>🐾 14k followers</b>
      </p>
      <hr className="divider" />
      <h3 className="updates-title">Updates</h3>
      <div className="updates">
        <div className="update">
          <img src={fotoUno} alt="user" className="update-avatar" />
          <p>@user_654 is now your new friend!</p>
        </div>
        <div className="update">
          <img src={fotoDos} alt="user" className="update-avatar" />
          <p>@user_6e54 liked your post!</p>
        </div>
        <div className="update">
          <img src={fotoTres} alt="user" className="update-avatar" />
          <p>@hello_666 liked something you might like</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
