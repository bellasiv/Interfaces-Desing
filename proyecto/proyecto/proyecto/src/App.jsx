import { Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from "react";

import InicioSesion from "./pages/inicioSesion.jsx";
import Registro from "./pages/registro.jsx";
import PaginaPrincipal from "./pages/paginaPrincipal.jsx";
import PetMap from "./pages/petMap.jsx";
import Ranking from "./pages/ranking.jsx";
import Chat from "./pages/chat.jsx";
import Post from "./pages/post.jsx";
import Perfil from "./pages/perfil.jsx";

function App() {
    const [profileImage, setProfileImage] = useState(null);

    return (
        <Routes>
            <Route path="/" element={<InicioSesion />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/paginaPrincipal" element={<PaginaPrincipal />} />
            <Route path="/petMap" element={<PetMap />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/chat/:contactId" element={<Chat />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/post" element={<Post />} />
            <Route path="/perfil" element={<Perfil profileImage={profileImage} setProfileImage={setProfileImage} />} />
        </Routes>
    );
}

export default App;
