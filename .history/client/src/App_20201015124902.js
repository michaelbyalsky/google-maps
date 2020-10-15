import React from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api'
import './App.css'
require('dotenv').config()

function App() {
  console.log(process.env);
  const libraries = ["places"]
  const mapContainerStyle = {
    width: "100vw",
    height: "70vh"
  }

  const center = {
    lat: 31.768318,
    lng: 35.213711 
  }

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: 'AIzaSyBQ2e2GjrvN8oi4090gAWAR5OxnoLDDuRs',
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
