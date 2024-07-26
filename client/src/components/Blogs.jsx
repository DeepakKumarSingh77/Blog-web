import React from "react";
import { Box, Typography, styled } from "@mui/material";
import Blog from "./Blog";
import { Link } from "react-router-dom";
const Component = styled(Box)`
  background-color: #ffff;
  display: flex;
  justify-content: center;
  height: 100%;
`;
const BlogContent = styled(Box)`
  width: 70%;
`;
const Morecontent = styled(Box)`
  height: 20rem;
  position: sticky;
  top: 5rem;
`;
const Blogs = () => {
  return (
    <Component>
      <BlogContent>
        <Blog />
      </BlogContent>
      <Morecontent>
        <Typography
          style={{ fontSize: "20px", fontWeight: 500, margin: "15px 0 10px 0" }}
        >
          Discover more of what matters to you
        </Typography>
        <Box
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "Wrap",
            width: "15rem",
          }}
        >
          <Link to={`/allPost?category=web_development`} style={{textDecoration:"none",color:"purple"}}>
            <Typography
              style={{
                backgroundColor: "gainsboro",
                padding: "2px 6px 0 6px",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            >
              Web Development
            </Typography>
          </Link>
          <Link to={`/allPost?category=Data_Science`} style={{textDecoration:"none",color:"purple"}}>
          <Typography
            style={{
              backgroundColor: "gainsboro",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            Data Science
          </Typography>
          </Link>
          <Link to={`/allPost?category=Technology`} style={{textDecoration:"none",color:"purple"}}>
          <Typography
            style={{
              backgroundColor: "gainsboro",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            Technology
          </Typography>
          </Link>
          <Link to={`/allPost?category=Android_Development`} style={{textDecoration:"none",color:"purple"}}>
          <Typography
            style={{
              backgroundColor: "gainsboro",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            Android Development
          </Typography>
          </Link>
          <Link to={`/allPost?category=AI`} style={{textDecoration:"none",color:"purple"}}>
          <Typography
            style={{
              backgroundColor: "gainsboro",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            AI
          </Typography>
          </Link>
          <Link to={`/allPost?category=Machine_Learning`} style={{textDecoration:"none",color:"purple"}}>
          <Typography
            style={{
              backgroundColor: "gainsboro",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            Machine Learning
          </Typography>
          </Link>
        </Box>
        <Link to="/allPost" style={{textDecoration:"none"}}><Typography style={{ color: "blue", marginTop: "10px" }}>
          See more topics
        </Typography>
        </Link>
      </Morecontent>
    </Component>
  );
};

export default Blogs;
