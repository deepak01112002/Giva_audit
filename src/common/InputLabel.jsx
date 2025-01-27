import React from "react"
import { InputLabel as MInputLabel } from "@mui/material"

const InputLabel = (props) => {
    return (
        <>
            <MInputLabel
             {...props}
             sx={{
                textOverflow:"none !important",
                whiteSpace:"unset !important"
             }}
             />
        </>
    )
}

export default React.memo(InputLabel);