import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    totalpost:{
        type:Number,
        default:0,
    },
    follow:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
   }],
   picture:{
    type:String,
    default:"",
   },
   totalfollower:{
        type:Number,
        default:0,
   },
   about:{
    type:String,
    default:"",
   },
   like:[
    {
       type:mongoose.Schema.Types.ObjectId,
        ref:'User' 
    }
   ],
   totallike:{
    type:Number,
    default:0,
   },
})

const User=mongoose.model('user',UserSchema);

export default User;