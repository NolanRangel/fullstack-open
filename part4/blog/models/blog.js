const mongoose = require('mongoose').default
// require('dotenv').config()
// const mongoUrl = process.env.MONGODB_URI


const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})


// mongoose.set('strictQuery',false)
// mongoose.connect(mongoUrl)
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Blog', blogSchema)