import TextField from "@mui/material/TextField";
import React from "react";

const Input = (props) => {
  const {
    name,
    id,
    label,
    value,
    placeHolder,
    variant = "outlined",
    onChange,
    size = "small",
    ...other
  } = props;
  return (
    <TextField
      variant={variant}
      label={label}
      name={name}
      id={id}
      value={value}
      size={size}
      onChange={onChange}
      {...other}
    />
  );
};

export default Input;
