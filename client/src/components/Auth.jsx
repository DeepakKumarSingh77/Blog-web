import React, { useEffect, useState } from "react";
import { TextField, Typography, Box, Button } from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { UserSignup, UserLogin } from "../redux/Action";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 30rem;
  height: 30rem;
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

const LoginButton = styled(Button)`
  background-color: blue;
  color: #fff;
  height: 35px;
  &:hover {
    background-color: #fff;
    border: 1px solid #000;
    color: #000;
  }
`;

const initialSignup = {
  name: '',
  username: '',
  password: ''
};

const initialLogin = {
  username: '',
  password: '',
};

const Auth = ({ onClose, isUserAuthenticated }) => {
  const dispatch = useDispatch();
  const [signup, setsignup] = useState('login');
  const [sign, setsign] = useState(initialSignup);
  const [login, setlogin] = useState(initialLogin);
  const navigator = useNavigate();
  const { statusCode } = useSelector(cur => cur.Authu);

  useEffect(() => {
    if (statusCode === 200) {
      onClose();
      isUserAuthenticated(true);
    }
  }, [statusCode, onClose, isUserAuthenticated]);

  const handleSignup = (e) => {
    setsign({ ...sign, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };

  const resetForms = () => {
    setsign(initialSignup);
    setlogin(initialLogin);
  };

  const UserSignin = async (e) => {
    e.preventDefault();
    if (sign.name && sign.password && sign.username) {
      try {
        dispatch(UserSignup(sign));
        resetForms();
        setsignup('login'); // Switch to login form
      } catch (error) {
        console.log("Error while signin from Auth.jsx component");
      }
    } else {
      alert("Please Fill all Information");
    }
  };

  const userLogin = (e) => {
    e.preventDefault();
    try {
      dispatch(UserLogin(login));
    } catch (error) {
      console.log("Error while login from Auth.jsx component");
    }
  };

  return (
    <Component>
      {
        signup === 'login' ?
          <LoginComponent>
            <Typography style={{ fontSize: 25, }}>Join the Deepak community</Typography>
            <Typography>Deepak community of Thousand amazing developers</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <form onSubmit={userLogin}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: '15px' }}>
                  <TextField label="Username" variant="standard" name="username" onChange={handleLogin} value={login.username} />
                  <TextField label="Password" variant="standard" name="password" onChange={handleLogin} value={login.password} />
                  <LoginButton sx={{ marginTop: '20px', marginBottom: '15px' }} onClick={userLogin}>Login</LoginButton>
                </Box>
              </form>
              or
              <Button sx={{ marginTop: '20px' }} onClick={() => { setsignup('signup'); resetForms(); }}>Sign up</Button>
            </Box>
          </LoginComponent> :
          <LoginComponent>
            <Typography style={{ fontSize: 25, }}>Join the Deepak community</Typography>
            <Typography>Deepak community of %% amazing developers</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <form onSubmit={UserSignin}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: '15px' }}>
                  <TextField label="Name" variant="standard" name="name" onChange={handleSignup} value={sign.name} />
                  <TextField label="Username" variant="standard" name="username" onChange={handleSignup} value={sign.username} />
                  <TextField label="Password" variant="standard" name="password" onChange={handleSignup} value={sign.password} />
                  <LoginButton sx={{ marginTop: '20px', marginBottom: '15px' }} onClick={UserSignin}>Sign up</LoginButton>
                </Box>
              </form>
              or
              <Button sx={{ marginTop: '20px' }} onClick={() => { setsignup('login'); resetForms(); }}>Login</Button>
            </Box>
          </LoginComponent>
      }
    </Component>
  );
};

export default Auth;
