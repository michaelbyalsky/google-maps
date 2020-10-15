import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api'
import './App.css'
import { JS_MAPS_API_KEY } from './secret'

function App() {
  console.log(JS_MAPS_API_KEY);
  const [setMarkers, setSetMarkers] = useState([])
  const libraries = ["places"]
  const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
  }

  const center = {
    lat: 31.768318,
    lng: 35.213711 
  }

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: JS_MAPS_API_KEY,
    libraries,
  })

  if(loadError) return "Error loading Map"
  if(!isLoaded) return "Loading Map"
  return (
    <div className="app">
      <div className="control">

      <h1>Bears <span>🐻</span></h1>
      </div>
      <div className="map">
      <GoogleMap onClick={(e) => setSetMarkers(markers => [...markers, new]) } mapContainerStyle={mapContainerStyle} zoom={8} center={center}/>
      </div>
    </div>
  );
}

export default App;
