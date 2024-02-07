const morgan = require('morgan')
const express = require('express');
const app = express();
const cors = require('cors')



app.use(cors())
app.use(express.static('dist'))

// Register request timestamp
const timestamp = function (req, res, next) {
    req.timestamp = new Date
    next()
}

app.use(timestamp)
app.use(express.json())

morgan.token('body',  req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))


let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

// GET all
app.get('/api/persons', (req, res) => {
    res.send(persons);
})

// GET one by id
app.get('/api/person/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

// CREATE phonebook entry
app.post('/api/persons', (req, res) => {
    const person = req.body;

    if (!person.name) {
        return res.status(400).json({
            error: 'Name cannot be empty'
        })
    }
    else if (!person.number) {
        return res.status(400).json({
            error: 'Phone number cannot be empty'
        })
    }
    else {
        const personId = Math.floor(Math.random() * 1000000000)
        person.id = personId;
        const personExists = persons.find(p => p.name === person.name)

        if (personExists) {
            return res.status(400).json({
                error: 'Name must be unique'
            })
        }
        else {
            persons = persons.concat(person);
            res.json(person)
        }
    }
})

// DELETE phonebook entry
app.delete('/api/person/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

// Show phonebook length & Request timestamp
app.get('/info', (req, res) => {
    let phonebookInfo = `Phonebook has info for ${persons.length} people<br><br><p>Requested at: ${req.timestamp}</p>`

    res.json(phonebookInfo)
})





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})