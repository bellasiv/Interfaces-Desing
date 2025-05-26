import { useLoadScript } from "@react-google-maps/api";
import BarraLateral from "../components/BarraLateral";
import imagenesPerfil from "../data/imagenes";
import Navbar from "../components/menu.jsx";
import Map from "../components/map";

const libraries = ["places"];

function PetMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem',
        color: '#bf755a'
      }}>
        Loading Map...
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Navbar />
      <BarraLateral images={imagenesPerfil} />
      <div className="letter-container">
        <div className="letter-text">Find your PetFriend!</div>
      </div>
      <Map />
    </div>
  );
}

export default PetMap;