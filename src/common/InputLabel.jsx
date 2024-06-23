import React from "react"
import { InputLabel as MInputLabel } from "@mui/material"

const InputLabel = (props) => {
    return (
        <>
            <MInputLabel {...props}/>
        </>
    )
}

export default React.memo(InputLabel);