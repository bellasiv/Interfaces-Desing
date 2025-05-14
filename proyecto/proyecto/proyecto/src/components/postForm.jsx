import React, { useState } from "react";
import "./postForm.css";
import friends from "../assets/friends.jpg"
import location from "../assets/location.jpg"
import musica from "../assets/musica.jpg"
import { useRef }  from "react";


const PostForm = ({images}) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Activa el input de archivos
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Guarda la imagen como URL en useState
      };
      reader.readAsDataURL(file); // Convierte el archivo a una URL
    }

  };

  return (
    <div>
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
          <input type="text" placeholder="Add caption..." />
          <hr style={{ margin: "0" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <img src= {friends} alt="Icono" width="40" height="40" />
            <input type="text" placeholder="Tag a friend!" />
          </div>
          <hr style={{ margin: "0" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src= {location} alt="Icono" width="40" height="30" />
            <input type="text" placeholder="Add location" />
          </div>
          <div className="location">
            <button>Cali</button>
            <button>LA - USA</button>
            <button>Javeriana</button>
          </div>
          <hr style={{ margin: "0" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <img src={musica} alt="Icono" width="40" height="30" />
            <input type="text" placeholder="Add music" />
          </div>
          <hr style={{ margin: "0" }} />
          <div className="post-buttons">
            <button className="post">Post</button>
            <button className="post">Story</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default PostForm;