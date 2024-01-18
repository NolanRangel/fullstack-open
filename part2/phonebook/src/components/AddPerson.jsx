

const AddPerson = ({ handleNameChange, handleNumberChange, handleSubmit, newName, newNumber, title }) => {

    return (
        <div>
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
                    <div>
                        name: <input value={newName} onChange={handleNameChange}/>
                    </div>
                    <div>
                        number: <input value={newNumber} onChange={handleNumberChange}/>
                    </div>
                </div>
                <div style={{marginTop: "15px"}}>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default AddPerson