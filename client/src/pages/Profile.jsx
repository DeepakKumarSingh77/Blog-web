import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUserbyId } from "../redux/Action";
import Footer from "../components/Footer";
import { Box, Divider, Typography } from "@mui/material";
import axios from "axios";

const Profile = () => {
  const location = useLocation();
  const id = location.search?.split("=")[1];
  const dispatch = useDispatch();
  const [data,setdata]=useState();
  useEffect(() => {
    dispatch(getUserbyId(id));
  }, []);
  const user = useSelector((cur) => cur.profile);
  // console.log(user);
  user[0].picture = user[0].picture
    ? user[0].picture
    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#aecbd8",
        paddingTop: "80px",
      }}
    >
      <Box style={{ width: "55rem",backgroundColor:"#c0d4dd",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Box style={{ display: "flex",gap:"90px",marginTop:"15px"}}>
          <Box style={{ height: "18rem" }}>
            <img
              src={user[0].picture}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="photo"
            />
          </Box>
          <Box style={{display:"flex",flexDirection:"column",gap:"3rem",justifyContent:"center"}}>
            <Box style={{backgroundColor:"white",width:"26rem",height:"60px",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Typography style={{fontSize:"24px"}}>Username : {user[0].username}</Typography>
            </Box>
            <Box style={{display:"flex",gap:"2rem"}}>
              <Box style={{backgroundColor:"white",width:"12rem",height:"10rem",display:"flex",alignItems:"center",justifyContent:"center"}}><Typography style={{fontSize:"25px",textAlign:"center",fontWeight:"600"}}>{user[0].totallike}<br/>Likes</Typography></Box>
              <Box style={{backgroundColor:"white",width:"12rem",height:"10rem",display:"flex",alignItems:"center",justifyContent:"center"}}><Typography style={{fontSize:"25px",textAlign:"center",fontWeight:"600"}}>{user[0].totalfollower}<br/>Followers</Typography></Box>
            </Box>
          </Box>
        </Box>
        <Box style={{width:"90%",backgroundColor:"white",marginTop:"15px",minHeight:"150px",marginBottom:"20px"}}><Typography style={{fontSize:"20px",fontWeight:"600",marginLeft:"30px"}}>About:<p style={{fontSize:"15px",marginTop:"0px"}}>{user[0].about}</p></Typography></Box>
        <Box></Box>
      </Box>
      <Divider
        style={{
          color: "black",
          backgroundColor: "black",
          height: "2px",
          width: "100%",
          marginTop: "30px",
        }}
      />
      <Footer />
    </div>
  );
};

export default Profile;
