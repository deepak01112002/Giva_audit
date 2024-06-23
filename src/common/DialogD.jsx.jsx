import * as React from "react";
import Box from "@mui/material/Box";
import Button from "./Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DialogD({ open, handleClose, message1 }) {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{
            boxSizing: "border-box",
            justifyContent: "center",
            alignItems: "center",
            width: "256px",
            background: "#FBF9F9",
            borderRadius: "8px",
          }}
        >
          <DialogContent>
          

            <DialogContentText>
              <Typography
                sx={{
                  fontFamily: "inherit",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "16px",
                  textAlign: "center",
                  letterSpacing: "-0.01em",
                  color: "#111111",
                  flex: "none",
                  order: "0",
                  flexGrow: "0",
                  marginTop: "20px",
                }}
              >
                {message1}
               
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                justifyContent: "center",
                alignItems: "center",
                width: "187px",
                marginRight: "25px",
                marginBottom: "20px",
                background: "#004AAD",
                borderRadius: "5px",
                flex: "none",
                order: "0",
                flexGrow: "0",
              }}
              onClick={() => {
                handleClose();
              }}
            >
              Ok
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
