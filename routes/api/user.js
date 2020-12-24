const express = require('express');
const {
  register,
  login,
  showUsers,
  editUser,
  deleteUser,
} = require('../../controllers/user.controller');
const {
  RegisterRules,
  LoginRules,
  validator,
} = require('../../middleware/validator');
const isAuth = require('../../middleware/passport-jwt');

const router = express.Router();

router.post('/register', RegisterRules(), validator, register);
router.post('/login', LoginRules(), validator, login);
router.get('/showUsers', isAuth(), showUsers);
router.put('/editUser/:_id', editUser);
router.delete('/deleteUser/:_id', deleteUser);
module.exports = router;
