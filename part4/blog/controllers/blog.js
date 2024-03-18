const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body
    let goodRequest;
    if (body.title && body.author && body.url && body.likes) {
        goodRequest = true
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


module.exports = blogRouter