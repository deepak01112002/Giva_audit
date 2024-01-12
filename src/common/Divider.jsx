import React from "react";
import MDivider from '@mui/material/Divider';

const Divider = (props) => {
    return (
        <MDivider {...props} />
    )
}

export default React.memo(Divider);