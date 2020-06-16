import React, { useRef } from "react";

import style from "./Locatie.module.css";
import InfoHeader from "../InfoHeader/InfoHeader";
import Geomap from "../Geomap/Geomap";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/images/marker-shadow.png";

const Locatie = () => {

  const innerRef = useRef();

  const getLocation = () => {
    innerRef.current && innerRef.current.getLocation();
  };

  return (
    <>
      <script src="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js"></script>
      <link type="text/css" rel="stylesheet" href="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css" />
      <InfoHeader title={"Vind de dichts bijzijnde kabien"} />
      <Geomap/>
    </>
  );
};

export default Locatie;