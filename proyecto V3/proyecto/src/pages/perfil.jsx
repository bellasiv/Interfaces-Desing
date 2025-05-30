import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { getAuth, signOut } from "firebase/auth";
import Menu from "../components/menu.jsx";
import FotoPerfil from "../components/FotoPerfil.jsx";
import PostLateral from "../components/PostLateral.jsx";
import ProfileInfo from "../components/InfoPerfil.jsx";
import "../components/perfil.css";

function Perfil({ profileImage, setProfileImage }) {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const [datosPerfil, setDatosPerfil] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      const storedUser = JSON.parse(localStorage.getItem("usuarioLogueado"));

      const usernameBuscado = location.state?.username || storedUser?.username;

      if (!usernameBuscado) return;

      try {
        const usuariosRef = collection(db, "usuarios");
        const snapshot = await getDocs(usuariosRef);
        const usuarioEncontrado = snapshot.docs
          .map(doc => doc.data())
          .find(user => user.username === usernameBuscado);

        if (usuarioEncontrado) {
          setDatosPerfil(usuarioEncontrado);
          setProfileImage(usuarioEncontrado.profileImage);
        }
      } catch (error) {
        console.error("Error cargando datos del perfil:", error);
      }
    };

    fetchUsuario();
  }, [location.state]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (!datosPerfil) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Cargando perfil...</p>;
  }

  return (
    <div className="perfil-container">
      <Menu />
      <FotoPerfil profileImage={profileImage} />
      <PostLateral username  = {datosPerfil.username}/>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ProfileInfo datos={datosPerfil} onImageUpdate={setProfileImage} />
      </div>
      <button className="btn-logout" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default Perfil;
