import Show from "./Show.jsx";
import {useEffect, useState} from "react";
import axios from "axios";



const Country = ({ country, total, searchCountries }) => {
    const [toggleShow, setToggleShow] = useState(false)
    const [countryWeather, setCountryWeather] = useState(null)
    const api_key = import.meta.env.VITE_WEATHER_API_KEY
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}&units=metric`

    const handleClick = () => {
        setToggleShow(!toggleShow)
    }

    useEffect(() => {
        if (total === 1) {
            setToggleShow(false)
        }

        axios.get(baseUrl)
            .then(response => setCountryWeather(response.data))
            .catch(err => console.log(err))
    }, [searchCountries, toggleShow]);


    return (
        <div>
            { total === 10 || total >= 2 && !toggleShow ?
                <div>
                    {country.name.common}
                    <button onClick={handleClick}>
                        show
                    </button>
                </div>
                :
                <Show country={country} countryWeather={countryWeather}/>
            }

        </div>
    )
}


export default Country