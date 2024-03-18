const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { app } = require('../app')
const { strictEqual, assert } = require("assert");
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


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

test('a blog can be added', async () => {
    const blog = {
        title: "Go Wild",
        author: "Faber",
        url: "www.stuff.com",
        likes: 12
    }

    await api.post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogs = response.body.map(blog => blog.title)

    strictEqual(response.body.length, initialBlogs.length + 1)
    blogs.includes('Go Wild')
})

test('blog without content has not been added', async () => {

    const blog = {
        author: "Failed Blog",
        url: "www.stuff.com",
        likes: 21
    }

    await api.post('/api/blogs')
        .send(blog)
        .expect(400)

    const response = await api.get('/api/blogs')

    strictEqual(response.body.length, initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
})