/**
 *
 * Checkbox
 *
 */

import React, { memo } from "react";

import { makeStyles, Checkbox as MCheckbox } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '40px',
    // width: '100%',
    // borderRadius: '100px',
  },
}));

const Checkbox = (props) => {
  const classes = useStyles();

  const { style, label, color, onChange, ...restProps } = props;

  const renderCheckbox = () => {
    return (
      <MCheckbox
        onClick={props.onClick}
        className={classes.root}
        style={{
          color: color || "rgba(0, 0, 0, 0.54)",
          marginLeft: "2px",
          padding: "5px",
          ...style,
        }}
        inputProps={{ "aria-label": "primary checkbox" }}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.checked, e.target.value);
          }
        }}
        {...restProps}
      ></MCheckbox>
    );
  };

  if (label) {
    return (
      <FormControlLabel
        style={{
          marginTop: "20px",
        }}
        control={renderCheckbox()}
        label={label}
      />
    );
  }

  return renderCheckbox();
};

Checkbox.propTypes = {};

export default memo(Checkbox);
