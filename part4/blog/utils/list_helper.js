const _ = require('lodash');
const {maxBy} = require("lodash");

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
    // const authors = _.map(_.countBy(blogs, 'author'), (val, key) => ({ author: key, likes: val }))
    const result = _(blogs)
        .groupBy('author')
        .map(function(item, itemId) {
            const obj = [];
             obj.push({itemId: _.countBy(item, 'likes')})
            // obj[itemId] = _.countBy(item, 'likes')
            console.log(obj, 'OBJ!!!!')
            return obj
        }).value();
    let sortedAuthors = _.sortBy(result,
        [function (x) { return x.likes; }]);
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