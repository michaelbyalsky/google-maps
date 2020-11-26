import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import { places } from "../csvjson";
import { getDistance, convertDistance } from "geolib";
import Locate from "./Locate";
import { Card, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MapContainer from "./MapContainer";

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

  const calDistance = React.useCallback((currentLat, currentLng) => {
    const currentDistance = getDistance(
      { latitude: place.Y, longitude: place.X },
      { latitude: currentLat, longitude: currentLng }
    );
    let km = convertDistance(currentDistance, "km");
    setTries(tries + 1);
    if (tries > 5) {
      alert("you looser");
      setTime(null)
      setGameStart(false);
      setTries(0);
      setDistance(0);
      setRandomPlace(null);
      return;
    }
    if (km < 10) {

      alert("you are my man");
      setTime(null)
      setGameStart(false);
      setTries(0);
      setDistance(0);
      setRandomPlace(null);
      return;
    }
    setDistance(km);
  }, [tries, place]);

  const generateRandomPlace = React.useCallback(() => {
    setTime(60);
    setTries(0);
    setMarkers([]);
    const randomPlaces = places[Math.floor(Math.random() * places.length)];
    setRandomPlace(randomPlaces);
    setGameStart(true);
  }, [places, time]);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const onMapClick = React.useCallback((e) => {
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
  }, [markers, place]);

 
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
          </Button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 mb-4">
          <div class="card">
            <p>You Have 5 minutes to find the place in the map</p>
            {gameStart ? (
              <Timer setGameStart={setGameStart} time={time} setTime={setTime} />
            ) : (
              <div>1:00 minutes</div>
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
          </div>
        </div>
        <div class="col-lg-8">
          <div
            id="map-container-google-11"
            class="z-depth-1-half map-container-6"
          >
            <div className="map">
              <MapContainer markers={markers} selected={selected} setSelected={setSelected} onMapClick={onMapClick}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
