const User = require('../models/user');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

exports.createUser = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await User.create({ name, email });

  res.status(201).json({ success: true, data: user });
});

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-cart'); // hide cart for the list view
  res.status(200).json({ success: true, count: users.length, data: users });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('User not found', 404));
  res.status(200).json({ success: true, data: user });
});
