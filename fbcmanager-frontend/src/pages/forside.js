import React from "react";
import Navbar from "../components/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

import "../scss/forside.scss";
import "../scss/style.scss";


import noimg from "../res/img/noimg.png";
import noimgsmall from "../res/img/noimg-small.png";
import LoginPopup from "../components/login_component/LoginPopup";
// import RegisterPopup from "../components/register_component/RegisterPopup";



function Forside() {

  const navigate = useNavigate()

  const toHome = () => {
    navigate('/home')
  }

  const toRegistrationPage = () => {
    navigate('/signup')
  }
  
  return (
    <div>
      <Helmet>
        <title>NemSport</title>
      </Helmet>
      <Navbar />
      <div className="body">
        <header className="frontPageHeader">
          <div className="headerWrapper">
            <section>
              <h1 className="mainHeader">Velkommen til NemSport</h1>
              <p className="mainDescription">Danmarks største fodbold klub gjort nem</p>
              {/*<NavLink className="headerLogin">Login</NavLink>*/}
              <LoginPopup/>
              {/* <RegisterPopup/> */}
              {/* <button className="headerLogin" onClick={toHome}>Login</button> */}
              <button className="headerTilmeld" onClick={toRegistrationPage}>Tilmeld</button>
            </section>
          </div>
        </header>

        <div className="grid-container-frontpage">
          <section className="grid-item-frontpage">
            <img src={noimgsmall}></img>
            <section>
              <h4>Danmarks største fodboldklub</h4>
              <p>NemSport er en del af BKSkjold sport.</p>
              <p>Vi holder til i Telia Parken</p>
            </section>
          </section>
          <section className="grid-item-frontpage">
            <img src={noimgsmall}></img>
            <section>
              <h4>Helt nye kunstbaner</h4>
              <p>Parken har netop fået helt nye kunstbaner</p>
              <p>Vi holder til i Telia Parken</p>
            </section>
          </section>
          <section className="grid-item-frontpage">
            <img src={noimgsmall}></img>
            <section>
              <h4>Tilmeld dig nemt og hurtigt</h4>
              <p>Hos NemSport er det lidt nemmere</p>
              <p>Vi holder til i Telia Parken</p>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Forside;