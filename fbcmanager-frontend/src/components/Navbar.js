import React from "react";
import "../style.css";
import { useNavigate } from "react-router";

export default function Navbar() {
  let navigate = useNavigate();

  const gotoForside = () => {
    let path = "/"
    navigate(path)
  };

  const gotoMedlemmer = () => {
    let path = "/medlemmer"
    navigate(path)
  };

  const gotoBetaling = () => {
    let path = "/betaling"
    navigate(path)
  };

  const gotoEvents = () => {
    let path = "/events"
    navigate(path)
  };

  const gotoTraening = () => {
    let path = "/traening"
    navigate(path)
  };

  return (
    <nav className="NavBar">
      <h4 className="navbartabforside" onClick={gotoForside}>
        Forside
      </h4>
      <h4 className="navbartab" onClick={gotoMedlemmer}>
        Medlemmer
      </h4>
      <h4 className="navbartab" onClick={gotoBetaling}>Betaling</h4>
      <h4 className="navbartab" onClick={gotoEvents}>Events</h4>
      <h4 className="navbartab" onClick={gotoTraening}>Træninger</h4>
    </nav>
  );
}
