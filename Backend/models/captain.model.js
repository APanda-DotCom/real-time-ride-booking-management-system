const mongoose=require('mongoosr');
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');


const captainSchema = new mongoose.schema({
    fullname:{
        firstname:{
            type:string,
            required:true,
            minlength:[3,'first name must be at least 3 characters long'],
        },
        lastname:{
            type:string,
            minlength:[3,'lastname must be at least 3 characters long'],

        },
    },
    email:{
        type:string,
        required:true,
        unique:true,
        lowercase:true,
         match: [/^[^\s@]+@[^\s@]+.[^\s@]+$/, 'please enter a valid email'],
     },
     passowrd:{
        type:string,
        required:true,
        select:false,
     },
     socketId:{
        type:string,
     },
     status:{
        type:string,
        enum:['active','inactive'],
        default:"active",
     },
     vechile:{
        color:{
            type:string,
            required:true,
            minlength:[3,'color mustbe atleast 3 characters long'],
        },

     },
     plate:{
        type:string,
        required:true,
        minlength:[3,'plate mustbe atlest 3 character long'],
     }, 

     capacity:{
        type:number,
        required:true,
        min:[1,'capacity mustbe atleast 1'],
     },
     vechileType:{
        type:string,
        required:true,
        enum:['car','motorcycle','auto']
     },
     location:{
        lat:{
            type:Number,
        },
        lng:{
            type:Number,
        },
     }
})

captainSchema.methods.generateAuthToken=function(){
   const token=jwt.sign({_id:this._id},process.env.jwt_secret,{expiresIn:'24h'})
   return token;
}
captainSchema.methods.comparePassword=async function(password){
   return await bcrypt.compare(password,this.password);
}
captainSchema.static.hashpassword=async function(password){
   return await bcrypt.hash(password,10);
}
const captainModel= moonges.model('captain,captainSchema')

module.exports= captainModel;