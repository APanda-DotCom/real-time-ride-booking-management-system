const express = require('express');
const { body } = require('express-validator');
const paymentController = require('../controllers/payment.controller');
const authMiddleware = require('../middlewares/auth.middleware.js');

const router = express.Router();

/**
 * ================================
 * CREATE RAZORPAY ORDER (USER)
 * ================================
 * User starts online payment
 */
router.post(
  '/create-order',
  authMiddleware.authUser,
  body('rideId')
    .notEmpty()
    .withMessage('rideId is required'),
  paymentController.createOrder
);

/**
 * ================================
 * VERIFY RAZORPAY PAYMENT (USER)
 * ================================
 * Razorpay success callback verification
 */
router.post(
  '/verify',
  authMiddleware.authUser,
  body('razorpayOrderId')
    .notEmpty()
    .withMessage('razorpayOrderId is required'),
  body('razorpayPaymentId')
    .notEmpty()
    .withMessage('razorpayPaymentId is required'),
  body('razorpaySignature')
    .notEmpty()
    .withMessage('razorpaySignature is required'),
  paymentController.verifyPayment
);

/**
 * ================================
 * CASH PAYMENT (USER)
 * ================================
 * User chooses cash instead of online
 */
router.post(
  '/cash',
  authMiddleware.authUser,
  body('rideId')
    .notEmpty()
    .withMessage('rideId is required'),
  paymentController.cashPayment
);

module.exports = router;
