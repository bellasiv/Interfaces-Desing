import React from 'react';
import BarraLateral from "../components/BarraLateral"
import imagenesPerfil from "../data/imagenes";
import Navbar from "../components/menu.jsx";
import Feed from "../components/Feed";
import ScrollToTop from '../components/scrollableTop';


function PaginaPrincipal(){
  return (
    <div className = "app">
      <Navbar/>
      <BarraLateral images = {imagenesPerfil} />
      <Feed />
    <ScrollToTop />
    </div>
  );
}

export default PaginaPrincipal;
