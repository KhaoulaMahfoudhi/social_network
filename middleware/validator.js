const { check, validationResult } = require('express-validator');

exports.RegisterRules = () => [
  check('name', 'This field is required').notEmpty(),
  check('email', 'Please includ a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
];
exports.LoginRules = () => [
  check('email', 'This field is required').isEmail().notEmpty(),
  check('password', 'This field is required').exists(),
];
exports.ProfileRules = () => [
  check('status', 'This field is required').notEmpty(),
  check('skills', 'This field is required').notEmpty(),
];
exports.ExpRules = () => [
  check('title', 'This field is required').notEmpty(),
  check('company', 'This field is required').notEmpty(),
  check('from', 'This field is required').notEmpty(),
];
exports.EducationRules = () => [
  check('school', 'This field is required').notEmpty(),
  check('degree', 'This field is required').notEmpty(),
  check('fieldofstudy', 'This field is required').notEmpty(),
  check('from', 'This field is required').notEmpty(),
];
exports.PostRules = () => [check('text', 'This field is required').notEmpty()];
exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty() ? next() : res.status(400).json({ errors: errors.array() });
};
