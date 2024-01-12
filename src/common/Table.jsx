import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSkeleton from "./TableSkeleton";

const TableCommon = (props) => {
  const { columns, tableData, loading } = props;
  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table sx={{ minWidth: 650 }} stickyHeader>
        <TableHead>
          <TableRow sx={{ th: { border: 0 }, backgroundColor: "#F8F8F8" }}>
            {columns.map((column, index) => (
              <TableCell
                align="center"
                sx={{ p: 1.4, fontSize: "14px", fontWeight: "500" }}
                key={index}
              >
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? <TableSkeleton rows={columns} /> : tableData}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCommon;
