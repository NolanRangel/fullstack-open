const logger = require('./logger')
const morgan = require("morgan");


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

// Register request timestamp
const timestamp = function (req, res, next) {
    req.timestamp = new Date
    next()
}

morgan.token('body',  req => {
    return JSON.stringify(req.body)
})

module.exports = {
    errorHandler,
    unknownEndpoint,
    timestamp
}