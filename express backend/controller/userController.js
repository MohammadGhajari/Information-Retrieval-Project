const User = require('./../model/userModel');
const {
  getOne,
  createOne,
  getAll,
  deleteOne,
  updateOne,
} = require('./handleFactory');
const catchAsync = require('./../utils/catAsync');
const catAsync = require('./../utils/catAsync');
const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('storage');
    cb(null, 'public/users');
  },
  filename: (req, file, cb) => {
    console.log('storage');
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not and image! Please upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('profile');

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.getUser = getOne(User);
exports.createUser = createOne(User);
exports.getAllUsers = getAll(User);
exports.deleteUser = deleteOne(User);
exports.updateUser = updateOne(User);

exports.updateProfile = catchAsync(async (req, res, next) => {
  const body = {};

  if (req.file)
    body.profile = 'http://127.0.0.11:8000/users/' + req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.body.id, body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
exports.deleteMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
