

const Phonebook = ({ title, handleSearchChange, search }) => {

    return (
        <div>
            <h2>
                { title }
            </h2>
            <div>
                filter shown with <input value={search} onChange={handleSearchChange}/>
            </div>

        </div>
    )
}


export default Phonebook