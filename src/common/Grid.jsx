import React from "react";
import MGrid from '@mui/material/Grid';

const Grid = ({ children, ...restProps }) => {

  return (
    <MGrid {...restProps}>
      {children}
    </MGrid>
  )
}


export default Grid;