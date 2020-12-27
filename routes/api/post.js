const express = require('express');
const router = express.Router();
const { PostRules, validator } = require('../../middleware/validator');
const isAuth = require('../../middleware/passport-jwt');
const {
  addPost,
  getAllPosts,
  getPost,
  deletePost,
  addLike,
  unlikPost,
  addComment,
  deleteComment,
} = require('../../controllers/post.controller');
// @route     post api/posts
// @des       add post
// @access    Private
router.post('/addPost', isAuth(), PostRules(), validator, addPost);
router.get('/', isAuth(), getAllPosts);
router.get('/:id', isAuth(), getPost);
router.delete('/:id', isAuth(), deletePost);
router.put('/like/:id', isAuth(), addLike);
router.put('/unlike/:id', isAuth(), unlikPost);
router.post('/comments/:id', isAuth(), PostRules(), addComment);
router.delete('/comments/:id/:comment_id', isAuth(), deleteComment);

module.exports = router;
