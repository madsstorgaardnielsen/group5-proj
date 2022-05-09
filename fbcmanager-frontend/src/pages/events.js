import React from "react";
import react from "react";
import Navbar from "../components/Navbar";
import ProfileColumn from "../components/ProfileColumn";
import "../scss/style.scss";
import Grid from '@mui/material/Grid';
import {Helmet} from 'react-helmet';
import "../scss/eventPage.scss";
import axios from "axios";
import EventCard from "../components/EventCard";


export default function EventPage() {
    const [events, setEvents] = react.useState([
    ])

    React.useEffect(() => {
        axios.get("http://130.225.170.74:80/api/Event").then((response) => {
            setEvents(response.data)
        })})

    return (
        <div>
            <Navbar />  
            <div className="body">
                <div className="main-grid-container">
                    <div className="main-grid-item">
                        <Helmet>
                            <title>Events | NemSport</title>
                        </Helmet>
                        <Grid container spacing={4}>
                            {events.map(event =>
                                <EventCard key={event.id} event={event}/>
                            )}
                        </Grid>
                    </div>

                    <div className="main-grid-item">
                        {/* Profile */}
                        <ProfileColumn />
                    </div>

                </div>
            </div>
        </div>
    );
}

