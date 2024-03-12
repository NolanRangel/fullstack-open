const _ = require('lodash');
const {maxBy, values, keys} = require("lodash");

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

// that receives an array of blogs as a parameter.
// The function returns the author who has the largest amount of blogs.
// The return value also contains the number of blogs the top author has
const mostBlogs = (blogs) => {
    const authors = _.map(_.countBy(blogs, 'author'), (val, key) => ({ author: key, blogs: val }))

    let sortedAuthors = _.sortBy(authors,
        [function (x) { return x.blogs; }]);
    return sortedAuthors[sortedAuthors.length - 1]

}

const mostLikes = (blogs) => {
    let highest = 0;
    const mostLikedAuthor = {
        author: null,
        likes: null
    }
    const authorLikes = _(blogs)
        .groupBy('author')
        .map((items, author) => {
            return {
                [author]: _.sumBy(items, 'likes')
            };
        })
        .orderBy(_.values, 'desc')
        .value();

    const sortedAuthors = _.map(authorLikes, (obj) => {
        const author = Object.keys(obj)[0];
        const likes = obj[author];
        if (likes >= highest) {
            highest = likes
            mostLikedAuthor.author = author
            mostLikedAuthor.likes = likes
        }
        return { author, likes };
    });
    return mostLikedAuthor;
};


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
