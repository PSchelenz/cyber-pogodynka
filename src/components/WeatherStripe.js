import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faCloudSunRain,
  faCloudSun,
  faCloudShowersHeavy,
  faCloudRain,
  faSun,
  faCloudBolt,
  faSmog,
  faDroplet,
  faPlay,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";
import "./WeatherStripe.css";

const WeatherStripe = (props) => {
  const convertToAMPM = (date) => {
    const currHour = new Date(date).getHours();
    let meridiem = "AM";

    if (currHour > 12) {
      meridiem = "PM";
    }

    let hourToDisplay = currHour === 0 ? 12 : (currHour % 13) + 1;

    return hourToDisplay + meridiem;
  };

  const convertToDayMonth = (date) => {
    const currDate = new Date(date);
    
    return currDate.getDate() + "/" + (currDate.getMonth() < 10 ? '0' + currDate.getMonth() : currDate.getMonth());
  };
  
  const displayTime = () => {
    if(props.timestamp === 'hours') {
        return convertToAMPM(props.weather.time)
    } else {
        return convertToDayMonth(props.weather.time)
    }
  };

  const chooseWeatherIcon = () => {
    const condition = props.weather.condition.code;

    switch(condition) {
        case 1000:
            return faSun;
        case 1003:
            return faCloudSun;
        case 1006:
            return faCloud;
        case 1063:
            return faCloudRain;
        case 1135:
            return faSmog;
        case 1180:
            return faCloudSunRain;
        case 1240:
        case 1243:
        case 1246:
            return faCloudShowersHeavy;
        case 1273:
        case 1276:
        case 1279:
        case 1282:
            return faCloudBolt;
        default:
            return faCloudSun;
    }
  };

  const getWindRotation = (degrees) => {
    return parseInt(degrees) - 90;
  };

  const getDropletIcon = () => {
    if (props.weather.chance_of_snow) {
      return faSnowflake;
    } else {
      return faDroplet;
    }
  };

  const getTop = () => {
    return (100 - Math.round(props.weather.temp_f)) * 2;
  };

  const getProbability = () => {
    return props.weather.chance_of_snow ? props.weather.chance_of_snow : props.weather.chance_of_rain;
  };

  const getTemperatureFormat = () => {
    return Math.round(props.temperatureFormat === 'fahrenheit' ? props.weather.temp_f : props.weather.temp_c);
  };

  return (
    <div className="weather-stripe">
      <span className="hour">{displayTime()}</span>
      <div className="weather">
        <div className="indicator" style={{top: `${getTop()}px`}}>
          <FontAwesomeIcon icon={chooseWeatherIcon()} className="icon" size="2x" />
          <p className="degrees">{getTemperatureFormat()}</p>
        </div>
      </div>
      <div className="wind-wrapper">
        <span className="power">{Math.round(props.weather.wind_kph)}</span>
        <div
          className="wind"
          style={{
            transform: `rotate(${getWindRotation(props.weather.wind_degree)}deg)`,
          }}
        >
          <FontAwesomeIcon icon={faPlay} className="direction" size="2xs" />
        </div>
      </div>
      <div className="rainfall">
        <div className="droplets">
          <FontAwesomeIcon icon={getDropletIcon()} className="droplet" />
          <FontAwesomeIcon icon={getDropletIcon()} className="droplet" />
          <FontAwesomeIcon icon={getDropletIcon()} className="droplet" />
        </div>
        <div className="probability">{getProbability()}%</div>
      </div>
    </div>
  );
};

export default WeatherStripe;
