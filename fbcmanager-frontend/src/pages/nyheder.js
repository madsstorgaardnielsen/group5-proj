import React from "react";
import "../scss/style.scss";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const t = () =>{
  

  console.log()
}
const Betaling = () => {
  return (
    <div>
      <Navbar />
      <div className="body">
        <h1>Nyheder</h1>
        <Link to="/" onClick={t}>Test</Link>
        <p>content</p>
        
      </div>
    </div>
  );
};

export default Betaling;
