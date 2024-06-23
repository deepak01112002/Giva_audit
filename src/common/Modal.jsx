import React, { memo } from "react";
import { Modal as MModal } from "@mui/material";
import { makeStyles } from "@mui/styles";

import CloseIcon from "@mui/icons-material/Close";

import Text from "./Text";
import Box from "./Box";
import IconButton from "./IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    width: 400,
    maxWidth: "95%",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #333",
    boxShadow: theme.shadows[5],
    borderRadius: "8px",
    overflow: "hidden",
  },
  header: {
    padding: theme.spacing(1, 2, 1),
    position: "relative",
  },
  close: {
    position: "absolute",
    right: 2,
    top: 2
  },
  body: {
    background: "#fff",
    padding: theme.spacing(2),
    maxHeight: "75vh",
    overflow: "auto",
  },
}));

const Modal = (props) => {
  const classes = useStyles();

  const {
    children,
    open,
    size = "xs",
    title = "",
    onClose,
    disableClose,
    disableCroseButton = false,
    disableEscapeKeyDown,
    sx = {},
  } = props;

  const sizes = {
    xs: 400,
    sm: 600,
    md: 800,
    lg: 1000,
    xl: 1200,
  };

  return (
    <>
      <MModal
        open={open}
        onClose={() => onClose()}
        aria-labelledby="lira-modal-title"
        aria-describedby="lira-modal-description"
        disableEscapeKeyDown={disableEscapeKeyDown}
        onBackdropClick="false"
      >
        <Box
          className={classes.root}
          style={{ width: sizes[size] }}
          sx={{ ...sx }}
        >
          {title || !disableClose ? (
            <div className={classes.header}>
              {(
                <Text
                  variant={"h5"}
                  component={"h3"}
                  align="center"
                  sx={{ fontSize: { xs: "22px", sm: "24px", md: "27px" }, minHeight: "30px" }}
                >
                  {title ? title : ""}
                </Text>
              )}
              {!disableClose ? (
                <IconButton sx={{ position: "absolute", top: "10px" }} className={classes.close} onClick={onClose} disabled={disableCroseButton}>
                  <CloseIcon />
                </IconButton>
              ) : null}
            </div>
          ) : null}

          <div className={classes.body}>{children}</div>
        </Box>
      </MModal>
    </>
  );
};

export default memo(Modal);
