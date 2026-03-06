const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');





// CREATE RIDE
router.post(
  '/create',
  authMiddleware.authUser,
  body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
  body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
  body('vehicleType').isIn(['auto', 'car', 'carXL', 'motorcycle']).withMessage('Invalid vehicle type'),
  rideController.createRide
);

// GET FARE
router.get(
  '/get-fare',
  authMiddleware.authUser,
  query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
  query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
  rideController.getFare
);

// CONFIRM RIDE
router.post(
  '/confirm',
  authMiddleware.authCaptain,
  body('rideId').isMongoId().withMessage('Invalid ride id'),
  //body('otp').isString().isLength({ min: 4, max: 4 }).withMessage('Invalid OTP'),
  rideController.confirmRide
);

// START RIDE
router.post(
  '/start-ride',
  authMiddleware.authCaptain,
  body('rideId').isMongoId().withMessage('Invalid ride id'),
  body('otp').isString().isLength({ min: 4, max: 4 }).withMessage('Invalid OTP'),
  rideController.startRide
);

// END RIDE
router.post(
  '/end-ride',
  authMiddleware.authCaptain,
  body('rideId').isMongoId().withMessage('Invalid ride id'),
  rideController.endRide
);

module.exports = router;
