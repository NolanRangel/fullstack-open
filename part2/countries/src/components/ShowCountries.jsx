import Country from "./Country.jsx";


const ShowCountries = ({ searchCountries }) => {



    return (
        <div>
            <h2>
                Show Countries
            </h2>
            { searchCountries.length > 10 ?
                <div>
                    <h4>
                        Too many matches, specify another country
                    </h4>
                </div>
                :
                <ul>
                    {searchCountries.map((result, i) => {
                        return <Country key={i}
                                        country={result}
                                        total={searchCountries.length}
                                        searchCountries={searchCountries}
                        />
                    })}
                </ul>
            }
        </div>
    )
}


export default ShowCountries