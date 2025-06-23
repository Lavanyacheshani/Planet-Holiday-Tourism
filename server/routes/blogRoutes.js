const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllBlogs, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');

router.get('/', getAllBlogs);
router.post('/', auth, createBlog);
router.put('/:id', auth, updateBlog);
router.delete('/:id', auth, deleteBlog);

module.exports = router; 