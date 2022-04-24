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
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

{/* You need to run these command:
npm install @mui/x-date-pickers
npm i date-fns
*/}

function AdminPanel () {
    const navigate = useNavigate()
    const Add = () => {
        navigate('/adminPanel')
    }

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

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };


    {/*IMPORTANT: EndDate should take same DAY/Month/Year as StartDate!
    TODO Sikkerhed ift slut skal være efter start og at alt skal være udfyldt før der kan trykkes OPRET
    TODO Undersøg lige om der ifg db skal være sluttidspunkt på
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
                                    variant="outlined"
                                    style={{backgroundColor: "white"}}
                                />
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
                                {/* Sted */}
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

                                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
                                    <FilledInput
                                        id="filled-adornment-amount"
                                        value={values.amount}
                                        onChange={handleChange('amount')}
                                        startAdornment={<InputAdornment position="start">DKK</InputAdornment>}
                                        style={{backgroundColor: "white"}}
                                    />
                                </FormControl>



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