const express = require('express');
const cart = require('../models/cart');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validateRequest');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require('../controllers/cartController');

const router = express.Router();

const addRules = [
  body('productId').isMongoId().withMessage('productId must be a valid id'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
];

const updateRules = [
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
];

router.route('/:userId').get(getCart).post(addRules, validateRequest, addToCart);

router
  .route('/:userId/:productId')
  .patch(updateRules, validateRequest, updateCartItem)
  .delete(removeFromCart);

module.exports = router;