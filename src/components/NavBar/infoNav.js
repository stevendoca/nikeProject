import { Box } from "@mui/material";
import React from "react";

const NavInfo = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        flexDirection: "column",
        backgroundColor: "#F5F5F5",
        padding: 1,
      }}
    >
      <span style={{ fontSize: "0.8rem" }}>Member day</span>
      <span style={{ fontSize: "0.7rem" }}>Save 10% with selected items</span>
    </Box>
  );
};

export default NavInfo;
