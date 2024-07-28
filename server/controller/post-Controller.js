import Post from "../model/post.js"
import User from "../model/user.js";

export const createPost=async(req,res)=>{
    try {
        const { title,picture, description,categories,username } = req.body.comment;
        const post=await new Post({title,picture,description,categories,username,createdDate: new Date()});
        post.save();
        console.log(post);
        res.status(200).json('post saved successfully');
    } catch (error) {
       res.status(404).json({msg:"Error while saving post in database"});
    }
}

export const GetPost=async(req,res)=>{
    // console.log(req.user);
    try{
         const posts=await Post.find({});
         return res.status(200).json(posts);
    }catch(error){
         return res.status(404).json({msg:"Error while fetching post from database"});
    }
}

export const GetpostById=async(req,res)=>{
    try {
        const postid=req.params.id;
        const post=await Post.find({_id:postid});
        return res.status(200).json(post);
    } catch (error) {
        return res.status(404).json({msg:"Error while fetching post from database"});
    }
}

export const getRecentPost=async(req,res)=>{
    try {
        const post=await Post.find().sort({createdDate:-1}).limit(4);
        return res.status(200).json(post);
    } catch (error) {
        return res.status(404).json({msg:"Error while fetching recent post"});
    }
}

export const checkpostisliked=async(req,res)=>{
    try {
        const postId=req.params.postid;
        const userId=req.params.userid;
        // console.log(postId);
        // console.log(userId);
        const post=await Post.findById(postId);
        // console.log(post);

        if(post.liked.includes(userId)){
            return res.status(200).json({liked:true,countliked:post.liked.length});
        }else{
            return res.status(200).json({liked:false,countliked:post.liked.length});
        }
    } catch (error) {
        return res.status(404).json({msg:"Error while fetching liked data"});
    }
}

export const likedpost=async(req,res)=>{
    try {
        const userId=req.params.userid;
       const postId=req.params.postid;
    //    console.log(userId);
    //    console.log(postId);
       const post=await Post.findById(postId);
    //    console.log(post);
    const user=await User.find({username:post.username});
        // console.log(user[0]._id);
        const userObjectIdString = user[0]._id.toString();
        // console.log(userObjectIdString);
        if(user[0].like.includes(userId)){
            await User.findByIdAndUpdate(userObjectIdString,{$pull:{like:userId},$inc: { totallike: -1 } });
        }else{
            await User.findByIdAndUpdate(userObjectIdString,{$push:{like:userId}, $inc:{ totallike: 1 } });
        }
        console.log(user);
       if(post.liked.includes(userId)){
        // post.liked.pull(userId);
        // post.totallikes--;
        // await post.save();
        await Post.findByIdAndUpdate(postId,{$pull:{liked:userId},$inc: { totallikes: -1 } });
       }else{
        await Post.findByIdAndUpdate(postId,{$push:{liked:userId}, $inc:{ totallikes: 1 } });
       }
       return res.status(200).json({msg:"Liked the post suceesfully"});  
    } catch (error) {
        return res.status(404).json({msg:"Error while liking the post"});
    }
} 

export const getPostbyusername=async(req,res)=>{
       try {
        //    console.log(req.params.username);
           const post=await Post.find({username:req.params.username});
        //    console.log(post);
           return res.status(200).json(post);
       } catch (error) {
           return res.status(404).json({msg:"Error while finding post by username"});        
       }     

}