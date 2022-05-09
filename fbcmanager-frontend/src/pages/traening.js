import React from "react";
import Navbar from "../components/Navbar";
import "../scss/style.scss";
import Table from "@mui/material/Table";
import CollapsibleTable from "../components/TrainingsTable";
import CollapsibleTableUser from "../components/TrainingsTableUser";

import { Helmet } from "react-helmet";

function Traening() {
  return (
    <div>
      <Helmet>
        <title>Trainings | NemSport</title>
      </Helmet>
      <Navbar />
      <div className="body">
        <h1>Dine tilmeldte træninger</h1>
        <CollapsibleTableUser/>
        <h1>Alle træninginger</h1>
        <CollapsibleTable />
      </div>
    </div>
  );
}

export default Traening;

