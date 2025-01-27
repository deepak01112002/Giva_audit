import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

export default function MDatePicker(props) {
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      
        {...props}
        sx={{ ...props.sx, marginTop: "10px", width: "100%" }}
        format="DD-MM-YYYY"
      />
    </LocalizationProvider>
     
    </>
  );
}
  