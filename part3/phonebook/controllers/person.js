const personRouter = require('express').Router()
const Person = require('../models/person')



// GET all
personRouter.get('/', (req, res, next) => {
    // res.send(persons);
    Person.find({})
        .then(person => res.json(person))
        .catch(err => next(err))
})

// GET one by id
personRouter.get('/:id', (req, res, next) => {
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
personRouter.post('/', (req, res, next) => {
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

personRouter.put('/:id', (req, res, next) => {
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
personRouter.delete('/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

// Show phonebook length & Request timestamp
personRouter.get('/info', (req, res, next) => {
    Person.find({})
        .then(persons => {
            let phonebookInfo = 'Phonebook has info for ' + persons.length + ' people. Requested at: ' + req.timestamp
            res.json(phonebookInfo)
        })
        .catch(err => next(err))
})


module.exports = personRouter
