import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./BarraLateral.css";
import logo from "../assets/logo.png";

const Lateral = () => {
  const navigate = useNavigate();
  const [usuariosAleatorios, setUsuariosAleatorios] = useState([]);
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioLogueado"));

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuariosRef = collection(db, "usuarios");
        const snapshot = await getDocs(usuariosRef);

        // Convertimos los documentos en objetos y excluimos al usuario actual
        const usuarios = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(user => user.username !== usuarioActual.username);

        // Barajamos aleatoriamente
        const usuariosAleatoriosUnicos = [...usuarios]
          .sort(() => 0.5 - Math.random())
          .slice(0, 6); // Ahora seleccionamos 6

        setUsuariosAleatorios(usuariosAleatoriosUnicos);
      } catch (error) {
        console.error("Error obteniendo usuarios:", error);
      }
    };

    fetchUsuarios();
  }, [usuarioActual.username]);

  return (
    <div className="barraLateral">
      <div className="logoContainer">
        <img src={logo} alt="Logo" className="logoBarra" />
      </div>

      <div className="imagesContainer">
        {/* Foto de perfil del usuario actual */}
        <div
          className="itemBarra"
          onClick={() => navigate("/perfil", { state: { username: usuarioActual.username } })}
          style={{ cursor: "pointer" }}
        >
          <img src={usuarioActual.profileImage} alt="Mi perfil" />
        </div>

        {/* Usuarios aleatorios */}
        {usuariosAleatorios.map((usuario) => (
          <div
            key={usuario.id}
            className="itemBarra"
            onClick={() => navigate("/perfil", { state: { username: usuario.username } })}
            style={{ cursor: "pointer" }}
          >
            <img src={usuario.profileImage} alt={usuario.username} />
          </div>
        ))}
      </div>

      <div className="logoutContainer">
        <button className="logoutButton" onClick={() => navigate("/")}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Lateral;
