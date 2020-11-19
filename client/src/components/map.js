import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import { places } from "../csvjson";
import { getDistance, convertDistance } from "geolib";
import Locate from "./Locate";
import { Card, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";



import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
const libraries = ["places"];

export default function Map() {
  const [tries, setTries] = useState(0);
  const [time, setTime] = useState(null);
  const [gameStart, setGameStart] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [distance, setDistance] = useState([]);
  const [selected, setSelected] = useState(null);
  const [place, setRandomPlace] = useState(null);
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");


  const placeRef = React.useRef();
  const mapContainerStyle = {
    width: "auto",
    height: "80vh",
  };

  const calDistance = (currentLat, currentLng) => {
    console.log(place);
    const currentDistance = getDistance(
      { latitude: place.Y, longitude: place.X },
      { latitude: currentLat, longitude: currentLng }
    );
    let km = convertDistance(currentDistance, "km");
    setTries(tries + 1);
    if (tries > 5) {
      alert("you looser");
      setGameStart(false);
      setTries(0);
      setDistance(0);
      setDistance(0);
      setRandomPlace(null);
      return;
    }
    if (km < 10) {
      alert("you are my man");
      setGameStart(false);
      setTries(0);
      setDistance(0);
      setRandomPlace(null);
      return;
    }
    setDistance(km);
  };

  const startTimer = () => {
    const timer = setTimeout(() => {
      setGameStart(false);
      alert("you lost");
    }, 5 * 60 * 1000);

    return () => {
      clearTimeout(timer);
    };
  };

  const generateRandomPlace = () => {
    setTries(0);
    setMarkers([]);
    const randomPlaces = places[Math.floor(Math.random() * places.length)];
    setRandomPlace(randomPlaces);
    setGameStart(true);
    startTimer();
    setTime(300);
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
      googleMapsApiKey: process.env.REACT_APP_JS_MAPS_API_KEY,
      libraries,
    },
    []
  );

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  });

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const onMapClick = (e) => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    if (place) {
      calDistance(lat, lng);
    }
    console.log(e);

    setMarkers((markers) => [
      ...markers,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        date: new Date(),
      },
    ]);
  };

  if (loadError) return "Error loading Map";
  if (!isLoaded) return "Loading Map";
  return (
    <section class="section pb-5">
      <div class="row">
        <div class="col-lg-4 mb-6">
          <h2>
            Discover Israel <span>🇮🇱 </span>
          </h2>
          </div>
          <div class="col-lg-6"></div>
          <div class="col-lg-2">
          <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 mb-4">
          <div class="card">
            <p>You Have 5 minutes to find the place in the map</p>
            {gameStart ? (
              <Timer time={time} setTime={setTime} />
            ) : (
              <div>5:00 minutes</div>
            )}

            <div class="input-group mb-3">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <Button
                    onClick={generateRandomPlace}
                    class="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    New City
                  </Button>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  readOnly
                  value={place && place.MGLSDE_LOC}
                />
              </div>
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  Tries
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={tries}
              />
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  distance
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={distance}
              />
            </div>
            {/* <Locate panTo={panTo} /> */}
            {/* <Search panTo={panTo} /> */}
          </div>
        </div>
        <div class="col-lg-8">
          <div
            id="map-container-google-11"
            class="z-depth-1-half map-container-6"
          >
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
                {/* {selected ? (
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
                ) : null} */}
              </GoogleMap>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// function Search({ panTo }) {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 31.768318, lng: () => 35.213711 },
//       radius: 100 * 1000,
//     },
//   });

//   // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

//   const handleInput = (e) => {
//     setValue(e.target.value);
//   };

//   const handleSelect = async (address) => {
//     setValue(address, false);
//     clearSuggestions();

//     try {
//       const results = await getGeocode({ address });
//       const { lat, lng } = await getLatLng(results[0]);
//       panTo({ lat, lng });
//     } catch (error) {
//       console.log("😱 Error: ", error);
//     }
//   };

//   return (
//     <div className="search">
//       <Combobox onSelect={handleSelect}>
//         <ComboboxInput
//           value={value}
//           onChange={handleInput}
//           disabled={!ready}
//           placeholder="Search your location"
//         />
//         <ComboboxPopover>
//           <ComboboxList>
//             {status === "OK" &&
//               data.map(({ id, description }) => (
//                 <ComboboxOption key={id} value={description} />
//               ))}
//           </ComboboxList>
//         </ComboboxPopover>
//       </Combobox>
//     </div>
//   );
// }
