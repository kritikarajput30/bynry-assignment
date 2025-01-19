import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = ({ coordinates }) => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    if (!accessToken) {
      console.error(
        "Mapbox access token is missing. Please configure your .env file."
      );
      return;
    }

    if (!coordinates || coordinates.length !== 2) {
      console.error("Please provide valid coordinates as props.");
      console.log(JSON.stringify(coordinates));
      return;
    }
    mapboxgl.accessToken = accessToken;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: coordinates,
      zoom: 9,
    });

    new mapboxgl.Marker().setLngLat(coordinates).addTo(mapRef.current);
  }, [coordinates]);

  return (
    <div
      style={{ width: "100%", height: "500px" }}
      ref={mapContainerRef}
      className="map-container"
    />
  );
};

export default MapComponent;
