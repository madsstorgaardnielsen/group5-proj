import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

var token = localStorage.getItem("token");

function Row(props) {
  const { row } = props;
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{row.firstname}</TableCell>
        <TableCell>{row.lastname}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.city}</TableCell>
        <TableCell>{row.zip}</TableCell>
        <TableCell>{row.street}</TableCell>
        <TableCell>{row.phoneNumber}</TableCell>
        <TableCell>{ParseDate(row.birthdate.split("T")[0])}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function ParseDate(date){
  var arr = date.split("-");
  var parsedDate=arr[2]+"/"+arr[1]+"/"+arr[0]
  return parsedDate
}

export default function MedlemmerTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://130.225.170.74:80/api/User/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      // .then((response) => console.log(response.data))
      .then((response) => {
        console.log(response.data)
        setUsers(response.data)});
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Fornavn</TableCell>
            <TableCell>Efternavn</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>By</TableCell>
            <TableCell>Postnummer</TableCell>
            <TableCell>Gade</TableCell>
            <TableCell>Telefon</TableCell>
            <TableCell>Fødselsdag</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <Row key={user.id} row={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
