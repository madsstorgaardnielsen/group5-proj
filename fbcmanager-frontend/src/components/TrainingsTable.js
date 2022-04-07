import React from "react";
import { useEffect } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
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



function trainingstable(date, timeStart, timeEnd, location, team) {

    return {
        date,
        timeStart,
        timeEnd,
        location,
        team,

    };
}



function Row(props) {

    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.date}</TableCell>
                <TableCell >{row.timeStart}</TableCell>
                <TableCell >{row.timeEnd}</TableCell>
                <TableCell >{row.location}</TableCell>
                <TableCell >{row.team}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Description:
                                <text> In today training session we are going to the forrest. Bring your inner nature-spirit and a bottle of water. </text>
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        timeStart: PropTypes.string.isRequired,
        timeEnd: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
    }).isRequired,
};

//const rows = [
    //trainingstable('15-03-2022', '10:00', '11:00', 'Holte Station', 'U14'), //One traing in a line
    //trainingstable('15-03-2022', '10:00', '14:00', 'Anker Engelunds Vej nr. 1', 'U23'), //Date, timeS, timeE, Location, Team
    //trainingstable('17-03-2022', '22:00', '00:00', 'Lyngby svømmehal', 'U40')

    //training.map((t)=>trainingstable(t.team))


//];

export default function CollapsibleTable() {

    const [training, setTraining] = React.useState([]);

    useEffect(() => {
        var object = {
            "date": "2022-04-01",
            "team": "U13",
            "location": "Holte station",
            "timeStart": "10:00:00",
            "timeEnd": "12:00:00"
            }
        var object2 = {
            "date": "2022-06-03",
            "team": "U19",
            "location": "Anker Engelunds Vej 1",
            "timeStart": "10:00:00",
            "timeEnd": "14:30:00"
            }
        var object3 = {
            "date": "2022-11-23",
            "team": "U15",
            "location": "Lyngby Svømmehal",
            "timeStart": "22:00:00",
            "timeEnd": "00:00:00"
            }
      axios.post("http://localhost:8080/training", object).then((response)=>console.log(response.data)) //respone contains the data from post
      axios.post("http://localhost:8080/training", object2).then((response)=>console.log(response.data)) //respone contains the data from post
      axios.post("http://localhost:8080/training", object3).then((response)=>console.log(response.data)) //respone contains the data from post
      axios.get("http://localhost:8080/training").then((response)=>setTraining(response.data)) //Setter data i training variable
    }, [])


    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Date</TableCell>
                        <TableCell >Time Start</TableCell>
                        <TableCell >Time End&nbsp; </TableCell>
                        <TableCell >Location&nbsp; </TableCell>
                        <TableCell >Team&nbsp; </TableCell>
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

