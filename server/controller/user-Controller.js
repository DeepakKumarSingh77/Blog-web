import bcrypt from 'bcrypt';
import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import Token from "../model/token.js";

dotenv.config();
export const SignupUser=async(req,res)=>{
    // console.log(req.body.password);
    try {
        const hashpassword=await bcrypt.hash(req.body.password,10);
        const data={name:req.body.name,username:req.body.username,password:hashpassword};
        const saveData=new User(data);
        // console.log(saveData);
        await saveData.save();
        return res.status(200).json({saveData});
    } catch (error) {
        return res.status(404).json({"msg":"Error while sign up by user"});
    }
}

export const UserLogin=async(req,res)=>{
        // console.log("Hello");
        // console.log(req.body.username);
        const user=await User.findOne({username:req.body.username});
        if(!user){
            return res.status(505).json({"msg":"username not found"});
        }
        console.log(user);
    try {
        let match=await bcrypt.compare(req.body.password,user.password);
        if(match){
            const accessToken= jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'3d'})
            const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);
            const newtoken=new Token({token:refreshToken});
            await newtoken.save();
            // console.log(accessToken,user);
            return res.status(200).json({accessToken:accessToken,username:user.username,userid:user._id});
        }else{
            return res.status(402).json({"msg":"password incorrect"});
        }
     } catch (error) {
        return res.status(404).json({"msg":"Error while Login by user"})
     }
}

export const getAlluser=async(req,res)=>{
    try {
        const user=await User.find({},{password:0});
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({"msg":"Error while fetching all user from database"})
    }
}

export const getuserbyid=async(req,res)=>{
    try {
        // console.log(req.params.id);
        const user=await User.find({_id:req.params.id},{password:0});
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({msg:"Error while fetching user by id"});
    }
}

export const saveAbout=async(req,res)=>{
    try {
        // console.log(req.body);
        await User.findByIdAndUpdate(req.body.id,{$set:{about:req.body.about}},{ new: true, runValidators: true });
        // console.log(user);
        return res.status(200).json({msg:"successfully save"});
    } catch (error) {
        return res.status(404).json({msg:"Error while saving about"}); 
    }
}

export const profileImage=async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.body.id,{$set:{picture:req.body.imgurl}},{ new: true, runValidators: true });
        // console.log(user);
        return res.status(200).json({msg:"successfully save"});
    }catch(error){
        return res.status(404).json({msg:"Error while saving about"}); 
    }
}



