import Comment from "../model/comment.js"

export const postComment=async(req,res)=>{
    // console.log("postid",req.params.postid);
    // console.log("userid",req.params.userid);
    try {
        const postId=req.params.postid;
        const username=req.params.userid;
        const {comment}=req.body;
        const comments=await new Comment({username:username,postId:postId,comment:comment});
        comments.save();
        return res.status(200).json({msg:"Comment Save Successfully"});
    } catch (error) {
        return res.status(400).json({msg:"Comment not Save"});
    }
}


export const getComment=async(req,res)=>{
   try {
        const postid= req.params.postid;
        const comment=await Comment.find({postId:postid}).sort({ createdAt: 'desc' });
        return res.status(200).json(comment);
   } catch (error) {
    return res.status(404).json({msg:"Error while fetching comment for particular post"});
   }
}

export const deleteCommment=async(req,res)=>{
    try {
        const postId=req.params.postid;
        // console.log(postId);
        await Comment.deleteOne({_id:postId});
        return res.status(200).json({msg:"Comment Delete successfully"});
    } catch (error) {
        return res.status(404).json({msg:"Error  while deleting comment"});
    }
}