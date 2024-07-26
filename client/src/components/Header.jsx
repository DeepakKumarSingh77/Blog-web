import React, { useState } from "react";
import { Box, Dialog, Typography } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import styled from "@emotion/styled";
import { Link, useParams } from "react-router-dom";
import {useDispatch } from "react-redux";
import { userLogout } from "../redux/Action/index";
import Auth from "./Auth";
const Component = styled(Box)`
  display: flex;
  justify-content: center;
  margin-top: 9px;
  background-color: #ffff;
  position: fixed;
  width: 100%;
  z-index: 10;
`;
const Wrapper = styled(Box)`
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 45px;
`;
const Title = styled(Typography)`
  font-size: 29px;
  font-weight: 600;
  cursor: pointer;
  font-family: Merriweather;
`;
const SearchBar = styled(Box)`
  width: 35rem;
  border: 1px solid black;
  display: flex;
  align-items: center;
  border-radius: 3px;
  height: 35px;
`;
const Input = styled("input")`
  border: none;
  outline: none;
  width: 33rem;
  font-size:17px;
  font-family: Merriweather;

`;
const Button = styled(Box)`
  font-size: 17px;
  font-family: 500;
  color: white;
  background-color: black;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: transparent;
    color: black;
    border: 1px solid blue;
  }
`;
const Header = ({isAuthenticated,isUserAuthenticated,setsearch}) => {
  const [open,setopen]=useState(false);
  const dispatch=useDispatch();
  const Url=useParams();
  console.log(Url);
  // const [Sucessfulllogin,setsuccessfullogin]=useState(false);
  const handleclose=()=>{
    setopen(false);
    // isUserAuthenticated(Sucessfulllogin);
  }
  const changeHandle=(e)=>{
    setsearch(e.target.value);
  }
  const LogoutHandle=()=>{
    dispatch(userLogout());
    isUserAuthenticated(false);
  }
  return (
    <Box>
    <Component>
      <Wrapper>
        <Box>
          <Link to="/" style={{textDecoration:"none",color:"black"}}><Title>Blogs</Title></Link>
        </Box>
        <Link to="/allPost">
        <SearchBar>
          <form>
            <Input type="text" placeholder="Search Blogs..." onChange={(e)=>{changeHandle(e)}}/>
          </form>
          <CiSearch
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
          />
        </SearchBar>
        </Link>
        <Box>
            {isAuthenticated?<Link to="/" style={{textDecoration:"none"}}><Button onClick={()=>{LogoutHandle()}}>Logout</Button></Link>:<Button onClick={()=>setopen(true)}>Login</Button>}
        </Box>
        <Box>
           {isAuthenticated?<Link to="/dashboard" style={{textDecoration:"none"}}><Button>Dashboard</Button></Link>:<p></p>}
        </Box>
      </Wrapper>
    </Component>
    <Dialog open={open} onClose={handleclose}>
       <Auth  onClose={handleclose} isUserAuthenticated={isUserAuthenticated}/>
    </Dialog>
    </Box>
  );
};

export default Header;
