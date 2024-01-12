
import React from "react";

import Typography from "@mui/material/Typography";

// 22 = subtitle1
// 20 = subtitle2
// 18 = body1
// 16 = body2 == default
// 14 = small
// 12 = caption1
// 10 = caption2
//h1,h2,h3,h4,h5,h6
const Text = (props) => {
  const { children, ...restProps } = props;

  return <Typography component={'div'} {...restProps}>{children}</Typography>;
};

export default React.memo(Text);