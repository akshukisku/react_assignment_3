import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";

import { Home, Calendar, Users, Settings, LogOut } from "lucide-react";
import { forceLogout } from "../../service/helper/global.helper";

const Sidebar = () => {
  const menuItems = [
    { text: "Home", icon: <Home size={20} />, active: true },
    { text: "User", icon: <Users size={20} /> },
    { text: "Calendar", icon: <Calendar size={20} /> },
    { text: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <Box
      sx={{
        width: 260,
        height: "90vh",
        bgcolor: "#F7F7F8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px solid #E5E7EB",
        p: 2,
      }}
    >
      {/* Top Section */}
      <Box>
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 5,
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              bgcolor: "#00695C",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            ◎
          </Box>

          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                color: "#005B55",
                fontSize: "1.4rem",
                lineHeight: 1,
              }}
            >
              ADMIN
            </Typography>

            <Typography
              sx={{
                fontSize: "0.7rem",
                color: "#6B7280",
                letterSpacing: 1,
              }}
            >
              DASHBOARD
            </Typography>
          </Box>
        </Box>

        {/* Menu */}
        <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              sx={{
                borderRadius: 3,
                py: 1.2,
                px: 2,
                bgcolor: item.active ? "#00695C" : "transparent",
                color: item.active ? "#fff" : "#8A8FA8",

                "&:hover": {
                  bgcolor: item.active ? "#00695C" : "#EEF2F7",
                },
              }}
            >
              {/* Lucide Icon */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mr: 2,
                  color: item.active ? "#fff" : "#8A8FA8",
                }}
              >
                {item.icon}
              </Box>

              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Bottom Section */}
      <Box>
        {/* Logout */}
      
      <Button type="submit" onClick={forceLogout}>
        <LogOut/>
      </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
