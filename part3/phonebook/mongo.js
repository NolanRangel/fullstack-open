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



// Docs DB connection to ping for successful connection
// const { MongoClient, ServerApiVersion } = require("mongodb");
//
// // Replace the placeholder with your Atlas connection string
// const uri = "mongodb+srv://fullstack-open:b09hxZ2Dgvsq97V4@fullstack-open.w3s3qqa.mongodb.net/?retryWrites=true&w=majority";
//
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri,  {
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//         }
//     }
// );
//
// async function run() {
//     try {
//         // Connect the client to the server (optional starting in v4.7)
//         await client.connect();
//
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);
