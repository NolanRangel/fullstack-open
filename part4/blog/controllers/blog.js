const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    if(blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body
    let goodRequest;

    if (body.title && body.author && body.url) {
        goodRequest = true
    }
    if (!body.likes) {
        body.likes = 0
    }

    if (goodRequest) {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            id: Math.floor(Math.random() * 1000000000)
        })

        await blog.save()
        response.status(201).json(blog)
        response.end()

    } else {
        response.status(400)
        response.end()
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})


module.exports = blogRouter