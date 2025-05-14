import React, { useState } from "react";
import "./EditProfileModal.css";

const EditProfileModal = ({ currentUsername, onClose, onSave }) => {
  const [newUsername, setNewUsername] = useState(currentUsername);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSave(newUsername, reader.result);  // ✅ Ahora se pasa la imagen como Base64
        onClose();
      };
      reader.readAsDataURL(selectedImage);
    } else {
      onSave(newUsername, null);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {selectedImage && (
              <img 
                src={URL.createObjectURL(selectedImage)} 
                alt="Preview" 
                className="image-preview"
              />
            )}
          </div>

          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
