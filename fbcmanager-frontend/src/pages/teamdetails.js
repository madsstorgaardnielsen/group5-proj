import React from "react";
import Navbar from "../components/Navbar";
import "../scss/style.scss";
import Table from "@mui/material/Table";
import CollapsibleTable from "../components/TeamsTable";
import TeamDetailsTable from "../components/TeamDetailsTable";
import { Helmet } from "react-helmet";

export default function TeamDetails(){
    return (
      <div>
        <Helmet>
          <title>Teams | NemSport</title>
        </Helmet>
        <Navbar />
        <div className="body">
          <h1>Team information</h1>
          <TeamDetailsTable />
        </div>
      </div>
    );
  
  }