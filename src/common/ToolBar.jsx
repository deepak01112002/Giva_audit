import React from "react";
import MToolBar from '@mui/material/Toolbar';

const ToolBar = (props) => {
    return (
        <MToolBar {...props} />
    )
}

export default React.memo(ToolBar);