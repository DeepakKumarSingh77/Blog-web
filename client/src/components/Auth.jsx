import React, { useEffect, useState } from "react";
import { TextField, Typography, Box, Button } from "@mui/material";
import styled from "@emotion/styled";
import {useDispatch} from "react-redux";
import { UserSignup,UserLogin} from "../redux/Action";
import {useNavigate} from "react-router-dom";
import {useSelector}  from "react-redux";
const Component = styled(Box)`
  width: 30rem;
  height:30rem;
  overflow: hidden;
  scroll-behavior: none;
`;
const LoginComponent = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  gap: 15px;
`;
const LoginButton=styled(Button)`
    background-color: blue;
    color: #ffff;
    height: 35px;
    &:hover{
         background-color: #fff;
         border: 1px solid #000;
         color: #000;
    }
`;
const initialSignup={
  name:'',
  username:'',
  password:''
}
const initialLogin={
  username:'',
  password:'',
}
const Auth = ({onClose,isUserAuthenticated}) => {
    const dispatch =useDispatch()
    const [signup,setsignup]=useState('login');
    const [sign,setsign]=useState(initialSignup);
    const [login,setlogin]=useState(initialLogin);
    const navigator=useNavigate();
    const {statusCode} =useSelector(cur=>cur.Authu);
   
    useEffect(()=>{
      if (statusCode === 200) {
        onClose();
        isUserAuthenticated(true);
      }
    },[statusCode]);
    const handleSignup=(e)=>{
      setsign({...sign,[e.target.name]:e.target.value});
    }
    const handleLogin=(e)=>{
      setlogin({...login,[e.target.name]:e.target.value});
    }
    // console.log(statusCode);
    const UserSignin=async(e)=>{
           e.preventDefault();
           if(sign.name && sign.password && sign.username){
            try {
              dispatch(UserSignup(sign));
               setsignup('login');
          } catch (error) {
           console.log("Error while signin from Auth.jsx component");
          }
           }else{
            alert("Please Fill all Information")
           }
           
    }
    // console.log(login);
    const userLogin=(e)=>{
      e.preventDefault();
      try {
        dispatch(UserLogin(login));
        // console.log(statecode.stateCode);
        // else{
        //   window.alert("Incorrect Information");
        // }
      } catch (error) {
        console.log("Error while login from Auth.jsx component");
        
      }
    }
  return (
    <Component>
       {
        signup==='login'?
        <LoginComponent>
        <Typography style={{fontSize:25,}}>Join then Deepak community</Typography>
        <Typography>Deepak community of Thousand amazing developers</Typography>
        <Box sx={{ display: "flex", flexDirection: "column",alignItems:"center"}}>
          <form onSubmit={userLogin}>
            <Box sx={{ display: "flex", flexDirection: "column",gap:'15px'}}>
              <TextField label="Username" variant="standard" name="username" onChange={(e)=>{handleLogin(e)}}/>
              <TextField label="password" variant="standard" name="password" onChange={(e)=>{handleLogin(e)}}/>
              <LoginButton sx={{marginTop:'20px',marginBottom:'15px'}}  onClick={(e)=>{userLogin(e)}}>Login</LoginButton>
            </Box>
          </form>
          or
          <Button sx={{marginTop:'20px'}} onClick={()=>setsignup('signup')}>Sign up</Button>
        </Box>
      </LoginComponent>:
      <LoginComponent>
        <Typography style={{fontSize:25,}}>Join then Deepak community</Typography>
        <Typography>Deepak community of %% amazing developers</Typography>
        <Box sx={{ display: "flex", flexDirection: "column",alignItems:"center"}}>
          <form onSubmit={UserSignin}>
            <Box sx={{ display: "flex", flexDirection: "column",gap:'15px'}}>
            <TextField label="Name" variant="standard" name="name" onChange={(e)=>{handleSignup(e)}}/>
              <TextField label="Username" variant="standard" name="username" onChange={(e)=>{handleSignup(e)}}/>
              <TextField label="password" variant="standard" name="password" onChange={(e)=>{handleSignup(e)}}/>
              <LoginButton sx={{marginTop:'20px',marginBottom:'15px'}} onClick={(e)=>{UserSignin(e)}}>Sign up</LoginButton>
            </Box>
          </form>
              or
          <Button sx={{marginTop:'20px'}} onClick={()=>setsignup('login')}>Login</Button>
        </Box>
      </LoginComponent>
       }
    </Component>
  );
};

export default Auth;
