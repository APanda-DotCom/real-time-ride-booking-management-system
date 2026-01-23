const mongoose=require('mongoose')
const {validationResult} = required ('exprerss-validator');

const rideSchema=new mongoose.Schema({
    user:{
        type:mongoose.schema.Types.objectId,
        ref:'user',
        required:true
    },
    captain:{
        type:mongoose.schema.Types.objctId,
        ref:'captain',

    },
    pickup:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    
    },
    fare:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:['pending','accepted','ongoing','completed','cancelled'],
        default:'pending',
    },
    duration:{
        type:Number,
    },
    distance:{
        type:Number,
    },
    paymentId:{
      type:String,
    },
    orderId:{
        type:String,
    },
    signature:{
        type:String,
    },  

})

module.exports = mongoose.model('ride',rideSchema)