import React from "react";
import "./forside.css";
import Navbar from "../components/Navbar";
const Forside = () => {
  return (
    <div>
      <Navbar />
      <div className="forside">
        <h1>Forside / nyheder ?</h1>
        <p>content</p>
      </div>
    </div>
  );
};

export default Forside;
