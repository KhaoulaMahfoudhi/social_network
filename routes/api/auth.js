const express = require('express');
const router = express.Router();
const { getUserPayload } = require('../../controllers/auth.controller');
const { validator } = require('../../middleware/validator');
const isAuth = require('../../middleware/passport-jwt');

// @route     GET api/auth
// @des       TEST route
// @access    Public
router.get('/', isAuth(), validator, getUserPayload);

module.exports = router;
