import React from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api'
import './App.css'
import { JS_MAPS_API_KEY } from './secret'

function App() {
  console.log(JS_MAPS_API_KEY);
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
    <div className="app">
      <div className="control">

      </div>
      <div className="map">
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center}/>
      </div>
    </div>
  );
}

export default App;
