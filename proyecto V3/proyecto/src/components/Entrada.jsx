import React from "react";
import "./Entrada.css"

function CuadroTexto({type, placeholder, value, onChange, posicionX = "center"}){
  return(
    <div className="inputContainer" style={{marginLeft: posicionX}}>
        <input
            className="inputField"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </div>
  );
}

export default CuadroTexto;