

const DeletePerson = ({ person, handleDelete }) => {

    return (
        <>
            <button onClick={() => handleDelete(person)}>
                delete
            </button>
        </>
    )
}


export default DeletePerson