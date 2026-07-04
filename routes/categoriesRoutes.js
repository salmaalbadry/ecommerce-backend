const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validateRequest');
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoriesController');

const router = express.Router();

const createRules = [
  body('name').trim().notEmpty().withMessage('Category name is required'),
  body('description').optional().trim(),
];

const updateRules = [
  body('name').optional().trim().notEmpty().withMessage('Category name cannot be empty'),
  body('description').optional().trim(),
];

router.route('/').get(getCategories).post(createRules, validateRequest, createCategory);

router
  .route('/:id')
  .get(getCategory)
  .patch(updateRules, validateRequest, updateCategory)
  .delete(deleteCategory);

module.exports = router;