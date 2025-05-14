import { GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";
import "../components/map.css";

const mapContainer = {
  width: "63%",
  height: "70vh", 
  position: "absolute",
  bottom: "20px", 
  right: 200,
  border: "8px solid white",
  marginTop: "40px" 
  
};


const center = {
  lat: 3.4516,
  lng: -76.50455
};

function Map() {
  const [markers, setMarkers] = useState([]);

  const mapClick = (event) => {
    setMarkers([...markers, { lat: event.latLng.lat(), lng: event.latLng.lng()}]);
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