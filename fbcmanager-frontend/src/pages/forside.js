import React from "react";
import Navbar from "../components/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";

import "../scss/forside.scss";
import "../scss/style.scss";


import noimg from "../res/img/noimg.png";
import noimgsmall from "../res/img/noimg-small.png";




function Forside() {

  const navigate = useNavigate()

  const toHome = () => {
    navigate('/home')
  }
  
  return (
    <div>
      <Navbar />
      <div className="body">
        <header className="frontPageHeader">
          <div className="headerWrapper">
            <section>
              <h1 className="mainHeader">Velkommen til NemSport</h1>
              <p className="mainDescription">Danmarks største fodbold klub gjort nem</p>
              {/*<NavLink className="headerLogin">Login</NavLink>*/}
              <button className="headerLogin" onClick={toHome}>Login</button>
            </section>
          </div>
        </header>

        <div className="grid-container-frontpage">
          <section className="grid-item-frontpage">
            <img src={noimgsmall}></img>
          </section>
          <section className="grid-item-frontpage">
            <img src={noimgsmall}></img>
          </section>
          <section className="grid-item-frontpage">
            <img src={noimgsmall}></img>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Forside;
