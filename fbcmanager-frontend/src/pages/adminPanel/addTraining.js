import React from "react";
import Navbar from "../../components/Navbar";
import "../../scss/style.scss"
import {Helmet} from 'react-helmet';
import ProfileColumn from "../../components/ProfileColumn";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../../scss/adminPanel.scss";
import {useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

{/* You need to run these command:
npm install @mui/x-date-pickers
npm i date-fns
*/}

function AdminPanel () {
    const navigate = useNavigate()
    const navBack = () => {
        navigate('/adminPanel')
    }

    //Handle changes to the input fields
    const [Team, setTeam] = React.useState('');
    const handleChangeEvent = (event) => {
        setTeam(event.target.value);
    };
    const [Field, setField] = React.useState('');
    const handleChangeField = (event) => {
        setField(event.target.value);
    };
    const [StartDate, setStartDate] = React.useState(new Date());
    const handleChangeStartDate = (newValue) => {
        setStartDate(newValue);
    };
    const [EndDate, setEndDate] = React.useState(new Date());
    const handleChangeEndDate = (newValue) => {
        setEndDate(newValue);
    };
    const [Description, setTextInput] = React.useState('');
    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };

    //When submit button is pressed, create object and add to DB
    function addToDB(e, startDate, endDate, location, team, description) {
        e.preventDefault();
        let startTime = startDate.getHours() + ':' + startDate.getMinutes() + ':' + "00";
        let endTime = endDate.getHours() + ':' + endDate.getMinutes() + ':' + "00";

        const object = {
            "date": startDate,
            "team": team,
            "location": location,
            "timeStart": startTime,
            "timeEnd": endTime,
            "max_participants": 21
        };
        axios.post("http://localhost:7285/api/Practise", object).then((response) => console.log(response.data));
    }
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const [submitPressed,setSubmitPressed]=React.useState(false)
    const [waiting,setWaiting]=React.useState(false)


    return (
        <div>
            <Helmet>
                <title>AdminPanel | NemSport</title>
            </Helmet>
            <Navbar/>
            <div className="body">
                <div className="main-grid-container">
                    <div className="adminPanel-content">
                        <h1>Opret ny Træning</h1>
                        <Box
                            className="addBox"
                            sx={{
                                maxWidth: 600
                            }}
                        >
                            <Stack spacing={3}>
                                <h6>Udfyld følgende</h6>

                                {/* Hold */}
                                <FormControl className="itemSelect" variant="filled" sx={{m: 1, width: 150}}>
                                    <InputLabel>Hold</InputLabel>
                                    <Select
                                        id="Team"
                                        value={Team}
                                        label="Team"
                                        onChange={handleChangeEvent}
                                        style={{
                                            backgroundColor: "white"
                                        }}
                                    >
                                        <MenuItem value={"U12"}>U12</MenuItem>
                                        <MenuItem value={"U13"}>U13</MenuItem>
                                        <MenuItem value={"U14"}>U14</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Bane */}
                                <FormControl className="itemSelect" variant="filled" sx={{m: 1, width: 150}}>
                                    <InputLabel>Bane</InputLabel>
                                    <Select
                                        id="Field"
                                        value={Field}
                                        label="Field"
                                        onChange={handleChangeField}
                                        style={{
                                            backgroundColor: "white"
                                        }}
                                    >
                                        <MenuItem value={"A"}>A</MenuItem>
                                        <MenuItem value={"B"}>B</MenuItem>
                                        <MenuItem value={"C2"}>C2</MenuItem>
                                        <MenuItem value={"Klubhuset"}>Klubhuset</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Tid */}
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="Dato"
                                        inputFormat="dd/MM/yyyy"
                                        value={StartDate}
                                        onChange={handleChangeStartDate}
                                        renderInput={(params) => <TextField {...params}
                                                                            style={{backgroundColor: "white"}}/>}
                                    />
                                    <TimePicker
                                        label="Starttidspunkt"
                                        value={StartDate}
                                        onChange={handleChangeStartDate}
                                        renderInput={(params) => <TextField {...params}
                                                                            style={{backgroundColor: "white"}}/>}
                                    />
                                    <TimePicker
                                        label="Sluttidspunkt"
                                        value={EndDate}
                                        onChange={handleChangeEndDate}
                                        renderInput={(params) => <TextField {...params}
                                                                            style={{backgroundColor: "white"}}/>}
                                    />
                                </LocalizationProvider>

                                <TextField
                                    fullWidth
                                    multiline
                                    rows={10}
                                    label="Beskrivelse"
                                    onChange={handleTextInputChange}
                                    id="outlined-textarea"
                                    variant="outlined"
                                    style={{
                                        borderRadius: '50',
                                        backgroundColor: "white"
                                    }}
                                />
                            </Stack>
                        </Box>

                        {
                            waiting?<CircularProgress color="primary" />:null //Simple feedback for when submit button is pressed
                        }
                        {
                            submitPressed?<Alert severity="success" sx={{ maxWidth: 600 }}>Added successfully</Alert>:null
                        }

                        <Button variant="contained"
                                size="large"
                                hidden={submitPressed || waiting}
                                disabled={!StartDate || !EndDate || !Field || !Team || !Description}
                                onClick={(e) => {
                                    setWaiting(true)
                                    addToDB(e, StartDate, EndDate, Field, Team, Description);
                                    delay(1000).then(() => setWaiting(false));
                                    delay(1000).then(() => setSubmitPressed(true));
                                    delay(2500).then(() => navBack());
                                }}
                        >
                            Opret
                        </Button>

                    </div>

                    <div className="main-grid-item">
                        <ProfileColumn/>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminPanel;