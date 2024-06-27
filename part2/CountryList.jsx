import React from 'react'

const CountryList = ({ countries, handleShowCountry }) => {
  return (
    <div>
      {countries.map(country => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => handleShowCountry(country)}>Show</button>
        </div>
      ))}
    </div>
  )
}

export default CountryList
