import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { Typography, Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import { getrecentPost } from "../redux/Action";
import { useSelector } from "react-redux";

const Wrapper = styled(Box)`
  display: flex;
  height: 18rem;
  justify-content: center;
  width: 100%;
  padding-top: 50px;
`;
const WritePost = styled(Box)`
  width: 70%;
  margin: 20px 0 0 0;
`;
const Input = styled("input")`
  outline: none;
  width: 80%;
  border: 1.5px solid black;
  height: 30px;
  border-radius: 5px;
  padding: 4px 15px;
`;
const Component = styled(Box)`
  display: flex;
  width: 80%;
  justify-content: center;
  gap: 40px;
  margin-top: 2rem;
  background-color: #f2f2f2;
  padding: 20px 10px 20px 10px;
  border-radius: 5px;
`;
const Box1 = styled(Box)`
  background-color: #ffff;
  width: 17rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 23px;
  font-weight: 500;
  border-radius: 5px;
  color: blue;
  /* overflow-wrap: break-word; */
`;
const Box2 = styled(Box)`
  background-color: #ffff;
  width: 17rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 23px;
  font-weight: 500;
  border-radius: 5px;
  color: blue;
`;
const Recentpost = styled(Box)`
  border: 2px solid black;
  height: 15rem;
  width: 15rem;
  margin-top: 25px;
  border-radius: 7px;
`;
const Recent = () => {
  const dispatch = useDispatch();
  const post = useSelector((cur) => cur.recent);
  // console.log(post);
  useEffect(() => {
    dispatch(getrecentPost());
  }, []);
  return (
    <Wrapper>
      <WritePost>
        <Link to="/create">
          <Input
            type="text"
            placeholder="Write an Article,Share your knowledge with the world"
          />
        </Link>
        <Component>
          <Box1><a href="#section" style={{textDecoration:"none",color:"blue"}}>
            Meet People with<br></br>Similar Interest</a>
          </Box1>
          <Box2>
            <Link
              to="/allPost"
              style={{ textDecoration: "none", color: "blue" }}
            >
              Read Blogs
            </Link>
          </Box2>
        </Component>
      </WritePost>
      <Box>
        <Recentpost>
          <Typography
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginLeft: "10px",
              marginTop: "5px",
            }}
          >
            Recent Post
          </Typography>
          <Link to="/allPost" style={{textDecoration:"none"}}>
          <Box>
          {post.map((cur) => {
            const givenDate = new Date(cur.createdDate);
            const currentDate = new Date();
            const monthsAgo =
              currentDate.getMonth() -
              givenDate.getMonth() +
              12 * (currentDate.getFullYear() - givenDate.getFullYear());
            return (
              <Box style={{ display: "flex", gap: "20px" }}>
                <Box
                  style={{
                    width: "35px",
                    height: "33px",
                    border: "2px solid black",
                    borderRadius: "16px",
                    margin: "5px 0 0 15px",
                  }}
                >
                  <img
                    src={cur.picture}
                    alt="photo"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "16px",
                    }}
                  />
                </Box>
                <Box>
                  <Typography style={{ fontSize: "18px" }}>
                    {cur.title.slice(0, 12)}...
                  </Typography>
                  <Typography>
                    {monthsAgo} months ago
                  </Typography>
                  <Divider style={{ width: "10rem" }}></Divider>
                </Box>
              </Box>
            );
          }).slice(0,4)}
          </Box>
          </Link>
        </Recentpost>
      </Box>
    </Wrapper>
  );
};

export default Recent;
