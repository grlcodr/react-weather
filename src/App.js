import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner5 } from 'react-icons/im';
import {
  BsSun,
  BsCloudRain,
  BsCloud,
  BsCloudSnow,
  BsCloudLightningRain,
  BsSearch,
  BsCloudHaze,
  BsCloudDrizzle,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
  BsCloudLightning,
} from 'react-icons/bs';

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('London');

  //fetch data 
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

    axios.get(url).then(res => {
      setData(res.data);
    });
  }, [location]);

  // if data is false show loader
  if (!data) {
    return (
      <div>
        <div>
          <ImSpinner5 className='text-5xl animate-spin' />
        </div>
      </div>
    )
  }

  //set icon based on weather 
  let icon;
  console.log(data.weather[0].main)
  // eslint-disable-next-line default-case
  switch(data.weather[0].main){
    case 'Clouds':
      icon = <BsCloud />;
      break;
    case 'Haze':
        icon = <BsCloudHaze />;
        break;
    case 'Rain':
      icon = <BsCloudRain />;
      break;
    case 'Clear':
      icon = <BsSun />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzle />;
      break;
    case 'Snow':
      icon = <BsCloudSnow />;
      break;
    case 'Thunderstorm':
      icon = <BsCloudLightningRain />;
      break;
  }

  return <div className='text-6xl'>{icon}</div>;
};

export default App;
