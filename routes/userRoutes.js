const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validateRequest');
const { createUser, getUsers, getUser } = require('../controllers/userController');

const router = express.Router();

const createRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Must be a valid email'),
];

router.route('/').get(getUsers).post(createRules, validateRequest, createUser);
router.route('/:id').get(getUser);

module.exports = router;
