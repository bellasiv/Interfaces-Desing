import React, { useState } from "react";
import "./EditProfileModal.css";

const EditProfileModal = ({ currentUsername, onClose, onSave }) => {
  const [newUsername, setNewUsername] = useState(currentUsername);
  const [newImageFile, setNewImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
    }
  };

  const handleSave = () => {
    onSave(newUsername, newImageFile);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Perfil</h2>

        <label>
          Nuevo nombre de usuario:
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </label>

        <label>
          Nueva imagen de perfil:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        <div className="modal-buttons">
          <button onClick={handleSave}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
