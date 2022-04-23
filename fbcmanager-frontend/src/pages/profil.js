import React from "react";
import "../scss/profilePage.scss";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import CollapsibleTable from "../components/TrainingsTable";
import profile from "../res/img/profile/tmp-profile.png";
import { Helmet } from 'react-helmet';

function Profil () {
    return (
        <div>
            <Helmet>
                <title>Profile | NemSport</title>
            </Helmet>
            <Navbar />
            <div className="profile-info">
                <section className="profile-pic-section" >
                    <a href="/profil"><img target={"_blank"} src={profile} className="profile-pic"/></a>
                </section>
                <div>
                    {}
                    <section>
                        <h4>Contact information</h4>
                        <p style={{fontWeight: "bold"}}>Name</p>
                        <p>Mette Frederiksen</p>
                        <p style={{fontWeight: "bold"}}>Address</p>
                        <p>Vej 1, 2300 København S</p>
                        <p style={{fontWeight: "bold"}}>E-mail</p>
                        <p>mette@frederiksen.dk</p>
                        <p style={{fontWeight: "bold"}}>Phone number</p>
                        <p>+4570707070</p>
                        <span>
                    <p>Subcontents</p>
                    <p>Subsubcontents</p>
                  </span>
                        <button type="button">Change information</button>
                        <button type="button">Change password</button>

                    </section>
                    {}
                    <section>
                        <h4>My training sessions</h4>
                        <p>Contents</p>
                        <span>
                    <p>Subcontents</p>
                    <p>Subsubcontents</p>
                  </span>
                        <button type="button">See complete history</button>
                    </section>
                    {}
                    <section>
                        <h4>My statistics</h4>
                        <p>Contents</p>
                        <span>
                    <p>Subcontents</p>
                    <p>Subsubcontents</p>
                  </span>
                    </section>
                </div>
            </div>
        </div>



    );
};

export default Profil;

