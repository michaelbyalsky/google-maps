import React from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api'
require('dotenv').config({ path: '../.env' })

function App() {
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
    googleMapsApiKey: process.env.JS_MAPS_API_KEY,
    libraries,
  })

  console.log("sdfsdfsdfsdf", process.env.JS_MAPS_API_KEY);

  if(loadError) return "Error loading Map"
  if(!isLoaded) return "Loading Map"
  return (
    <div >
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center}/>
    </div>
  );
}

export default App;