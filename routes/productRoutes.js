const express = require('express');
const Product = require('../models/product');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validateRequest');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

const createRules = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('description').optional().trim(),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('category').isMongoId().withMessage('category must be a valid id'),
];

const updateRules = [
  body('name').optional().trim().notEmpty().withMessage('Product name cannot be empty'),
  body('description').optional().trim(),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('category').optional().isMongoId().withMessage('category must be a valid id'),
];

router.route('/').get(getProducts).post(createRules, validateRequest, createProduct);

router
  .route('/:id')
  .get(getProduct)
  .patch(updateRules, validateRequest, updateProduct)
  .delete(deleteProduct);

module.exports = router;