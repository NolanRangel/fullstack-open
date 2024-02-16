// const mongoose = require('mongoose')
// Needed for Webstorm
const mongoose = require('mongoose').default;

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack-open:${password}@fullstack-open.w3s3qqa.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    number: number
})

if (!name || !number) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
            mongoose.connection.close()
        })
    })
} else {
    person.save().then(result => {
        console.log('Person saved!')
        mongoose.connection.close()
    })
}


