import React from "react";
import Navbar from "../components/Navbar";
import "../style.css";
import { MedlemmerList } from "../components/medlemmerlist";
import Test from "../components/test";

class Medlemmer extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="body">
          {/* <MedlemmerList/>  */}
          <Test/>
        </div>
      </div>
    );
  }
}

export default Medlemmer;
