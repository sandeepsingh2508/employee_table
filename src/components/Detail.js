import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Detail() {
  const { state } = useLocation();
  const { link } = state;
  const [data, setData] = useState({});
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(link);
      setData(response.data[0]);
    };
    getData();
  });
  const rows = [
    { name: "First Name", value: data.first_name },
    { name: "Last Name", value: data.last_name },
    { name: "Date Of Birth", value: data.date_of_birth },
    { name: "Address", value: data.address },
    { name: "Date of Joining", value: data.date_of_joining },
    { name: "Salary", value: data.salary },
    { name: "Designation", value: data.designation },
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.value}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
