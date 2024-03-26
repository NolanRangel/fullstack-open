const { MONGODB_URI } = require('./utils/config')
const express = require('express')
const app = express()

const cors = require('cors')
const usersRouter = require('./controllers/users')
const blogRouter = require('./controllers/blog')
const mongoose = require('mongoose')

// DB Connection
mongoose.set('strictQuery', false)

mongoose.connect(MONGODB_URI)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })


app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogRouter)




module.exports = {
    app
}