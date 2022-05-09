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

function AddField () {
    const navigate = useNavigate()
    const navBack = () => {
        navigate('/adminPanel')
    }

    const [FieldName, setFieldNameInput] = React.useState('');
    const handleHeaderInputChange = event => {
        setFieldNameInput(event.target.value);
    };
    const [Location, setLocationInput] = React.useState('');
    const handleSubHeaderInputChange = event => {
        setLocationInput(event.target.value);
    };

    function addToDB(e, fieldname, location) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const object = {
            "fieldname": fieldname,
            "location": location,
        };
        axios.post(
            "http://130.225.170.74:80/api/Field", object,
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
                        <h1>Opret en ny bane</h1>
                        <Box
                            className="addBox"
                            sx={{
                                maxWidth: 600
                            }}
                        >
                            <h6 className="adminAdd">Skriv et passende banenavn</h6>
                            <TextField
                                fullWidth
                                multiline
                                rows={1}
                                label="Banenavn"
                                onChange={handleHeaderInputChange}
                                id="Headline"
                                variant="outlined"
                                style={{marginBottom: 20,
                                    backgroundColor: "white"}}
                            />

                            <h6 className="adminAdd">Beskriv lokationen</h6>
                            <TextField
                                fullWidth
                                multiline
                                rows={1}
                                label="Lokation"
                                onChange={handleSubHeaderInputChange}
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
                                disabled={!FieldName || !Location}
                                onClick={(e) => {
                                    setWaiting(true)
                                    addToDB(e, FieldName, Location);
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
export default AddField;