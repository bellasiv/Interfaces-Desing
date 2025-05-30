import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import Logo from "../components/Logo";
import logoimg from "../assets/logo.png";
import CuadroTexto from "../components/Entrada";
import Boton from "../components/Boton";

function InicioSesion() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  if (!username || !password) {
    setError("User and password are required");
    return;
  }

  setError("");

  try {
    const usersRef = collection(db, "usuarios");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setError("User does not exist. Please register first.");
      return;
    }

    let userFound = false;

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.password === password) {
        localStorage.setItem("usuarioLogueado", JSON.stringify({ id: doc.id, ...userData }));
        userFound = true;
      }
    });


    if (userFound) {
      navigate("/paginaPrincipal");
    } else {
      setError("Incorrect password.");
    }
  } catch (error) {
    console.error("Error logging in: ", error);
    setError("An error occurred during login. Please try again.");
  }
};

  return (
    <div 
      className="container" 
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginTop: "-55px",
      }}
    >
      <div className="logoContainer">
        <Logo src={logoimg} width="250px" margin="20px" />
      </div>

      <div className="entrada">
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
      </div>

      {error && (
        <p style={{ 
          color: "red", 
          textAlign: "center", 
          fontWeight: "bold",
          marginTop: "10px"
        }}>
          {error}
        </p>
      )}

      <Boton text="Sign In" width="200px" height="60px" onClick={handleLogin} />
      
      <div className="mt-4 text-center">
        <p className="text-gray-600">Don't have an account?</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
          <Link 
            to="/registro" 
            style={{ color: "#BF548F" }}
          >
            Register here!
          </Link>
        </div>
      </div>
    </div>  
  );
}

export default InicioSesion;