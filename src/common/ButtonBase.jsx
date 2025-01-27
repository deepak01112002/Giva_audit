import React from "react";
import MButton from "@mui/lab/LoadingButton";

const ButtonBase = ({ sx = {}, size = "medium", loading = false, ...props }) => {
    const sizes = {
        small: {
            py: 1.125,
            px: 2.75,
            fontSize: '0.8125rem !important',
            "& > span": {
                fontSize: '0.8125rem !important',
            },
            "& > span > svg": {
                fontSize: '0.875rem !important',
            },
        },
        medium: {
            py: 1.5,
            px: 4,
        }
    }

    const _sx = {
        textTransform: "none",
        lineHeight: 1.4,
        transition: "all 0.35s linear",
        ...sizes[size], ...sx
    }
    return <MButton sx={{ ..._sx, borderRadius: "5px" }} loading={loading} {...props} />
}

export default React.memo(ButtonBase);