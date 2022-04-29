import React from "react";
import Navbar from "../components/Navbar";
import "../scss/style.scss";
import Medlemmerlist from "../components/medlemmerlist";
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
          <Medlemmerlist/>
        </div>
      </div>
    );
  }
}

export default Medlemmer;
