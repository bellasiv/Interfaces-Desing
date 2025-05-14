import React from "react";
import "./PostLateral.css";
import fotoUno from "../assets/fotoUno.jpg"
import fotoDos from "../assets/fotoDos.jpg"
import fotoTres from "../assets/fotoTres.jpg"

const images = [
  fotoUno,
  fotoDos,
  fotoTres,
];

const FloatingImages = () => {
  return (
    <div className="image-scroll-container">
      <div className="image-list">
        {images.map((img, index) => (
          <img key={index} src={img} className="image-item" alt={`Imagen ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default FloatingImages;
