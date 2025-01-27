import React from "react";

import { Snackbar as MSnackbar, Slide } from "@mui/material";

const Snackbar = ({ open, message, onClose, autoHideDuration, children }) => {
    const [verticalAlign, setVertical] = React.useState("bottom");
    const [direction, setDirection] = React.useState("up");


    React.useEffect(() => {
        setToastConfig();
    }, []);
    
    const setToastConfig = () =>{
        if (window.innerWidth < 600) {
            setVertical("top");
            setDirection("up");
        }else if (window.innerWidth > 900){
            setVertical("top");
            setDirection("down");
        }

    }

    return (
        <MSnackbar
            open={open}
            onClose={onClose}
            message={message}
            autoHideDuration={autoHideDuration}
            children={children}
            TransitionComponent={(props) => (
                <Slide {...props} direction={direction} />
            )}
            severity="info"
            anchorOrigin={{ vertical: verticalAlign, horizontal: "center" }}
            sx={{ top: { xs: "60px", sm: 48 }, display: open ? "flex" : "none" }}
        />
    );
};

export default Snackbar;
