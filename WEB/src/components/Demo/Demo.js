import React, { useState } from "react";
import { geolocated, geoPropTypes } from "./index";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const Demo = (props) => {

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [position, setPosition] = useState("");

    //const position = [latitude, longitude]

    return (
        <>
            <div
                style={{
                    fontSize: "large",
                    fontWeight: "bold",
                    margin: "2rem",
                }}>
                {!props.isGeolocationAvailable ? (
                    <div>Your browser does not support Geolocation.</div>
                ) : !props.isGeolocationEnabled ? (
                    <div>Geolocation is not enabled.</div>
                ) : props.coords ? (
                    <div>
                        You are at{" "}
                        <span className="coordinate">
                            {props.coords.latitude}
                        </span>
                ,{" "}
                        <span className="coordinate">
                            {props.coords.longitude}
                        </span>
                        {setLatitude(props.coords.latitude)}
                        {setLongitude(props.coords.longitude)}
                        {setPosition(latitude, longitude)}
                <Map center={position} zoom={13}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            />
                            {/* position={position} */}
                            {/* <Marker position={`${props.coords.latitude}, ${props.coords.longitude} `} > */}
                            <Marker position={position} >
                                <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                            </Marker>
                        </Map>
                    </div>




                ) : (
                                <div>Getting the location data&hellip;</div>
                            )}
                {!!props.positionError && (
                    <div>
                        <br />
                Last position error:
                        <pre>{JSON.stringify(props.positionError)}</pre>
                    </div>
                )}
            </div>
        </>
    )
}


Demo.propTypes = { ...Demo.propTypes, ...geoPropTypes };

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Demo);
