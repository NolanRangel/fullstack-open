import Person from "./components/Person.jsx";

import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: '' }
    ]);
    const [newName, setNewName] = useState('');

    const updatePhoneBook = () => {
        const newPerson = {
            name: newName,
        };

        setPersons(persons.concat(newPerson))
        setNewName('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        let checkForPerson = persons.find(person => {
            return newName === person.name
        })
        if (!checkForPerson) {
            updatePhoneBook()
        } else {
            alert(`${newName} is already added to the phonebook`)
        }
    }

    const handleChange = (e) => {
        setNewName(e.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange={handleChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>

            <h2>Numbers</h2>
            {persons.map((person, i) => {
                return <Person key={i} person={person}/>
            })}
        </div>
    )
}

export default App