import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect } from 'react';


const containerStyle = {
  width: '100%',
  height: '100%'
};
const center = {
  lat: -3.745,
  lng: -38.523
};
const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = React.useState(center);

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });
            
        });
         const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });
        });
        return () => {
            navigator.geolocation.clearWatch(watchId);
        }

    }, []);

    useEffect(() => {
        const updatePosition =()=>{
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({ lat: latitude, lng: longitude });
            });
        } 
        updatePosition();
        const intervalId = setInterval(updatePosition, 1000); // Update every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);
  return (
    <>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={10}
        >
          <Marker position={currentPosition} />
        </GoogleMap>
      </LoadScript> 
      </>
  )
}

export default LiveTracking
