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
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';


function AdminPanel () {
    const navigate = useNavigate()
    const navBack = () => {
        navigate('/adminPanel')
    }

    function addToDB(e, header, description) {
        e.preventDefault();
        const object = {
            "Date": "",
            "Header": header,
            "Subheader": "",
            "Content": description,
        };
        axios.post("http://localhost:7285/api/News", object).then((response) => console.log(response.data));
    }


    const [Header, setHeaderInput] = React.useState('');
    const handleHeaderInputChange = event => {
        setHeaderInput(event.target.value);
    };
    const [Description, setTextInput] = React.useState('');
    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };

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
                        <h1>Opret nyhed</h1>
                        <Box
                            className="addBox"
                            sx={{
                                maxWidth: 600
                            }}
                        >
                            <h6 className="adminAdd">Skriv en passende overskrift</h6>
                            <TextField
                                fullWidth
                                multiline
                                rows={1}
                                label="Overskrift"
                                onChange={handleHeaderInputChange}
                                id="Headline"
                                variant="outlined"
                                style={{marginBottom: 20,
                                    backgroundColor: "white"}}
                            />

                            <h6 className="adminAdd">Skriv din nyhed</h6>
                            <TextField
                                fullWidth
                                multiline
                                rows={10}
                                label="Nyhed"
                                onChange={handleTextInputChange}
                                id="Body"
                                variant="outlined"
                                style={{backgroundColor: "white"}}
                            />
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
                                disabled={!Header || !Description}
                                onClick={(e) => {
                                    setWaiting(true)
                                    addToDB(e, Header, Description);
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