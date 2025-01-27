import React from "react";
import MBadge from '@mui/material/Badge';

const Badge = (props) => {
    return (
        <MBadge {...props} />
    )
}

export default React.memo(Badge);