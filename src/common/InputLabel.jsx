import React from "react"
import { InputLabel as mInputLabel } from "@mui/material"

const InputLabel = (props) => {
    return (
        <>
            <mInputLabel {...props}/>
        </>
    )
}

export default React.memo(InputLabel);