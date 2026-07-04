const User = require('../models/user');
const Order = require('../models/order');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

exports.createOrder = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId).populate('cart.product');
  if (!user) return next(new AppError('User not found', 404));

  if (user.cart.length === 0) return next(new AppError('Cart is empty', 400));

  const validItems = user.cart.filter(item => item.product != null);
  
  if (validItems.length === 0) {
    return next(new AppError('No valid products in cart', 400));
  }

  // Snapshot product name/price at the moment of purchase
  const items = validItems.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
  }));

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await Order.create({
    user: user._id,
    items,
    totalPrice,
  });

  user.cart = []; // to empty the cart after checkout
  await user.save();

  res.status(201).json({ success: true, data: order });
});

exports.getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.userId }).sort('-createdAt');
  res.status(200).json({ success: true, count: orders.length, data: orders });
});

exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findOne({ _id: req.params.orderId, user: req.params.userId });
  if (!order) return next(new AppError('Order not found', 404));
  res.status(200).json({ success: true, data: order });
});