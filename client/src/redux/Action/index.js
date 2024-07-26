import axios from "axios";
import { SIGN_UP,LOGIN,GETPOST,Logout,GETPOSTBYID,POSTCOMMENT,GETCOMMENT,DELETECOMMENT,RECENTPOST,GETALLUSER,GETUSERBYID,SAVEABOUT, PROFILEIMAGE} from "./type";

const API_URL='http://localhost:8000';
const API=axios.create({baseURL:API_URL});

API.interceptors.request.use((req)=>{
  const userna=JSON.parse(localStorage.getItem("profile"))
  if(userna){
    req.headers.Authorization=`Bearer ${
      userna.accessToken
    }`;
  }
  return req;
})

export const UserSignup=(data)=>async(dispatch)=>{
      try {
        const res=await API.post(`${API_URL}/signup`,data);
        dispatch({type:SIGN_UP,payload:res});
      } catch (error) {
        console.log("Error while Calling Api For sign up");
      }
}

export const UserLogin=(data)=>async(dispatch)=>{
  try {
    const res=await API.post(`${API_URL}/login`,data);
    dispatch({type:LOGIN,payload:res});
  } catch (error) {
    alert("Incorrect Information");
  }
}

export const userLogout=()=>async(dispatch)=>{
   dispatch({type:Logout});
}
export const sendPost=(data)=>async(dispatch)=>{
  try {
    await API.post(`${API_URL}/createpost`,{comment:data});
  } catch (error) {
    console.log("Error while create post")
  }
}

export const getPost=()=>async(dispatch)=>{
  try {
    const res=await API.get(`${API_URL}/getpost`);
    dispatch({type:GETPOST,payload:res});
  } catch (error) {
    console.log("Error While api call");
  }
}

export const getPostbyId=(id)=>async(dispatch)=>{
    try {
      const res=await API.get(`${API_URL}/getpostbyid/${id}`,);
      dispatch({type:GETPOSTBYID,payload:res});
    } catch (error) {
      console.log("Error while calling api to get particular post");
    }
}


export const postComment=(userid,postid,data)=>async(dispatch)=>{
  try {
    const res=await API.post(`${API_URL}/postcommment/${userid}/${postid}`,{comment:data});
    dispatch({type:POSTCOMMENT});
  } catch (error) {
    console.log("Error while posting comment");
  }
}

export const getComment=(postid)=>async(dispatch)=>{
  try {
    const res=await API.get(`${API_URL}/getcommmentbyid/${postid}`);
    dispatch({type:GETCOMMENT,payload:res.data});
  } catch (error) {
    console.log("Error while posting comment");
  }
}

export const deleteCommet=(postId)=>async(dispatch)=>{
  try {
    const res=await API.delete(`${API_URL}/deletecomment/${postId}`);
    dispatch({type:DELETECOMMENT})
  } catch (error) {
    
  }
}

export const getrecentPost=()=>async(dispatch)=>{
  try {
    const res=await API.get(`${API_URL}/recentpost`);
    dispatch({type:RECENTPOST,payload:res});
  } catch (error) {
    console.log(error);
  }
}

export const Getalluser=()=>async(dispatch)=>{
  try {
     const res=await API.get(`${API_URL}/alluser`);
     dispatch({type:GETALLUSER,payload:res})
  } catch (error) {
    console.log(error);
  }
}

export const getUserbyId=(id)=>async(dispatch)=>{
    try {
      const res=await API.get(`${API_URL}/getuserbyid/${id}`);
      dispatch({type:GETUSERBYID,payload:res});
    } catch (error) {
      console.log(error);
    }
}

export const saveAbout=(data)=>async(dispatch)=>{
   try {
      const res=await API.post(`${API_URL}/saveabout`,data);
      dispatch({type:SAVEABOUT,payload:data});
   } catch (error) {
      console.log(error);
   }
}

export const profileimage=(data)=>async(dispatch)=>{
  try{
     await API.post(`${API_URL}/profileimage`,data);
     dispatch({type:PROFILEIMAGE});
  }catch(error){
    console.log(error);
  }
}