import React, { useEffect, useState } from "react";
import "./PostLateral.css";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const PostLateral = ({ username }) => {
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    const cargarPosts = async () => {
      if (!username) return;

      try {
        const usuariosRef = collection(db, "usuarios");
        const snapshot = await getDocs(usuariosRef);

        const usuario = snapshot.docs
          .map(doc => doc.data())
          .find(user => user.username === username);

        if (usuario?.posts?.length > 0) {
          setImagenes(usuario.posts);
        } else {
          setImagenes([]);
        }
      } catch (error) {
        console.error("Error cargando imágenes del usuario:", error);
      }
    };

    cargarPosts();
  }, [username]); // Se recarga si cambia el username

  return (
    <div className="image-scroll-container">
      <div className="image-list">
        {imagenes.length > 0 ? (
          imagenes.map((post, index) => (
            <img
              key={index}
              src={post.photoURL}
              className="image-item"
              alt={`Post ${index + 1}`}
            />
          ))
        ) : (
          <p style={{ color: "gray", textAlign: "center", padding: "1rem" }}>
            No hay publicaciones aún.
          </p>
        )}
      </div>
    </div>
  );
};

export default PostLateral;