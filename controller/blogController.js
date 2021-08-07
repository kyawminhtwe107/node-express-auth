const express = require('express');

const blogs = require('../data/blogs.js');

const blogRoute = (req, res, next) => {
    console.log(blogs);
    res.render('blogs/index',{blogs});
}

module.exports = {
    blogRoute
}