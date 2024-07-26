import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteCommet, getComment } from '../redux/Action';
import { useSelector } from 'react-redux';
import {Box,styled,Typography} from "@mui/material"
import { MdDialpad, MdOutlineDeleteOutline } from "react-icons/md";

const Component=styled(Box)`
   width: 90%;
   margin-top: 3rem;
`;
const Wrapper=styled(Box)`
    background-color: #e9e8e8;
    width: 100%;
    border: 1.5px solid black;
    border-radius: 4px;
    margin-top: 20px;
`;
const Username=styled(Box)`
   position: absolute;
   color:blue;
   font-size: 15px;
   margin-left: 10px;
`;
const CommentData=styled(Box)`
    margin-top: 25px;
    font-size: 20px;
    margin-bottom: 10px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    margin-left: 7px;
`;
const CreatedDate=styled(Box)`
   color: blue;
   margin-left: 4px;
   font-size: 15px;
`;
const Allcomment = ({postid,togglecomment,settogglecomment}) => {
    const [data,setdata]=useState([]);
    const dispatch=useDispatch();
    const Id=JSON.parse(localStorage.getItem("profile"));
    // console.log(togglecomment);
  useEffect(()=>{
        dispatch(getComment(postid));
  },[dispatch,postid,togglecomment])
  const comment=useSelector((cur)=>cur.comm);
  useEffect(() => {
    setdata(comment);
}, [togglecomment,comment]);
  return (
    <Component>
        <Typography style={{fontSize:"22px"}}>Top Comments</Typography>
        {
            data.map((cur)=>(
                <Wrapper>
                    <Username>username:{cur.username}</Username>
                    <CommentData>{cur.comment}</CommentData>
                    <Box style={{display:"flex",justifyContent:"space-between"}}>
                     <CreatedDate>postDate:{(cur.createdAt).slice(0,10)}</CreatedDate>
                     {Id.username===cur.username?<Box><MdOutlineDeleteOutline style={{width:"18px",height:"18px",color:"red",cursor:"pointer"}} onClick={()=>{dispatch(deleteCommet(cur._id)),settogglecomment(cur=>!cur)}}/></Box>:<Box></Box>}
                    </Box>
                 </Wrapper>
            ))
        }
    </Component>
  )
}

export default Allcomment