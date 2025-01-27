import { Grid, Typography } from "@mui/material";
import React from "react";
import Box from "../common/Box";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import DownloadIcon from "@mui/icons-material/Download";

export default function Attachments({ name, src }) {
  // console.log("src", src)
  if (src === "https://product.infield.co.in:8092/api/docs/getmyfile/") {
    return null;
  }
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          marginTop: "30px",
          marginBottom: "15px",
          justifyContent: "left",
          width: "100%",
          borderBottom: "1px solid grey",
          paddingBottom: "5px",
          // background: 'red',
          justifySelf: "left",
        }}
      >
        <ImageIcon />
        <Typography> {name}</Typography>
      </Box>
      <Grid item lg={12} sx={{}}>
        <img
          src={src}
          alt=""
          style={{ width: "500px", height: "700px", objectFit: "cover" }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Button
            target="_blank"
            component={Link}
            to={src}
            sx={{
              background: "white",
              color: "black",
              margin: "30px 0px 10px 0px",
              "&:hover": {
                background: "white",
              },
            }}
          >
            <DownloadIcon />
            Download file
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}
