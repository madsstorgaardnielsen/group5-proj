import React from "react";
import Navbar from "../components/Navbar";
import "../scss/style.scss"
import {Helmet} from 'react-helmet';
import ProfileColumn from "../components/ProfileColumn";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../scss/adminPanel.scss";
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
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

{/* You need to run these command:
npm install @mui/x-date-pickers
npm i date-fns
*/}

function AdminPanel () {
    const navigate = useNavigate()
    const navBack = () => {
        navigate('/adminPanel')
    }

    const [Header, setHeaderInput] = React.useState('');
    const handleHeaderInputChange = event => {
        setHeaderInput(event.target.value);
    };
    const [Description, setTextInput] = React.useState('');
    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };
    const [Location, setLocation] = React.useState('');
    const handleChangeField = (event) => {
        setLocation(event.target.value);
    };
    const [StartDate, setStartDate] = React.useState(new Date());
    const handleChangeStartDate = (newValue) => {
        setStartDate(newValue);
    };
    const [EndDate, setEndDate] = React.useState(new Date());
    const handleChangeEndDate = (newValue) => {
        setEndDate(newValue);
    };
    const [Price, setPrice] = React.useState({amount: ''});
    const handleChange = (prop) => (event) => {
        setPrice({ ...Price, [prop]: event.target.value });
    };

    function addToDB(e, startDate, endDate, location, header, description, price) {
        e.preventDefault();
        let startTime = startDate.getHours() + ':' + startDate.getMinutes() + ':' + "00";
        let endTime = endDate.getHours() + ':' + endDate.getMinutes() + ':' + "00";

        const object = {
            "Header": header,
            "Description": description,
            "Location": location,
            "Date": startDate,
            "From": startTime,
            "To": endTime,
            "Price": price
        };
        axios.post("http://localhost:7285/api/Events", object).then((response) => console.log(response.data));
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
            <Navbar />
            <div className="body">
                <div className="main-grid-container">
                    <div className="adminPanel-content">
                        <h1>Opret ny Begivenhed</h1>
                        <Box
                            className="addBox"
                            sx={{
                                maxWidth: 600
                            }}
                        >
                            <Stack spacing={3}>
                                <h6>Udfyld følgende</h6>

                                <TextField
                                    fullWidth
                                    multiline
                                    rows={1}
                                    label="Overskrift"
                                    id="Headline"
                                    onChange={handleHeaderInputChange}
                                    variant="outlined"
                                    style={{backgroundColor: "white"}}
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={10}
                                    label="Beskrivelse"
                                    id="Body"
                                    onChange={handleTextInputChange}
                                    variant="outlined"
                                    style={{borderRadius:'50',
                                        backgroundColor: "white"}}
                                />
                                {/* Location */}
                                <FormControl className="itemSelect" variant="filled">
                                    <InputLabel>Sted</InputLabel>
                                    <Select
                                        id="Field"
                                        value={Location}
                                        label="Field"
                                        onChange={handleChangeField}
                                        style={{backgroundColor: "white"}}
                                    >
                                        <MenuItem value={1}>A</MenuItem>
                                        <MenuItem value={2}>B</MenuItem>
                                        <MenuItem value={3}>C2</MenuItem>
                                        <MenuItem value={4}>Klubhuset</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Time */}
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

                                {/* Price */}
                                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
                                    <FilledInput
                                        id="filled-adornment-amount"
                                        value={Price.amount}
                                        onChange={handleChange('amount')}
                                        startAdornment={<InputAdornment position="start">DKK</InputAdornment>}
                                        style={{backgroundColor: "white"}}
                                    />
                                </FormControl>

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
                                disabled={!StartDate || !EndDate || !Header || !Description || !Location}
                                onClick={(e) => {
                                    setWaiting(true)
                                    addToDB(e, StartDate, EndDate, Location, Header, Description, Price);
                                    delay(1000).then(() => setWaiting(false));
                                    delay(1000).then(() => setSubmitPressed(true));
                                    delay(2500).then(() => navBack());
                                }}
                        >
                            Opret
                        </Button>
                    </div>

                    <div className="main-grid-item">
                        <ProfileColumn />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminPanel;