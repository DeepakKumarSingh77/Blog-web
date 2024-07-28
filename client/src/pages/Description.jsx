import React, { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostbyId } from "../redux/Action";
import { Box, Typography, styled } from "@mui/material";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import Allcomment from "../components/Allcomment";
import axios from "axios";
import Comments from "../components/Comments";
import Footer from "../components/Footer";
const Component = styled(Box)`
  background-color:  #e9e8e8;
  padding-top: 3.9rem;
  display: flex;
  justify-content: center;
  gap: 15px;
`;
const Wrapper = styled(Box)`
  width: 5vw;
  position: fixed;
  left: 180px;
  gap: 2px;
  display: flex;
  flex-direction: column;
`;
const Describ = styled(Box)`
  width: 50vw;
  background-color: white;
  margin-left: 50px;
  padding: 0 20px;

`;
const Username = styled(Box)`
  font-size: 16px;
  font-weight: bolder;
`;
const Createdon = styled(Box)`
  font-size: 12px;
`;
const Title = styled(Typography)`
  font-size: 48px;
  font-weight: 600;
  line-height: 50px;
`;
const Image = styled(Box)`
  margin-top: 30px;
  height: 30rem;
`;
const Wrapperfollow = styled(Box)`
  width: 12vw;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 10rem;
  padding-right: 17px;
  position: sticky;
  top: 5rem;
`;
const Button=styled(Box)`
    width: 9rem;
    height: 1.7rem;
    border-radius: 4px;
    background-color: blue;
    color: white;
    text-align: center;
    margin: 15px 0 0 15px;
`;
const Likedcnt=styled(Box)`
    position: absolute;
    top: -1px;
    left: 10px;
`;
const Description = () => {
  const location = useLocation();
  const value = location.search?.split("=")[1];
  const [liked,setliked]=useState();
  const [follow,setfollow]=useState();
  const [toggle,settoggle]=useState(false);
  const [cntlike,setcntliked]=useState();
  const [togglecomment,settogglecomment]=useState(false);

  const dispatch = useDispatch();
  const post = useSelector((cur) => cur.Post);
  const user=useSelector((cur)=>cur.Authu);
  // console.log(user.userid);
  const url =
    "https://www.shutterstock.com/image-vector/male-face-avatar-on-white-260nw-562359640.jpg";
  //   console.log("value",value);
  // console.log(post);
  useEffect(() => {
    try {
      dispatch(getPostbyId(value));
      // console.log("value",value);
    } catch (error) {
      console.log("Error while while finding post by postid");
    }
  }, []);
  const Id=JSON.parse(localStorage.getItem("profile"));
  const likehandle=async(postid)=>{
       await axios.put(`http://localhost:8000/likedpost/${postid}/${Id.id}`);
       settoggle(cur=>!cur);
  };
  const followerHandle=async(userid)=>{
    await axios.put(`http://localhost:8000/followUser/${post[0].username}/${Id.id}`);
    settoggle(cur=>!cur);
  }
  // console.log(post[0]._id);
  useEffect(()=>{
    const fetch=async()=>{
      const res=await axios.get(`http://localhost:8000/likedunliked/${post[0]._id}/${Id.id}`);
      const res1=await axios.get(`http://localhost:8000/followunfollow/${post[0].username}/${Id.id}`);
      setliked(res.data.liked);
      setfollow(res1.data.follow);
      setcntliked(res.data.countliked);
    }
    fetch();
  },[post,toggle]);
  //  console.log(togglecomment);
  const handleTwitterShare = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`;
    window.open(shareUrl, "_blank");
  };

  const handleLinkedInShare = () => {
    const shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(window.location.href)}`;
    window.open(shareUrl, "_blank");
  };
  const reducestr = (str) => {
    if (str) {
      return str.substring(0, 10);
    } else {
      return ""; // or any default value you prefer
    }};
  return (
    <Box>
    <Component>
      <Wrapper>
           <Box>{liked?<FcLike style={{width:"18px",height:"18px",marginTop:"15px",cursor:"pointer"}} onClick={()=>likehandle(post[0]._id)}/>:<FcLikePlaceholder style={{width:"18px",height:"18px",marginTop:"25px"}} onClick={()=>likehandle(post[0]._id)}/>}<Likedcnt>{cntlike}</Likedcnt></Box>
           <br></br>
           <a href="#section2" style={{textDecoration:'none',cursor:"pointer"}}><FaRegComment style={{width:"18px",height:"18px",marginTop:"15px"}}/></a>
           <br></br>
           <FaTwitter style={{width:"18px",height:"18px",marginTop:"15px",cursor:"pointer"}} onClick={handleTwitterShare}/>
           <br></br>
           <CiLinkedin style={{width:"18px",height:"18px",marginTop:"15px",cursor:"pointer"}} onClick={handleLinkedInShare}/>
      </Wrapper>
      <Describ>
        <Box style={{ display: "flex", height: "60px" }}>
          <Box style={{ width: "40px", height: "40px" }}>
            <img
              src={url}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Username>{post[0].username}</Username>
            <Createdon>created on {reducestr(post[0].createdDate)}</Createdon>
          </Box>
        </Box>
        <Title>{post[0].title}</Title>
        <Image>
          <img
            src={post[0].picture}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Image>
        <Typography style={{ fontSize: "20px", marginTop: "15px",marginBottom:"35px" }}>
          {post[0].description}
        </Typography>
        <hr></hr>
        <Comments postid={post[0]._id} settogglecomment={settogglecomment}/>
        <Allcomment postid={post[0]._id} togglecomment={togglecomment} settogglecomment={settogglecomment}/>
      </Describ>
      <Wrapperfollow>
          <Box style={{display:"flex",gap:"20px",marginTop:"20px"}}>
          <Box style={{ width: "40px", height: "40px" }}>
            <img
              src={url}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
              <Typography style={{fontSize:"20px",fontWeight:"600"}}>{post[0].username}</Typography>
          </Box>
          {follow?<Button style={{cursor:"pointer"}} onClick={()=>{followerHandle(Id.id)}}>unFollow</Button>:<Button onClick={()=>{followerHandle(Id.id)}}>Follow</Button>}
      </Wrapperfollow>
    </Component>
    <Box>
         
    </Box>
    <Footer/>
    </Box>
  );
};

export default Description;
