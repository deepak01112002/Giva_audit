import React from "react";
import MMenuItem from '@mui/material/MenuItem';

const MenuItem = (props) => {
    return (
        <MMenuItem {...props} />
    )
}

export default React.memo(MenuItem);