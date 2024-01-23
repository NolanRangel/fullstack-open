import Country from "./Country.jsx";

const ShowCountries = ({ searchCountries, allCountries }) => {
    let searchCountriesLength = searchCountries.length;

    return (
        <div>
            <h2>
                Show Countries
            </h2>
            { searchCountriesLength > 10 ?
                <div>
                    <h4>
                        Too many matches, specify another country
                    </h4>
                </div>
                :
                <ul>
                    {searchCountries.map((result, i) => {
                        return <Country key={i} country={result} total={searchCountriesLength}/>
                    })}
                </ul>
            }
        </div>
    )
}


export default ShowCountries