import { GoogleMap, Marker } from "@react-google-maps/api";
import { useState, useMemo } from "react";
import "../components/map.css";

function Map() {
  const [markers, setMarkers] = useState([]);

  const mapContainer = useMemo(() => ({
    width: "90%",
    height: "70vh",
    position: "absolute",
    bottom: "20px",
    right: "50%",
    transform: "translateX(50%)",
    border: "8px solid white",
    marginTop: "40px",
    maxWidth: "1200px",
    '@media (max-width: 768px)': {
      width: "95%",
      height: "60vh",
      border: "4px solid white",
    }
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