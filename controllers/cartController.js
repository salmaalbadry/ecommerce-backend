const User = require('../models/user');
const Product = require('../models/product');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

exports.getCart = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId).populate('cart.product', 'name price stock');
  if (!user) return next(new AppError('User not found', 404));
  res.status(200).json({ success: true, data: user.cart });
});

exports.addToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;

  const user = await User.findById(req.params.userId);
  if (!user) return next(new AppError('User not found', 404));

  const product = await Product.findById(productId);
  if (!product) return next(new AppError('Product not found', 404));

  const existingItem = user.cart.find((item) => item.product.toString() === productId);

  if (existingItem) {
    existingItem.quantity += quantity || 1;
  } else {
    user.cart.push({ product: productId, quantity: quantity || 1 });
  }

  await user.save();
  await user.populate('cart.product', 'name price stock');

  res.status(200).json({ success: true, data: user.cart });
});

exports.updateCartItem = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;

  const user = await User.findById(req.params.userId);
  if (!user) return next(new AppError('User not found', 404));

  const item = user.cart.find((i) => i.product.toString() === req.params.productId);
  if (!item) return next(new AppError('Item not found in cart', 404));

  item.quantity = quantity;
  await user.save();
  await user.populate('cart.product', 'name price stock');

  res.status(200).json({ success: true, data: user.cart });
});

exports.removeFromCart = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) return next(new AppError('User not found', 404));

  user.cart = user.cart.filter((i) => i.product.toString() !== req.params.productId);
  await user.save();

  res.status(200).json({ success: true, data: user.cart });
});