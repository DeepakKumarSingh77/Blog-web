import React, { useEffect } from "react";
import { Box, Typography, styled } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { Getalluser } from "../redux/Action";
import { Scrollbar } from "swiper/modules";
import { Link } from "react-router-dom";

const StyledButton = styled(Box)`
  width: 7rem;
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 8px 12px;
  border-radius: 5px;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #444;
  }
`;

const UserCard = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 15px;
  width: 160px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Community = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(Getalluser());
  }, [dispatch]);
  
  const users = useSelector((state) => state.profile);

  return (
    <Box id="section" sx={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Community Creators
      </Typography>
      <Box
        sx={{
          height: "22rem",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          // padding: "30px",
          paddingTop:"25px",
          paddingLeft:"15px",
        }}
      >
        <Swiper
          modules={[Scrollbar]}
          spaceBetween={30}  // Adjusted for better spacing
          scrollbar={{ draggable: true, hide: false }} // Show scrollbar
          pagination={{ clickable: true }}
          slidesPerView={4}
          direction="horizontal"
          style={{ paddingBottom: "30px" }} // Add padding to avoid overlap
        >
          {users.map((user) => {
            const picture = user.picture || "https://static.vecteezy.com/system/resources/thumbnails/009/209/212/small/neon-glowing-profile-icon-3d-illustration-vector.jpg";
            return (
              <SwiperSlide key={user._id}>
                <UserCard>
                  <Box sx={{ width: "130px", height: "130px", overflow: "hidden", borderRadius: "50%" }}>
                    <img src={picture} alt="User Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, marginTop: "10px" }}>
                    {user.username}
                  </Typography>
                  <Link to={`/profile?id=${user._id}`} style={{ textDecoration: "none" }}>
                    <StyledButton>View Creator</StyledButton>
                  </Link>
                </UserCard>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Box>
  );
};

export default Community;
