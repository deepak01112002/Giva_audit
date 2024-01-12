import React, { Component } from "react";
import MChip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

function Chip(props) {
  const {
    icon,
    label,
    size = "large",
    color,
    variant = "outlined",
    imgUrl,
    classes,
    clickable = true,
    disabled = false,
    sx = {},
    onSelectChip,
    disabledAvatar = false,
  } = props;
  return (
    <MChip
      sx={{ ...sx }}
      className={classes}
      variant={variant}
      color={color}
      label={label}
      disabled={disabled}
      size={size}
      clickable={clickable}
      avatar={ disabledAvatar ? null : <Avatar variant="square" src={imgUrl}></Avatar>}
      onClick={() => onSelectChip(label)}
    ></MChip>
  );
}

export default Chip;
