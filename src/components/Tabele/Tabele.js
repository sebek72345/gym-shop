import React from "react";
import { withStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
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
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableBody style={{ width: "80%" }}>
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
