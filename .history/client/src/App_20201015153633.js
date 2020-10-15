import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import "./App.css";
import { JS_MAPS_API_KEY } from "./secret";
import { formatRelative } from "date-fns";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

function App() {
  console.log(JS_MAPS_API_KEY);
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const libraries = ["places"];
  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const center = {
    lat: 31.768318,
    lng: 35.213711,
  };

  const { isLoaded, loadError } = useLoadScript(
    {
      googleMapsApiKey: JS_MAPS_API_KEY,
      libraries,
    },
    []
  );

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  });

  const onMapClick = React.useCallback((e) => {
    console.log(e);
    setMarkers((markers) => [
      ...markers,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        date: new Date(),
      },
    ]);
  }, []);
  console.log(selected && selected.date);
  console.log(new Date());

  if (loadError) return "Error loading Map";
  if (!isLoaded) return "Loading Map";
  return (
    <div className="app">
      <div className="control">
        <h1>
          Bears <span>🐻</span>
        </h1>
      </div>
      <div className="map">
        <GoogleMap
          onClick={onMapClick}
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          onLoad={onMapLoad}
        >
          {markers.map((marker) => {
            return (
              <Marker
                key={`${marker.lat}-${marker.lng}`}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => setSelected(marker)}
                icon={{
                  url: `/bear.svg`,
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            );
          })}
          {selected ? (
            <InfoWindow
              onCloseClick={() => {
                setSelected(null);
              }}
              position={{ lat: selected.lat, lng: selected.lng }}
            >
              <div>
                <h2>Bear Spotted</h2>
                <p>Spotted {formatRelative(selected.date, new Date())}</p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </div>
  );
}

export default App;
