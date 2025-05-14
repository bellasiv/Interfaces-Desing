import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoimg from "../assets/logo.png";
import Logo from "../components/Logo";
import SeleccionAnimal from "../components/SeleccionAnimal";
import Boton from "../components/Boton";
import TermsAndConditions from "../components/termsConditions";
import "../pages/registro";

function Registro() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [otherAnimal, setOtherAnimal] = useState("");
  const [submitted, setSubmitted] = useState(false); // Se activa cuando se intenta enviar

  const navigate = useNavigate();

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setSubmitted(true); // Activa la validación visual

    // Si no se aceptan los términos, muestra error y detiene el proceso
    if (!termsAccepted) return;

    // Si falta algún campo, muestra error y detiene el proceso
    if (!name || !username || !password || !email || !selectedAnimal || (selectedAnimal === "OTHER" && !otherAnimal)) {
      return;
    }

    navigate("/paginaPrincipal"); // Si todo está bien, redirige
  };

  return (
    <div className="registro-container">
      <div className="registro-content">
        <div className="logoContainer">
          <Logo src={logoimg} width="250px" margin="20px" />
        </div>

        <SeleccionAnimal 
          name={name} setName={setName}
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          email={email} setEmail={setEmail}
          selectedAnimal={selectedAnimal} setSelectedAnimal={setSelectedAnimal}
          otherAnimal={otherAnimal} setOtherAnimal={setOtherAnimal}
        />

        <TermsAndConditions 
          termsAccepted={termsAccepted} 
          setTermsAccepted={setTermsAccepted} 
        />

        {/* 🔴 Mensajes de error en rojo después de presionar "Create Account" */}
        {submitted && !termsAccepted && (
          <p className="error-text"> You must accept the terms and conditions</p>
        )}
        {submitted && (!name || !username || !password || !email || !selectedAnimal || (selectedAnimal === "OTHER" && !otherAnimal)) && (
          <p className="error-text"> All fields must be filled</p>
        )}

        {/* 🔘 Botón que sigue funcionando pero muestra errores */}
        <button 
          onClick={handleCreateAccount}
          style={{ 
            background: "none", 
            border: "none", 
            padding: 0, 
            cursor: "pointer" 
          }}
        >
          <Boton 
            text="Create Account" 
            width="350px" 
            height="70px"
          />
        </button>
      </div>

      {/* 💄 Estilos para los errores (puedes mover esto a tu CSS) */}
      <style>
        {`
          .error-text {
            color: red;
            text-align: center;
            font-weight: bold;
            margin-top: 10px;
          }
        `}
      </style>
    </div>
  );
}

export default Registro;
