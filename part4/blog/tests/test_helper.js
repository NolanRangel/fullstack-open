const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Go Wild",
        author: "Faber",
        url: "www.stuff.com",
        likes: 12
    },
    {
        title: "Test Blog",
        author: "Blogger Blogs",
        url: "www.stuff.com",
        likes: 21
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb
}