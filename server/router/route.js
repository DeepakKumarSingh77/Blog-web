import  express from "express";
const router =express.Router();
import { SignupUser,UserLogin,getAlluser,getuserbyid,saveAbout,profileImage} from "../controller/user-Controller.js"; 
import { uploadImage,getImage } from "../controller/image-Controller.js";
import upload from "../utils/upload.js";
import { createPost,GetPost,GetpostById,checkpostisliked,likedpost,getRecentPost,getPostbyusername} from "../controller/post-Controller.js";
import { authenticateToken } from "../middleware/auth.js";
import {postComment,getComment,deleteCommment} from "../controller/comment-controller.js"
import {checkuserisfollow,followUser} from "../controller/follow-controller.js"


router.post('/signup',SignupUser);
router.post('/login',UserLogin);
router.post('/uploadfile',upload.single('file'),uploadImage);
router.get('/file/:id',getImage);
router.post('/createpost',authenticateToken,createPost);
router.get('/getpost',GetPost);
router.get('/getpostbyid/:id',authenticateToken,GetpostById);
router.get('/likedunliked/:postid/:userid',checkpostisliked);
router.put('/likedpost/:postid/:userid',likedpost);
router.post('/postcommment/:userid/:postid',authenticateToken,postComment);
router.get('/getcommmentbyid/:postid',getComment);
router.delete('/deletecomment/:postid',deleteCommment);
router.get('/followunfollow/:mainuser/:userid',checkuserisfollow);
router.put('/followUser/:mainuser/:userid',followUser);
router.get('/recentpost',getRecentPost);
router.get('/alluser',getAlluser);
router.get('/getuserbyid/:id',getuserbyid);
router.get('/getallpostbyusername/:username',getPostbyusername);
router.post('/saveabout',saveAbout);
router.post('/profileimage',profileImage);

export default router;