import axios from "axios";
import { Box, Button, Typography,styled } from "@mui/material";
import React,{useEffect, useState} from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { sendPost } from "../redux/Action";
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
const Title=styled("input")`
   width: 90%;
   margin-left: 25px;
   height: 40px;
   font-size: 20px;
`;
const Description=styled("textarea")`
   width: 90%;
   margin-left: 25px;
   height: 200px;
   font-size: 20px;
   max-width: 90%;
   max-height:15rem;
`;
const initialPost={
    title:'',
    description:'',
    picture:'',
    username:'',
    categories:'',
    createdDate:new Date()
}
const Post = () => {
  const[post,setpost]=useState(initialPost);
  const [file,setfile]=useState();
  const dispatch=useDispatch();
  // console.log(file);
  const userna=JSON.parse(localStorage.getItem("profile"));
  useEffect(()=>{
    const getImage=async()=>{
        try{
            if(file){
                const data=new FormData();
                data.append("filename",file.name);
                data.append("file",file);
                const res=await axios.post('http://localhost:8000/uploadfile',data,{
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                });
                const imageurl=res.data.imageUrl;
                // console.log(imageurl);
                setpost({...post,picture:imageurl,username:userna.username});
            }
        }catch{
            console.log("Error while getting image url from database");
        }
      }
      getImage();
  },[file])
  console.log(post);
const handleChange=(e)=>{
  setpost({...post,[e.target.name]:e.target.value});
}
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
            onChange={(e)=>handleChange(e)}
          >
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
        <label htmlFor="fileInput" style={{display:"flex",gap:"10px",alignItems:"center",marginLeft:"20px"}}><IoAddCircleOutline style={{width:"30px",height:"30px"}}/>Upload Image</label>
          <input id="fileInput" type="file" style={{ display: 'none' }} onChange={(e)=>{setfile(e.target.files[0])}}/>
        </Box>
        <Title placeholder="Title" name="title" type="text" onChange={(e)=>handleChange(e)}/>
        <Description type="text" placeholder="Description" name="description" onChange={(e)=>handleChange(e)}/>
        <Button style={{border:"1.5px solid blue", width:"40px",marginLeft:"30px"}} onClick={()=>{dispatch(sendPost(post))}}>Submit</Button>
      </Wrapper>
    </Component>
  );
};

export default Post;
