import React from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api'

function App() {
  const {} = useLoadScript({
    googleMapsApiKey: process.env.JS_MAPS_API_KEY
  })
  return (
    <div >
      
    </div>
  );
}

export default App;
