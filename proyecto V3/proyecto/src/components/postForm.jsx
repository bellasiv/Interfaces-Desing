import React, { useState, useRef } from "react";
import "./postForm.css";
import friends from "../assets/friends.jpg";
import location from "../assets/location.jpg";
import musica from "../assets/musica.jpg";
import { db } from "../firebase-config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const PostForm = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [caption, setCaption] = useState("");
  const [locationText, setLocationText] = useState("");
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result); // Imagen en base64
    };
    reader.readAsDataURL(file);
  };

  const handlePost = async () => {
    const user = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (!user || !selectedImage) {
      alert("Debe haber una imagen seleccionada y un usuario logueado.");
      return;
    }

    try {
      const userRef = doc(db, "usuarios", user.id);
      await updateDoc(userRef, {
        posts: arrayUnion({
          photoURL: selectedImage,
          description: caption,
          location: locationText,
        }),
      });

      alert("Post agregado exitosamente.");
      setCaption("");
      setLocationText("");
      setSelectedImage(images[0]); // o null si prefieres limpiar por completo
    } catch (error) {
      console.error("Error agregando post:", error);
      alert("Error al subir el post. Intenta nuevamente.");
    }
  };

  return (
    <div className="content">
      <div className="gallery">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="pet"
            className={selectedImage === img ? "selected" : ""}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      <button onClick={handleButtonClick} className="browse">Browse Files</button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div className="post-section">
        {selectedImage && <img src={selectedImage} alt="Selected" className="preview" />}

        <input
          type="text"
          placeholder="Add caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <hr />

        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <img src={friends} alt="Icono" width="40" height="40" />
          <input type="text" placeholder="Tag a friend!" disabled />
        </div>

        <hr />
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src={location} alt="Icono" width="40" height="30" />
          <input
            type="text"
            placeholder="Add location"
            value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
          />
        </div>

        <div className="location">
          <button onClick={() => setLocationText("Cali")}>Cali</button>
          <button onClick={() => setLocationText("LA - USA")}>LA - USA</button>
          <button onClick={() => setLocationText("Javeriana")}>Javeriana</button>
        </div>

        <hr />
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <img src={musica} alt="Icono" width="40" height="30" />
          <input type="text" placeholder="Add music" disabled />
        </div>

        <hr />
        <div className="post-buttons">
          <button className="post" onClick={handlePost}>Post</button>
          <button className="post">Story</button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;