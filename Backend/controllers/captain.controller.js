const  captainmodel = require('../models/captain.model');
const captainService =require('../services/captain.service');
const {validationResult}=require('express-validator');

module.exports.registerCaptian = async (req,res,next)=>{
    const error= validationResult(req);
     if(!error.isEmpty()){
        return res.status(400).json({errors:array()});
     }
}