import React from "react";
import { useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// Table inspired by MUI. https://mui.com/components/tables/
var token = localStorage.getItem("token");

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{row.teamName}</TableCell>
        <TableCell>
          <Button
            value="Tilmeld"
            onClick={() => {
              axios
                .post(
                  "http://130.225.170.74:80/api/Team/join",
                  { id: row.id },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                )
                .then((response) => console.log(response.data));
                console.log(row.id);
              alert("Tilmeldt");
            }}
          >
            {" "}
            Tilmeld
          </Button>
        </TableCell>
        <TableCell>
          <Button
            value="Afmeld"
            onClick={() => {
              axios
                .post(
                  "http://130.225.170.74:80/api/Team/leave",
                  { id: row.id },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                )
                .then((response) => console.log(response.data));
              alert("Ameldt");
            }}
          >
            {" "}
            Afmeld{" "}
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
  }, []);

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
