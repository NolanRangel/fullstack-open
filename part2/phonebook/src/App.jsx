import Person from "./components/Person.jsx";
import AddPerson from "./components/AddPerson.jsx";
import Phonebook from "./components/Phonebook.jsx";
import phonebookService from "./services/phonebook.js"
import {useEffect, useState} from 'react'


const App = () => {
    const [persons, setPersons] = useState([]);
    const [filteredPersons, setFilteredPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [search, setSearch] = useState('');


    const updatePhoneBook = () => {
        let personsLength = persons.length + 1;

        const newPerson = {
            name: newName,
            number: newNumber,
            id: personsLength.toString(),
        };

        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');

        phonebookService.createPerson(newPerson)
            .catch(err => {
                alert(
                    `Failure to get all people from the phonebook. Error ${err}`
                )
            })
    }

    const updatePhoneNumber = (id) => {
        const updatedPerson = {
            name: newName,
            number: newNumber,
            id: id.toString()
        };

        setNewName('');
        setNewNumber('');

        phonebookService.updatePerson(updatedPerson, id)
            .then(response => {
                console.log(response),
                setPersons(persons.map(person => person.id !== id ? person : response))})
            .catch(err => {
                alert(
                    `Failure to get all people from the phonebook. Error ${err}`
                )
            })

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for same name and number
        let checkForPerson = persons.find(person => {
            return newName === person.name && newNumber === person.number;
        })
        // Check for same name different number
        let checkForPersonNumber = persons.find(person => {
            return newName === person.name && newNumber !== person.number;
        })

        if (checkForPersonNumber) {
            let confirmation = window.confirm(`${checkForPersonNumber.name} is already added to the phonebook, replace the old number with a new one?`)
            if (confirmation) {
                updatePhoneNumber(checkForPersonNumber.id);
            }
        } else if (!checkForPerson) {
            updatePhoneBook();
        }  else {
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

    const handleDelete = (deletedPerson) => {
        let confirmation = window.confirm(`Are you sure you want to delete ${deletedPerson.name} from the phonebook?`)
        const newPersonsList = persons.filter(person => person.id !== deletedPerson.id);

        if (confirmation) {
            phonebookService.deletePerson(deletedPerson.id)
                .then(() => setPersons(newPersonsList))
                .catch(err => {
                    alert(`There was an issue deleting ${deletedPerson.name} from the phonebook. Error: ${err}`)
                })
        }

    }


    useEffect(() => {
        phonebookService.getAllPeople()
            .then(phonebook => {
                setPersons(phonebook)
            })
            .catch(err => {
                alert(
                    `Failure to get all people from the phonebook. Error ${err}`
                )
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
                        return <Person key={i} person={person} handleDelete={handleDelete}/>
                    })
                    :
                    persons.map((person, i) => {
                        return <Person key={i} person={person} handleDelete={handleDelete}/>
                    })
                }
            </div>
        </div>
    )
}



export default App