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
    const authors = _(blogs)
        .groupBy('author')
        .map(function(item, itemId) {
            const obj = {};
            _.forEach(item, function(value, key) {
                if (!obj[itemId]) {
                    obj[itemId] = value.likes
                } else {
                    obj[itemId] += value.likes
                }
            });
            return obj
        }).value();

    let sortedAuthors = _.orderBy(authors, [keys, values],
        ['asc', 'desc']);
    return console.log(sortedAuthors, 'YO!!')
    // return sortedAuthors[sortedAuthors.length - 1]

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}