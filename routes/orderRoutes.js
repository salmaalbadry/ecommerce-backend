const express = require('express');
const { createOrder, getUserOrders, getOrder } = require('../controllers/orderController');

const router = express.Router();

router.route('/:userId').get(getUserOrders).post(createOrder);
router.route('/:userId/:orderId').get(getOrder);

module.exports = router;