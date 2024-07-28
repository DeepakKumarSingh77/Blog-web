import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../redux/Action";
import { Box, Divider, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Component = styled(Box)`
  width: 90%;
  margin-top: 2rem;
`;
const Wrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 2rem;
  margin-bottom: 20px;
`;
const Image = styled("img")`
  width: 200px;
  aspect-ratio: auto 200 / 134;
  height: 134px;
`;
const Username = styled(Typography)`
  font-size: 13px;
`;
const Title = styled(Typography)`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  margin-top: 4px;
`;
const Discription = styled(Typography)`
  font-size: 16px;
  line-height: 1;
  margin-bottom: 20px;
  margin-top: 12px;
`;
const Line = styled("Box")`
  width: 35rem;
  height: 1.2px;
  background-color: #000;
  display: block;
  margin-left: 2rem;
  margin-bottom: 10px;
`;
const Blog = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(getPost());
    } catch (error) {
      console.log("Error while getting post");
    }
  }, []);
  const pos = useSelector((state) => state.Post);
  //    console.log(pos);
  const reducestr = (str) => {
    if (str) {
      return str.substring(0, 10);
    } else {
      return ""; // or any default value you prefer
    }
  };
  return (
    <Box>
      <Component>
        {pos.map((cur) => {
          const description = cur && cur.description ? cur.description : "";
          let cnt;
          if (description.length < 180) {
            cnt = 5;
          } else if (description.length < 250) {
            cnt = 10;
          } else if (description.length < 250) {
            cnt = 15;
          } else {
            cnt = 20;
          }

          return (
            <Box>
              <Wrapper key={cur._id}>
                <Box>
                  <Username>{cur.username}</Username>
                  <Link
                    to={`/description?id=${cur._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Title>{cur.title}</Title>
                    <Discription>{cur.description.slice(0, 220)}</Discription>
                    <Box style={{ display: "flex", gap: "20px" }}>
                      <Typography style={{ fontSize: "13px" }}>
                        {reducestr(cur.createdDate)}
                      </Typography>
                      <Typography style={{ fontSize: "13px" }}>
                        {cnt} min read
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "13px",
                          backgroundColor: "#F2F2F2",
                          border: "1px solid #F2F2F2",
                          color: "#6B6B6B",
                        }}
                      >
                        {cur.categories}
                      </Typography>
                    </Box>
                  </Link>
                </Box>
                <Link to={`/description?id=${cur._id}`}>
                  <Box>
                    <Image src={cur.picture} />
                  </Box>
                </Link>
              </Wrapper>
              <Line></Line>
            </Box>
          );
        })}
      </Component>
    </Box>
  );
};

export default Blog;
