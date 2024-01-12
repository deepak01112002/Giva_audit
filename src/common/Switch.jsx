import React from "react";
import MSwitch from '@mui/material/Switch';

const Switch = (props) => {
    return (
        <MSwitch {...props} />
    )
}

export default React.memo(Switch);