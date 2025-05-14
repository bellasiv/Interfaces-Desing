import React from "react";
import "./BarraLateral.css";
import logo from "../assets/logo.png";

const Lateral = ({ images }) => {
  return (
    <div className="barraLateral">
      <div className="logoContainer">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="imagesContainer">
        {images.map((img, posicion) => (
          <div key={posicion} className="itemBarra">
            <img src={img} alt={`Imagen ${posicion}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lateral;