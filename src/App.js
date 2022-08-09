import React, { useState, useEffect} from "react";

function App() {
  const [weatherNow, setWeatherNow] = useState([]);
  const [locations, setLocations] = useState("london");
  const [photos, setPhotos] = useState([]);
  const fetchWeather = async () => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=ce02a8091e826d523a788adfb291b3d7&units=metric`;

    const url2 = `https://api.unsplash.com/search/photos?query=${locations}&client_id=qJn9HeRKpSm6UvWuWKc0ZMMWZGyyg6A2D2tEJ6xKxPs`;

    try {
      const response = await fetch(url);
      const resWeather = await response.json();
      // console.log(resWeather.weather[0].description);
      setWeatherNow(resWeather);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await fetch(url2);
      const resPhoto = await response.json();
      setPhotos(resPhoto.results[0].urls.raw);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line
  },[]);

  return (
    <div className="app">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input"
          />
          <button type="button" className="location_searcher" onClick={fetchWeather}>Search Location</button>
        </div>
        <div className="app__data">
          <p className="temp">
            Current Temperature: {weatherNow?.main?.temp}
            <span>°C</span>
          </p>
          {/* <p className="temp"> Current weather : {weatherNow?.description}</p> */}
        </div>
        <img className="app__image" src={photos} alt="" />
      </div>
    </div>
  );
}

export default App;
