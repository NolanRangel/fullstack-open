const { MONGODB_URI } = require('./utils/config')
const express = require('express')
const app = express()

const cors = require('cors')
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
app.use('/api/blogs', blogRouter)
app.use(express.json())



module.exports = {
    app
}