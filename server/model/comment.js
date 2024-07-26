import mongoose from 'mongoose';

const commentSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },liked:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
   }],
   totallikes:{
       type:Number,
       default:0
   },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const comment = mongoose.model('comment',commentSchema);

export default comment;