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

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

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
          <Locate panTo={panTo} />
          <Search panTo={panTo} />
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

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default App;