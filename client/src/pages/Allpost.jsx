import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../redux/Action";
import { Typography, Box } from "@mui/material";
import styled from "@emotion/styled";
import { useLocation,Link } from "react-router-dom";
import Footer from "../components/Footer";


const Container=styled(Box)`
    width: 100vw;
    display: flex;
    justify-content: center;
`;
const Component=styled(Box)`
    width:80%;
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    margin: 0 40px 0 40px;
    padding-top:100px;
    justify-content: center;
`;
const Image = styled("img")`
  border-radius: 8px;
    height: 100%;
    object-fit: cover;
    width: 100%;
    border:2px solid black;
`;
const Wrapper=styled(Box)`
     width:19rem;
     height:22rem;
     border: 2px solid black;
     display:flex;
     flex-direction: column;
     align-items: center;
     gap: 10px;
`;
const Title=styled(Typography)`
     font-size: 24px;
     font-family:"popin";
     color: black;
     font-weight: 600;
`;
const Description=styled(Typography)`
   font-size: 16px;
   margin-left: 15px;
`;
const Button=styled(Box)`
   background-color: black;
   color: #fff;
    cursor: pointer;
    font-size: 1rem;
   border-radius: 5px;
   padding: 5px 10px;
   border: 2px solid #000;
`;
const Allpost = ({search}) => {
  const location = useLocation();
  const value = location.search?.split('=')[1];
  console.log("value",value);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(getPost());
    } catch (error) {
      console.log("Error while getting post");
    }
  }, []);
  const pos = useSelector((state) => state.Post);
  const filteredPosts =value?pos.filter((post)=>post.categories.toLowerCase().replace(" ","_").includes(value.toLowerCase())):search
    ? pos.filter((post) =>
        post.categories.toLowerCase().includes(search.toLowerCase())
      )
    : pos;
  return (
    <Box>
    <Container>
      <Component>
        {filteredPosts.length>0?filteredPosts.map((cur) => {
          return (
            <Wrapper>
              <Box style={{height:"9rem",width:"16rem",margin:"19px 20px 0 24px"}}>
                <Image src={cur.picture} />
              </Box>
              <Title>{cur.title.slice(0,18)}...</Title>
              <Description>{cur.description.slice(0,80)}...</Description>
              <Link to={`/description?id=${cur._id}`} style={{textDecoration:"none",color:"black"}}>
              <Button>Read More</Button>
              </Link>
            </Wrapper>
          );
        }):<Typography>No Such Content is found</Typography>}
      </Component>
    </Container>
    <Footer/>
    </Box>
  );
};

export default Allpost;
