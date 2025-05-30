import React from 'react';
import BarraLateral from "../components/BarraLateral"
import imagenesPerfil from "../data/imagenes";
import imagenesPandas from '../data/imagenesPanda';
import PostForm from "../components/postForm"
import Navbar from "../components/menu.jsx";

function Post(){
    return (
      <div>
        <Navbar/>
        <BarraLateral images = {imagenesPerfil} />
        <PostForm images = {imagenesPandas} />
      </div>
    );
  }
export default Post;
