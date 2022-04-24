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

{/* You need to run these command:
npm install @mui/x-date-pickers
npm i date-fns
*/}

function AdminPanel () {
    const navigate = useNavigate()
    const Add = () => {
        navigate('/adminPanel')
    }

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
    {/*IMPORTANT: EndDate should take same DAY/Month/Year as StartDate!
    TODO Sikkerhed ift slut skal være efter start og at alt skal være udfyldt før der kan trykkes OPRET
    */}

    return (
        <div>
            <Helmet>
                <title>AdminPanel | NemSport</title>
            </Helmet>
            <Navbar />
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
                                <FormControl className="itemSelect" variant="filled" sx={{ m: 1, width: 150 }}>
                                    <InputLabel>Hold</InputLabel>
                                    <Select
                                        id="Team"
                                        value={Team}
                                        label="Team"
                                        onChange={handleChangeEvent}
                                        style={{
                                            backgroundColor: "white"}}
                                    >
                                        <MenuItem value={12}>U12</MenuItem>
                                        <MenuItem value={13}>U13</MenuItem>
                                        <MenuItem value={14}>U14</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Bane */}
                                <FormControl className="itemSelect" variant="filled" sx={{ m: 1, width: 150 }}>
                                    <InputLabel>Bane</InputLabel>
                                    <Select
                                        id="Field"
                                        value={Field}
                                        label="Field"
                                        onChange={handleChangeField}
                                        style={{
                                            backgroundColor: "white"}}
                                    >
                                        <MenuItem value={1}>A</MenuItem>
                                        <MenuItem value={2}>B</MenuItem>
                                        <MenuItem value={3}>C2</MenuItem>
                                        <MenuItem value={4}>Klubhuset</MenuItem>
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
                                    id="Body"
                                    variant="outlined"
                                    style={{borderRadius:'50',
                                        backgroundColor: "white"}}
                                />
                            </Stack>
                        </Box>
                        <Button variant="contained" size="large" onClick={Add}>
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