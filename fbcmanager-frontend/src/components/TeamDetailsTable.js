import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate } from "react-router-dom";

var token = localStorage.getItem("token");

function Row(props) {
  const { row } = props;
  return (
    <React.Fragment>
      <TableRow  sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{row.firstname}</TableCell>
        <TableCell>{row.lastname}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function TeamDetailsTable() {
  const [teammembers, setTeammembers] = useState([]);
  const [teamname, setTeamname] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://130.225.170.74:80/api/Team/" + location.state.id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      // .then((response) => console.log(response.data))
      .then((response) => {
        console.log(response.data);
        setTeammembers(response.data.teamMembers);
        setTeamname(response.data.teamName)
      });
  }, [setTeammembers,setTeamname]);

  return (
    <div>
      <div><h1>{teamname}</h1></div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Fornavn</TableCell>
              <TableCell>Efternavn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teammembers.map((members) => (
              <Row key={members.id} row={members} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
