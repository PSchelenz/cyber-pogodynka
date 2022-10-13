import React, { Fragment, useEffect, useState } from "react";

import "./WeatherList.css";
import WeatherStripe from "./WeatherStripe";

const WeatherList = (props) => {
  const [weatherStripes, setWeatherStripes] = useState([]);
  const [showForward, setShowForward] = useState(5);

  const getNow = () => {
    if (props.timestamp === "hours") {
      return new Date().getHours();
    } else {
      return new Date().getDay();
    }
  };

  const getDataToDisplay = (res) => {
    if (props.timestamp === "hours") {
      const currHour = getNow();
      const from = currHour,
        to = currHour + showForward;

      let alterFrom = null,
        alterTo = null;

      let hoursToDisplay = res.forecast.forecastday[0].hour.slice(
        from,
        Math.min(to, 23)
      );

      if (to > 23) {
        alterFrom = 0;
        alterTo = to - 23;

        hoursToDisplay.push(
          ...res.forecast.forecastday[1].hour.slice(alterFrom, alterTo)
        );
      }

      return hoursToDisplay;
    } else {
      return res.forecast.forecastday
        .slice(0, showForward)
        .map((day, index) => {
          return {
            date_epoch: day.date_epoch,
            chance_of_snow: day.day.daily_chance_of_snow,
            chance_of_rain: day.day.daily_chance_of_rain,
            temp_f: day.day.maxtemp_f,
            temp_c: day.day.maxtemp_c,
            time: day.date,
            wind_kph: day.day.maxwind_kph,
            wind_degree: res.forecast.forecastday[index].hour.reduce(
              (previous, current, index, array) => {
                let deg =
                  (previous.wind_degree ?? previous) + current.wind_degree;

                if (index === array.length - 1) {
                  deg = Math.round(deg / array.length);
                }

                return deg;
              }
            ),
            condition: day.day.condition,
          };
        });
    }
  };

  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=ecc45c7ae5564cb097b103740220210&q=${props.city ?? 'Szczecin'}&aqi=no&days=5`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setWeatherStripes((prevState) => getDataToDisplay(res));
      });
  }, [props.city, props.timestamp]);

  return (
    <Fragment>
      <div className="weather-list">
        {weatherStripes.map((weatherStripe) => (
          <WeatherStripe
            key={weatherStripe.time_epoch ?? weatherStripe.date_epoch}
            weather={weatherStripe}
            timestamp={props.timestamp}
            temperatureFormat={props.temperatureFormat}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default WeatherList;
