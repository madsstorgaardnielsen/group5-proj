import React from "react";
import Navbar from "../components/Navbar";
import "../scss/style.scss"
import { Helmet } from 'react-helmet';
import ProfileColumn from "../components/ProfileColumn";
import Button from '@mui/material/Button';
import  "../scss/adminPanel.css";
import {useNavigate} from "react-router-dom";

function AdminPanel () {
    const navigate = useNavigate()
    const toAddEvent = () => {
        navigate('/home')
    }
    const toAddTraining = () => {
        navigate('/home')
    }
    const toAddNews = () => {
        navigate('/home')
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

                        <h5 className="adminAdd">Opret ny træning</h5>
                        <Button variant="contained" size="large" onClick={toAddTraining}>
                            +
                        </Button>

                        <h5 className="adminAdd">Opret ny begivenhed</h5>
                        <Button variant="contained" size="large" onClick={toAddEvent}>
                            +
                        </Button>

                        <h5 className="adminAdd">Opret ny Nyhed</h5>
                        <Button variant="contained" size="large" onClick={toAddNews}>
                            +
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