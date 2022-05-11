import React from "react";
import { useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Table inspired by MUI. https://mui.com/components/tables/
var token = localStorage.getItem("token");

function ParseDate(date) {
  var arr = date.split("-");
  var parsedDate = arr[2] + "/" + arr[1] + "/" + arr[0];
  return parsedDate;
}

const btnPress = async (row, bool) => {
  if (bool) {
    axios
      .post(
        "http://130.225.170.74:80/api/Practise/join",
        { id: row.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        //window.location.reload(false);
        alert("Tilmeldt");
      });
  } else {
    axios
      .post(
        "http://130.225.170.74:80/api/Practise/leave",
        { id: row.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        //window.location.reload(false);
        alert("Afmeldt");
      });
  }
};

function Row(props) {
  const { row } = props;
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {ParseDate(row.date.split("T")[0])}
        </TableCell>
        <TableCell>{row.field["fieldName"]}</TableCell>
        <TableCell>{row.team["teamName"]}</TableCell>
        <TableCell>
          <Button
            value="Tilmeld"
            onClick={() => {
              btnPress(row, false);
            }}>
            Afmeld
          </Button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTableUser() {
  const [training, setTraining] = React.useState([]);

  useEffect(() => {
    axios
      .get("http://130.225.170.74:80/api/Practise/joined", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setTraining(response.data)); //Setter data i training variable
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Field</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Afmeld</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {training.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
