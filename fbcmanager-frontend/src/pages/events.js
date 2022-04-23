import React from "react";
import Navbar from "../components/Navbar";
import RightColumn from "../components/RightColumn";
import "../scss/style.scss";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import {CardActionArea} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { Helmet } from 'react-helmet';

import "../scss/eventPage.scss";
import eventPic from "../res/img/events/event-pic.jpg";


export default function BasicGrid() {
    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={6}>
                <Hidden mdDown>
                    <Grid item lg={3}>
                        <Navbar />
                    </Grid>
                </Hidden>


                <Grid item xs={12} md={8} lg={6}>
                    <div className="content">
                        <Helmet>
                            <title>Events | NemSport</title>
                        </Helmet>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={1}>
                                <Grid container item spacing={3}>
                                    <FormRow />
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </Grid>


                <Grid item xs={12} sm={4} md={3}>
                    <RightColumn />
                </Grid>
            </Grid>
        </Box>
    );
}

/*TODO Get number of cards or set maximum. Odd numbers are removed. */
const numberOfCards = 10;
function FormRow() {
    return (
        <React.Fragment>
            <Grid item xs={6} >
                <section className="eventCardGrid">
                    {Array.from({ length: numberOfCards/2 }, (_, i) => <span key={i}>
                            <EventCard/>
                        </span>)}
                </section>
            </Grid>
            <Grid item xs={6} className="eventCardGrid2">
                <section>
                    {Array.from({ length: numberOfCards/2 }, (_, i) => <span key={i}>
                            <EventCard/>
                        </span>)}
                </section>
            </Grid>
        </React.Fragment>
    );
}

/*TODO Eventually load this database
*      And create navigation to page of specific event - Not a priority. */
function EventCard() {
    const navigate = useNavigate()
    const toHome = () => {
        navigate('/home')
    }

    return (
        <Card sx={{ maxWidth: 400 }} className="eventCard">
            <CardActionArea onClick={toHome}>
                <CardMedia
                    component="img"
                    height="140"
                    image={eventPic}
                    alt="Event picture"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Pølsehorn og snacks
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Tag dine forældre med til pølsehorn og snacks ved klubhuset på onsdag!
                        Tag dine forældre med til pølsehorn og snacks ved klubhuset på onsdag!
                        Tag dine forældre med til pølsehorn og snacks ved klubhuset på onsdag!
                    </Typography>
                    <div className="grid-container">
                        <div>
                            <Typography variant="subtitle2" color="text.secondary">
                            <p className="cardDate">29/9 kl. 13:00</p>
                            </Typography></div>
                        <div className="cardLocation">
                            <Typography variant="subtitle2" color="text.secondary" >
                                <p className="cardLocation">klubhuset</p>
                            </Typography></div>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}