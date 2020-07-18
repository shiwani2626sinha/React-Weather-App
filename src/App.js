import React, {useState, useEffect} from 'react';
import './App.css';
import {Container, Row, Col} from 'reactstrap';
 

function App() {
    const apikey='9d698e6bcdf3b58572c9793337febcd3';
   
   
 // let city = 'london';

   const [city, setCity] = useState('');
   const [temp,setTemp] = useState('');
   const [feelsLike, setFeelsLike] = useState('');
   const [tempMin, setTempMin] = useState('');
   const [tempMax, setTempMax] = useState('');
   const [country, setCountry] = useState('');
   const [description, setDescription] = useState('');
   const [icon, setIcon] = useState('');
   const [id, setId] = useState('');
   const [name, setName] = useState('');
   const [errorMessage, setErrorMessage] = useState('wrong city');
   const [cel, setCel] = useState('');
   
   

   useEffect(() => {
     
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      //setData(data);  
     
   },[]);
    
   })

   const setCityHandler = (e) =>{
    
    setCity(e.target.value)
  };

  const handleSubmit = (e) => {
     e.preventDefault();
     fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      if(data.message){
        setErrorMessage(data.message)
      }
      else{
       setData(data);
        setErrorMessage(null);
      }
;
     
   });
   }
   const calCelsius = (temp) => {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  
  const setData = (data) => {
        setName(data.name)
        setTemp(calCelsius(data.main.temp));
        setCountry(data.sys.country);
        setDescription(data.weather[0].description);
        setFeelsLike(calCelsius(data.main.feels_like));
        setTempMax(calCelsius(data.main.temp_max));
        setTempMin(calCelsius(data.main.temp_min));
        setId(data.weather[0].id);
        setIcon(data.weather[0].icon);  
        setCel('°C'); 
        return;  
     }
 
     
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
 
    

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div>
       <div>
          <div className="navbar">
             <span className="title">React Weather App</span>
          </div>
          <form className="dataForm" onSubmit= {handleSubmit}>
          <input type="text" placeholder="Enter the city" className="input"  onChange={setCityHandler}></input>
          <span> </span>
          <button type="submit" className="button"  >Check weather!</button>
          </form>
        </div>
     
        {errorMessage ? (<p></p>): 
          ( 
            
              <div className="tempInfo">
                   
                   <img src={require(`./assets/${icon}@2x.png`)}></img>
                   <h3 className="description">{description}</h3>
                   <h3 className="countryInfo">{name}, {country}, {dateBuilder(new Date())}</h3>
                   <div className="section">
                   <span className="temp">Temperature : {temp}{cel}</span>
                   <span className="tempMax">Max : {tempMax}{cel}</span>
                   <span className="tempMin">Min : {tempMin}{cel}</span>
                   </div>
                   <h1 className="feelsLike">Feels Like: {feelsLike}{cel}</h1>
                   
              </div>     
          )
        
        }
     </div>
    
  );
}

export default App;
