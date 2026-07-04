const Product = require('../models/product');
const Category = require('../models/category');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

exports.createProduct = asyncHandler(async (req, res, next) => {
  const { name, description, price, stock, category } = req.body;

  const categoryExists = await Category.findById(category);
  if (!categoryExists) return next(new AppError('Category not found', 404));

  const product = await Product.create({ name, description, price, stock, category });
  res.status(201).json({ success: true, data: product });
});

exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate('category', 'name description');
  res.status(200).json({ success: true, count: products.length, data: products });
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('category', 'name description');
  if (!product) return next(new AppError('Product not found', 404));
  res.status(200).json({ success: true, data: product });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  if (req.body.category) {
    const categoryExists = await Category.findById(req.body.category);
    if (!categoryExists) return next(new AppError('Category not found', 404));
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('category', 'name description');

  if (!product) return next(new AppError('Product not found', 404));
  res.status(200).json({ success: true, data: product });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return next(new AppError('Product not found', 404));
  res.status(200).json({ success: true, data: {} });
});