import React, {useState } from "react";
import Navbar from "../components/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Calendar from "../components/Calendar";
import ProfileColumn from "../components/ProfileColumn";
import "../scss/style.scss"
import "../scss/homePage.scss"
import { Helmet } from 'react-helmet';
import axios from "axios";
import {getDate, getTime} from "../model/DateFormatter.js"; 
import EventCard from "../components/EventCard";
import Grid from '@mui/material/Grid';


//import Calendar from 'react-calendar'
//import 'react-calendar/dist/Calendar.css'


//Images
import team from "../res/img/homepage/team.svg"
import participants from "../res/img/homepage/participants.svg"
import location from "../res/img/homepage/location.svg"
import coach from "../res/img/homepage/coach.svg"
//import profile from "../res/img/homepage/tmp-profile.png"



function Home() {
  //const [value, onChange] = useState(new Date());

  const navigate = useNavigate()

  const toEvents = () => {
    navigate('/events')
  }

  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://130.225.170.74:80/api/Event").then((response) => {
        setEvents(response.data)
    })})
  
  /*
  events.map((row) => (
    console.log(row.id)
  ));
  */
 //console.log(events[0].toString())
 
  return (
    <div>
      <Helmet>
        <title>Home | NemSport</title>
      </Helmet>
      <Navbar />
      <div className="body">
        <div className="main-grid-container">
          {/* XXXXXX MIDDLE COLLUMN START XXXXXX*/}
          <div className="main-grid-item">
            {/* next practice */}
            <div className="next-practice">
              <section className="next-practice-container">
                <p className="prac-sub-header">Næste træning</p>
                <h1>Træning for seniorer</h1>
              {/* info container */}
                <div className="practice-info-container">
                  <section className="pi-date">
                    <p>25 oktober</p>
                    <h3>Mandag</h3>
                    <p>16:00 - 17:30</p>
                  </section>
                  <section>
                    <span>
                      <img src={team}></img> 
                      <p>U18</p>
                    </span>
                    <span>
                      <img src={location}></img>
                      <p> Bane C</p>
                    </span>
                  </section>
                  <section>
                    <span>
                      <img src={participants}></img> 
                      <p>8 / 12</p>
                    </span>
                    <span>
                      <img src={coach}></img>
                      <p> Ekkart Kindler</p>
                    </span>
                  </section>
                  
                </div>
              </section>
              <section  className="pi-last-column"></section>
            </div>
            {/* END Next Practice */}

            {/* Calendar */}
            <div className="home-calendar">
              <Calendar />
            </div>
            {/* END Calendar */}

            {/* Events */}
            <Grid container className='home-events'>
                {events.map(event =>
                    <EventCard key={event.id} event={event}/>
                )}
            </Grid>
            <div className="all-events-link-container">
              <a onClick={toEvents} className="all-events-link">Se alle begivenheder</a>
            </div>
            {/* END Events */}
          </div>
          {/* XXXXXX MIDDLE COLLUMN END XXXXXX*/}


          {/* XXXXXX RIGHT COLLUMN START XXXXXX*/}
          <div className="main-grid-item">
            {/* Profile */}
            <ProfileColumn />

            {/* News */}
            <div>

            </div>
          </div>
          {/* XXXXXX MIDDLE COLLUMN END XXXXXX*/}
        
        </div>
      </div>
    </div>
  );
};

export default Home;
