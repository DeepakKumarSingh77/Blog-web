import styled from '@emotion/styled';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { UserSignup, UserLogin } from "../redux/Action";
import { useNavigate } from 'react-router-dom';

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  width: 400px;
  margin: auto;
  margin-top: 50px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 30px; // Increased padding for better spacing
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 20px;
  height:39px; // Space between fields
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 15px;
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

const Login = ({ isUserAuthenticated }) => {
  const dispatch = useDispatch();
  const [signupMode, setSignupMode] = useState('login');
  const [signupData, setSignupData] = useState(initialSignup);
  const [loginData, setLoginData] = useState(initialLogin);
  const navigate = useNavigate();
  const { statusCode } = useSelector(cur => cur.Authu);

  useEffect(() => {
    if (statusCode === 200) {
      isUserAuthenticated(true);
      navigate("/");
    }
  }, [statusCode, isUserAuthenticated, navigate]);

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleUserSignup = async () => {
    try {
      dispatch(UserSignup(signupData));
      if (statusCode === 200) {
        setSignupMode('login');
      } else {
        window.alert("This username already exists");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    try {
      dispatch(UserLogin(loginData));
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div style={{height:"85vh",backgroundColor: 'skyblue', paddingTop: "100px" }}>
      <Container>
        {signupMode === 'signup' ? (
          <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
            <Typography variant="h5" gutterBottom style={{textAlign:"center"}}>Create Account</Typography>
            <StyledTextField label="Name" variant="outlined" name='name' onChange={handleSignupChange} />
            <StyledTextField label="Username" variant="outlined" name='username' onChange={handleSignupChange} />
            <StyledTextField label="Password" type="password" variant="outlined" name='password' onChange={handleSignupChange} />
            <StyledButton variant="contained" onClick={handleUserSignup}>Sign Up</StyledButton>
            <Typography variant="body2" sx={{ margin: '10px 0' }} style={{textAlign:"center"}}>OR</Typography>
            <StyledButton variant="outlined" onClick={() => setSignupMode('login')}>Login</StyledButton>
          </Box>
        ) : (
          <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
            <Typography variant="h5" gutterBottom style={{textAlign:"center"}}>Login</Typography>
            <StyledTextField label="Username" variant="outlined" name='username' onChange={handleLoginChange} />
            <StyledTextField label="Password" type="password" variant="outlined" name='password' onChange={handleLoginChange} />
            <StyledButton variant="contained" onClick={handleUserLogin}>Login</StyledButton>
            <Typography variant="body2" sx={{ margin: '10px 0' }} style={{textAlign:"center"}}>OR</Typography>
            <StyledButton variant="outlined" onClick={() => setSignupMode('signup')}>Create an Account</StyledButton>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Login;
