import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Button,
  Avatar,
} from "@mui/material";

import { Home, Users, Settings, LogOut } from "lucide-react";
import { forceLogout } from "../../service/helper/global.helper";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path?: string; // optional — items like Settings may not have one yet
}

const Sidebar = () => {
  const navigate = useNavigate();

  const userCookie = Cookies.get("user");
  const admin = userCookie ? (JSON.parse(userCookie) as { name: string; role: string }) : null;

  const menuItems: MenuItem[] = [
    { text: "Home", icon: <Home size={20} />, path: "/admin/dashboard" },
    { text: "User", icon: <Users size={20} />, path: "/admin/user" },
    { text: "Settings", icon: <Settings size={20} /> }, // no path yet
  ];

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 5 }}>
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
            <Typography sx={{ fontWeight: 800, color: "#005B55", fontSize: "1.4rem" }}>
              ADMIN
            </Typography>
            <Typography sx={{ fontSize: "0.7rem", color: "#6B7280", letterSpacing: 1 }}>
              DASHBOARD
            </Typography>
          </Box>
        </Box>

        {/* Menu */}
        <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              // ✅ Only navigate when a path is defined
              onClick={() => item.path && navigate(item.path)}
              sx={{
                borderRadius: 3,
                py: 1.2,
                px: 2,
                color: "#8A8FA8",
                "&:hover": { bgcolor: "#EEF2F7" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                {item.icon}
              </Box>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Bottom Section */}
      <Box>
        {/* Admin Info */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            p: 1.5,
            borderRadius: 3,
            bgcolor: "#EEF2F7",
            mb: 2,
          }}
        >
          <Avatar sx={{ bgcolor: "#00695C" }}>
            {admin?.name?.charAt(0) ?? "A"}
          </Avatar>

          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
              {admin?.name ?? "Admin"}
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "#6B7280" }}>
              {admin?.role ?? "Administrator"}
            </Typography>
          </Box>
        </Box>

        {/* Logout Button */}
        <Button
          onClick={forceLogout}
          fullWidth
          startIcon={<LogOut size={18} />}
          sx={{
            justifyContent: "flex-start",
            textTransform: "none",
            borderRadius: 3,
            px: 2,
            py: 1.2,
            color: "#EF4444",
            fontWeight: 600,
            "&:hover": { bgcolor: "#FEE2E2" },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;