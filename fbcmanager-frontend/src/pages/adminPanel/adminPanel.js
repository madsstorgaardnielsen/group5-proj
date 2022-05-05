import React from "react";
import Navbar from "../../components/Navbar";
import "../../scss/style.scss"
import { Helmet } from 'react-helmet';
import ProfileColumn from "../../components/ProfileColumn";
import Button from '@mui/material/Button';
import  "../../scss/adminPanel.scss";
import {useNavigate} from "react-router-dom";

function AdminPanel () {
    const navigate = useNavigate()
    const toAddEvent = () => {
        navigate('/addEvent')
    }
    const toAddTraining = () => {
        navigate('/addTraining')
    }
    const toAddNews = () => {
        navigate('/addNews')
    }

    const toEditNews = () => {
        navigate('/editNews')
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
                        <h1>Admin Panel</h1>

                        <h5 className="addItem">Opret ny træning</h5>
                        <Button sx={{ mr: 2 }} className="addButton" variant="contained" size="large" onClick={toAddTraining}>
                            Add
                        </Button>

                        <h5 className="addItem">Opret ny begivenhed</h5>
                        <Button sx={{ mr: 2 }} variant="contained" size="large" onClick={toAddEvent}>
                            Add
                        </Button>

                        <h5 className="addItem">Opret Nyhed</h5>
                        <Button sx={{ mr: 2 }} variant="contained" size="large" onClick={toAddNews}>
                            Add
                        </Button>
                        <Button className="addButton" variant="contained" size="large" color="warning" onClick={toEditNews}>
                            Edit
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