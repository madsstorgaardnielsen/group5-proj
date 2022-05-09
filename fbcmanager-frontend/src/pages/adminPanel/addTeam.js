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
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

function AddTeam () {
    const navigate = useNavigate()
    const navBack = () => {
        navigate('/adminPanel')
    }

    const [TeamName, setTeamNameInput] = React.useState('');
    const handleHeaderInputChange = event => {
        setTeamNameInput(event.target.value);
    };

    function addToDB(e, teamName) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const object = {
            "teamName": teamName,
        };
        axios.post(
            "http://130.225.170.74:80/api/Team", object,
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

    return (
        <div>
            <Helmet>
                <title>AdminPanel | NemSport</title>
            </Helmet>
            <Navbar />
            <div className="body">
                <div className="main-grid-container">
                    <div className="adminPanel-content">
                        <h1>Opret et ny hold</h1>
                        <Box
                            className="addBox"
                            sx={{
                                maxWidth: 600
                            }}
                        >
                            <h6 className="adminAdd">Skriv et passende navn på holdet</h6>
                            <TextField
                                fullWidth
                                multiline
                                rows={1}
                                label="holdnavn"
                                onChange={handleHeaderInputChange}
                                id="Headline"
                                variant="outlined"
                                style={{marginBottom: 20,
                                    backgroundColor: "white"}}
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
                                disabled={!TeamName}
                                onClick={(e) => {
                                    setWaiting(true)
                                    addToDB(e, TeamName);
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
}
export default AddTeam;