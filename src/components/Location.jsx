import React, { useState } from 'react';

const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const position = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      err => console.log(err)
    );
  };

  return (
    <div>
     
      {/* Display the latitude and longitude once available */}
      {latitude && longitude ? (
        <div>
          <h3>Location:</h3>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </div>
      ) : (
        <p>Location not available</p>
      )}
    </div>
  );
}

export default App;
