import React from "react";
import Post from "./Publicaciones"; // Importamos el componente de Post
import "./Feed.css";
import postUno from "../assets/postUno.jpg"
import postDos from "../assets/postDos.jpg"
import postTres from "../assets/postTres.jpg"
import postCuatro from "../assets/perfilCuatro.jpg"

const posts = [
  { image: postUno, user: "user_1234", description: "Description"},
  { image: postDos, user: "user_134", description: "Description"},
  { image: postTres, user: "user_567", description: "Description"},
  { image: postCuatro, user: "user_567", description: "Description"}
];

const Feed = () => {
  return (
    <div className = "feed1">
      {posts.map((post, index) => (
        <Post 
          key = {index}
          image = {post.image}
          user = {post.user}
          description = {post.description}
        />
      ))}
    </div>
  );
};

export default Feed;