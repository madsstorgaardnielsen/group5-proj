import React from "react";
import Navbar from "../components/Navbar";
import "../scss/style.scss";
import MedlemmerTable from "../components/MedlemmerTable";
import { Helmet } from 'react-helmet';

class Medlemmer extends React.Component {
  render() {
    return (
      <div>
          <Helmet>
              <title>Members | NemSport</title>
          </Helmet>
        <Navbar />
        <div className="body">
          <MedlemmerTable/>
        </div>
      </div>
    );
  }
}

export default Medlemmer;
