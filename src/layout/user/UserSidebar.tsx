import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Stack,
  Button,
} from "@mui/material";

import {
  LayoutDashboard,
  UserPen,
  Settings,
  LogOut,
} from "lucide-react";
import { forceLogout } from "../../service/helper/global.helper";

const UserSidebar = () => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Edit Profile",
      icon: <UserPen size={20} />,
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <Box
      sx={{
        height: "100vh",
              background:
          "linear-gradient(90deg, #7b2ff7 0%, #a66cff 100%)",
        color: "white",
        p: 2,
      }}
    >
      {/* Logo */}
      <Typography
        variant="h5"
       
        sx={{ mb: 3, fontWeight:"bold" }}
      >
        STUDENT DASHBOARD
      </Typography>

      <Divider
        sx={{
          bgcolor: "rgba(255,255,255,0.1)",
          mb: 2,
        }}
      />

      {/* Menu Items */}
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.title}
            sx={{
              borderRadius: 2,
              mb: 1,
              color: "white",

              "&:hover": {
                bgcolor: "#1f2937",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "white",
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>

         <Stack
      direction="row"
     
      sx={{ mt: 2, justifyContent:"center",
      alignItems:"center" }}
    >
      <Button
        variant="contained"
        color="error"
        startIcon={<LogOut size={18} />}
        onClick={forceLogout}
        sx={{
          borderRadius: "10px",
          textTransform: "none",
          px: 3,
          py: 1,
        }}
      >
        Logout
      </Button>
    </Stack>
    </Box>
  );
};

export default UserSidebar;