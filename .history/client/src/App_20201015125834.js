import React from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api'
import './App.css'
const result = dotenv.config()

function App() {
  const { JS_MAPS_API_KEY } = process.env
  console.log(process.env);
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

  console.log("sdfsdfsdfsdf", JS_MAPS_API_KEY);

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
