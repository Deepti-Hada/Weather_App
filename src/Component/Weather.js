import React,{useEffect, useState} from 'react'
import sun from '../Images/sun.png'
import sunclouds from '../Images/Sun-And-Cloud.png';
import suncloudsrain from '../Images/sunandrain.webp'
import weather from '../Images/weather.mp4'
import haze from '../Images/haze.webp'
function Weather() {
  
  var today = new Date(),
    date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    const [time,setTime] = useState('')
    const ctime = () =>{
     const Time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        setTime(Time)
      }
      useEffect( () =>{
        ctime();
        getweather();
      },[])
      setTimeout(() => {
        ctime();
       }, 1000);
   
    const [search,setSearch] = useState("Delhi")
    const [city,setCity] = useState(" ")
    const [temp,setTemp] = useState(" ")
    const [feelslike,setFeelslike] = useState(" ")
    const [type,setType] = useState("")
    const [img,setImg] = useState("sun")
    const[country,setCountry] = useState("")
    const [humidity,setHumidity] = useState("")
    const [windspeed,setWindspeed] = useState("")
    const [pressure,setPressure] = useState("")
    const [tempmin,setTempmin] = useState("")
    const [tempmax,setTempmax] = useState("")
    const [longitude,setLongitude] = useState("")
    const [latitude,setLatitude] = useState("")

    let API_key = "c96eee4698bd7cd925117c31bd2d06ef";
    const getweather =async () =>{
       let getdata =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_key}&units=metric`)
       let Data=await getdata.json()
       console.log(Data)
       if(Data.cod == 400){
        alert("please Enter correct city name")
        console.log("not found")
       }
       setCity(Data.name)
       setTemp(Math.floor(Data.main.temp))
       setFeelslike(Math.floor(Data.main.feels_like))
       setType(Data.weather[0].main)
       setCountry(Data.sys.country)
       setHumidity(Data.main.humidity)
       setWindspeed(Data.wind.speed)
       setPressure(Data.main.pressure)
       setTempmin(Math.floor(Data.main.temp_min))
       setTempmax(Math.floor(Data.main.temp_max))
       setLongitude(Data.coord.lon)
       setLatitude(Data.coord.lat)

       if(Data.weather[0].description === "clear sky"){
        setImg(sun)
       }
       else if(Data.weather[0].description === "overcast clouds"){
        setImg(sunclouds)
       }
       else if(Data.weather[0].description === "light rain"){
        setImg(suncloudsrain)
       }
       else if(Data.weather[0].description === "haze"){
        setImg(haze)
       }
       else{
        setImg(sunclouds)
       }
       }

  return (
  <div className='weather-home d-flex justify-content-center align-items-center'>
    <video autoPlay loop muted playsInline className='video'><source src={weather} type='video/mp4'></source></video>
  <div className='weather-board bg-dark  py-2 py-lg-4'>
   <div className=''>
    <div className='text-center'>
    <input type="" placeholder='Enter City Name' className='p-2  border-0 w-50 opacity-75' onChange={(e) => setSearch(e.target.value)}/>
    <button onClick={getweather} className='button'>Search</button>
    </div>
<div className='d-flex justify-content-between align-items-start px-5 mt-3 text-white'>
  <div className=''>
    
    <h1>{time}</h1>
    <p>{date}</p>
  </div>
  <div className=''>
  <h1>{city}</h1>
  <p>{country}</p>
  <h6>Lon : {`${longitude}°`}</h6>
  <h6>Lat : {`${latitude}°`}</h6>
  </div>
</div>
    
   </div>
   <div className="weather-details ">
   <div className='d-flex justify-content-between align-items-center p-5 '>
    <div className='d-flex'>
    <img src={img} width={100} height={100} />
    <div className=''>
    <h1>{`${temp}°C`}</h1>
    <h5>{type}</h5>
    <p>{`Feels like ${feelslike}°C`}</p>
    </div>
    </div>
    <div className=''>
      <h6>Humidity</h6>
      <h4>{`${humidity} %`}</h4>
    </div>
    <div className=''>
      <h6>Wind Speed</h6>
      <h4>{`${windspeed} Km/h`}</h4>
    </div>
    <div className=''>
      <h6>Pressure</h6>
      <h4>{`${pressure} mb`}</h4>
    </div>
    <div className=''>
      <h6>Temp min.</h6>
      <h4>{`${tempmin}°C`}</h4>
    </div>
    <div className=''>
      <h6>Temp Max.</h6>
      <h4>{`${tempmax}°C`}</h4>
    </div>
   </div>
    
   
   </div>
  </div>
  </div>
  )
}

export default Weather