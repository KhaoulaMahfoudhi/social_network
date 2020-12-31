const { check, validationResult } = require('express-validator');

exports.RegisterRules = () => [
  check('name', 'name is required').notEmpty(),
  check('email', 'Please includ a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
];
exports.LoginRules = () => [
  check('email', 'email is required').isEmail(),
  check('password', 'password is required').exists(),
];
exports.ProfileRules = () => [
  check('status', 'status is required').notEmpty(),
  check('skills', 'skills is required').notEmpty(),
];
exports.ExpRules = () => [
  check('title', 'title is required').notEmpty(),
  check('company', 'company name field is required').notEmpty(),
  check('from', 'from field is required').notEmpty(),
];
exports.EducationRules = () => [
  check('school', 'school is required').notEmpty(),
  check('degree', 'degree is required').notEmpty(),
  check('fieldofstudy', 'fielofstudy is required').notEmpty(),
  check('from', 'from field is required').notEmpty(),
];
exports.PostRules = () => [check('text', 'text is required').notEmpty()];
exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty() ? next() : res.status(400).json({ errors: errors.array() });
};
