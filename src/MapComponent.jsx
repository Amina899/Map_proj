// src/components/MapComponent.jsx
import React, { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";

const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude: 51.1694, // 
    longitude: 71.4491,
    zoom: 12,
  });

  const [userLocation, setUserLocation] = useState(null);
  const [showLocation, setShowLocation] = useState(true);
  const [showFriends, setShowFriends] = useState(true);

  const friends = [
    { id: 1, name: "Amina", latitude: 51.1700, longitude: 71.4300 },
    { id: 2, name: "Zhan", latitude: 51.1650, longitude: 71.4600 },
    { id: 3, name: "Dias", latitude: 51.1600, longitude: 71.4200 },
  ];

  

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert("Geolocation не поддерживается вашим браузером.");
    }
  }, []);

  return (
    <div className="w-full h-screen">
      <Map
        mapLib={maplibregl}
        initialViewState={viewport}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=hJnbBG3hn4wpz8d1PKXm"
      >
       {showLocation && userLocation && (
  <Marker latitude={userLocation.latitude} longitude={userLocation.longitude}>
    <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
  </Marker>
)}

{showFriends &&
  friends.map((friend) => (
    <Marker
      key={friend.id}
      latitude={friend.latitude}
      longitude={friend.longitude}
    >
      <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs">
        {friend.name.charAt(0)}
      </div>
    </Marker>
))}

        {friends.map((friend) => (
  <Marker
    key={friend.id}
    latitude={friend.latitude}
    longitude={friend.longitude}
  >
    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white">
      <span className="text-xs">{friend.name}</span>
    </div>
  </Marker>
))}

      </Map>

      <div className="absolute top-4 left-4 bg-white p-4 rounded shadow flex flex-col gap-2">
  <button
    className="bg-blue-600 text-white px-4 py-2 rounded"
    onClick={() => {
      setShowLocation(true);
      setShowFriends(false);
    }}
  >
    Только я
  </button>
  <button
    className="bg-green-600 text-white px-4 py-2 rounded"
    onClick={() => {
      setShowLocation(false);
      setShowFriends(true);
    }}
  >
    Только друзья
  </button>
  <button
    className="bg-gray-800 text-white px-4 py-2 rounded"
    onClick={() => {
      setShowLocation(true);
      setShowFriends(true);
    }}
  >
    Все
  </button>
</div>

    </div>
  );
};

export default MapComponent;
