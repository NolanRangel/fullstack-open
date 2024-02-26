const { MONGODB_URI } = require('./utils/config')
const express = require("express");
const app = express()

const cors = require("cors");
const personRouter = require('./controllers/person')
const { errorHandler,
        unknownEndpoint,
        timestamp} = require('./utils/middleware')
const logger = require('./utils/logger')

const mongoose = require('mongoose')
const morgan = require("morgan");


// DB Connection
mongoose.set('strictQuery', false)
const url = MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })


// Middleware & Routing
app.use(cors())
app.use(express.static('dist'))

app.use('/api/persons', personRouter)

app.use(timestamp)
app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))
app.use(errorHandler)
app.use(unknownEndpoint)


module.exports = {
    app
}