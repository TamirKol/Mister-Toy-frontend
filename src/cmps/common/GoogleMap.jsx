import React, { useEffect,useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMap({branch}) {

    useEffect(()=>{
       if(branch){
        setCoordinates(branch)
       }
    },[branch])
    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    // const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11


    function handleClick({ lat, lng }) {
        console.log({lat,lng});
        setCoordinates({ lat, lng })
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '40vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBMZ1V7mYaThIm95gpB0Bgzqg9Zs53qPq8" }}
                center={coordinates}
                defaultZoom={zoom}
                onClick={handleClick}
            >
                <AnyReactComponent
                    {...coordinates}
                    text="🧸"
                />
            </GoogleMapReact>
        </div>
    );
}