import React, { memo, useEffect } from "react";
import {
  Dialog as MDialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import { makeStyles, createStyles } from "@mui/styles";

import IconButton from "./IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Box from "./Box";

const Dialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const {
    openComponent,
    actionComponent,
    contentComponent,
    title,
    icon = {},
    onOpen,
    onClose,
    children,
    disableCloseIcon,
    maxWidth="sm",
  } = props;

  useEffect(() => {
    setOpen(props.open === true);
  }, [props.open]);

  const onClickOpenInside = (e) => {
    e.preventDefault();
    setOpen(true);
    onOpen();
  };

  const onCloseInside = (e) => {
    setOpen(false);
    onClose();
  };

  const getIcon = () => {
    if (!icon.src) {
      return null;
    }

    return (
      <div
        style={{
          display: "flex",
          margin: "20px 20px",
          justifyContent: "center",
        }}
      >
        <img
          alt="na"
          src={icon.src}
          style={{ width: "130px", height: "130px", ...icon }}
        />
      </div>
    );
  };


  const classes = useStyles();

  return (
    <>
      {openComponent ? openComponent(onClickOpenInside) : null}
      <MDialog
        onBackdropClick="false"
        disableEscapeKeyDown
        open={open}
        onClose={onCloseInside}
        fullWidth
        maxWidth={maxWidth}
        aria-labelledby="draggable-dialog-title"
        sx={{ borderRadius: "10px" }}
        classes={classes}
      >
        <DialogTitle style={{ cursor: "move" }} sx={{p:{xs:"20px 16px" , sm: "20px 24px"}}} id="draggable-dialog-title">
          {getIcon()}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{mt:{xs: 3, md: 0}, fontSize: {xs: "18px", md: "21px"}, width: "100%" }}>{title}</Box>
            {!disableCloseIcon && (
              <IconButton
                aria-label="close"
                onClick={onCloseInside}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[400],
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </div>
        </DialogTitle>

        <DialogContent sx={{p:{xs:"20px 16px" , sm: "20px 24px"}}}>
          {contentComponent ? contentComponent(onCloseInside) : children}
        </DialogContent>
        <DialogActions>{actionComponent(onCloseInside)}</DialogActions>
      </MDialog>
    </>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
      root: {
          padding: "0px",
      },
      paper: {
        margin: 15,
        width: "100%",
      }
  })
);

Dialog.defaultProps = {
  onClose: () => null,
  onOpen: () => null,
  actionComponent: () => null,
  openComponent: null,
  closeIcon: true,
};

export default memo(Dialog);
