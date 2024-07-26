import User from "../model/user.js";

export const checkuserisfollow=async(req,res)=>{
    try {
        const userId=req.params.userid;
        const postUser=req.params.mainuser;
        // console.log(userId);
        // console.log(postUser);
        const user=await User.findOne({username:postUser});
        // console.log(user);
        // console.log(post);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        if(user.follow.includes(userId)){
            return res.status(200).json({follow:true});
        }else{
            return res.status(200).json({follow:false});
        }
    } catch (error) {
        // console.log(error);
        return res.status(404).json({msg:"Error while fetching follow data"});
    }
}

export const followUser=async(req,res)=>{
    try {
        const userId=req.params.userid;
        const postuser=req.params.mainuser;
    //    console.log(userId);
    //    console.log(postuser);
    //    console.log(postId);
       const user=await User.findOne({username:postuser});
    //    console.log(user);
       if(user.follow.includes(userId)){
        // post.liked.pull(userId);
        // post.totallikes--;
        // await post.save();
        await User.findByIdAndUpdate(user._id,{$pull:{follow:userId},$inc: { totalfollower: -1 } });
       }else{
        await User.findByIdAndUpdate(user._id,{$push:{follow:userId}, $inc:{ totalfollower: 1 } });
       }
       return res.status(200).json({msg:"Liked the post suceesfully"});  
    } catch (error) {
        console.log(error);
        return res.status(404).json({msg:"Error while liking the post"});
    }
}