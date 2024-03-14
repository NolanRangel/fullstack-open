const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { app } = require('../app')
const { strictEqual, assert } = require("assert");
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: "Hello World",
        author: "Tester Tester",
        url: "www.google.com",
        likes: 10
    },
    {
        title: "Hello!",
        author: "Chester Tester",
        url: "www.nhl.com",
        likes: 35
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    strictEqual(response.body.length, initialBlogs.length)
})

test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(e => e.title)
    contents.includes('Hello World')
})

after(async () => {
    await mongoose.connection.close()
})