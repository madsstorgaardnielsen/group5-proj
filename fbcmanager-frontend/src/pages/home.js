import React from "react";
import Navbar from "../components/Navbar";
import "../scss/style.scss"


const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="body">
        <div className="grid-container-home">
          <div className="grid-item-home">
            <h1>Home</h1>
          </div>
          <div className="grid-item-home">
            <p>test</p>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Home;
