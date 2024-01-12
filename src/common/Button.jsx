/**
 *
 * Button
 *
 */

import React from "react";
import PropTypes from "prop-types";

import MButton from "@mui/lab/LoadingButton";

function Button(props) {
  const {
    children,
    title = "-",
    variant = "contained",
    size,
    color = "primary",
    loading = false,
    onClick = () => {
    },
    endIcon,
    startIcon,
    ...restProps
  } = props;

  const buttonStyle = {
    default: {},
    primary: {
      // color: "#fff",
      // borderRadius: "22px",
      // paddingHorizontal: "32px",
    },
  };

  return (
    <MButton
      variant={variant}
      size={size}
      onClick={onClick}
      color={color}
      loading={loading}
      
      // loadingPosition="start"
      endIcon={endIcon}
      startIcon={startIcon}
      style={buttonStyle[color] || buttonStyle["default"]}
      {...restProps}
    >
      {children || title}
    </MButton>
  );
}

Button.propTypes = {
  width: PropTypes.string,
  variant: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  startIcon: PropTypes.any,
  color: PropTypes.string,
  titleColor: PropTypes.string,
};

export default React.memo(Button);
