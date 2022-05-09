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

const btnPress = async (row, bool) => {
  if (bool) {
    axios
      .post(
        "http://130.225.170.74:80/api/Team/join",
        { id: row.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("Tilmeldt");
      });
  } else {
    axios
      .post(
        "http://130.225.170.74:80/api/Team/leave",
        { id: row.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("Tilmeldt");
      });
  }
};

function Row(props) {
  const { row } = props;
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{row.teamName}</TableCell>
        <TableCell>
          <Button
            value="Tilmeld"
            onClick={() => {
              btnPress(row, true);
            }}>
            Tilmeld
          </Button>
        </TableCell>
        <TableCell>
          <Button
            value="Afmeld"
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

export default function CollapsibleTable() {
  const [teams, setTeams] = React.useState([]);

  useEffect(() => {
    axios
      .get("http://130.225.170.74:80/api/Team", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setTeams(response.data));
  }, [setTeams]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Holdnavn</TableCell>
            <TableCell>Tilmeld</TableCell>
            <TableCell>Afmeld</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
