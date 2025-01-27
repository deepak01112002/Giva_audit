import React from "react";
import MListSubheader from '@mui/material/ListSubheader';

const ListSubheader = (props) => {
    return (
        <MListSubheader {...props} />
    )
}

export default React.memo(ListSubheader);