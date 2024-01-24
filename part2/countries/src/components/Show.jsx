


const Show = ({ country, countryWeather }) => {
    const flag = country.flags.png
    const alt = country.flags.alt
    let languageArray = Object.keys(country.languages).map((l) => country.languages[l])
    const weatherIconUrl = `https://openweathermap.org/img/wn/${countryWeather.weather[0].icon}@2x.png`



    return (
        <div>
            <div>
                <h2>
                    {country.name.common}
                </h2>
                <p>
                    Capital {country.capital}
                </p>
                <p>
                    Area {country.area}
                </p>
                <div>
                    <h4>
                        Languages
                    </h4>
                    <ul>
                        {
                            languageArray.map((language, i) => {
                                return <li key={i}>{language}</li>
                            })
                        }
                    </ul>
                </div>
                <img src={flag} alt={alt}/>
            </div>

            <div>
                <h2>
                    Weather in {country.capital[0]}
                </h2>
                <h4>
                    temperature {countryWeather.main.temp} Celsius
                </h4>
                <img src={weatherIconUrl} />
                <h4>
                    wind {countryWeather.wind.speed} m/s
                </h4>
            </div>
        </div>
    )
}

export default Show