const Post = require('../models/Post');
const User = require('../models/User');
const Profile = require('../models/Profile');

exports.addPost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
