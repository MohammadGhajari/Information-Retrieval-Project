const catchAsync = require('./../utils/catAsync');
const AppError = require('./../utils/appError');
const User = require('./../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError('please provide email and password', 400));

  const user = await User.findOne({ email }).select('+password');

  if (!user) return next(new AppError('incurrect email or password', 401));

  console.log(await bcrypt.compare(password, user.password));

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('incorrect email or password', 401));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { password, newPassword, passwordConfirm, email } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (newPassword !== passwordConfirm)
    return next(
      new AppError('new password and password confirm must be the same.', 401),
    );

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('current password is wrong.', 401));
  }
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  const updatedUser = await User.findByIdAndUpdate(
    user.id,
    { password: hashedPassword },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: 'success',
    data: {
      updatedUser,
    },
  });
});
