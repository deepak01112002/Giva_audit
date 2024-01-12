import React from "react";
import MLinearProgress from "@mui/material/LinearProgress";
import { makeStyles, createStyles } from "@mui/styles";

const LinearProgress = ({ value, sx }) => {
    const classes = useStyles();
    return <MLinearProgress variant="determinate" classes={classes} value={value} sx={sx} />
}

const useStyles = makeStyles((theme) => createStyles({
    root: {
        height: 14,
        borderRadius: 20,
        backgroundColor: theme.palette.grey[200],
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#1D9BFF',
    }
}))

export default LinearProgress;