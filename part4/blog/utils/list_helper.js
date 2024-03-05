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

module.exports = {
    dummy,
    totalLikes
}