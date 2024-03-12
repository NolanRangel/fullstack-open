const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { app } = require('../app')
const { strictEqual } = require("assert");

const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')

    strictEqual(response.body.length, 6)
})

test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(e => e.title)
    strictEqual(contents.includes('Hello World'), true)
})

after(async () => {
    await mongoose.connection.close()
})