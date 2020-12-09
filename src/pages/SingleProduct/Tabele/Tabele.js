import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#fafafa",
    },
  },
}))(TableRow);

export default function CustomizedTables({ spec }) {
  return (
    <TableContainer component={Paper} style={{ width: "500px" }}>
      <Table aria-label="customized table">
        <TableBody>
          {spec.map((item) => (
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                {item[0]}
              </StyledTableCell>
              <StyledTableCell align="left">{item[1]}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
