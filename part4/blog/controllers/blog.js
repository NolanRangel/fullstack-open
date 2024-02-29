const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogRouter.post('/', (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        id: Math.floor(Math.random() * 1000000000)
    })

    blog.save()
        .then(savedBlog => {
            response.json(savedBlog).status(200)
        })
})


module.exports = blogRouter