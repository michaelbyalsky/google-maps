import React from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api'

function App() {
  const libraries = ["places"]
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.JS_MAPS_API_KEY,
    libraries,
  })

  if(loadError) return "ErrorloadingMap"
  return (
    <div >
      Map
    </div>
  );
}

export default App;
