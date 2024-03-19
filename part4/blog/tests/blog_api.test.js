const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { app } = require('../app')
const { strictEqual, deepStrictEqual } = require("assert");
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})

    for (const blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await helper.blogsInDb()

    strictEqual(response.length, helper.initialBlogs.length)
})

test('the first blog is about HTTP methods', async () => {
    const response = await helper.blogsInDb()

    const contents = response.map(e => e.title)
    contents.includes('Hello World')
})

test('a specific blog can be viewed', async () => {
    const blogsAtBeginning = await helper.blogsInDb()

    const blogToView = blogsAtBeginning[0]
    const response = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    deepStrictEqual(response.body, blogToView)
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

    const response = await helper.blogsInDb()
    const blogs = response.map(blog => blog.title)

    strictEqual(response.length, helper.initialBlogs.length + 1)
    blogs.includes('Go Wild')
})

test('likes defaults to 0 when property is missing', async () => {
    const blog = {
        title: "Go Wild",
        author: "Faber",
        url: "www.stuff.com"
    }

    await api.post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
    const blogLikes = response.map(blog => blog.likes)

    strictEqual(response.length, helper.initialBlogs.length + 1)
    blogLikes.includes(0)
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

    const response = await helper.blogsInDb()

    strictEqual(response.length, helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
    const blogs = await helper.blogsInDb()
    const firstBlog = blogs[0]

    await api.delete(`/api/blogs/${firstBlog.id}`)
        .expect(204)

    const response = await helper.blogsInDb()
    const contents = response.map(r => r.title)
    !contents.includes(firstBlog.title)

    strictEqual(response.length, helper.initialBlogs.length - 1)
})

test('the unique identifier property of the blog posts is named id', async () => {
    const dbBlogs = await helper.blogsInDb()
    const blog = [
        {
            title: "Go Wild",
            author: "Faber",
            url: "www.stuff.com",
            likes: 12,
            id: dbBlogs[0].id
        },
        {
            title: "Test Blog",
            author: "Blogger Blogs",
            url: "www.stuff.com",
            likes: 21,
            id: dbBlogs[1].id
        }
    ]

    deepStrictEqual(blog, dbBlogs)
})

after(async () => {
    await mongoose.connection.close()
})