import { GoogleMap, Marker } from "@react-google-maps/api";
import { useState, useMemo } from "react";
import "../components/map.css";

function Map() {
  const [markers, setMarkers] = useState([]);

  const mapContainer = useMemo(() => ({
    width: "70%", 
    height: "90vh",      
    position: "absolute",
    right: "30px",
    top: "150px",
    borderRadius: "8px", // Opcional: para bordes redondeados
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Opcional: sombra
    // '@media (max-width: 768px)': {
    //   width: "95%",
    //   height: "60vh",
    //   right: "10px", // Ajuste para móvil (más pequeño que 70px)
    //   top: "100px", // Menos espacio superior en móvil
    //   left: "10px", // Centrado con margen izquierdo
    //   margin: "0 auto", // Centrado adicional si es necesario
    // },
    
    // '@media (max-width: 480px): { // Opcional: ajuste extra para pantallas muy pequeñas
    //   top: "60px",
    //   height: "50vh",
    // }

  }), []);

  const center = useMemo(() => ({
    lat: 3.4516,
    lng: -76.50455
  }), []);

  const mapClick = (event) => {
    setMarkers([...markers, { 
      lat: event.latLng.lat(), 
      lng: event.latLng.lng()
    }]);
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainer}
      center={center}
      zoom={12}
      onClick={mapClick}
    >
      {markers.map((marker, index) => (
        <Marker key={index} position={marker} />
      ))}
    </GoogleMap>
  );
}

export default Map;