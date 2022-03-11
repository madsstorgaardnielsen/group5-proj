import React, {Fragment, PureComponent} from "react";
import "../scss/style.scss";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";


//Images
import nemsport from "../res/img/logo/nemsport.png";
import home from "../res/img/navbar/home.svg";
import practices from "../res/img/navbar/practices.svg";
import events from "../res/img/navbar/events.svg";
import members from "../res/img/navbar/members.svg";
import news from "../res/img/navbar/news.svg";



export default function Navbar() {
  return (
    <nav className="NavBar">
      <div className="forside">
        <NavLink activeclassname="active" className="navLogo" to="/">
          <span>
            <img src={nemsport} alt="NemSport Logo" width="50px" height="50px"></img>
            NemSport
          </span>
          
        </NavLink>
      </div>
      <div className="tabs">
        <NavLink activeclassname="active" className="navbartxt" to="/home">
          <img className="navbarImg" src={home} alt="NemSport home" width="50px" height="50px"></img>
          Hjem
        </NavLink>
        <NavLink activeclassname="active" className="navbartxt" to="/traening">
          <img className="navbarImg" src={practices} alt="NemSport home" width="50px" height="50px"></img>
          Træning
        </NavLink>
        <NavLink activeclassname="active" className="navbartxt" to="/events">
          <img className="navbarImg" src={events} alt="NemSport home" width="50px" height="50px"></img>
          Begivenheder
        </NavLink>
        <NavLink activeclassname="active" className="navbartxt" to="/medlemmer">
          <img className="navbarImg" src={members} alt="NemSport home" width="50px" height="50px"></img>
          Medlemmer
        </NavLink>
        <NavLink activeclassname="active" className="navbartxt" to="/nyheder">
          <img className="navbarImg" src={news} alt="NemSport home" width="50px" height="50px"></img>
          Nyheder
        </NavLink>
        
        
      </div>
      {/* <h4 className="navbartabforside" onClick={gotoForside}>
        Forside
      </h4>
      <h4 className="navbartab" onClick={gotoMedlemmer}>
        Medlemmer
      </h4>
      <h4 className="navbartab" onClick={gotoBetaling}>Betaling</h4>
      <h4 className="navbartab" onClick={gotoEvents}>Events</h4>
      <h4 className="navbartab" onClick={gotoTraening}>Træninger</h4> */}
    </nav>
  );
}