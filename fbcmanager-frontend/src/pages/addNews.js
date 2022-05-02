import React from "react";
import Navbar from "../components/Navbar";
import "../scss/style.scss"
import { Helmet } from 'react-helmet';
import ProfileColumn from "../components/ProfileColumn";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import  "../scss/adminPanel.scss";
import {useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';


function AdminPanel () {
    const navigate = useNavigate()
    const Add = () => {
        navigate('/adminPanel')
    }

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
                                id="Body"
                                variant="outlined"
                                style={{backgroundColor: "white"}}
                            />
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