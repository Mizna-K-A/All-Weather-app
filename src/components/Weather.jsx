import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import cloud_icon from '../assets/cloud.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'


const Weather = () => {
  const inputRef = useRef()
  const [weatherData,setWeatherData] = useState(false)
  const search = async (city)=>{
    if (city === "") {
        alert("Enter City Name")
        return;
    }
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if(!response.ok){
          alert(data.message)
          return;
        }

        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,

        })
        
    }catch (error){
        setWeatherData(false);
        console.error("Error in fetching weather data");
        
    }
  }
  useEffect(()=>{
    search("London");
  },[])

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
      </div>
      {weatherData?
      <>
        <img src={cloud_icon} className='weather-icon' alt="" />
      <p className='temperature'>{weatherData.temperature} °C</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      </>
      :
      <>
      </>}
      
    </div>
  )
}

export default Weather