import "./App.css";
import React, { Fragment, useState } from "react";
import WeatherList from "./components/WeatherList";
import SetCity from "./components/SetCity";
import video from "../src/videos/cyberback.mp4";
import SetTimestamp from "./components/SetTimestamp";
import SetTemperatureFormat from "./components/SetTemperatureFormat";

function App() {
  const [city, setCity] = useState(null);
  const [timestamp, setTimestamp] = useState('days');
  const [temperatureFormat, setTemperatureFormat] = useState('fahrenheit');

  const handleCitySubmit = (city) => {
    setCity(city);
  };

  const handleTimestampSubmit = (ts) => {
    setTimestamp(ts);
  }

  const handleFormatSubmit = (format) => {
    setTemperatureFormat(format);
  }

  return (
    <Fragment>
      <video src={video} className="video-wrapper" autoPlay muted loop></video>
      <div className="input-bar">
        <SetCity onCitySubmit={handleCitySubmit}/>
        <SetTimestamp onTimestampSubmit={handleTimestampSubmit} timestamp={timestamp} />
        <SetTemperatureFormat onFormatSubmit={handleFormatSubmit} temperatureFormat={temperatureFormat} />
      </div>
      <WeatherList city={city} timestamp={timestamp} temperatureFormat={temperatureFormat} />
    </Fragment>
  );
}

export default App;
