"use client";

import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 0,
  lng: 0,
};

const FireMap = ({ fireData }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [selectedMarker, setSelectedMarker] = useState(null); // Store the selected marker for InfoWindow
  const mapRef = useRef(null); // Reference to the map
  const markersRef = useRef([]); // Store references to the markers
  const clustererRef = useRef(null); // Reference to the MarkerClusterer

  useEffect(() => {
    if (isLoaded && mapRef.current && fireData.length > 0) {
      // Clear previous markers and clusters
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
      
      // Create markers and store them in the markersRef
      fireData.forEach((fire) => {
        const lat = parseFloat(fire.latitude);
        const lng = parseFloat(fire.longitude);

        if (isNaN(lat) || isNaN(lng)) return;

        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          icon: {
            url: "https://cdn-icons-png.freepik.com/256/4526/4526255.png?semt=ais_hybrid", // Fire icon
            scaledSize: new window.google.maps.Size(30, 30),
          },
        });

        // Add click listener for showing the InfoWindow
        marker.addListener("click", () => {
          setSelectedMarker({
            latitude: lat,
            longitude: lng,
            alert__date: fire.alert__date,
            is__primary_forest: fire.is__primary_forest,
            is__gfw_mining: fire.is__gfw_mining,
          });
        });

        markersRef.current.push(marker); // Store marker in markersRef
      });

      // Initialize MarkerClusterer
      if (clustererRef.current) {
        clustererRef.current.clearMarkers(); // Clear any previous markers in cluster
      }
      clustererRef.current = new MarkerClusterer({
        map: mapRef.current,
        markers: markersRef.current, // Add markers to clusterer
      });
    }
  }, [fireData, isLoaded]);

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2}
      onLoad={(map) => {
        mapRef.current = map; // Store map instance
      }}
    >
      {/* InfoWindow for the selected marker */}
      {selectedMarker && (
        <InfoWindow
          position={{
            lat: selectedMarker.latitude,
            lng: selectedMarker.longitude,
          }}
          onCloseClick={() => setSelectedMarker(null)} // Close InfoWindow
        >
          <div>
            <h3>Fire Alert Details</h3>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedMarker.alert__date).toLocaleDateString()}
            </p>
            <p>
              <strong>Primary Forest:</strong>{" "}
              {selectedMarker.is__primary_forest ? "Yes" : "No"}
            </p>
            <p>
              <strong>GFW Mining:</strong>{" "}
              {selectedMarker.is__gfw_mining ? "Yes" : "No"}
            </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default FireMap;
