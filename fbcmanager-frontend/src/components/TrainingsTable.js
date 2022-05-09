import React from "react";
import { useEffect } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Table inspired by MUI. https://mui.com/components/tables/
var token = localStorage.getItem("token");

function Row(props) {

    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                <TableCell component="th" scope="row">{row.date}</TableCell>
                <TableCell >{row.field["fieldName"]}</TableCell>
                <TableCell >{row.team["teamName"]}</TableCell>
                <TableCell ><Button value="Tilmeld" onClick={() => { 
                    axios.post("http://130.225.170.74:80/api/Practise/join", {"id":row.id}, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response)=>console.log(response.data)) ;
                    alert('Tilmeldt');

                }}> Tilmeld</Button></TableCell>
                                <TableCell ><Button value="Tilmeld" onClick={() => { 
                    axios.post("http://130.225.170.74:80/api/Practise/leave", {"id":row.id}, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response)=>console.log(response.data)) ;
                    alert('Ameldt');

                }}> Afmeld </Button></TableCell>
            </TableRow>

        </React.Fragment>
    );
}

/*
Row.propTypes = {
    row: PropTypes.shape({
        fieldName: PropTypes.string.isRequired,
        teamName: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
    }).isRequired,
};
*/

export default function CollapsibleTable() {

    const [training, setTraining] = React.useState([]);

    useEffect(() => {
      axios.get("http://130.225.170.74:80/api/Practise",{
        headers: { Authorization: `Bearer ${token}` },
      }).then((response)=>setTraining(response.data)) //Setter data i training variable
    }, [])


    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell >Field</TableCell>
                        <TableCell >Team</TableCell>
                        <TableCell>Tilmeld</TableCell>
                        <TableCell>Afmeld</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {training.map((row) => (
                        <Row key={row.id} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

