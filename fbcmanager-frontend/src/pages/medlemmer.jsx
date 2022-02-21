import React from "react";
import Navbar from "../components/Navbar";
import "../style.css";
import Medlemmerlist from "../components/Medlemmerlist";

class Medlemmer extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="body">
          <Medlemmerlist/>
        </div>
      </div>
    );
  }
}

export default Medlemmer;
