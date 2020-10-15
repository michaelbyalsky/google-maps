import React from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api'

function App() {
  const libraries = ["places"]
  const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
  }

  const center = 
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.JS_MAPS_API_KEY,
    libraries,
  })

  if(loadError) return "Error loading Map"
  if(!isLoaded) return "Loading Map"
  return (
    <div >
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8}/>
    </div>
  );
}

export default App;
