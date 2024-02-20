const dotenv = require('dotenv')
dotenv.config()
const morgan = require('morgan')
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')


const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' })
  }
  else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}
const unknownEndpoint = (err, req, res, next) => {
  res.status(404).send('Invalid path')

  next(err)
}


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


// GET all
app.get('/api/persons', (req, res, next) => {
  // res.send(persons);
  Person.find({})
    .then(person => res.json(person))
    .catch(err => next(err))
})

// GET one by id
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if(person) {
        res.json(person)
      } else {
        res.status(404).end()
      }

    })
    .catch(err => next(err))
})

// CREATE phonebook entry
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'Name cannot be empty'
    })
  }
  else if (!body.number) {
    return res.status(400).json({
      error: 'Phone number cannot be empty'
    })
  }
  else {
    const person = new Person({
      name: body.name,
      number: body.number,
      id: Math.floor(Math.random() * 1000000000)
    })
    person.save()
      .then(savedPerson => {
        res.json(savedPerson).status(200).end()
      })
      .catch(err => next(err))
  }
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson).status(200).end()
    })
    .catch(err => next(err))
})

// DELETE phonebook entry
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

// Show phonebook length & Request timestamp
app.get('/info', (req, res, next) => {
  Person.find({})
    .then(persons => {
      let phonebookInfo = 'Phonebook has info for ' + persons.length + ' people. Requested at: ' + req.timestamp
      res.json(phonebookInfo)
    })
    .catch(err => next(err))
})



app.use(errorHandler)
app.use(unknownEndpoint)
// app.use(errorLogger)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})