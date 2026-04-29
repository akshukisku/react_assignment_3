import React from 'react'
import Cookies from "js-cookie";
import { Box, Typography } from '@mui/material';
const UserDashboard = () => {

   const userCookie = Cookies.get("user");

  // Convert string to object
  const user = userCookie
    ? JSON.parse(userCookie)
    : null;

  console.log("User Details:", user);

  return (
     <Box
      sx={{
        width: "90%",
        height: { xs: 220, md: 180 },
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
        background:
          "linear-gradient(90deg, #7b2ff7 0%, #a66cff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 3, md: 5 },
        py: 3,
      }}
    >
      {/* Left Content */}
      <Box >
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255,255,255,0.8)",
            mb: 5,
            fontSize: "14px",
          }}
        >
          September 4, 2023
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: 700,
            mb: 1,
            fontSize: { xs: "28px", md: "40px" },
          }}
        >
          Welcome back, {user?.name}
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.85)",
            fontSize: "15px",
          }}
        >
          Always stay updated in your student portal
        </Typography>
      </Box>

      {/* Right Image */}
      <Box
        component="img"
        src="https://cdn3d.iconscout.com/3d/premium/thumb/student-boy-6299536-5187865.png"
        alt="student"
        sx={{
          height: { xs: 160, md: 230 },
          position: "absolute",
          right: 20,
          bottom: 0,
          objectFit: "contain",
        }}
      />

      {/* Decorative Dots */}
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          bgcolor: "#5CF2C5",
          position: "absolute",
          top: 20,
          right: 220,
        }}
      />

      <Box
        sx={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          bgcolor: "#FF5E8A",
          position: "absolute",
          top: 70,
          right: 320,
        }}
      />
    </Box>
  )
}

export default UserDashboard