import { createTheme } from "@mui/material";

export const Theme =  createTheme({
  palette: {
    mode: "light",
    primary:    { main: "#1565C0" },
    secondary:  { main: "#00897B" },
    success:    { main: "#2E7D32" },
    error:      { main: "#C62828" },
    background: { default: "#F0F4F8", paper: "#FFFFFF" },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h5:        { fontWeight: 700 },
    subtitle2: { fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiAccordion: {
      defaultProps: { disableGutters: true, elevation: 0 },
      styleOverrides: {
        root: {
          border: "1px solid #E0E7EF",
          borderRadius: "10px !important",
          marginBottom: 12,
          "&:before": { display: "none" },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: { borderRadius: 10, padding: "4px 16px" },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined", size: "small", fullWidth: true },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { textTransform: "none", fontWeight: 600 } },
    },
    MuiChip: {
      styleOverrides: { root: { fontFamily: "monospace", fontWeight: 600 } },
    },
  },
});
