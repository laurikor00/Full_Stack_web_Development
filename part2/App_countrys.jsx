import React, { useState } from 'react'
import axios from 'axios'
import CountryInfo from './CountryList'
import CountryList from './CountryInfo'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState(null)

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setShowCountry(null) // Reset selected country when search query changes
    if (event.target.value === '') {
      setCountries([]) // Clear countries list when search query is empty
    } else {
      // Fetch countries matching the search query
      axios
        .get(`https://restcountries.com/v3.1/name/${event.target.value}`)
        .then(response => {
          setCountries(response.data)
        })
        .catch(error => {
          console.error('Error fetching data:', error)
        })
    }
  }

  const handleShowCountry = (country) => {
    setShowCountry(country)
  }

  return (
    <div>
      <h1>Country Information</h1>
      <div>
        Search countries: <input value={searchQuery} onChange={handleSearchChange} />
      </div>
      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countries.length > 1 ? (
        <CountryList countries={countries} handleShowCountry={handleShowCountry} />
      ) : countries.length === 1 ? (
        <CountryInfo country={countries[0]} />
      ) : (
        <p>No countries found</p>
      )}
      {showCountry && <CountryInfo country={showCountry} />}
    </div>
  )
}

export default App
