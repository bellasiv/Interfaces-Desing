import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import logoimg from "../assets/logo.png";
import Logo from "../components/Logo";
import SeleccionAnimal from "../components/SeleccionAnimal";
import Boton from "../components/Boton";
import TermsAndConditions from "../components/termsConditions";
import "../pages/registro";
import "../index.css";

function Registro() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [otherAnimal, setOtherAnimal] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!termsAccepted) return;

    if (!name || !username || !password || !email || !selectedAnimal || (selectedAnimal === "OTHER" && !otherAnimal)) {
      return;
    }

    try {
      const userRef = collection(db, "usuarios");

      const profileImageURL = "https://i.pinimg.com/736x/13/a2/93/13a29357799af79f83394a4e06eec4fa.jpg";

      // Generar ID manualmente
      const newDocRef = doc(userRef); // Crea una referencia con ID único
      const id = newDocRef.id;

      const userData = {
        id,
        name,
        username,
        email,
        password,
        animal: selectedAnimal === "OTHER" ? otherAnimal : selectedAnimal,
        profileImage: profileImageURL,
        createdAt: new Date(),
        posts: [], // Inicializa el arreglo para las URLs de imágenes publicadas
      };

      // Guardar el documento con ID
      await setDoc(newDocRef, userData);

      localStorage.setItem("usuarioLogueado", JSON.stringify({
        id,
        name,
        username,
        email,
        animal: userData.animal,
        profileImage: profileImageURL
      }));

      navigate("/paginaPrincipal");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error al registrar. Intenta nuevamente.");
    }
  };

  return (
    <div className="registro-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="logoContainer" style={{ transform: "translateY(-110px)" }}>
        <Logo src={logoimg} width="250px" />
      </div>

      <div className="inputs-container" style={{ transform: "translateY(-235px)", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SeleccionAnimal 
          name={name} setName={setName}
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          email={email} setEmail={setEmail}
          selectedAnimal={selectedAnimal} setSelectedAnimal={setSelectedAnimal}
          otherAnimal={otherAnimal} setOtherAnimal={setOtherAnimal}
        />
      </div>

      <div className="acciones-container" style={{ transform: "translateY(-290px)", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <TermsAndConditions termsAccepted={termsAccepted} setTermsAccepted={setTermsAccepted} />

        {submitted && !termsAccepted && (
          <p className="error-text">You must accept the terms and conditions</p>
        )}
        {submitted && (!name || !username || !password || !email || !selectedAnimal || (selectedAnimal === "OTHER" && !otherAnimal)) && (
          <p className="error-text">All fields must be filled</p>
        )}

        <Boton 
          text="Create Account" 
          width="350px" 
          height="70px"
          onClick={handleCreateAccount}
        />
      </div>

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