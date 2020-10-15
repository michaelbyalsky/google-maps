import React from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api'

function App() {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.JS_MAPS_API_KEY,
    libraries: ["places"]
  })
  return (
    <div >
      
    </div>
  );
}

export default App;
