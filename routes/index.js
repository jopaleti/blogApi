const express = require('express');
// Initializing router
const router = express.Router();
const {addBlog, displayBlog, readMore, deleteBlog, editBlog} = require('../controller/index.js');

router.get('/posts', displayBlog)
router.get('/editBlog/:slug', editBlog)
router.get('/posts/:slug', readMore)
router.delete('/posts/:id', deleteBlog)
router.post('/', addBlog)
router.post('/editBlog/:slug', editBlog)

module.exports = router