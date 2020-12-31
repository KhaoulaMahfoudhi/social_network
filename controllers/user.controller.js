const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const secretOrKey = config.get('secretOrKey');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const searchUser = await User.findOne({ email });
  if (searchUser)
    return res
      .status(400)
      .json({ errors: [{ msg: 'user already registered' }] });
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm',
  });
  try {
    const newUser = new User({
      name,
      email,
      avatar,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save(newUser);
    const payload = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };
    const token = await jwt.sign(payload, secretOrKey, { expiresIn: 3600 });
    res.status(201).json({ token: `Bearer ${token}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: 'User not added', err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'bad Credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(404).json({ msg: 'bad Credentials' });
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = await jwt.sign(payload, secretOrKey, { expiresIn: 3600 });
    res.status(201).json({ token: `Bearer ${token}` });
  } catch (err) {
    res.status(500).json({ errors: err });
  }
};

exports.showUsers = async (req, res) => {
  try {
    const getUsers = await User.find();
    res.status(201).json(getUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: err });
  }
};

exports.editUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { _id } = req.params;
  try {
    const updateUser = await User.findOneAndUpdate({ _id }, { $set: req.body });
    await res.status(201).json({ msg: 'User update' });
  } catch (err) {
    res.status(500).json({ errors: err });
  }
};

exports.deleteUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete({ _id });
    await res.status(201).json({ msg: ' User Deleted' });
  } catch (err) {
    res.status(500).json({ errors: err });
  }
};
