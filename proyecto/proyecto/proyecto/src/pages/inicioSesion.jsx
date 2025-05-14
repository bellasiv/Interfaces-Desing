import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../components/Logo";
import logoimg from "../assets/logo.png";
import CuadroTexto from "../components/Entrada";
import Boton from "../components/Boton";

function InicioSesion() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError("User and password are required");
      return;
    }

    setError(""); 
    navigate("/paginaPrincipal");
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
            style={{ color: "rgb(140, 35, 170)" }}
          >
            Register here!
          </Link>
        </div>
      </div>
    </div>  
  );
}

export default InicioSesion;