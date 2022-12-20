/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useLocationContext } from 'context/location/location.provider';
import { useEffect, useState } from 'react';
import { dataWeatherMock } from 'api/api';

const useGetWeatherData = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const { position } = useLocationContext();
  const [loading, setLoading] = useState(false);
  const options = {
    method: 'GET',
    url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily',
    params: {
      lat: String(position.coordinates.lat),
      lon: String(position.coordinates.lng),
    },
    headers: {
      'X-RapidAPI-Key': 'a183682061msha6161e95342c1bbp129ba3jsn1f556f434d5b',
      'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
    },
  };

  useEffect(() => {
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        setData(response?.data);
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [position.coordinates]);

  // axios data

  const minMaxTempData = data?.data?.map((day) => {
    return {
      date: day.datetime,
      tempMin: day.app_min_temp,
      tempMax: day.app_max_temp,
    };
  });
  const windSpeed = data?.data?.map((day) => {
    return {
      date: day.datetime,
      speed: day.wind_spd,
    };
  });
  const windDirectory = data?.data?.map((day) => {
    return {
      date: day.datetime,
      dir: day.wind_cdir,
    };
  });
  const cityName = data?.city_name;

  // mock data, when requests is over
  // const minMaxTempData = dataWeatherMock[0].data.map((day) => {
  //   return {
  //     date: day.datetime,
  //     tempMin: day.app_min_temp,
  //     tempMax: day.app_max_temp,
  //   };
  // });
  // const windSpeed = dataWeatherMock[0].data.map((day) => {
  //   return {
  //     date: day.datetime,
  //     speed: day.wind_spd,
  //   };
  // });

  // const windDirectory = dataWeatherMock[0].data.map((day) => {
  //   return {
  //     date: day.datetime,
  //     dir: day.wind_cdir,
  //   };
  // });

  // const cityName = dataWeatherMock[0].city_name;

  return {
    data,
    minMaxTempData,
    windSpeed,
    windDirectory,
    cityName,
    error,
    loading,
  };
};

export default useGetWeatherData;
