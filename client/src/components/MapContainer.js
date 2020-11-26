import React from "react";

import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";

const center = {
  lat: 31.768318,
  lng: 35.213711,
};

const mapContainerStyle = {
  width: "auto",
  height: "80vh",
};

const MapContainer = ({ markers, onMapClick, setSelected,  selected}) => {
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  });

  const { isLoaded, loadError } = useLoadScript(
    {
      googleMapsApiKey: process.env.REACT_APP_JS_MAPS_API_KEY,
    },
    []
  );

  if (loadError) return "Error loading Map";
  if (!isLoaded) return "Loading Map";

  return (
    <div>
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
      </GoogleMap>
    </div>
  );
};
export default React.memo(MapContainer);
