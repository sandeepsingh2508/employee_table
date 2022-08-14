import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "id", label: "Id", minWidth: 50 },
  { id: "first_name", label: "First Name", minWidth: 100 },
  { id: "last_name", label: "Last Name", minWidth: 100 },
  {
    id: "date_of_birth",
    label: "Date of Birth",
    minWidth: 100,
    align: "right",
  },
  {
    id: "address",
    label: "Address",
    minWidth: 100,
    align: "right",
  },
  {
    id: "date_of_joining",
    label: "Date of Joining",
    minWidth: 100,
    align: "right",
  },
  {
    id: "salary",
    label: "Salary",
    minWidth: 80,
    align: "right",
  },
  {
    id: "designation",
    label: "Designation",
    minWidth: 100,
    align: "right",
  },
];

export default function List() {
  const [rows, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees`
      );
      setData(response.data);
    };
    getData();
  }, []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClick = (e) => {
    navigate("/employeeDetail", { state: { link: e } });
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.first_name}
                    onClick={() => handleClick(row["details"])}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
