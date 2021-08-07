const express = require('express');
const router = express.Router();

// general route import
const {
    indexRoute,
    registerRoute,
    registerAction,
    loginRoute,
    loginAction,
    logoutAction
} = require('../controller/homeController.js');

// blog route import
const {
    blogRoute,
} = require('../controller/blogController');

// auth middleware
const { requireAuth } = require("../middleware/authMiddleware");

router.get('/', indexRoute);
router.get('/register', registerRoute);
router.post('/register', registerAction);
router.get('/login', loginRoute);
router.post('/login', loginAction);
router.post('/logout', logoutAction);

// blogs
router.get('/blogs', requireAuth, blogRoute);

module.exports = {
    routes:router
}