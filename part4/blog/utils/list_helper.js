const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    if (blogs.length === 1) {
        return blogs[0].likes;
    } else {
        let totalBlogLikes = 0;

        blogs.map(blog => {
            totalBlogLikes += blog.likes;
        })
        return totalBlogLikes;
    }
}

const favoriteBlog = (blogs) => {
    let highest = 0;
    let favorite;

    blogs.map(blog => {
        if (blog.likes > highest) {
            highest = blog.likes
            favorite = blog
        }
    })
    return favorite
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}