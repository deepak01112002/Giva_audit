import React, { memo, useState } from 'react';
import {
  Table as MTable,
  TableContainer,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TablePagination,
} from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import TextField from './TextField';
import { styled } from '@mui/material/styles';
import Box from './Box';
import TableLoadingSkeleton from './TableLoadingSkeleton';

const StyledTableCell = withStyles({
  root: {
    borderBottom: 'none !important',
    padding: '0px 0px !important',
  },
})(TableCell);

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: "#EAECF0",
    backgroundColor: theme.palette.action.hover,
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {},
  headRow: {
    background: '#EDF7FF',
    borderRadius: '50%',
  },
  headTableCell: {
    color: '#475467',
    // fontFamily: "sans-serif",
    // fontFamily: theme.typography.fontFamily,

    fontSize: '16px',
    fontWeight: '600',
    padding: '20px',
    border: '1px solid #EAECF0',
    whiteSpace: 'nowrap',
    textAlign: 'start',
    background: '#FFFFFF',
  },
  bodyTableCell: {
    color: '#1D2939',
    // fontFamily: "sans-serif",
    // fontFamily: theme.typography.fontFamily,

    fontSize: '16px',
    textAlign: 'start',
    marginLeft: '-10px',
  },
}));

const CTable = (props) => {
  let {
    columns = [],
    data = { 0: [] },
    count = 0,
    pagination = true,
    localPagination = true,
    page: pageProps = 0,
    rowsPerPage: rowsPerPageProps = 10,
    onPageChange = () => null,
    sx = {},
  } = props;

  const classes = useStyles();
  const [page, setPage] = useState(pageProps);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageProps);

  let rows = data[page] || [];
  if (data.constructor === Array) {
    rows = data;

    count = count || data.length || 0;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onPageChange(newPage + 1, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    onPageChange(1, parseInt(event.target.value));
  };

  if (localPagination) {
    rows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }

  const renderRow = (col, row, colIndex, rowIndex) => {
    let value = '';
    if (col.field && (row[col.field] || row[col.field] === 0)) {
      value = row[col.field];
    }
    if (col.valueGetter && !col.enableEdit) {
      value = col.valueGetter(value, row);
    }

    return (
      <TableCell
        key={`index${rowIndex}${colIndex} ` + Math.random()}
        sx={{
          verticalAlign: 'initial',
          border: '1px solid #EAECF0',
          paddingLeft: '1.875rem',
          // textAlign:"center"
        }}
      >
        {col.enableEdit && col.onChange ? (
          <div style={col.style}>
            <TextField
              defaultValue={value}
              onChange={(e) => col.onChange(e.target.value, rowIndex)}
            />
          </div>
        ) : (
          <div className={classes.bodyTableCell} style={col.style}>
            {value || '-'}
          </div>
        )}
      </TableCell>
    );
  };

  return (
    <>
      <TableContainer sx={sx}>
        <MTable>
          <TableHead>
            <TableRow>
              {columns.length
                ? columns.map((col) => (
                    <StyledTableCell key={col.field}>
                      <div className={classes.headTableCell}>
                        {col.headerName}
                      </div>
                    </StyledTableCell>
                  ))
                : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.isLoading ? (
              <TableLoadingSkeleton rows={props.columns} />
            ) : (
              <>
                {rows.length
                  ? rows.map((row, rowIndex) => (
                      <StyledTableRow key={rowIndex + Math.random()}>
                        {columns.length
                          ? columns.map((col, colIndex) =>
                              renderRow(col, row, colIndex, rowIndex)
                            )
                          : null}
                      </StyledTableRow>
                    ))
                  : null}
              </>
            )}
          </TableBody>
        </MTable>
      </TableContainer>
      {data.length === 0 && !props.isLoading ? (
        <Box sx={{ textAlign: 'center' }}>
          <p>Data Not Found </p>
        </Box>
      ) : (
        ''
      )}

      {pagination ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : null}
    </>
  );
};

export default memo(CTable);
