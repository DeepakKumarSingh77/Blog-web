import axios from "axios";
import { Box, Button, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { sendPost } from "../redux/Action";
import { Link, useNavigate } from "react-router-dom";
const Component = styled(Box)`
  padding-top: 7rem;
  display: flex;
  justify-content: center;
  height: 70vh;
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 50vw;
  border: 2px solid black;
  padding: 20px 0 20px 0;
`;
const Select = styled("select")`
  width: 50%;
  height: 40px;
`;
const Option = styled("option")`
  width: 50%;
  height: 40px;
  padding: 5px;
`;
const Title = styled("input")`
  width: 90%;
  margin-left: 25px;
  height: 40px;
  font-size: 20px;
`;
const Description = styled("textarea")`
  width: 90%;
  margin-left: 25px;
  height: 200px;
  font-size: 20px;
  max-width: 90%;
  max-height: 15rem;
`;
const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};
const Post = () => {
  const [post, setpost] = useState(initialPost);
  const [file, setfile] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(file);
  const userna = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    const getImage = async () => {
      try {
          const data = new FormData();
          data.append("file",file);
          data.append("upload_preset", "image77_preset");
          const cloudName = "deljqtcqx";
          const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

          const res = await axios.post(api, data);
          const { secure_url } = res.data;
          // const imageurl=secure_url;
          // console.log(imageurl);
          setpost({ ...post, picture: secure_url, username: userna.username });
      } catch {
        console.log("Error while getting image url from database");
      }
    };
    getImage();
  }, [file]);
  console.log(post);
  const handleChange = (e) => {
    setpost({ ...post, [e.target.name]: e.target.value });
  };
  const postHandler = () => {
    if(post.title && post.picture && post.description && post.categories) {
      dispatch(sendPost(post));
      navigate("/");
    } else {
      alert("Please field all information");
    }
  };
  return (
    <Component>
      <Wrapper>
        <Box
          style={{
            display: "flex",
            width: "80%",
            gap: "20px",
            marginLeft: "20px",
          }}
        >
          <Select
            name="categories"
            id="Category"
            // name="categories"
            onChange={(e) => handleChange(e)}
          >
            <Option value="Select">Select</Option>
            <Option value="Web Development">Web Development</Option>
            <Option value="Data Science">Data Science</Option>
            <Option value="Technology">Technology</Option>
            <Option value="Android Development">Android Development</Option>
            <Option value="Machine Learning">Machine Learning</Option>
            <Option value="Other">Other</Option>
          </Select>
          <Typography>Category</Typography>
        </Box>
        <Box>
          <label
            htmlFor="img"
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginLeft: "20px",
            }}
          >
            <IoAddCircleOutline style={{ width: "30px", height: "30px" }} />
            Upload Image
          </label>
          <input
            type="file"
            id="img"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              setfile(e.target.files[0]);
            }}
          />
        </Box>
        <Title
          placeholder="Title"
          name="title"
          type="text"
          onChange={(e) => handleChange(e)}
        />
        <Description
          type="text"
          placeholder="Description"
          name="description"
          onChange={(e) => handleChange(e)}
        />
        <Button
          style={{
            border: "1.5px solid blue",
            width: "40px",
            marginLeft: "30px",
          }}
          onClick={postHandler}
        >
          Submit
        </Button>
      </Wrapper>
    </Component>
  );
};

export default Post;
