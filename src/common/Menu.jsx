import React from "react";
import MMenu from '@mui/material/Menu';

const Menu = (props) => {
    return (
        <MMenu {...props} />
    )
}

export default React.memo(Menu);