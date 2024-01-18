import Person from "./components/Person.jsx";
import AddPerson from "./components/AddPerson.jsx";
import Phonebook from "./components/Phonebook.jsx";
import {useEffect, useState} from 'react'


const App = () => {
    const [persons, setPersons] = useState([
        { name: '',
          number: '',
          filtered: true,
          id: 0,
        }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [search, setSearch] = useState('');

    const updatePhoneBook = () => {
        const newPerson = {
            name: newName,
            number: newNumber,
            filtered: true,
            id: persons.length + 1,
        };

        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let checkForPerson = persons.find(person => {
            return newName === person.name || newNumber === person.number;
        })
        if (!checkForPerson) {
            updatePhoneBook();
        } else {
            alert(`${newName} ${newNumber} is already added to the phonebook`);
        }
    }

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }
    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    }
    const handleSearchChange = (e) => {
        let searchName = e.target.value
        setSearch(searchName)

        searchName === '' ?
            persons.map((person, i) => {
                return person.filtered = true;
            })
            :
            persons.filter(person => {
                let lowerCasePerson = person.name.toLowerCase();
                let lowerCaseSearch = searchName.toLowerCase();

                lowerCasePerson.includes(lowerCaseSearch) ? person.filtered = true : person.filtered = false
            })
    }



    return (
        <div>
            <div>
                <Phonebook  handleSearchChange={handleSearchChange}
                            title={"Phonebook"}
                            search={search}
                />
            </div>
            <div>
                <AddPerson handleNameChange={handleNameChange}
                           handleNumberChange={handleNumberChange}
                           handleSubmit={handleSubmit}
                           newName={newName}
                           newNumber={newNumber}
                           title={"add a new"}
                />
            </div>
            <div>
                <h2>Numbers</h2>
                {
                    persons.map((person, i) => {
                        return person.filtered ? <Person key={i} person={person} /> : null
                    })
                }
            </div>
        </div>
    )
}



export default App