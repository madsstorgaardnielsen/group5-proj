import React from "react";
import "../scss/profilePage.scss";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import CollapsibleTable from "../components/TrainingsTable";


function Profil () {
    return (
        <div>
            <Navbar />



            <div className="profile-info">
                <div>
                    {}
                    <section>
                        <h4>Headda</h4>
                        <p>Contents</p>
                        <span>
                    <p>Subcontents</p>
                    <p>Subsubcontents</p>
                  </span>
                    </section>
                    {}
                    <section>
                        <h4>Headda</h4>
                        <p>Contents</p>
                        <span>
                    <p>Subcontents</p>
                    <p>Subsubcontents</p>
                  </span>
                    </section>
                    {}
                    <section>
                        <h4>Headda</h4>
                        <p>Contents</p>
                        <span>
                    <p>Subcontents</p>
                    <p>Subsubcontents</p>
                  </span>
                    </section>
                    {}
                    <section>
                        <h4>Headda</h4>
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

