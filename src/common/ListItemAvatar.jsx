import React from "react";
import MListItemAvatar from "@mui/material/ListItemAvatar";

const ListItemAvatar = (props) => {
    return (
        <MListItemAvatar {...props} />
    )
}

export default React.memo(ListItemAvatar);