import DeletePerson from "./DeletePerson.jsx"

const Person = ({ person, handleDelete }) => {

    return (
        <div style={{display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    maxWidth: "400px",
                    width: "100%", }}
        >
            <h3>
                { person.name } { person.number }
            </h3>
            <DeletePerson person={person} handleDelete={handleDelete}/>
        </div>
    )
}

export default Person