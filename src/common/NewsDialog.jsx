import React, { memo } from "react";
import { Dialog as MDialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import Button from "./Button";
import IconButton from "./IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Dialog = (props) => {
    const [open, setOpen] = React.useState(false);
    const { date, openComponent, actionComponent, contentComponent, disableEnforceFocus = true, title, onOpen, onClose, children, ...restProps } = props;

    const handleClickOpen = (e) => {
        e.preventDefault();
        setOpen(true);
        onOpen();
    };

    const handleClose = () => {
        setOpen(false);
        onClose()
    };

    return (<>
        {openComponent(handleClickOpen)}
        {open ? <MDialog
            open={open}
            onClose={handleClose}
            disableEnforceFocus={disableEnforceFocus}
            fullWidth
            maxWidth="md"
            aria-labelledby="draggable-dialog-title"
            {...restProps}
        >
            <DialogTitle style={{ cursor: 'move', padding: "20px 40px", paddingBottom: "4px" }} id="draggable-dialog-title">
                <IconButton iconName="Close" style={{position: "absolute",top: "2px",right: "2px"}} onClick={handleClose} >
                    <CloseIcon />
                </IconButton>
                <div style={{   borderBottom: "1px solid gray", paddingBottom: "12px", width: "100%", }}>
                    <p style={{fontWeight:"600", fontSize: "20px", textAlign: "left", marginBottom: "-8px"}}>{title}</p>
                    <span style={{fontWeight:"100", fontSize: "14px", textAlign: "left", marginBottom: "-8px"}}>{new Date(date).toDateString()}</span>
                </div>
                
            </DialogTitle>

            <DialogContent sx={{ textAlign: "justify", padding: "0px 40px", textIndent: "50px", lineHeight: "1.6" }}>
                {contentComponent ? contentComponent(handleClose) : children}
            </DialogContent>
            <DialogActions>
                {actionComponent(handleClose)}
            </DialogActions>
        </MDialog> : null}
    </>)
};

Dialog.defaultProps = {
    onClose: () => null,
    onOpen: () => null,
    actionComponent: () => null,
    openComponent: (o) => (<Button onClick={o}>Test Dialog</Button>),
    closeIcon: true,
};

export default memo(Dialog);