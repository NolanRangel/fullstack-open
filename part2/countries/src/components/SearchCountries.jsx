

const SearchCountries = ({ search, handleSearchChange }) => {


    return (
        <div>
            <div>
                <h1>
                    Find Countries
                </h1>
                <input value={search} onChange={handleSearchChange}/>
            </div>
            <div>

            </div>
        </div>
    )
}


export default SearchCountries