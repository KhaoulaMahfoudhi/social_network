const express = require('express');
const {
  getProfile,
  createUpdateProfile,
  getAllProfiles,
  getUserProfile,
  deleteProPost,
  addprofileExp,
  deleteExp,
  addprofileEducation,
  deleteEdu,
  githupUser,
} = require('../../controllers/profile.controller');
const isAuth = require('../../middleware/passport-jwt');
const {
  ProfileRules,
  validator,
  ExpRules,
  EducationRules,
} = require('../../middleware/validator');

const router = express.Router();

router.get('/myProfile', isAuth(), getProfile);
router.post(
  '/CreUpdProfile',
  isAuth(),
  ProfileRules(),
  validator,
  createUpdateProfile
);
router.get('/', isAuth(), getAllProfiles);
router.get('/user/:user_id', isAuth(), getUserProfile);
router.delete('/deleteProfile', isAuth(), deleteProPost);
router.put('/addProfileExp', isAuth(), ExpRules(), addprofileExp);
router.delete('/experience/:exp_id', isAuth(), deleteExp);
router.put('/addProfileEdu', isAuth(), EducationRules(), addprofileEducation);
router.delete('/education/:edu_id', isAuth(), deleteEdu);
router.get('/github/:username', githupUser);
module.exports = router;
