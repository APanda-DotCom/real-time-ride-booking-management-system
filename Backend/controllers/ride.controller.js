const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const { sendMessageToSocketId } = require('../socket');
const captainModel = require('../models/captain.model');
const mapService=require('../services/maps.service')


// CREATE RIDE
 
module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  if (!req.user || !req.user._id)
    return res.status(401).json({ message: 'Unauthorized' });

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType
    })
    const pickupCoordinates =await mapService.getCoordinates(pickup);

    console.log(pickupCoordinates);

    const captainsInRadius =await mapService.getCaptainInTheRadius(pickupCoordinates.lat,pickupCoordinates.lng, 2);

    console.log(captainsInRadius);

    //  SEND RIDE TO ALL ONLINE CAPTAINS
    const captains = await captainModel.find({
      socketId: { $ne: null }
    });

    captains.forEach((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: 'new-ride',
        data: ride
      });
    });

    return res.status(201).json(ride);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//  GET FARE

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};


  // CONFIRM RIDE (CAPTAIN ACCEPT)
 
module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide({
      rideId,
      captainId: req.captain._id
    });

    if (ride.user?.socketId) {
      sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-confirmed',
        data: ride
      });
    }

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};


 //START RIDE
 
module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { rideId, otp } = req.body;

  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.captain._id
    });

    if (ride.user?.socketId) {
      sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
      });
    }

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};


 // END RIDE
 
module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { rideId } = req.body;

  try {
    const ride = await rideService.endRide({
      rideId,
      captain: req.captain._id
    });

    if (ride.user?.socketId) {
      sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-ended',
        data: ride
      });
    }

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
