import React from "react";
import "./SeleccionAnimal.css";
import CuadroTexto from "./Entrada";

function SeleccionAnimal({ 
  name, setName, 
  username, setUsername, 
  password, setPassword, 
  email, setEmail,
  selectedAnimal, setSelectedAnimal,
  otherAnimal, setOtherAnimal 
}) {
  return (
    <div className="seleccion-container">
      <div className="form-section">
        <div className="entrada">
          <CuadroTexto 
            type="text" 
            placeholder="Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CuadroTexto 
            type="text" 
            placeholder="User Name" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <CuadroTexto 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CuadroTexto 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="animal-section">
        <h2 className="section-title">What animal represents you?</h2>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="animal"
              value="PUPPY"
              checked={selectedAnimal === "PUPPY"}
              onChange={(e) => setSelectedAnimal(e.target.value)}
            />
            PUPPY
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="animal"
              value="KITTY"
              checked={selectedAnimal === "KITTY"}
              onChange={(e) => setSelectedAnimal(e.target.value)}
            />
            KITTY
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="animal"
              value="HAMSTER"
              checked={selectedAnimal === "HAMSTER"}
              onChange={(e) => setSelectedAnimal(e.target.value)}
            />
            HAMSTER
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="animal"
              value="HORSE"
              checked={selectedAnimal === "HORSE"}
              onChange={(e) => setSelectedAnimal(e.target.value)}
            />
            HORSE
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="animal"
              value="OTHER"
              checked={selectedAnimal === "OTHER"}
              onChange={(e) => setSelectedAnimal(e.target.value)}
            />
            OTHER
          </label>
          {selectedAnimal === "OTHER" && (
            <input
              type="text"
              className="other-input"
              placeholder="Specify your animal"
              value={otherAnimal}
              onChange={(e) => setOtherAnimal(e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SeleccionAnimal;
