import { TextareaAutosize, Typography } from '@mui/material'
import React, { useState } from 'react'
import { TextField,Box } from '@mui/material';
import { IoSendSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { postComment } from '../redux/Action';

const Comments = ({postid,settogglecomment}) => {
  const [data,setdata]=useState('');
  const Id=JSON.parse(localStorage.getItem("profile"));
  const dispatch=useDispatch();
  return (
    <Box>
        <Typography id="section2" style={{fontSize:"24px",fontWeight:"600",marginBottom:"15px"}}>Comment</Typography>
        <Box>
            <Box style={{display:"flex",gap:"20px"}}>
              <Box style={{ width: "40px", height: "40px" }}>
                <img src='https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=1024x1024&w=is&k=20&c=O0VqqcmNvml8qJuK1YzCCE4U-xdZdtaQD8d1hAeEoCA=' style={{width:"100%",height:"100%",objectFit:"contain",borderRadius:"20px"}}/>
                </Box>
                <textarea rows={4} cols={50} style={{maxWidth:"45rem",maxHeight:"5rem"}} onChange={(e)=>{setdata(e.target.value)}}></textarea>
                <Box><IoSendSharp style={{width:"28px",height:"28px",cursor:"pointer"}} onClick={()=>{dispatch(postComment(Id.username,postid,data));settogglecomment(cur=>!cur);}}/></Box>
            </Box>
        </Box>
    </Box>
  )
}

export default Comments