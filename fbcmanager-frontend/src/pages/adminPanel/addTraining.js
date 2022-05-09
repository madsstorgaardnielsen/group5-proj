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
import {datePickerToDB} from "../../model/DateFormatter";

function AddTraining () {
    const navigate = useNavigate()
    const navBack = () => {
        navigate('/adminPanel')
    }

    const [FieldList, setFieldList] = React.useState('');
    const [TeamList, setTeamList] = React.useState('');

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
    const [Description, setTextInput] = React.useState('');
    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };

    const token = localStorage.getItem("token");

    React.useEffect(() => {
        axios.get("http://130.225.170.74:80/api/Team", {headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            setTeamList(response.data)
        })},[]);

    React.useEffect(() => {
        axios.get("http://130.225.170.74:80/api/Field", {headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            setFieldList(response.data)
        })},[]);

    //When submit button is pressed, create object and add to DB
    function addToDB(e, date, fieldid, teamid) {
        e.preventDefault();
        date = datePickerToDB(date)
        const object = {
            "teamid":teamid,
            "fieldid":fieldid,
            "date":date
        };
        axios.post(
            "http://130.225.170.74:80/api/Practise", object,
            {headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => console.log(response.data)).catch(function (error) {
            if (error.response) {
                console.log(error.response.data.title);
                console.log(error.response.status);
                console.log(error.response.data);
            }
        });
    }
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const [submitPressed,setSubmitPressed]=React.useState(false)
    const [waiting,setWaiting]=React.useState(false)

    let myTeamList = Array.from(TeamList)
    let myFieldList = Array.from(FieldList)

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
                                        {myTeamList.map((team) =>
                                            <MenuItem value={team.id} > {team.teamName} </MenuItem>
                                        )}
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
                                        {myFieldList.map((field) =>
                                            <MenuItem value={field.id} > {field.fieldName} </MenuItem>
                                        )}
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
                                disabled={!StartDate || !Field || !Team}
                                onClick={(e) => {
                                    setWaiting(true)
                                    addToDB(e, StartDate, Field, Team);
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

export default AddTraining;