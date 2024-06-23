import React from "react";
import Stack from "@mui/material/Stack";

const WelcomeImage = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100vh",
        width: "auto",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        
      }}
    >
      <img
        src="/logo.png"
        alt="logo"
        width={300}
        height={150}
      
      />
    
    </Stack>
  );
};

export default WelcomeImage;
