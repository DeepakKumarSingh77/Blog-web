import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import { getUserbyId, saveAbout, profileimage } from "../redux/Action";
import { FaPen } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const Id = JSON.parse(localStorage.getItem("profile"));
  const id = Id.id;
  const [editMode, setEditMode] = useState(false);
  const [aboutText, setAboutText] = useState("");
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const user = useSelector((cur) => cur.profile);

  const uploadFile = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "image77_preset");

    try {
      const cloudName = "deljqtcqx";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      setImgUrl(secure_url);
      dispatch(profileimage({ id, imgurl: secure_url }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getUserbyId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user && user[0]) {
      setAboutText(user[0].about || "");
    }
  }, [user]);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleSaveClick = async () => {
    try {
      dispatch(saveAbout({ id, about: aboutText }));
      setEditMode(false);
    } catch (error) {
      console.error("Error while saving aboutText:", error);
    }
  };

  if (!user || !user[0]) {
    return null; // Or a loading spinner
  }

  const userPicture = imgUrl || user[0].picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#aecbd8",
        paddingTop: "80px",
      }}
    >
      <Box
        style={{
          width: "55rem",
          backgroundColor: "#c0d4dd",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box style={{ display: "flex", gap: "90px", marginTop: "15px" }}>
          <Box style={{ height: "18rem", position: "relative" }}>
            <img
              src={userPicture}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="photo"
            />
            <form onSubmit={uploadFile}>
              <label htmlFor="img">
                <FaCloudUploadAlt
                  style={{ position: "absolute", bottom: 0, right: "5px", height: "25px", width: "25px", cursor: "pointer" }}
                />
              </label>
              <input type="file" id="img" accept="image/*" onChange={(e) => setImg(e.target.files[0])} style={{ display: "none" }} />
              {img && <Button type="submit" style={{ position: "absolute", bottom: 0, left: "5px", height: "25px", width: "25px", cursor: "pointer", border: "2px solid blue", color: "yellow" }}>Upload</Button>}
            </form>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3rem",
              justifyContent: "center",
            }}
          >
            <Box
              style={{
                backgroundColor: "white",
                width: "26rem",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography style={{ fontSize: "24px" }}>
                Username : {user[0].username}
              </Typography>
            </Box>
            <Box style={{ display: "flex", gap: "2rem" }}>
              <Box
                style={{
                  backgroundColor: "white",
                  width: "12rem",
                  height: "10rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  style={{
                    fontSize: "25px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {user[0].totallike}
                  <br />
                  Likes
                </Typography>
              </Box>
              <Box
                style={{
                  backgroundColor: "white",
                  width: "12rem",
                  height: "10rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  style={{
                    fontSize: "25px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {user[0].totalfollower}
                  <br />
                  Followers
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          style={{
            width: "90%",
            backgroundColor: "white",
            marginTop: "15px",
            minHeight: "150px",
            marginBottom: "20px",
          }}
        >
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              style={{ fontSize: "20px", fontWeight: "600", marginLeft: "30px" }}
            >
              About:
            </Typography>
            <FaPen style={{ marginTop: "7px", marginRight: "7px", cursor: "pointer" }} onClick={handleEditClick} />
          </Box>
          {editMode ? (
            <Box style={{ width: "90%", backgroundColor: "white", padding: "10px", marginBottom: "20px" }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
              />
              <Button onClick={handleSaveClick} style={{ marginTop: "10px" }}>Save</Button>
            </Box>
          ) : (
            <Box style={{ width: "90%", backgroundColor: "white", padding: "10px", marginBottom: "20px" }}>
              <Typography style={{ fontSize: "16px" }}>{aboutText}</Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Divider
        style={{
          color: "black",
          backgroundColor: "black",
          height: "2px",
          width: "100%",
          marginTop: "30px",
        }}
      />
      <Footer />
    </div>
  );
};

export default AdminDashboard;
