import React, { useState } from "react";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";
//import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Geomap = () => {

  navigator.geolocation.getCurrentPosition(function (location) {
    var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
    setLatc(latlng.lat)
    setLngc(latlng.lng)
  });

  const[lat, setLat] = useState(50.830430);
  const[lng, setLng] = useState(3.265680);
  const[clat, setLatc] = useState("");
  const[clng, setLngc] = useState("");
  const[zoom, setZoom] = useState(14);
  const position = [lat, lng];
  const cposition = [clat, clng];
  console.log(cposition);

    return (

      <Map center={position} zoom={zoom} style={{ height: 400 }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            Dit is het dichtsbijzijnde kabientje <br /> Broeikaai 25, 8500 Kotrijk
          </Popup>
        </Marker>
        <Marker position={cposition}>
          <Popup>
            uw locatie
          </Popup>
        </Marker>
      </Map>


    );
}

export default Geomap;