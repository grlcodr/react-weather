import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner2 } from 'react-icons/im';
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
  const [inputVal, setInputVal] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const handleInput = (e) => {
    setInputVal(e.target.value);
  };

  const handleSumbit = (e) => {
    // if a location in entered, set location
    if (inputVal !== '') {
      setLocation(inputVal)
    };
    //clear input text after submit
    const input = document.querySelector('input');
    //if no imput value 
    if (!input.value) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false)
      }, 500)
    }
    input.value = '';
    e.preventDefault();
  };

  //fetch data 
  useEffect(() => {
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    axios.get(url).then(res => {
      //set data after 1s
      setTimeout(() => {
        setData(res.data);
        setLoading(false);
      }, 1000)
      
    }).catch(err => {
      setLoading(false);
      setErrMsg(err);
    });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrMsg('')
    }, 2000);
    // clear timer
    return () => clearTimeout(timer);
  }, [errMsg])

  // if data is false show loader
  if (!data) {
    return (
      <div className='w-full h-screen bg-weatherBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'>
        <div>
          <ImSpinner2 className='text-5xl animate-spin text-white' />
        </div>
      </div>
    )
  }

  //set icon based on weather 
  let icon;

  // eslint-disable-next-line default-case
  switch(data.weather[0].main){
    case 'Clouds':
      icon = <BsCloud />;
      break;
    case 'Haze':
        icon = <BsCloudHaze />;
        break;
    case 'Rain':
      icon = <BsCloudRain className='text-[#118ab2]' />;
      break;
    case 'Clear':
      icon = <BsSun className='text-[#ffd166]' />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzle />;
      break;
    case 'Snow':
      icon = <BsCloudSnow className='text-[#118ab2]' />;
      break;
    case 'Thunderstorm':
      icon = <BsCloudLightningRain className='text-[#073b4c]' />;
      break;
  }

  const date = new Date();

  return(
    <div className='w-full h-screen bg-weatherBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0'>
      {errMsg && <div className='w-full max-w-[90vw] lg:max-w-[450px] bg-[#ef476f] text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md'>{`${errMsg.response.data.message}`}</div>}
      <form className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-white/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}>
        <div className='h-full relative flex items-center justify-between p-2'>
          <input onChange={(e) => handleInput(e)} className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full' type="text" placeholder='Search by city or country'/>
          <button onClick={(e) => handleSumbit(e)}className='bg-[#8889a4] hover:bg-[#615c7f] w-20 h-12 rounded-full flex justify-center items-center transition'>
            <BsSearch className='text-2xl text-white' />
          </button>
        </div>
      </form>
      <div className='w-full max-w-[450px] bg-white/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
        { loading ? (
          <div className='w-full h-full flex justify-center items-center'>
            <ImSpinner2 className='text-white text-5xl animate-spin' />
          </div>
          ) : (
        <div>
          {}
          <div className="flex items-center gap-x-5">
            <div className='text-[85px]'>{icon}</div>
              <div>
                <div className='text-2xl font-semibold'>
                  {data.name}, {data.sys.country}
                </div>
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
                </div>
              </div>
          </div>
          {}
          <div className="my-20">
            <div className='flex justify-center items-center'>
              <div className='text-[140px] leading-none font-light'>{parseInt(data.main.temp)}</div>
              <div className='text-4xl'>
                <TbTemperatureCelsius />
              </div>
            </div>
            <div className='capitalize text-center'>{data.weather[0].description}</div>
          </div>
          {}
          <div className="max-w-[370px] mx-auto flex flex-col gap-y-6">
            <div className='flex justify-between'>
              <div className='flex items-center gap-x-2'>
                <div className='text-[20px]'>
                  <BsEye />
                </div>
                <div>
                  Visibility <span>{data.visibility / 1000}km</span>
                </div>
              </div>
              <div className='flex items-center gap-x-2'>
                <div className='text-[20px]'>
                  <BsThermometer />
                </div>
                <div className='flex'>
                  <p>Feels like</p>
                  <div className=" flex ml-2">
                    {parseInt(data.main.feels_like)}
                    <TbTemperatureCelsius /> 
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='flex items-center gap-x-2'>
                <div className='text-[20px]'>
                  <BsWater />
                </div>
                <div>
                  Humidity <span>{data.main.humidity}%</span>
                </div>
              </div>
              <div className='flex items-center gap-x-2'>
                <div className='text-[20px]'>
                  <BsWind />
                </div>
                <div>
                  <div>Wind <span>{data.wind.speed} m/s</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>)}
      </div>
    </div>
  );
};

export default App;
