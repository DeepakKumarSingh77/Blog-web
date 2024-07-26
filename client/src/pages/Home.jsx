import React from 'react'
import Header from '../components/Header'
import { Box } from '@mui/material'
import styled from '@emotion/styled'
import Recent from '../components/Recent';
import Blogs from '../components/Blogs';
import Footer from '../components/Footer';
import Community from '../components/Community';
const Component=styled(Box)`
   background-color:#aecbd8;
`;
const Home = ({isAuthenticated,isUserAuthenticated}) => {
  // const value=localStorage.getItem("profile");
  // console.log(value.accessToken);
  return (
    <Component>
        <Recent/>
        <Blogs/>
        <Community/>
        <Footer/>
    </Component>
  )
}

export default Home