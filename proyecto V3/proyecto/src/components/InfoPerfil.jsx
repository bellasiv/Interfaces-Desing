import React, { useState, useEffect } from "react";
import "./InfoPerfil.css";
import EditProfileModal from "./EditProfileModal";
import fotoUno from "../assets/perfilCinco.jpg";
import fotoDos from "../assets/fotoUno.jpg";
import fotoTres from "../assets/perfilSeis.jpg";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const ProfileInfo = ({ datos, onImageUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (datos?.username) {
      setUsername(datos.username);
    }
  }, [datos]);

  const handleProfileUpdate = async (newUsername, newImageFile) => {
    const storedUser = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!storedUser) return;

    let updatedFields = {};

    if (newUsername) {
      setUsername(newUsername);
      updatedFields.username = newUsername;
    }

    if (newImageFile) {
      try {
        const imageUrl = await uploadImageToCloudinary(newImageFile);
        updatedFields.profileImage = imageUrl;
        onImageUpdate(imageUrl);
      } catch (error) {
        console.error("Error al subir imagen:", error);
        return;
      }
    }

    try {
      const userDocRef = doc(db, "usuarios", storedUser.id);
      await updateDoc(userDocRef, updatedFields);

      localStorage.setItem(
        "usuarioLogueado",
        JSON.stringify({ ...storedUser, ...updatedFields })
      );
    } catch (error) {
      console.error("Error al actualizar usuario en Firestore:", error);
    }

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
        <b>
          📸 {datos?.posts?.length || 0}{" "}
          {datos?.posts?.length === 1 ? "publicación" : "publicaciones"}
        </b>
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

const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "fotosUsuario");

  const response = await fetch("https://api.cloudinary.com/v1_1/dvnwgsewi/image/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error al subir imagen a Cloudinary");
  }

  const data = await response.json();
  return data.secure_url;
};
