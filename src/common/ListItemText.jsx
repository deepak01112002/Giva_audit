import React from "react";
import MListItemText from '@mui/material/ListItemText';

const ListItemText = (props) => {
    return (
        <MListItemText {...props} />
    )
}

export default React.memo(ListItemText);