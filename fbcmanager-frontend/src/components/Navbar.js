import React from "react";
import "../scss/style.scss";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="NavBar">
      <div className="forside">
        <NavLink activeclassname="active" className="navbartxt" to="/">
          Forside
        </NavLink>
      </div>
      <div className="tabs">
        <NavLink activeclassname="active" className="navbartxt" to="/medlemmer">
          Medlemmer
        </NavLink>
        <NavLink activeclassname="active" className="navbartxt" to="/betaling">
          Betaling
        </NavLink>
        <NavLink activeclassname="active" className="navbartxt" to="/events">
          Events
        </NavLink>
        <NavLink activeclassname="active" className="navbartxt" to="/traening">
          Træning
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
