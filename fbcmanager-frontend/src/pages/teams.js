import React from "react";
import Navbar from "../components/Navbar";
import "../scss/style.scss"
import Table from '@mui/material/Table';
import CollapsibleTable from "../components/TeamsTable"
import { Helmet } from 'react-helmet';

function Teams () {
  return (
    <div>
        <Helmet>
            <title>Teams | NemSport</title>
        </Helmet>
      <Navbar />
      <div className="body">
        <h1>Teams</h1>
          <p>Alle Teams:</p>
          <CollapsibleTable />
      </div>
    </div>
  );
};

export default Teams;
