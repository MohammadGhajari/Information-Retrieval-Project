const express = require('express');
const {
  getUser,
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
  updateProfile,
  uploadUserPhoto,
} = require('./../controller/userController');
const {
  signUp,
  login,
  resetPassword,
} = require('./../controller/authController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/resetPassword', resetPassword);

router.route('/uploadProfile').patch(uploadUserPhoto, updateProfile);
router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);
router.route('/').post(createUser).get(getAllUsers);

module.exports = router;
