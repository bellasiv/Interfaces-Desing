import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import Post from "./Publicaciones";
import "./Feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const cargarTodosLosPosts = async () => {
      try {
        const usuariosSnapshot = await getDocs(collection(db, "usuarios"));

        const todosLosPosts = [];

        usuariosSnapshot.forEach(doc => {
          const data = doc.data();

          if (Array.isArray(data.posts)) {
            data.posts.forEach(post => {
              todosLosPosts.push({
                photoURL: post.photoURL,
                description: post.description,
                user: data.username, // Aquí se toma directamente del documento de Firestore
              });
            });
          }
        });

        setPosts(todosLosPosts);
      } catch (error) {
        console.error("Error al cargar publicaciones:", error);
      }
    };

    cargarTodosLosPosts();
  }, []);

  return (
    <div className="feed1">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Post
            key={index}
            image={post.photoURL}
            user={post.user}
            description={post.description}
          />
        ))
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          No hay publicaciones disponibles.
        </p>
      )}
    </div>
  );
};

export default Feed;