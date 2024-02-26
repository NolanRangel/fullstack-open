const express = require("express");
const app = express()
const cors = require("cors");
const morgan = require("morgan");
app.use(cors())
app.use(express.static('dist'))


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
app.use(timestamp)
app.use(express.json())

morgan.token('body',  req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))


app.use(errorHandler)
app.use(unknownEndpoint)


module.exports = {
    app
}