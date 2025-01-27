import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Skeleton from "@mui/material/Skeleton";

const TableSkeleton = (props) => {
  const { rows } = props;
  const columns = Array(4).fill("");

  const RenderSkeletonTable = columns.map((column, index) => {
    return (
      <TableRow
        key={index + column}
        sx={{ "td, th": { border: 0, padding: "10px" } }}
      >
        {rows.map((row, i) => {
          return (
            <TableCell key={index + i + column} align="center">
              <Skeleton animation="wave" height={40} />
            </TableCell>
          );
        })}
      </TableRow>
    );
  });

  return <>{RenderSkeletonTable}</>;
};

export default TableSkeleton;
