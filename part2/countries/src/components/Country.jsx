



const Country = ({ country, total }) => {
    const flag = country.flags.png
    const alt = country.flags.alt
    let languageArray = Object.keys(country.languages).map((l) => country.languages[l])
    console.log(languageArray)
    return (
        <div>
            { total === 10 || total >= 2 ?
                <div>
                    {country.name.common}
                </div>
                :
                <div>
                    <h2>
                        {country.name.common}
                    </h2>
                    <p>
                        {/*Capital {country.capital}*/}
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
            }

        </div>
    )
}


export default Country