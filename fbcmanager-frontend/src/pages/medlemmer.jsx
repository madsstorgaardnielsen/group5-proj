import React from "react";
import Navbar from "../components/Navbar";
import "../style.css";
import { MedlemmerList } from "../components/medlemmerlist";


class Medlemmer extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="body">
          {<MedlemmerList/>}
        </div>
      </div>
    );
  }
}

export default Medlemmer;
