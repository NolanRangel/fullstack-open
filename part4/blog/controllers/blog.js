const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    console.log(blogs)
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if(blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    } catch(exception) {
        next(exception)
    }
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body
    let goodRequest;
    if (body.title && body.author && body.url && body.likes) {
        goodRequest = true
    }
    try {
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
    } catch(exception) {
        next(exception)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch(exception) {
        next(exception)
    }
})


module.exports = blogRouter