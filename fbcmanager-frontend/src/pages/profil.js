import React from "react";
import "../scss/style.scss";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import CollapsibleTable from "../components/TrainingsTable";


function Profil () {
    return (
        <div>
            <Navbar />
            <div className="body">
                <h1>Profil</h1>
                <p>Dine træninger:</p>
                <CollapsibleTable />
                <p>Søg efter træninger</p>
            </div>
        </div>
    );
};

export default Profil;

