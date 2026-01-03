const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
 const userModel=require('../models/user.model')
const BlacklistTokenModel=require('../models/BlacklistToken.model');
const captainModel=require('../models/captain.model');

module.exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUserAlready=await userModel.findOne({email});
if(isUserAlready){
  return res.status(400).json({message:'userAlready exist'});
}

    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password, // send RAW password, service will hash
    });

    const token = user.generateAuthToken();

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Email already registered',
      });
    }

    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports.loginUser = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      message: 'Invalid email or password'
    });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({
      message: 'Invalid email or password'
    });
  }

  const token = user.generateAuthToken();

  res.cookie('token',token)

  res.status(200).json({ token, user });
};

module.exports.getUserProfile = async(req,res)=>{
  res.status(200).json(req.user);
};

module.exports.LogoutUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    const token =
      req.cookies?.token ||
      (authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null);

    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }

    await BlacklistTokenModel.create({ token });

    res.clearCookie("token");

    return res.status(200).json({
      message: "Logged out successfully"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

