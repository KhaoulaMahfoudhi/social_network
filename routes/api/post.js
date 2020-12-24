const express = require('express');
const router = express.Router();
const { PostRules, validator } = require('../../middleware/validator');
const isAuth = require('../../middleware/passport-jwt');
const { addPost } = require('../../controllers/post.controller');
// @route     post api/posts
// @des       add post
// @access    Private
router.post('/addPost', isAuth(), PostRules(), validator, addPost);

module.exports = router;
