import Person from "./components/Person.jsx";
import AddPerson from "./components/AddPerson.jsx";
import Phonebook from "./components/Phonebook.jsx";
import {useEffect, useState} from 'react'
import axios from "axios";


const App = () => {
    const [persons, setPersons] = useState([]);
    const [filteredPersons, setFilteredPersons] = useState([]);
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

        const filteredPersons = persons.filter(person => {
            let lowerCasePerson = person.name.toLowerCase();
            let lowerCaseSearch = searchName.toLowerCase();

            return lowerCasePerson.includes(lowerCaseSearch)
        })

        setFilteredPersons(filteredPersons)
    }


    useEffect(() => {
        axios.get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);


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
                { filteredPersons.length >= 1 ?
                    filteredPersons.map((person, i) => {
                        return <Person key={i} person={person} />
                    })
                    :
                    persons.map((person, i) => {
                        return <Person key={i} person={person} />
                    })
                }
            </div>
        </div>
    )
}



export default App