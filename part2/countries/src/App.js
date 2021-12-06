import { useState, useEffect } from "react";
import axios from 'axios'

const Search = ({handleChange, filter}) => <p>find countries <input value={filter} onChange={handleChange}></input></p>

const Info = ({countries, filter, setFilter, weather, setWeather}) => {
  const countriesFilter = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (countriesFilter.length > 10) {
    return <p>Too many matches, specify antoher filter</p>
  }
  else if (countriesFilter.length === 1) {
    return <CountryInfo country={countriesFilter[0]}/>
  }

  return <CountryList countries={countriesFilter} setFilter={setFilter}/>
}

//List of countries when the are less than 10 countries filtered
const CountryList = ({countries, setFilter}) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.official}>{country.name.common} <button onClick={() => setFilter(country.name.common)}>show</button></li>
      ))}
    </ul>
  )
}

//Info when there's only one country
const CountryInfo = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (<li key={language}>{language}</li>))}
      </ul>
      <img src={country.flags.png} alt='' width='125px'></img>

      <CountryWeather capital={country.capital} APIkey={process.env.REACT_APP_API_KEY}/>
    </div>
  )
}

const CountryWeather = ({capital, APIkey}) => {
  const [weather, setWeather] =useState([])

  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${APIkey}&units=Metric`)
    .then(response => {
      setWeather(response.data)
    })
    console.log("b")
// eslint-disable-next-line
  }, [])

  if (weather.length===0){
    return<p>Cargando...</p>
  }
  console.log(weather.weather)
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p><strong>temperature: </strong>{weather.main.temp} Celsius ({weather.weather[0].description})</p>
      <img style={{backgroundColor: "lightblue"}} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=''></img>
      <p><strong>wind: </strong>{weather.wind.speed} meter/sec</p>
    </div>
  )
}

function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Search handleChange={handleChange} filter={filter}/>
      <Info countries={countries} filter={filter} setFilter={setFilter}/>
    </div>
  );
}

export default App;
