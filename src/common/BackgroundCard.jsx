import React from "react";
import Paper from "./Paper";


const BackgroundCard = ({ sx = {}, ...props }) => {
  const _sx = {
    borderRadius: 1,
    backgroundColor: "background.paper",
    boxShadow: "0px 0px 6px #56699a14",
    px: {xs:2, sm:3.5},
    py: 3.5,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    ...sx
  };

  return (
    <Paper sx={_sx} {...props} />
  );
};

export default BackgroundCard;