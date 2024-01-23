import SearchCountries from "./components/SearchCountries.jsx";
import ShowCountries from "./components/ShowCountries.jsx";
import axios from "axios";
import {useEffect, useState} from 'react'


function App() {
  const [search, setSearch] = useState('')
  const [searchCountries, setSearchCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])

  const handleSearchChange = (e) => {
      let searchTerm = e.target.value;
      let searchTermLower = searchTerm.toLowerCase()
      setSearch(e.target.value)

      const filteredCountry = allCountries.filter(country => {
          let commonName = country.name.common.toLowerCase();
          return commonName.includes(searchTermLower)

      })
      setSearchCountries(filteredCountry)

  }



    useEffect(() => {
        axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
            .then(response => setAllCountries(response.data))
    }, []);


  return (
    <>
        <SearchCountries search={search} handleSearchChange={handleSearchChange}/>
        <ShowCountries searchCountries={searchCountries} allCountries={allCountries}/>
    </>
  )
}

export default App
